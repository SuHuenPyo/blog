const dayjs = require("dayjs");
const pool = require("../../utils/pool");
const logger = require("../../utils/winston");
const RegexHelper = require("../../utils/RegexHelper");
const { deleteImg } = require("../../utils/multer");

const full = async(req, res, next) => {
    logger.info(`[GET /profile/full] ${req.ip} is accessed`);

    const id = parseInt(req.params.id,10);
    let dbcon = null;
    let json = null;

    try {
     dbcon = await pool.getConnection(async (conn) => conn);

     const sql = 'SELECT userId,name,email,intro,image FROM members WHERE m_id=? ';

     const [result] = await dbcon.query(sql,id);

     json = result[0];

    } catch (err) {
      logger.error(`${err.message}`);

      return res.status(500).send('Interal Server Error')

    } finally {

      await dbcon.release();
    }
    
    return res.json(json);
}

module.exports = { full }