/**
 * @author Shun
 * @email vytngms@gmail.com
 * @create date 2022-09-18 17:31:46
 * @modify date 2022-10-03 23:25:56
 * @desc [세션 검증을 위한 미들웨어 ]
 */

 const pool = require("./pool");
 const logger = require('./winston');

//사용자의 세션정보를 기반으로 b_id를 가져온다. (존재하지 않을경우 401)
const verifySession = async(req, res, next) => {

    console.log("[verifySession] DB pool current Count == " + pool.pool._allConnections._tail);

    
    console.log(req.session);
    if(!req.session.user?.USER){
        return res.status(401).send("클라이언트의 세션정보가 없거나 일치하지 않습니다.")
    }
    console.log("유저 접속함  = " + req.session.user.USER)

    let userName = req.session.user?.USER;
    let dbcon = null;
    let sql = null;

    try{
        dbcon = await pool.getConnection(async (conn) => conn);
        sql = 'SELECT m_id FROM members WHERE userId=?';
        let [result] = await dbcon.query(sql, userName);

        if(!result[0]){
            return res.status(401).send("클라이언트의 세션정보가 없거나 일치하지 않습니다.")
        }
        req.body.userId = result[0]?.m_id;
        
    }catch(err){
        logger.error(err.message);
        console.error(err);
    }finally{
        if(dbcon) await dbcon.release();
    }

    next();
}

module.exports= {verifySession}