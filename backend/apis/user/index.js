const express = require("express");
const router = express.Router();

const { create, signIn, out, current } = require('./user.ctrl');
const { upload } = require('../../utils/multer');

router.get("/out", out);
router.get("/current", current);

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

//로그인
router.post("/signin", signIn);



router.delete("/out", (req, res, next) => {
  // 탈퇴
});

module.exports = router;
