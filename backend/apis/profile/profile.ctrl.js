const dayjs = require("dayjs");
const pool = require("../../utils/pool");
const logger = require("../../utils/winston");
const RegexHelper = require("../../utils/RegexHelper");
const { deleteImg } = require("../../utils/multer");

const full = async(req, res, next) => {
    logger.info(`[GET /profile/full] ${req.ip} is access`);

    const id = parseInt(req.query.id,10);
    let dbcon = null;
    let json = null;

    try {
     dbcon = await pool.getConnection(async (conn) => conn);

     const sql = 'SELECT userId,name,email,intro,image FROM members WHERE userId = ? ';

     const [result] = await dbcon.query(sql,id);

     

    } catch (err) {

    } finally {

    }
}