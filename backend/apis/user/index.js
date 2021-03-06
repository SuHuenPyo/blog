const express = require("express");
const router = express.Router();

const { create } = require('./user.ctrl');
const { upload } = require('../../utils/multer');

router.get("/out", (req, res, next) => {
  // 로그아웃
});

/**
 * @swagger
 *  /user:
 *    post:
 *      tags:
 *        - users  
 *      description: 회원가입
 *      parameters:
 *        - in: body
 *          name: postInfo
 *          description: 회원가입 정보
 *          schema: 
 *              type: object
 *              properties:
 *                id: 
 *                  type: string
 *                pw: 
 *                  type: string
 *                name: 
 *                  type: string
 *                email: 
 *                  type: string
 *                intro:
 *                  type: string
 *                profile:
 *                  type: image/* 
 *      responses:
 *         201:
 *          description: 유저 추가 성공
 *         400: 
 *           description: 유효성 검사 실패
 */

router.post("/", upload.single('profile') ,create);

router.post("/in", (req, res, next) => {
  // 로그인
});

router.delete("/out", (req, res, next) => {
  // 탈퇴
});

module.exports = router;
