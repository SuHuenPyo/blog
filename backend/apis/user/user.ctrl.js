const dayjs = require("dayjs");

const pool = require("../../utils/pool");
const logger = require("../../utils/winston");
const RegexHelper = require("../../utils/RegexHelper");
const { deleteImg } = require("../../utils/multer")

const express = require("express");
const router = express.Router();


const regex = new RegexHelper;
//회원가입
const create = async (req, res, next) => {
    logger.info(`[POST /USER/CREATE] ${req.ip} is access`);
    // 회원가입
    let json = null;
    let dbcon = null;

    const id = req.body.id?.trim();
    const pw = req.body.pw?.trim(); 
    const name = req.body.name?.trim();
    const email = req.body.email?.trim();
    const authCode = req.body.authCode?.trim();

    let intro = req.body.intro?.trim() || null;
    let date = dayjs(new Date).format('YYYY-MM-DD HH:mm:ss');
    let img = req.file || null;


    // 정규식 검사
    try {
        // 값
        regex.value(id,"[POST /user ID]");
        regex.value(pw,"[POST /user PW]");
        regex.value(name,"[POST /user NAME]");
        regex.value(email,"[POST /user EMAIL]");

        //길이
        regex.length(id,3,50,"[POST /user ID]");
        regex.length(pw,5,50,"[POST /user PW]");
        regex.length(name,2,45,"[POST /user NAME]");
        regex.length(email,3,50,"[POST /user EMAIL]");

        if(intro !== null){
            regex.length(intro,0,100,"[POST /user INTRO]");
        }

        //정규식
        regex.idTest(id,"[POST /user ID]");
        regex.pwTest(pw,"[POST /user PW]");
        regex.email(email,"[POST /user EMAIL]");

    } catch(err){

        logger.error(`[${err.name}] ${err.message}`);

        if(img !== null){
          deleteImg(img.key);
        }

        return res.status(400).send('DATA를 확인해주세요.').end();
    }
    
    try {

      dbcon = await pool.getConnection(async (conn) => conn);

      if(!authCode) return res.status(400).send("올바른 인증코드를 입력해주세요!");

      //[result] = await dbcon.query("SELECT * FROM auth WHERE auth_done=1 AND auth_email=?",[email]);
      [result] = await dbcon.query("SELECT * FROM members WHERE email=?",[email]);

      
      console.log(JSON.stringify(result) );

      if(result[0]){
        return res.status("400").send("이미 가입된 이메일 입니다.");
      }
      [result] = await dbcon.query("SELECT auth_code from auth WHERE auth_email = ?", [email]);

      if(result[0]?.auth_code != authCode){
        
        return res.status(400).send("올바른 인증코드를 입력해주세요!");
      }
        
      logger.info(`[POST /user] AuthCode ${req.ip} 인증완료`);
      


      const input_data = [id, pw, name, email, intro, date, false, img?.location || null];

      
  
      const input_sql =
        'INSERT INTO members(userId,password,name,email,intro,rdate,auto,image) VALUES (?,?,?,?,?,?,?,?)';
  
      const [input_result] = await dbcon.query(input_sql, input_data);
      
      const [get_result] = await dbcon.query(
        "SELECT name FROM members WHERE m_id=?",
        [input_result.insertId]
      );
      json = await get_result[0];

      
      //마지막으로 auth_done을 true로 설정해주고 해당계정은 이메일인증과 함께 가입되있음을 저장한다.
      await dbcon.query("UPDATE auth SET auth_done = 1 WHERE auth_email = ?", [email]);
      
      logger.info(`[POST /user] AuthCode ${req.ip} 가입완료. auth_done=1`);

    } catch (err) {
      console.error(err);
      logger.error(err);
      return res.status(500).send("Internal Server Error");
    } finally {
      await dbcon.release();
    }
    
    return res.status(201).json(json);
}
//로그인
const signIn = async (req, res, next) => {
  logger.info(`[POST /USER/SIGNIN] ${req.ip} is access`);

  console.log(req.body);

  let json = null;
  let dbcon = null;

  console.log("[full post detail] DB pool current Count == " + pool.pool._allConnections._tail);

// 정규식 검사
  try {

    const userId = req.body.id?.trim();
    const userPw = req.body.pw?.trim(); 

    // 값
    regex.value(userId,"[POST /user ID]");
    regex.value(userPw,"[POST /user PW]");

    //길이
    regex.length(userId,3,50,"[POST /user ID]");
    regex.length(userPw,3,50,"[POST /user PW]");

    //정규식
    //regex.idTest(userId,"[POST /user ID]");
    //regex.pwTest(userPw,"[POST /user PW]");

    logger.info(`[POST /user/SignIn]  ${req.ip}이(가) 정규식을 통과함`);

    dbcon = await pool.getConnection(async (conn) => conn);
    [result] = await dbcon.query("SELECT COUNT(*) as cnt FROM members WHERE userId=? AND password=?",[userId, userPw]);


    if(result[0].cnt!=1){
      logger.info(`[POST /user/SignIn]  ${req.ip}이(가) 아이디 또는 패스워드를 틀림`);
      throw new Error('검증실패');
    }
    logger.info(`[POST /user/SignIn] ${req.ip} 로그인 성공`);
    

  } catch(err){
    logger.error(`[${err.name}] ${err.message}`);
    return res.status(400).send('아이디 또는 패스워드가 틀리거나 존재하지 않습니다.').end();
  } finally{
    if(dbcon) await dbcon.release();
  }

  req.session.user = {
    'USER' : req.body.id
  };
  req.session.save();
  
  console.log(req.session)

  return res.status(200).json("로그인에 성공했습니다.");
}

//로그아웃  
const out = async (req, res, next) => {
  logger.info(`[POST /USER/OUT] ${req.ip} is access`);
  console.log("[full post detail] DB pool current Count == " + pool.pool._allConnections._tail);

  if(req.session.user){
    console.log('logOut : ' + req.session.user.USER);

    req.session.destroy(err=>{
      if(err) throw err;
      console.log('세션 삭제후 로고아웃됨');
      return res.status(200).json({text: '성공적으로 로그아웃 되었습니다.'});
    });
  }else{
    console.log('로그인상태아님');
    return res.status(400).json({text:'로그인 상태가 아니거나 시스템 에러가 발생했습니다.'});
  }

}
//세션검사(클라이어트 측에서 쓸것, 서버에서 쓸 미들웨어 아님) 
const current = async (req, res, next) => {
  logger.info(`[POST /USER/CURRENT] ${req.ip} is access`);
  console.log("[full post detail] DB pool current Count == " + pool.pool._allConnections._tail);

  if(req.session.user){
    return res.status(200).send("유저정보가 있습니다.") // 해당 세션값에 대한 DB검증은 수행하지 않는다 (클라이언트 전용)

  }else{
    console.log('로그인상태아님');
    return res.status(400).send("유저 세션정보가 없습니다.");
  }

}


/**
 * 유저 로그인 아이디 업데이트
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 * requirement : userLoginId(현재 로그인 아이디), newUserId(새로운 로그인아이디), memberId(m_id)
 */
const updateId = async (req, res, next) => {

  logger.info(`[PUT /USER/UPDATEID] ${req.ip} is access`);


  const sessionUserId = req.session.user.USER;
  const newUserId = req.body.newUserId?.trim();
  const memberId = req.body.memberId;


  console.log(req.body);

  if(sessionUserId != req.body.userLoginId) return res.status(401).send("잘못된 인증정보 입니다.");
   
  let dbcon = null;


   // 정규식 검사
   try {
       // 값
       regex.value(newUserId,"[PUT /user newUserId]");
       regex.length(newUserId,3,50,"[PUT /user newUserId]");
       regex.idTest(newUserId,"[PUT /user newUserId]");

   } catch(err){
       logger.error(`[${err.name}] ${err.message}`);
       return res.status(400).send('올바른 값을 입력 해주세요.').end();
   }
   
   try {

     dbcon = await pool.getConnection(async (conn) => conn);

     result = await dbcon.query("UPDATE members SET userId=? WHERE m_id=?",[newUserId, memberId]);
       
     logger.info(`[PUT /user/updateId] updateId ${req.ip} 유저아이디 변경완료`);
     
   } catch (err) {
     console.error(err);
     logger.error(err);
     return res.status(500).send("Internal Server Error");

   } finally {
     if(dbcon) await dbcon.release();
   }
   req.session.user.USER = newUserId;
   return res.status(201).send("변경완료");
}
/**
 * 유저 닉네임 업데이트 (이름) 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 * 
 * requirements :userLoginId(현재 로그인 아이디), newName(바꿀이름), memberId(m_id)
 */
const updateNickname = async (req, res, next) => {
  logger.info(`[PUT /USER/updateNickname] ${req.ip} is access`);

  const sessionUserId = req.session.user.USER;
  const newName = req.body.newName?.trim();
  const memberId = req.body.memberId;

  if(sessionUserId != req.body.userLoginId) return res.status(401).send("잘못된 인증정보 입니다.");
   
  let dbcon = null;


   // 정규식 검사
   try {
       regex.value(newName,"[PUT /user newName]");
       regex.length(newName,2,45,"[PUT /user newName]");

   } catch(err){
       logger.error(`[${err.name}] ${err.message}`);
       return res.status(400).send('올바른 값을 입력 해주세요.').end();
   }
   
   try {
     dbcon = await pool.getConnection(async (conn) => conn);

     result = await dbcon.query("UPDATE members SET name=? WHERE m_id=?",[newName, memberId]);
       
     logger.info(`[PUT /user/updateNickname] updateNickname ${req.ip} 유저이름 변경완료`);
     
   } catch (err) {
     console.error(err);
     logger.error(err);
     return res.status(500).send("Internal Server Error");

   } finally {
     if(dbcon) await dbcon.release();
   }
   return res.status(201).send("변경완료");

}
/**
 * 유저 이메일 업데이트 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 * requirements : userLoginId(현재 로그인 아이디), newEmail(바꿀이메일), memberId(m_id)
 */
const updateEmail = async (req, res, next) => {
  logger.info(`[PUT /USER/updateEmail] ${req.ip} is access`);

  
  const sessionUserId = req.session.user.USER;
  const newEmail = req.body.newEmail?.trim();
  const memberId = req.body.memberId;

  if(sessionUserId != req.body.userLoginId) return res.status(401).send("잘못된 인증정보 입니다.");
   
  let dbcon = null;


   // 정규식 검사
   try {

       regex.value(newEmail,"[PUT /user newEmail]");
       regex.length(newEmail,3,50,"[PUT /user newEmail]");
       regex.email(newEmail,"[PUT /user newEmail]");

   } catch(err){
       logger.error(`[${err.name}] ${err.message}`);
       return res.status(400).send('올바른 값을 입력 해주세요.').end();
   }
   
   try {
     dbcon = await pool.getConnection(async (conn) => conn);

     result = await dbcon.query("UPDATE members SET email=? WHERE m_id=?",[newEmail, memberId]);
       
     logger.info(`[PUT /user/newEmail] newEmail ${req.ip} 유저이메일 변경완료`);
     
   } catch (err) {
     console.error(err);
     logger.error(err);
     return res.status(500).send("Internal Server Error");

   } finally {
     if(dbcon) await dbcon.release();
   }
   return res.status(201).send("변경완료");

}
/**
 * 패스워드 업데이트
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 * requirements :userLoginId(현재 로그인 아이디), newPassword(새로운 패스워드), memberId(m_id) 
 */
const updatePassword = async (req, res, next) => {
  logger.info(`[PUT /USER/updatePassword] ${req.ip} is access`);

  
  const sessionUserId = req.session.user.USER;
  const newPassword = req.body.newPassword?.trim();
  const memberId = req.body.memberId;

  if(sessionUserId != req.body.userLoginId) return res.status(401).send("잘못된 인증정보 입니다.");
   
  let dbcon = null;


   // 정규식 검사
   try {
       regex.value(newPassword,"[PUT /user newPassword]");
       regex.length(newPassword,5,50,"[PUT /user newPassword]");
       regex.pwTest(newPassword,"[PUT /user newPassword]");

   } catch(err){
       logger.error(`[${err.name}] ${err.message}`);
       return res.status(400).send('올바른 값을 입력 해주세요.').end();
   }
   
   try {
     dbcon = await pool.getConnection(async (conn) => conn);

     result = await dbcon.query("UPDATE members SET password=? WHERE m_id=?",[newPassword, memberId]);
       
     logger.info(`[PUT /user/newPassword] newPassword ${req.ip} 유저패스워드 변경완료`);
     
   } catch (err) {
     console.error(err);
     logger.error(err);
     return res.status(500).send("Internal Server Error");

   } finally {
     if(dbcon) await dbcon.release();
   }
   return res.status(201).send("변경완료");

}
/**
 * 유저 프로필사진 업데이트
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 * requirements : userLoginId(현재 로그인 아이디), newImage(바꿀 프로필사진(URL)), memberId(m_id)
 */
const updateImage = async (req, res, next) => {
  logger.info(`[PUT /USER/updateImage] ${req.ip} is access`);

  
  const sessionUserId = req.session.user.USER;
  const newImage = req.body.newImage[0].trim();
  const memberId = req.body.memberId;

  console.log(req.body);

  if(sessionUserId != req.body.userLoginId) return res.status(401).send("잘못된 인증정보 입니다.");
   
  let dbcon = null;


   // 정규식 검사
   try {
      if(!newImage){
        throw Error("이미지 없어");
      }
   } catch(err){
       logger.error(`[${err.name}] ${err.message}`);
       return res.status(400).send('올바른 값을 입력 해주세요.').end();
   }
   
   try {
     dbcon = await pool.getConnection(async (conn) => conn);

     result = await dbcon.query("UPDATE members SET image=? WHERE m_id=?",[newImage, memberId]);
       
     logger.info(`[PUT /user/newImage] newImage ${req.ip} 유저이미지 변경완료`);
     
   } catch (err) {
     console.error(err);
     logger.error(err);
     return res.status(500).send("Internal Server Error");

   } finally {
     if(dbcon) await dbcon.release();
   }
   return res.status(201).send("변경완료");

}
/**
 * 유저 자기소개 업데이트
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 * requirements : userLoginId(현재 로그인 아이디), newIntro(바꿀 자기소개 string), memberId(m_id)
 */
const updateIntro = async (req, res, next) => {
  logger.info(`[PUT /USER/updateIntro] ${req.ip} is access`);

  const sessionUserId = req.session.user.USER;
  const newIntro = req.body.newIntro?.trim();
  const memberId = req.body.memberId;

  if(sessionUserId != req.body.userLoginId) return res.status(401).send("잘못된 인증정보 입니다.");
   
  let dbcon = null;


   // 정규식 검사
   try { 

       if(newIntro !== null){
           regex.length(newIntro,0,100,"[PUT /user INTRO]");
       }


   } catch(err){
       logger.error(`[${err.name}] ${err.message}`);
       return res.status(400).send('올바른 값을 입력 해주세요.').end();
   }
   
   try {
     dbcon = await pool.getConnection(async (conn) => conn);

     result = await dbcon.query("UPDATE members SET intro=? WHERE m_id=?",[newIntro, memberId]);
       
     logger.info(`[PUT /user/newIntro] newIntro ${req.ip} 유저 자기소개 변경완료`);
     
   } catch (err) {
     console.error(err);
     logger.error(err);
     return res.status(500).send("Internal Server Error");

   } finally {
     if(dbcon) await dbcon.release();
   }
   return res.status(201).send("변경완료");

}

  module.exports = {
      create,
      signIn,
      out,
      current,
      updateId,
      updateNickname,
      updateEmail,
      updatePassword,
      updateImage,
      updateIntro,

      
  }