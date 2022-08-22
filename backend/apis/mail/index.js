/**
 * @author Shun
 * @email vytngms@gmail.com
 * @create date 2022-08-18 23:11:04
 * @modify date 2022-08-18 23:15:18
 * @desc [description]
 */
const express = require("express");
const router = express.Router();

const {
  AuthCode,

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
 router.get("/mail", AuthCode);