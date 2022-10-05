const express = require("express");
const router = express.Router();
const {verifySession} = require('../../utils/sessionVerify')


const { 
  create, 
  signIn, 
  out, 
  current,
  updateId,
  updateNickname,
  updateEmail,
  updatePassword,
  updateImage,
  updateIntro
   
} = require('./user.ctrl');
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

//유저 로그인id 변경
router.put("/id",verifySession, updateId);

//유저 닉네임 변경
router.put("/nickname",verifySession, updateNickname);

//유저 이메일 변경
router.put("/email", verifySession, updateEmail);

//유저 password 변경
router.put("/password", verifySession, updatePassword);

//유저 이미지 변경
router.put("/image", verifySession, updateImage);

//유저 자기소개 변경
router.put("/intro",verifySession, updateIntro)


router.delete("/out", (req, res, next) => {
  // 탈퇴
});

module.exports = router;
