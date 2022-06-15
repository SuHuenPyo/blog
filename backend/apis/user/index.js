const express = require("express");
const router = express.Router();

const { create } = require('./user.ctrl');
const { upload } = require('../../utils/multer');

router.get("/out", (req, res, next) => {
  // 로그아웃
});

router.post("/", upload.single('profile') ,create);

router.post("/in", (req, res, next) => {
  // 로그인
});

router.delete("/out", (req, res, next) => {
  // 탈퇴
});

module.exports = router;
