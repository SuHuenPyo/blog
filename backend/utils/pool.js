const mysql = require('mysql2/promise');
const { db } = require('../configs/_config.json');


module.exports = mysql.createPool({
    ...db,
    waitForConnections: true, // 리밋을 초과했을 경우, 대기시킬지(true) 리턴시킬지 결정한다.
    connectionLimit:10, // 최대 리밋
})