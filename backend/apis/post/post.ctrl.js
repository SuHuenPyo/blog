const dayjs = require("dayjs");

const pool = require("../../utils/pool");
const logger = require("../../utils/winston");
const RegexHelper = require("../../utils/RegexHelper");
const { deleteImg } = require("../../utils/multer");
const { reset } = require("nodemon");

const regex = new RegexHelper();

const index = async (req, res, next) => {
  let dbcon = null;
  let json = null;

  try {
    dbcon = await pool.getConnection(async (conn) => conn);

    const sql =
      "SELECT b_id 'id', b_title 'title', b_banner 'banner', b_content 'content', m_id 'author', b_mdate 'date', b_hits 'hits', b_like 'like' FROM boards";

    const [result] = await dbcon.query(sql);

    json = result;
  } catch (err) {
    logger.error(err);

    return res.status(500).send("Internal Server Error");
  } finally {
    await dbcon.release();
  }

  return res.status(200).json(json);
};

const detail = async (req, res, next) => {
  const id = parseInt(req.params.id, 10);

  if (Number.isNaN(id)) {
    return res.status(400).send("ID를 확인해주세요.");
  }

  let dbcon = null;
  let json = null;

  try {
    dbcon = await pool.getConnection(async (conn) => conn);

    const sql =
      "SELECT b_id 'id', b_title 'title', b_banner 'banner', b_content 'content', m_id 'author', b_mdate 'date', b_hits 'hits', b_like 'like' FROM boards WHERE b_id = ?";

    const [result] = await dbcon.query(sql, [id]);

    if (!result[0]) {
      return res.status(400).send("ID를 확인해주세요.");
    }

    const author_id = result[0].author;

    const sql2 = "SELECT name , image 'profile' FROM members WHERE m_id = ?";

    const [author_info] = await dbcon.query(sql2,[author_id]);

    const board_id = result[0].id;

    const findTagsId = "SELECT t_id FROM board_tags WHERE b_id = ?";

    const [TagsId] = await dbcon.query(findTagsId,[board_id]);

    const tags = await Promise.all(TagsId.map(async ( tagId, index)=>{

      const findTag = "SELECT name FROM tags WHERE t_id = ?";

      const [tag] = await dbcon.query(findTag, [tagId.t_id]);

      return tag[0].name
    }))


    json = result[0];

    json.author = author_info[0];

    json.tags = tags;

  } catch (err) {
    logger.error(err);

    return res.status(500).send("Interal Server Error");

  } finally {
    await dbcon.release();
  }

  return res.status(200).json(json);
};

const popular = async (req, res, next) => {
    let dbcon;
    let json;

    try {
        dbcon = await pool.getConnection(async (conn) => conn);
        
        const sql = "SELECT b_id 'id', b_title 'title', b_banner 'banner', b_content 'content', m_id 'author', b_mdate 'date', b_hits 'hits', b_like 'like' FROM boards ORDER BY b_hits DESC, b_like DESC";

        const [result] = await dbcon.query(sql);

        json = result;

    } catch (err) {
        logger.error(err);

        return res.status(500).send("Interal Server Error");
    } finally {
        await dbcon.release();
    }

    return res.status(200).json(json);
}

const recent = async (req, res, next) => {
    let dbcon;
    let json;

    try {
        dbcon = await pool.getConnection(async (conn) => conn);
        
        const sql = "SELECT b_id 'id', b_title 'title', b_banner 'banner', b_content 'content', m_id 'author', b_mdate 'date', b_hits 'hits', b_like 'like' FROM boards ORDER BY b_rdate DESC";

        const [result] = await dbcon.query(sql);

        json = result;

    } catch (err) {
        logger.error(err);

        return res.status(500).send("Interal Server Error");
    } finally {
        await dbcon.release();
    }

    return res.status(200).json(json);
}

const create = async (req, res, next) => {
  let dbcon = null;
  const title = req.body.title?.trim();
  const banner = req.file || null;
  const content = req.body.content?.trim();
  const author = parseInt(req.body.author, 10);
  const tags = req.body.tags ?? [];
  const date = dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss");
  const hits = 0;
  const like = 0;



  try {
    regex.value(title, "[POST /post title]");

    regex.value(content, "[POST /post content]");

    regex.value(author, "[POST /post content]");

    regex.length(title, 2, 45, "[POST /user title]");

    regex.length(title, 3, 1000, "[POST /user content]");

    regex.number(author, "[POST /post author]");

  } catch (err) {
    logger.error(`[${err.name}] ${err.message}`);

    if (banner !== null) {
      deleteImg(banner.key);
    }

    return res.status(400).send("DATA를 확인해주세요.").end();
  }

 
  try {
    const input_data = [
      title,
      banner?.location || null,
      content,
      date,
      date,
      hits,
      like,
      author,
    ];

    dbcon = await pool.getConnection(async (conn) => conn);

    const sql =
      "INSERT INTO boards( b_title, b_banner, b_content, b_rdate, b_mdate, b_hits, b_like, m_id ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

    const [boardRT] = await dbcon.query(sql, input_data);

    const boardId = boardRT.insertId;

    // tag 처리
    await tags.forEach( async(tag,i)=>{
      let tagId;

      const findId = "SELECT t_id FROM tags WHERE name = ?"

      const [result1] = await dbcon.query(findId, [tag]);

      tagId = result1[0].tagId;

      if(!tagId[0]){
        const inputTag = "INSERT INTO tags(name) VALUES (?)"

        const [result2] = await dbcon.query(inputTag,[tag]);

        tagId = result2.insertId;
      }

    const inputTagBoard = "INSERT INTO board_tags(t_id, b_id) VALUES (?,?)"


    await dbcon.query(inputTagBoard, [tagId,boardId]);

    });

  } catch (err) {
    logger.error(err);

    return res.status(500).send("Internal Server Error");
  } finally {

    dbcon.release();
  }

  return res.status(201).end();
};

module.exports = { create, index, detail,popular,recent };
