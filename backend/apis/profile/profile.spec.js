const request = require("supertest");
const should = require("should");
const app = require("../../app");


describe("[GET /profile/full]",()=>{
    describe("성공시", () => {
        it("유저의 정보를 반환한다.",(done)=>{
            request(app)
            .get('/profile/full/1')
            .end((err, res)=>{
                res.body.should.have.property('userId')
                res.body.should.have.property('name')
                res.body.should.have.property('email')
                res.body.should.have.property('intro')
                res.body.should.have.property('image')

                done();
            })
        })


        it('',()=>{

        })
    })
})