const request = require("supertest");
const should = require("should");
const app = require("../../app");

describe("POST /user", () => {
  describe("성공시", () => {
    it("유저 이름을 반환한다.", (done) => {
      request(app)
        .post("/user")
        .set("Content-Type", "application/x-www-form-urlencoded")
        .send({
          id: "test",
          pw: "test138@",
          name: "test",
          email: "test@test.com",
          intro:''
        })
        .end((err,res) => {
          res.body.should.have.property("name");
          done();
        });
    });

    it("201을 반환한다.", (done) => {
      request(app)
        .post("/user")
        .set("Content-Type", "application/x-www-form-urlencoded")
        .send({
          id: "test123",
          pw: "test123@",
          name: "Imtest",
          email: "test@test.com",
          intro:''
        })
        .expect(201)
        .end(done);
    });
  });

  describe("실패시", () => {
    it("id,pw,name,email 중 하나라도 값이 없을 경우 400을 반환한다.", (done) => {
      request(app)
        .post("/user")
        .set("Content-Type", "application/x-www-form-urlencoded")
        .send({
            id: "test123",
            pw: "test123@",
            name: "Imtest",
            email: "",
            intro:''
        })
        .expect(400)
        .end((err,res)=>{

          done();
        });
    });
  });
});
