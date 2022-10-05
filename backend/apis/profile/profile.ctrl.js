const dayjs = require("dayjs");
const pool = require("../../utils/pool");
const logger = require("../../utils/winston");
const RegexHelper = require("../../utils/RegexHelper");
const { deleteImg } = require("../../utils/multer");

//유저 상세정보 
const full = async(req, res, next) => {
    logger.info(`[GET /profile/id=${req.query.id}] ${req.ip} is accessed`);
    console.log("[full profile/id] DB pool current Count == " + pool.pool._allConnections._tail);


    console.log(req.query);

    const id = parseInt(req.query.id,10);
    let dbcon = null;
    let json = null;
    console.log(id);
    if(!id) return res.status(400).send("잘못된 파라미터");

    try {
     dbcon = await pool.getConnection(async (conn) => conn);

     const sql = 'SELECT userId,name,email,intro,image FROM members WHERE m_id=? ';
     const [result] = await dbcon.query(sql,id);
     
    console.log(result[0]);
     json = result[0];

    } catch (err) {
      logger.error(`${err.message}`);

      return res.status(500).send('Interal Server Error')

    } finally {
      await dbcon.release();
    }
    
    return res.status(200).json(json);

}

//유저 자신정보 
const info = async(req, res, next) => {
  logger.info(`[GET /profile/id=${req.query.id}/userinfo] ${req.ip} is accessed`);
  console.log("[full profile/id] DB pool current Count == " + pool.pool._allConnections._tail);


  //if(!req.session.user) return res.status(400).send('유저 정보가 존재하지 않습니다.');

  let userName = req.session.user.USER;

  

  let dbcon = null;
  let json = null;
  

  try {
   dbcon = await pool.getConnection(async (conn) => conn);

   const sql = 'SELECT name, image, userId, email ,m_id as memberId, rdate, intro  FROM members WHERE userId=?';

   const [result] = await dbcon.query(sql,userName);

   json = result[0];

  } catch (err) {
    logger.error(`${err.message}`);
    console.error(err);
    return res.status(500).send('Interal Server Error')

  } finally {
    await dbcon.release();
  }
  
  return res.status(200).json(json);

}

module.exports = { full, info }