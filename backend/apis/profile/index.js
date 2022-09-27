const express = require("express");
const router = express.Router();
const { upload } = require("../../utils/multer");
const { full , info} = require('./profile.ctrl');
const {verifySession} = require('../../utils/sessionVerify')

router.get("/",()=>{})
router.get("/id",full);
router.get("/userinfo",verifySession,info);
router.get("/intro",()=>{})
router.get("/simple",()=>{})
router.put("/intro",()=>{})


module.exports = router;