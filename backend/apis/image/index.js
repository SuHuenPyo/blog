const express = require("express");
const router = express.Router();
const { upload } = require("../../utils/multer");
const logger = require("../../utils/winston");

/**
 * @swagger
 *  /image:
 *    post:
 *      tags:
 *        - Image
 *      description: 글 이미지 처리
 *      parameters:
 *        - in: body
 *          name: imgs
 *          description: 업로드할 이미지 배열
 *          schema:
 *              type: array
 *      responses:
 *         200:
 *          description: 유저 추가 성공, url 반환
 *         404:
 *           description: 유효성 검사 실패
 */

module.exports = router.get(
  "/",
  upload.array("imgs", 5),
  async (req, res, next) => {
    logger.info(`[POST /image] ${req.ip} is access`);

    const img_urls = await req.files;
    console.log(img_urls);

    if (!img_url[0]) {
      return res.status(400).send("다시 시도 해주세요.");
    }

    try {
      const json = await Promise.all(
        img_urls.map((image, index) => {
          return image.location;
        })
      );
    } catch (err) {

      logger.error(err);

    }

    return res.status(200).json({ urls: json });
  }
);
