const express = require("express");
const router = express.Router();
const { upload } = require("../../utils/multer");
const {
  create,
  index
} = require("./comment.ctrl");

const {verifySession} = require('../../utils/sessionVerify');

router.post("/", verifySession, create);
router.get("/", index)


module.exports = router;
