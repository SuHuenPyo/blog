const dayjs = require("dayjs");

const pool = require("../../utils/pool");
const logger = require("../../utils/winston");
const RegexHelper = require("../../utils/RegexHelper");
const { deleteImg } = require("../../utils/multer");
const { reset } = require("nodemon");
const { current } = require("../user/user.ctrl");
const { pagenation } = require('../../utils/PagenationHelper');


const regex = new RegexHelper();

//홈 컨텐츠 가져오기 
const index = async (req, res, next) => {
  console.log(req.session);

  logger.info(`[GET /post (index)] ${req.ip} is access`);
  console.log("[index] DB pool current Count == " + pool.pool._allConnections._tail);

  const page = req.query?.page || 1; //보내줄 해당 페이지 넘버. query로 값이 넘어 오지 않으면 맨처음 넘버 1로 보내줌
  const rows = req.query?.rows || 16; //페이지당 요청 개수

  let dbcon = null;
  let json = null;
  
  let sql = ``;
  let pagenationResult = null;
  let totalCount = 0;

  let result = null;

  try {
    
    
    

    dbcon = await pool.getConnection(async (conn) => conn);
    sql =`SELECT COUNT(*) as cnt FROM boards`;
    [result] = await dbcon.query(sql);
    totalCount = result[0].cnt ;

    result=null;

    pagenationResult = pagenation(totalCount, page, rows);

    
    sql =`SELECT boards.b_id as boardId , boards.b_title as boardTitle ,
    boards.b_banner as boardBanner, LEFT(boards.b_markdown, 300) as boardMarkdown ,
    boards.m_id as boardMemberId, boards.b_mdate as boardMDate,
    boards.b_hits as boardHits, boards.b_like  as boardLike,
    members.userId as memberUserId, members.image as memberPic,
    members.name as memberName
    FROM boards, members WHERE boards.m_id = members.m_id ORDER BY boardId DESC LIMIT ?,?`;

    result = await dbcon.query(sql, [pagenationResult.offset, pagenationResult.listCount]);

  } catch (err) {
    logger.error(err);
    console.error(err);
    return res.status(500).send("Internal Server Error");
  } finally {
    await dbcon.release();
  }
  return res.status(200).json({'result':result[0], 'pageEnd':pagenationResult.totalPage});
};
//검색한 글 목록 가져오기 
const search = async (req, res, next) => {
  console.log(req.session + "searchsearchsearchsearchsearchsearchsearchsearchsearch");

  logger.info(`[GET /post (index)] ${req.ip} is access`);
  console.log("[index] DB pool current Count == " + pool.pool._allConnections._tail);

  const page = req.query?.page || 1; //보내줄 해당 페이지 넘버. query로 값이 넘어 오지 않으면 맨처음 넘버 1로 보내줌
  const rows = req.query?.rows || 16; //페이지당 요청 개수

  let dbcon = null;
  let json = null;
  
  let sql = ``;
  let pagenationResult = null;
  let totalCount = 0;

  let result = null;

  let keyword = req.query.keyword || null;

  if(!keyword) return res.status(400).send("검색어가 없음");

  keyword = '%'+keyword+'%';

  try {
    
    
    

    dbcon = await pool.getConnection(async (conn) => conn);
    sql =`SELECT COUNT(*) as cnt FROM boards WHERE (B_TITLE LIKE ?)`;
    [result] = await dbcon.query(sql, keyword);
    totalCount = result[0].cnt ;

    if(result[0].cnt == 0) return res.status(200).json({});
    result=null;

    pagenationResult = pagenation(totalCount, page, rows);

    
    sql =`SELECT boards.b_id as boardId , boards.b_title as boardTitle ,
    boards.b_banner as boardBanner, LEFT(boards.b_markdown, 300) as boardMarkdown ,
    boards.m_id as boardMemberId, boards.b_mdate as boardMDate,
    boards.b_hits as boardHits, boards.b_like  as boardLike,
    members.userId as memberUserId, members.image as memberPic,
    members.name as memberName
    FROM boards, members WHERE ((boards.m_id = members.m_id) AND boards.b_title LIKE ? ) ORDER BY boardId DESC LIMIT ?,?`;

    result = await dbcon.query(sql, [ keyword, pagenationResult.offset, pagenationResult.listCount]);

  } catch (err) {
    logger.error(err);
    console.error(err);
    return res.status(500).send("Internal Server Error");
  } finally {
    await dbcon.release();
  }
  return res.status(200).json({'result':result[0], 'pageEnd':pagenationResult.totalPage});
};



//상세 글 가져오기
const detail = async (req, res, next) => {
  const id = parseInt(req.query.id, 10);

  logger.info(`[GET /post/${id}] ${req.ip} is access`);
  console.log("[full post detail] DB pool current Count == " + pool.pool._allConnections._tail);


  if (Number.isNaN(id)) {
    return res.status(400).send("ID를 확인해주세요.");
  }

  let dbcon = null;
  let json = null;

  try {
    dbcon = await pool.getConnection(async (conn) => conn);

    let sql =
      "SELECT b_id 'id', b_title 'title', b_banner 'banner', b_content 'content', m_id 'author_id', b_mdate 'date', b_hits 'hits', b_like 'like' FROM boards WHERE b_id = ?";

    const [result] = await dbcon.query(sql, [id]);


   

    if (!result[0]) {
      return res.status(400).send("글 ID를 확인해주세요.");
    }

    const findTagsId = "SELECT t_id FROM board_tags WHERE b_id = ?";

    const board_id = result[0].id;
    const [TagsId] = await dbcon.query(findTagsId, [board_id]);

    // Promise all -> DB 가져가서 안돌려줌 . connection pool 10개 가득차서 DB 동작을 안함. 
    // const tags = await Promise.all(
    //   TagsId.map(async (tagId, index) => {
    //     const findTag = "SELECT name FROM tags WHERE t_id = ?";

    //     const [tag] = await dbcon.query(findTag, [tagId.t_id]);

    //     return tag[0].name;
    //   })
    // );

    let tags =null;
    await(()=>{
      TagsId.map(async(tagId, index) =>{
        const findTag = "SELECT name FROM tags WHERE t_id = ?";
        const [tag] = await dbcon.query(findTag, [tagId.t_id]);
        return tag[0].name;
      })
    })();
    let currentHits = result[0].hits;

    currentHits = parseInt(currentHits);
    currentHits += 1;
    //조회수 증가
    sql = "UPDATE boards SET b_hits = ? WHERE b_id=?";
    await dbcon.query(sql, [currentHits, id]);

    json = result[0];

    json.tags = tags;


  } catch (err) {
    logger.error(err);
    console.error(err);

    return res.status(500).send("Interal Server Error");
  } finally {
    await dbcon.release();
  }

  return res.status(200).json(json);
};

const popular = async (req, res, next) => {
  logger.info(`[GET /post/popular] ${req.ip} is access`);

  let dbcon;
  let json;

  try {
    dbcon = await pool.getConnection(async (conn) => conn);

    
    const sql =
      "SELECT b_id 'id', b_title 'title', b_banner 'banner', b_content 'content', m_id 'author', b_mdate 'date', b_hits 'hits', b_like 'like' FROM boards ORDER BY b_hits DESC, b_like DESC";

    const [result] = await dbcon.query(sql);

    json = result;
  } catch (err) {
    logger.error(err);

    return res.status(500).send("Interal Server Error");
  } finally {
    await dbcon.release();
  }

  return res.status(200).json(json);
};
//최근글 불러오기 
const recent = async (req, res, next) => {
  let dbcon;
  let json;

  logger.info(`[GET /post/recent] ${req.ip} is access`);


  try {
    dbcon = await pool.getConnection(async (conn) => conn);

    const sql =
      "SELECT b_id 'id', b_title 'title', b_banner 'banner', b_content 'content', m_id 'author', b_mdate 'date', b_hits 'hits', b_like 'like' FROM boards ORDER BY b_rdate DESC";

    const [result] = await dbcon.query(sql);

    json = result;
  } catch (err) {
    logger.error(err);

    return res.status(500).send("Interal Server Error");
  } finally {
    await dbcon.release();
  }

  return res.status(200).json(json);
};

//글쓰기 
const create = async (req, res, next) => {
  let dbcon = null;
  const title = req.body.title?.trim();
  const banner = req.file || null;
  const content = req.body.content?.trim();
  const markdown = req.body.markdown;
  const author = parseInt(req.body.author, 10);
  let tags = req.body.tags;
  const date = dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss");
  const hits = 0;
  const like = 0;

  let boardId = null;

  const m_id = req.body.userId;


  if(tags){
    tags.replace (/"/g,'');
    tags = JSON.parse(tags);
  }

  //logger.info(`[POST /post/${id}] ${req.ip} is access`); id 알수없음 
  logger.info(`[POST /post/] ${req.ip} is access`);
  

  //console.log(Object.keys(banner).length); 오브젝트 길이 측정

  
  try {
    regex.value(title, "[POST /post title]");
    regex.value(content, "[POST /post content]");
    regex.value(markdown, "[POST /post markdown]");
    regex.value(author, "[POST /post author]");
    regex.length(title, 2, 100, "[POST /post title]");
    regex.length(title, 3, 10000, "[POST /post content]");
    regex.number(author, "[POST /post author]");
  } catch (err) {
    logger.error(`[${err.name}] ${err.message}`);

    if (banner !== null) {
       deleteImg(banner.key);
       console.log("에러 발생으로 업로드된 이미지 삭제")
      }

    return res.status(400).send("DATA를 확인해주세요.").end();
  }
  try {
    const input_data = [
      title,
      banner?.location || null,
      content,
      markdown,
      date,
      date,
      hits,
      like,
      m_id,
    ];
    // 풀 가져오기 
    dbcon = await pool.getConnection(async (cb) => cb);


    const sql =
      "INSERT INTO boards( b_title, b_banner, b_content, b_markdown, b_rdate, b_mdate, b_hits, b_like, m_id ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";


    //풀에서 커넥션을 가지고 query를 보내야 하지만 일단은 그냥 사용 
    const [boardRT] = await dbcon.query(sql, input_data);

    boardId = boardRT.insertId;


    // tag 처리
    if(tags){
      const tagRT = await Promise.all(
        tags.map(async (tag, i) => {
          let tagId;
  
          //사용자가 입력한 태그가 있는지 확인
          const findId = "SELECT t_id FROM tags WHERE name = ?";
          const [result1] = await dbcon.query(findId, [tag]);
          tagId = result1[0]?.t_id || 0;
  
          //태그가 DB에 존재하지 않는다면 생성한다.
          if (tagId < 1) {
            const inputTag = "INSERT INTO tags(name) VALUES ( ? )";
            const [result2] = await dbcon.query(inputTag, [tag]);
            tagId = result2.insertId;
            logger.info(`[Tag] - ID: ${result2.insertId} is created`);
          }
  
          const inputTagBoard = "INSERT INTO board_tags(t_id, b_id) VALUES (?,?)";
  
          const [boardRT] = await dbcon.query(inputTagBoard, [tagId, boardId]);
  
          logger.info(`[POST] - ID: ${boardRT.insertId} is created`);
        })
      );
    }

  } catch (err) {
    logger.error(err);
    console.error(err);

    return res.status(500).send("Internal Server Error");
  } finally {
    dbcon.release();
  }

  return res.status(201).send({boardId});
};

const update = async (req, res, next) => {
  let dbcon = null;
  const id = parseInt(req.params.id, 10);
  const title = req.body.title?.trim();
  const banner = req.file || null;
  const content = req.body.content?.trim();
  const author = parseInt(req.body.author, 10);
  const date = dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss");

  logger.info(`[PUT /post/${id}] ${req.ip} is access`);

  try {
    regex.value(title, "PUT /post title");

    regex.value(content, "PUT /post content");

    regex.value(author, "PUT /post author");

    regex.length(title, 2, 45, "PUT /post title");

    regex.length(content, 3, 1000, "PUT /post content");

    regex.number(author, "PUT /post author");
    regex.number(id, "PUT /post id");
  } catch (err) {
    logger.error(`${err.name} ${err.message}`);

    if (banner !== null) {
      deleteImg(banner.key);
    }

    return res.status(400).send("DATA를 확인해주세요.").end();
  }

  try {
    dbcon = await pool.getConnection(async (conn) => conn);

    const input_data = [title, banner, content, author, date, id];

    const sql =
      "UPDATE boards SET b_title = ?, b_banner = ?, b_content = ? ,m_id = ?, b_mdate = ? WHERE b_id = ? ";

    const [result] = await dbcon.query(sql, input_data);

    if (result.affectedRows < 1) {
      return res.status(400).send("Board ID를 확인해주세요.");
    }

    logger.debug(`[POST] - ID: ${id} is updated done`);
  } catch (err) {
    logger.error(err);

    return res.status(500).send("Interal Server Error");
  } finally {
    await dbcon.release();
  }

  return res.status(204).end();
};

const destroy = async (req, res, next) => {
  let json = null;
  let dbcon = null;
  const id = parseInt(req.params.id, 10);

  logger.info(`[DELETE /post/${id}] ${req.ip} is access`);

  if (isNaN(id)) {
    return res.status(400).send("Board ID를 확인해주세요.");
  }

  try {
    dbcon = await pool.getConnection(async (conn) => conn);

    const sql = "DELETE FROM boards WHERE b_id = ?";

    const [result] = await dbcon.query(sql, [id]);

    if (result.affectedRows < 1) {
      return res.status(400).send("Board ID를 확인해주세요.");
    }

    logger.debug(`[POST] - ID: ${id} is deteled`);
  } catch (err) {
    logger.error(err);

    return res.status(500).send("Interal Server Error");
  } finally {
    await dbcon.release();
  }

  return res.status(204).end();
};

module.exports = { create, index, detail, popular, recent, update, destroy, search };
