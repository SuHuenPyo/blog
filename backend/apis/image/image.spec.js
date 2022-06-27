const request = require("supertest");
const should = require("should");
const app = require("../../app");

describe("GET /image",()=>{
    describe("성공시", () => {
        it('url을 반환한다.',(done)=>{
            request(app)
            .get('/image')
            .attach('img','/Users/eunjibaek/Documents/source/img/omer-haktan-bulut-a05y0MiozDk-unsplash.jpg')
            .end((err, res)=>{
                if(err){
                    return;
                }

                res.body.should.have.properties('url');
                
                done();

            })
        })
    })


    describe("실패시", () => {
        it('이미지가 없거나 에러가 발생하면 400을 반환한다.',(done)=>{
            request(app)
            .get('/image')
            .attach('img',null)
            .expect(400)
            .end(done);
        })
    })
})