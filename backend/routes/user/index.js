const express = require("express");
const router = express.Router();

const { create } = require('./user.ctrl');

router.get("/out", (req, res, next) => {
  // 로그아웃
});

router.post("/", create);

router.post("/in", (req, res, next) => {
  // 로그인
});

router.delete("/in", (req, res, next) => {
  // 탈퇴
});

module.exports = router;
