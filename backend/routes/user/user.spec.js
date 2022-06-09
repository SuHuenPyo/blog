const request = require("supertest");
const should = require("should");
const app = require("../../app");

describe("POST /user", () => {
  describe.only("성공시", () => {
    it("유저 이름을 반환한다.", (done) => {
      request(app)
        .post("/user")
        .send({
          id: "test123",
          pw: "test123",
          name: "Imtest",
          email: "test@test.com",
          intro: null,
        })
        .end((err, res) => {
            const {data} = res.body; 
          data.should.have.property("name");

          done();
        });
    });

    it("201을 반환한다.", (done) => {
        request(app)
        .post('/user')
        .send({
            id: "test123",
            pw: "test123",
            name: "Imtest",
            email: "test@test.com",
            intro: null,
          })
        .expect(201)
        .end(done);
    });
  });

  describe("실패시", () => {
    it("id,pw,name,email,intro 가 없을 경우 400을 반환한다.", (done) => {});
  });
});
