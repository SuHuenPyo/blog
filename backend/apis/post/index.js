const express = require("express");
const router = express.Router();
const { upload } = require("../../utils/multer");
const {
  create,
  index,
  detail,
  popular,
  recent,
  update,
} = require("./post.ctrl");

/**
 * @swagger
 *   /post:
 *    get:
 *     tags:
 *      - Post
 *     description: 글 불러오기
 *     produces:
 *     - application/json
 *     responses:
 *         200:
 *          description: 글 불러오기 성공
 */
router.get("/", index);

/**
 * @swagger
 *   /post/popular:
 *    get:
 *     tags:
 *      - Post
 *     description: 인기글 불러오기(Hts,like)
 *     produces:
 *     - application/json
 *     responses:
 *         200:
 *          description: 글 불러오기 성공
 */

router.get("/popular", popular);

/**
 * @swagger
 *   /post/recent:
 *    get:
 *     tags:
 *      - Post
 *     description: 최신글 불러오기(rdate)
 *     produces:
 *     - application/json
 *     responses:
 *         200:
 *          description: 글 불러오기 성공
 */

router.get("/recent", recent);

/**
 * @swagger
 *  /post/{id}:
 *    get:
 *      tags:
 *      - Post
 *      description: 특정 포스트 불러오기
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: integer
 *            description: 포스트 아이디
 *      responses:
 *       200:
 *        description: 제품 조회 성공
 *       400:
 *        description: 아이디 확인 필요
 */

router.get("/:id", detail);

/**
 * @swagger
 *  /post:
 *    post:
 *      tags:
 *        - Post
 *      description: 글 등록하기
 *      parameters:
 *        - in: body
 *          name: postInfo
 *          description: The user to create.
 *          schema:
 *            type: object
 *            properties:
 *              title:
 *               type: string
 *              content:
 *                type: string
 *              author:
 *                 type: integer
 *              banner:
 *                  type: image/*
 *      responses:
 *         201:
 *          description: 글 추가 성공
 *         404:
 *           description: 유효성 검사 실패
 */

router.post("/", upload.single("banner"), create);

router.put("/:id", upload.single("banner"), update);

router.delete("/:id", (req, res, next) => {
  // 글 지우기
});

module.exports = router;
