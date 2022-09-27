const express = require("express");
const app = module.exports = express();
const cors = require("cors");
const port = 3300;

//router
const user    = require("./apis/user/index");
const post    = require("./apis/post/index");
const image   = require("./apis/image/index");
const profile = require("./apis/profile/index");
const mail    = require("./apis/mail/index");
const comment = require("./apis/comment/index");

// modules
const { swaggerUI, specs } = require("./utils/swagger");
const logger = require("./utils/winston");

//session
const session = require('express-session');
const cookieParser = require("cookie-parser");
const MySQLStore = require("express-mysql-session");
const sessionConfig = require('./configs/_config.json').MYSQL_SESSION_OPTION;
const mysql = require("mysql2/promise");

const https = require('https');
const fs = require('fs');


const httpsPort = 7799;

try {
  const httpsOptions = {
    ca: fs.readFileSync('./api/certification/fullchain.pem'),
    key: fs.readFileSync(path.resolve(process.cwd(), './api/certification/privkey.pem'), 'utf8').toString(),
    cert: fs.readFileSync(path.resolve(process.cwd(), './api/certification/cert.pem'), 'utf8').toString(),
  };

  HTTPS.createServer(httpsOptions, app).listen(httpsPort, () => {
    console.log(`[HTTPS] Soda Server is started on port ${colors.cyan(httpsPort)}`);
  });
} catch (error) {
  console.log('[HTTPS] HTTPS 오류가 발생하였습니다. HTTPS 서버는 실행되지 않습니다.');
  console.log(error);
}

app.set("trust proxy", 1);




const options={
  host:     sessionConfig.HOST,
  port:     sessionConfig.PORT,
  user:     sessionConfig.USER,
  password: sessionConfig.PASSWORD,
  database: sessionConfig.DATABASE,
  clearExpired: true,                 //만료된 세션 자동제거 
  checkExpirationInterval: 10000,     //자동제거할 Interval  단위 ms 
  expiration: 10000,
  connectionLimit: 1, //계정 동시접속을 1명으로 제한한다. 
};


const secretKey = 'S2cre2t';
app.use(cookieParser(secretKey));
const MySQLStoreSession = MySQLStore(session);
const connection = mysql.createPool(options);

const sessionStore = new MySQLStoreSession({}, connection);

app.use(session({
  key: 'LoginSession',
  secret: 'Secret',
  store: sessionStore,
  resave: false,
  saveUninitialized: true, 
  // cookie: {
  //   maxAge: 60*60*1000*6
  // },
  rolling: true, // 새로고침이나 페이지 이동시 쿠키 만료일 갱신

}));





app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD", "DELETE"],
  })
); // cors 해결
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


/**
 * @swagger
 * tags:
 *   name: Users
 *   description: 유저 추가 수정 삭제 조회
 */

app.use("/user", user);

/**
 * @swagger
 * tags:
 *   name: Post
 *   description: 글 추가 수정 삭제 조회
 */

app.use("/post", post);

app.use("/profile", profile);
app.use("/comment", comment)

/**
 * @swagger
 * tags:
 *   name: Image
 *   description: 글 작성시 이미지 번환
 */

app.use("/images", image);
app.use("/mail", mail);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));



app.listen(port, () => {
  logger.info("-------------------");
  logger.info(" SERVER IS RUNNING ");
  logger.info("-------------------");
});

module.exports = app;
