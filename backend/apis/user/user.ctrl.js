const dayjs = require("dayjs");

const pool = require("../../utils/pool");
const logger = require("../../utils/winston");
const RegexHelper = require("../../utils/RegexHelper");
const { deleteImg } = require("../../utils/multer")

const regex = new RegexHelper;

const create = async (req, res, next) => {
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
        regex.length(pw,3,50,"[POST /user PW]");
        regex.length(name,3,45,"[POST /user NAME]");
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

      if(!authCode) return res.status(400).json("올바른 인증코드를 입력해주세요!");

      [result] = await dbcon.query("SELECT * FROM auth WHERE auth_done=1 AND auth_email=?",[email]);

      if(result[0]){
        return res.status("400").json("이미 가입된 이메일 입니다.");
      }
      [result] = await dbcon.query("SELECT auth_code from auth WHERE auth_email = ?", [email]);

      if(result[0].auth_code != authCode){
        return res.status(400).json("올바른 인증코드를 입력해주세요!");
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
      logger.error(err);
      return res.status(500).send("Internal Server Error");
    } finally {
      await dbcon.release();
    }
  
    return res.status(201).json(json);
  }

  module.exports = {
      create,
  }