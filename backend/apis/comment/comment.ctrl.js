/**
 * @author Shun
 * @email vytngms@gmail.com
 * @create date 2022-09-18 17:12:39
 * @modify date 2022-09-25 01:53:38
 * @desc [댓글 기능을 위한 API]
 */
const dayjs = require("dayjs");

const pool = require("../../utils/pool");
const logger = require("../../utils/winston");
const RegexHelper = require("../../utils/RegexHelper");
const { deleteImg } = require("../../utils/multer");
const { reset } = require("nodemon");
const { current } = require("../user/user.ctrl");
const { pagenation } = require('../../utils/PagenationHelper');




const regex = new RegexHelper();




//댓글 생성하기 POST
//게시판 id, 내용 ,그룹id(그룹아이디가 없다면 신규그룹생성)
const create = async (req, res, next) => {
  logger.info(`[POST /comment/] ${req.ip} / ${req.session.user} is access`);
  console.log("[/Comment/ /POST] DB pool current Count == " + pool.pool._allConnections._tail);

  //initialize
  let dbcon = null;
  let sql = null;
  let result = null;

  //필요한 정보
  const userId = req.body.userId;
  const boardId = req.body.boardId;
  const content = req.body.content;
  let groupId = req.body.groupId || null;
  let ToId = req.body.ToId || null;

  console.log(req.body);


  //컨텐트 정규식 검사 해줘야함 
  dbcon = await pool.getConnection(async(conn)=> conn);

  if(req.body.groupId == null){
    //새로운 그룹ID가 몇번이 될건지 찾아서 넣어주기 
    console.log("그룹아이디가 존재하지 않습니다. 신규댓글로 등록합니다.");
    try{
      
      console.log(boardId);
      
      sql = `SELECT c_group FROM comments WHERE b_id = ? ORDER BY c_group DESC LIMIT 0,1`;
      [result] = await dbcon.query(sql, boardId);


      //console.log(` 결고ㅓㅏ값 ${JSON.stringify(result) }`);

      
      groupId = result[0] != undefined ? (parseInt(result[0].c_group) + 1) : 0 ;
      

    }catch(err){
      console.error(err);
      logger.error(err);
      if(dbcon) await dbcon.release();
      return res.status(500).send("Internal server Error");
    }
  } else{
    groupId = req.body.groupId;
  }

  try{

    //console.log(`boardId = ${boardId}   userId = ${userId}   groupId = ${groupId}   content = ${content}   ToId = ${ToId}   `);
    let sqlParam = [];
    if(ToId != null)
    { 

      sql = 'INSERT INTO comments(b_id, m_id, c_group, c_content, c_to_message) VALUES(?, ?, ?, ?, ?) ';
      sqlParam = [boardId, userId, groupId, content, ToId];
    }else{
      sql = 'INSERT INTO comments(b_id, m_id, c_group, c_content) VALUES(?, ?, ?, ?) ';
      sqlParam = [boardId, userId, groupId, content];
    }
    await dbcon.query(sql, sqlParam);

  }catch(err){
    console.error(err);
    logger.error(err);
  }finally{
    if(dbcon) await dbcon.release();
  }
  return res.status(200).send("정상적으로 처리됨");
};


/**
 * 댓글 가져오기 API
 * /comment/ GET
 * 
 * @param {*} req .query = {boardId, page(몇페이지볼건지), rows(몇개씩 볼건지)}
 * @param {*} res 
 * @param {*} next 
 * @returns {object} {'result', 'pageEnd'}  result = {commentId boardId memberId  Name groupId Image Content toMsg commentLike rDate} 
 * 배열 인덱스마다 댓글 그룹을 모아서 보내준다. 
 */
const index = async (req, res, next) => {
  logger.info(`[GET /comment/] ${req.ip} / ${req.session.user} is access`);
  console.log("[/Comment/ /GET] DB pool current Count == " + pool.pool._allConnections._tail);

  //initialize
  let dbcon = null;
  let sql = null;
  let result = null;
  const page = req.query.page || 1; //보내줄 해당 페이지 넘버. query로 값이 넘어 오지 않으면 맨처음 넘버 1로 보내줌
  const rows = req.query.rows || 5; //페이지당 요청 그룹(댓글그룹) 개수
  let totalCount = null;            //현제 DB에 저장되어있는 총 그룹개수
  let pagenationResult = null;
  let json = null;                  //전달해줄 결과 

  //필요한 정보
  const boardId = req.query.boardId;
  

  console.log("aaaaaaaaaaaaaaaaaaaaaaaa" + page);


  
  if(!boardId){
    return res.status(401).send("잘못된 요청입니다.");
  }



  //페이지 계산
  try{
    //1. 그룹개수(rows) 개수와 몇개가져올지 파악 
    dbcon = await pool.getConnection(async(conn)=> conn);
    sql = `SELECT COUNT(DISTINCT c_group) as cnt FROM comments WHERE b_id = ?`;
    
    [result] = await dbcon.query(sql, boardId);
    
    console.log(result)

    totalCount = result[0].cnt;
    //페이지 량 계산 
    pagenationResult = pagenation(totalCount, page, rows);

    console.log(pagenationResult); 

  }catch(err){
    console.error(err);
    logger.error(err);
    if(dbcon) await dbcon.release();
    return res.status(500).send('Internal Server Error! ');
  }
  try{
    sql = `
      SELECT c.c_id as commentId, c.b_id as boardId, c.m_id as memberId, (select m_id from boards where b_id=?) as ownerId, m.name as Name, c.c_group as groupId, m.image as Image, c.c_content as Content, c.c_to_message as toMsg, c.c_like as commentLike, 
      DATE_FORMAT(c.c_rdate,'%Y-%m-%d %H:%i:%s')as rDate
      FROM comments as c , members as m WHERE (b_id=? AND (c.m_id=m.m_id) AND(c_group between ? and ?)) order by groupId DESC , rDate ASC
    `;

    //총개수로 제한을 하는게 아닌 그룹개수로 제한하기때문에 between으로 그룹 N개의 모든 댓글을 출력해줘야한다.역순으로
    //역순 => 우선순위 1.그룹역순 내림차순(최신그룹이 최상단 페이지넘버1번으로), 2. 그룹내부 댓글들 오름차순(그룹속에서 최신댓글이 밑으로 가게)
    [result] = await dbcon.query(sql, [boardId,boardId, (pagenationResult.totalCount - (pagenationResult.offset+5)), pagenationResult.totalCount - pagenationResult.offset-1 ]);
    console.log((pagenationResult.totalCount - (pagenationResult.offset+5)), pagenationResult.totalCount - pagenationResult.offset-1 );
    //offset = 
    //console.log(pagenationResult.offset , pagenationResult.offset + pagenationResult.listCount-1);

    json = []; // 값을 그룹별로 모아주기전에 비워준다. 

    

    let SordGroupId = result[0]?.groupId;
    let temp = [];
    if(result.length){

      for (const idx in result) {
        if(result[idx].groupId == SordGroupId){
          
          temp.push(result[idx]);
        }else{
          json.push(temp);
          SordGroupId = result[idx].groupId;
          temp=[];
          temp.push(result[idx]);
        }
      }
      if(temp) json.push(temp);
      
    }


  //console.log(json);

  }catch(err){
    console.error(err);
    logger.error(err);
    if(dbcon) await dbcon.release();
    return res.status(500).send("Internal Server Error!");
  }finally{
    if(dbcon) dbcon.release();
  }
  
  //console.log(result);

  return res.status(200).send({'result':json, 'pageEnd': pagenationResult.totalPage});
};


module.exports = { create, index };
