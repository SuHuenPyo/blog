/**
 * @author Shun
 * @email vytngms@gmail.com
 * @create date 2022-08-18 23:11:04
 * @modify date 2022-09-27 17:32:40
 * @desc [description]
 */
const express = require("express");
const router = express.Router();

const {
  AuthCode,
  VerifyCode

} = require("./mail.ctrl");


/**
 * @swagger
 *  /mail/{email}:
 *    get:
 *      tags:
 *      - mail
 *      description: 인증번호 요청하기
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: path
 *          name: email
 *          required: true
 *          schema:
 *            type: string
 *            description: 이메일 주소
 *      responses:
 *       200:
 *        description: 이메일 전송 성공
 *       400:
 *        description: 이메일 전송 실패
 */
 router.get("/api/", AuthCode);


 /**
 * @swagger
 *  /mail:
 *    post:
 *      tags:
 *        - Mail
 *      description: 인증번호 인증하기
 *      parameters:
 *        - in: body
 *          name: authCode Info
 *          description: The user to create.
 *          schema:
 *            type: object
 *            properties:
 *              authCode:
 *               type: string
 *      responses:
 *         201:
 *          description: 글 추가 성공
 *         400:
 *           description: 유효성 검사 실패
 */
 router.post("/api/", VerifyCode);












 

 module.exports = router;