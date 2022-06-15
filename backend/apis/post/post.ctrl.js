const dayjs = require("dayjs");

const pool = require("../../utils/pool");
const logger = require("../../utils/winston");
const RegexHelper = require("../../utils/RegexHelper");
const { deleteImg } = require("../../utils/multer");

const regex = new RegexHelper();

const create = async (req, res, next) => {

  let dbcon = null;
  const title = req.body.title?.trim();
  const banner = req.file || null;
  const content = req.body.content?.trim();
  const author = parseInt(req.body.author,10);
  const date = dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss");
  const hits = 0;
  const like = 0;

  try {
    regex.value(title, "[POST /post title]");

    regex.value(content, "[POST /post content]");

    regex.value(author, "[POST /post content]");

    regex.length(title, 2, 45, "[POST /user title]");
    regex.length(title, 3, 1000, "[POST /user content]");

    regex.number(author,"[POST /post author]")

  } catch (err) {

    logger.error(`[${err.name}] ${err.message}`);

    if (banner !== null) {

      deleteImg(banner.key);

    }

    return res.status(400).send("DATA를 확인해주세요.").end();
  }

  try {
    const input_data = [title, banner?.location || null, content, date, date, hits, like, author];

    console.log(input_data);

    dbcon = await pool.getConnection(async (conn) => conn);

    const sql =
      "INSERT INTO boards( b_title, b_banner, b_content, b_rdate, b_mdate, b_hits, b_like, m_id ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

    await dbcon.query(sql, input_data);

  } catch (err) {

    logger.error(err);

    return res.status(500).send('Internal Server Error');

  } finally {

    dbcon.release();

  }

  return res.status(201).end();
};


module.exports = { create }