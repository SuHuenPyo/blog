const express = require("express");
const router = express.Router();
const { upload } = require("../../utils/multer");
const { full , info} = require('./profile.ctrl');
const {verifySession} = require('../../utils/sessionVerify')

router.get("/api/",()=>{})
router.get("/api/id",full);
router.get("/api/userinfo",verifySession,info);
router.get("/api/intro",()=>{})
router.get("/api/simple",()=>{})
router.put("/api/intro",()=>{})


module.exports = router;