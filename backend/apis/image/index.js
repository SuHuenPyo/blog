const express = require("express");
const router = express.Router();
const { upload } = require("../../utils/multer");

module.exports = router.get(
  "/",
  upload.single("img"),
  async (req, res, next) => {
    const img_url = req.file || null;

    if (!img_url) {
      return res.status(400).send("다시 시도 해주세요.");
    }

    const json = { url: img_url.location };

    return res.status(200).json(json);
  }
);
