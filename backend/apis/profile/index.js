const express = require("express");
const router = express.Router();
const { upload } = require("../../utils/multer");
const { full } = require('./profile.ctrl');


router.get("/",()=>{})
router.get("/full/:id",full)
router.get("/intro",()=>{})
router.get("/simple",()=>{})
router.put("/intro",()=>{})


module.exports = router