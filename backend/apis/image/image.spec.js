const request = require("supertest");
const should = require("should");
const app = require("../../app");

describe("POST /image",()=>{
    describe("성공시", () => {
        it('url이 담긴 배열을 반환한다.',(done)=>{
            request(app)
            .post('/image')
            .attach('imgs','/Users/eunjibaek/Documents/source/img/omer-haktan-bulut-a05y0MiozDk-unsplash.jpg')
            .attach('imgs','/Users/eunjibaek/Documents/source/img/tachina-lee--wjk_SSqCE4-unsplash.jpg')
            .end((err, res)=>{

                console.log(res.body);

                res.body.should.be.an.Array();
                
                done();

            })
        })
    })


    describe("실패시", () => {
        it('이미지가 없거나 에러가 발생하면 400을 반환한다.',(done)=>{
            request(app)
            .post('/image')
            .attach('imgs',"")
            .expect(400)
            .end(done);
        })
    })
})