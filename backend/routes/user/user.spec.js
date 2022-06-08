const request = require("supertest");
const should = require("should");
const app  = require("../../app");

description('POST /user',()=>{
    description('성공시',()=>{
        it('유저 이름을 반환한다.',(done)=>{

        })

        it('201을 반환한다.',(done)=>{

        })
    })


    description('실패시',()=>{
        it('id,pw,name,email,intro 가 없을 경우 400을 반환한다.',(done)=>{

        })
    })
})