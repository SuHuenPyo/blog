const express = require("express");
const dayjs = require("dayjs");

const pool = require("../../utils/pool");
const logger = require("../../utils/winston");

const router = express.Router();

router.get("/out", (req, res, next) => {
  // 로그아웃
});

router.post("/", async (req, res, next) => {
  // 회원가입
  const id = req.body.id;
  const pw = req.body.pw;
  const name = req.body.name;
  const email = req.body.email;
  const intro = req.body.intro;
  const date = dayjs(new Date).format('YYYY-MM-DD HH:mm:ss');

  let json = null;
  let dbcon = null;

  const input_data = [id, pw, name,email, intro, date, false];

  console.log(input_data);

  try {
    dbcon = await pool.getConnection(async (conn) => conn);

    const input_sql =
      'INSERT INTO members(userId,password,name,email,intro,rdate,auto) VALUES (?,?,?,?,?,?,?)';

    const [input_result] = await dbcon.query(input_sql, input_data);

    const [get_result] = await dbcon.query(
      "SELECT name FROM members WHERE m_id=?",
      [input_result.insertId]
    );

    json = get_result[0];
  } catch (err) {
    logger.error(err);
    res.status(500).send("Internal Server Error");
  } finally {
    dbcon.release();
  }

  res.status(201).json({ data: json });
});

router.post("/in", (req, res, next) => {
  // 로그인
});

router.delete("/in", (req, res, next) => {
  // 탈퇴
});

module.exports = router;
