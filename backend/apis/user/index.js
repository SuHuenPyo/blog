const express = require("express");
const router = express.Router();

const { create, signIn, out, current } = require('./user.ctrl');
const { upload } = require('../../utils/multer');

router.get("/api/out", out);
router.get("/api/current", current);

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

router.post("/api/", upload.single('profile') ,create);

//로그인
router.post("/api/signin", signIn);



router.delete("/api/out", (req, res, next) => {
  // 탈퇴
});

module.exports = router;
