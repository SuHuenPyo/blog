const express = require('express');
const app = express();
const port = 3300;


//router
const user = require('./apis/user/index');
const post = require('./apis/post/index');

// modules
const { swaggerUI, specs } = require('./utils/swagger');
const logger = require('./utils/winston');


app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: 유저 추가 수정 삭제 조회
 */

app.use('/user',user);

/**
 * @swagger
 * tags:
 *   name: Post
 *   description: 글 추가 수정 삭제 조회
 */

app.use('/post',post);

app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(specs))

app.listen(port,()=>{
    logger.info('Server is Running')
})

module.exports = app;