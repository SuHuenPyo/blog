const mysql = require('mysql2/promise');
const { db } = require('../configs/_config.json');


module.exports = mysql.createPool({
    ...db,
    waitForConnections: true, // 리밋을 초과했을 경우, 대기시킬지(true) 리턴시킬지 결정한다.
    connectionLimit:10, // 최대 리밋
})

// //커넥션을 위한 풀을 생성한다.
// const pool = mysql.createPool({...db, 
//     waitForConnections: true,
//      connectionLimit: 10
// });
// //풀에 접속해서 콜백을 수행함
// exports.getConnectionPool = (cb) =>{
    
//     pool.getConnection((err, conn)=>{
//         if(!err) cb(conn)
//     })
// }