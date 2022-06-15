const express = require("express");
const router = express.Router();
const { upload } = require("../../utils/multer");
const { create } = require("./post.ctrl");

router.get("/", (req, res, next) => {
  // 전체 글 가져오기
});

router.get("/:id", (req, res, next) => {
  // Id 글 가져오기
});

router.post("/", upload.single("banner"), create);


router.put("/:id",upload.single("banner"), (req, res, next) => {
  // 글 수정하기
});

router.delete("/:id", (req, res, next) => {
  // 글 지우기
});

module.exports = router;
