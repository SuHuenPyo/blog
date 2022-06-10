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
                banner: '',
                content: '', 
                author: '',
            })
            .expect(201)
        })
    });
})