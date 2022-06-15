const request = require("supertest");
const should = require("should");
const app = require("../../app");

describe("GET /post", () => {
    
})

describe("POST /post", () => {

    describe('성공시',()=>{
        it('성공시 201을 반환한다.',(done)=>{
            request(app)
            .post('/post')
            .send({
                title: 'test',
                banner: null,
                content: 'test content', 
                author: 1,
            })
            .expect(201)
            .end(done);
        })
    });

    describe('실패시',()=>{

        it('유효성 검사 실패시, 400반환한다.',(done)=>{
            request(app)
            .post('/post')
            .send({
                title: 'test',
                banner: null,
                content: '', 
                author: 2,
            })
            .expect(400)
            .end(done);
        })

    });
})