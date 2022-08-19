const logger = require("../../utils/winston");
const RegexHelper = require("../../utils/RegexHelper");
const nodemailer = require('nodemailer');
const pool = require("../../utils/pool");
const {AUTH_MAIL} = require('../../configs/_config.json');

const AuthCode = async (req, res, next) => {
  logger.info(`[GET /Mail] ${req.ip} is access`);
  
  let dbcon = null;
  let json = null;
  let RandAuthCode = null;

  try {
    dbcon = await pool.getConnection(async (conn) => conn);

    const {email} = req.body.email?.trim();

    let RandAuthCode = await((digit)=>{return Math.random().toString(36).slice(2).substring(0,digit)})(6); // 나중에 helper로 따로 빼기

    //메일 객체생성
    let transporter = nodemailer.createTransport({
      service:'gmail',
      auth:{
          user: AUTH_MAIL.email,
          pass: AUTH_MAIL.pass
      }
    });

    //메일 옵션
    let mailOptions = {
      from: "miary Auth",
      to: email,
      subject : '[마이어리 메일 인증번호]',
      html: '<h1>Miary Auth Code 입니다.</h1> <h2> 인증번호 : '+ RandAuthCode +' </h2> <h2>절대 타인에게 알리지 마세요.</h2>' 
    }

    let [result] = await dbcon.query("SELECT COUNT(*) as cnt FROM miary.auth WHERE auth_email=?", email);



    const sql =
      "SELECT b_id 'id', b_title 'title', b_banner 'banner', b_content 'content', m_id 'author', b_mdate 'date', b_hits 'hits', b_like 'like' FROM boards";

    

    json = result;
  } catch (err) {
    logger.error(err);
    console.log(err);
    return res.status(400).send("Internal Server Error");
  } finally {
    await dbcon.release();
  }

  return res.status(200).json(RandAuthCode);
};