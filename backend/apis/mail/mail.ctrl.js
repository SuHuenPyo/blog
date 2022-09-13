const logger = require("../../utils/winston");
const RegexHelper = require("../../utils/RegexHelper");
const nodemailer = require('nodemailer');
const pool = require("../../utils/pool");
const {AUTH_MAIL} = require('../../configs/_config.json');

//메일 인증번호 전송
const AuthCode = async(req, res, next) => {
  logger.info(`[GET /Mail] AuthCode ${req.ip} is access`);
  
  let dbcon = null;
  let RandAuthCode = null;
  let transporter = null;

  try {

    
    dbcon = await pool.getConnection(async (conn) => conn);

    const email = req.query.email?.trim();

    console.log(req.query)

    if(!email){
      return res.status("400").json("이메일이 존재하지 않습니다.");
    }

    console.log("aaaa : "+email);
    let result = await dbcon.query("SELECT COUNT(*) as cnt FROM auth WHERE (auth_done=1 AND auth_email=?)",[email]);

    if(result[0].cnt > 0){
      return res.status("400").json("이미 가입된 계정입니다.");
    }
    

    RandAuthCode = await((digit)=>{return Math.random().toString(36).slice(2).substring(0,digit)})(6); // 나중에 helper로 따로 빼기

    //메일 객체생성
    transporter = nodemailer.createTransport({
      service:'gmail',
      auth:{
          user: AUTH_MAIL.email,
          pass: AUTH_MAIL.appPass
      }
    });

    //메일 옵션
    let mailOptions = {
      from: "miary Auth",
      to: email,
      subject : '[마이어리 메일 인증번호]',
      html: '<h1>Miary Auth Code 입니다.</h1> <h2> 인증번호 : '+ RandAuthCode +' </h2> <h2>절대 타인에게 알리지 마세요.</h2>' 
    }

    let sql = 'SELECT COUNT(*) as cnt FROM miary.auth WHERE auth_email = ?';
    [result] = await dbcon.query(sql, [email]);

    if(result[0].cnt > 0){
      console.log("인증요청이 이미 있음 재요청함");

      sql = 'DELETE FROM miary.auth WHERE auth_email=?';
      [result] = await dbcon.query(sql, [email]);
    }

    transporter.sendMail(mailOptions, (err, info) => {
      if(err) console.error(err);
      else console.log("Email 전송성공  Auth Code : " + RandAuthCode);
    });


    console.log(email)
    sql = 'INSERT INTO miary.auth(auth_email, auth_code, auth_done) VALUES(?, ?, ?)';
    [result] = await dbcon.query( sql, [email, RandAuthCode, 0]);

  } catch (err) {
    logger.error(err);
    console.log(err);
    return res.status(500).send("서버 에러");
  } finally {
    if(dbcon) await dbcon.release();
    if(transporter) await transporter.close();
  }

  return res.status(200).json(RandAuthCode);
};

//메일 인증번호 확인
const VerifyCode = async( req, res, next)=>{
  logger.info(`[POST /Mail] AuthCode ${req.ip} is access`);

  let dbcon, result, transporter = null;
  const authCode = req.body.authCode?.trim();
  const email = req.body.email?.trim();

  if(!authCode) return res.status(400).json("올바른 인증코드를 입력해주세요!");

  try{
    dbcon = await pool.getConnection(async (conn) => conn);

    result = await dbcon.query("SELECT * FROM auth WHERE auth_done=1 AND auth_email=?",[email]);

    if(result){
      return res.status(400).json("이미 가입된 계정입니다.");
    }


    [result] = await dbcon.query("SELECT auth_code from auth WHERE auth_email = ?", [email]);
    
    if(result[0].auth_code == authCode){
      await dbcon.query("UPDATE auth SET auth_done = 1 WHERE auth_email = ?", [email]);
    }else{
      return res.status(400).json("올바른 인증코드를 입력해주세요!");
    }

  }catch(err){
    logger.error(err);
    return res.status(500).json("internal error");

  }finally{
    if(dbcon) await dbcon.release();
  }

  logger.info(`[POST /Mail] AuthCode ${req.ip} 인증완료`);
  return res.status(200).json("인증이 완료 되었습니다.");

}

module.exports = { AuthCode, VerifyCode };