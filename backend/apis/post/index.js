const express = require("express");
const router = express.Router();


router.get("/", (req, res, next) => {
  // 로그아웃
});

router.post("/", (req, res, next) => {
    // 로그인
  });;

router.post("/in", (req, res, next) => {
  // 로그인
});

router.delete("/in", (req, res, next) => {
  // 탈퇴
});

module.exports = router;