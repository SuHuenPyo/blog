const express = require('express');

const pool = require('../../utils/pool');
const logger = require('../../utils/winston');

const router = express.Router();

router.get('/out', (req, res, next) => {
    // 로그아웃

})

router.post('/', async (req, res, next) => {
            // 회원가입
            const id = req.body.id;
            const pw = req.body.pw;
            const name = req.body.name;
            const email = req.body.email;
            const intro = req.body.intro;

            try {
                const conn = await pool.getConnection(async conn => conn);

                const result = await pool.query()




            } catch (err) {

            })

        router.post('/in', (req, res, next) => {
            // 로그인
        })

        router.delete('/in', (req, res, next) => {
            // 탈퇴
        })

        module.exports = router;