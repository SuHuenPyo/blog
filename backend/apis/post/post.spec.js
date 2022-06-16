const request = require("supertest");
const should = require("should");
const app = require("../../app");

describe("GET /post", () => {
  describe("성공시", () => {
    it("포스트 목록을 불러온다.", (done) => {
      request(app)
        .get("/post")
        .expect(200)
        .end((err, res) => {
          res.body.should.be.an.Array();

          res.body.forEach((v, i) => {
            v.should.have.properties("title");
            v.should.have.properties("content");
            v.should.have.properties("author");
            v.should.have.properties("banner");
            v.should.have.properties("date");
            v.should.have.properties("hits");
            v.should.have.properties("like");
          });

          done();
        });
    });
  });
});

describe("GET /post/:id", () => {
  describe("성공시", () => {
    it("id에 해당하는 포스트 정보를 반환한다.", (done) => {
      request(app)
        .get("/post/1")
        .expect(200)
        .end((err, res) => {
          res.body.should.have.properties("title");
          res.body.should.have.properties("content");
          res.body.should.have.properties("author");
          res.body.should.have.properties("banner");
          res.body.should.have.properties("date");
          res.body.should.have.properties("hits");
          res.body.should.have.properties("like");

          done();
        });
    });
  });

  describe("실패시", () => {
    it("id가 숫자가 아닌 경우 400을 반환한다.", (done) => {
        request(app).get("/post/Two").expect(400).end(done);
      });

    it("id에 해당하는 포스트가 없는 경우 400을 반환한다.", (done) => {
      request(app).get("/post/88").expect(400).end(done);
    });
  });
});


describe("GET /post/popular",()=>{
    describe("성공시", () => {
        it('hits 가 높은 순서대로 목록을 반환한다.',(done)=>{
            request(app)
            .get('/post/popular')
            .expect(200)
            .end((err, res)=>{
                res.body.should.be.an.Array();

                done();
            })
        })
    })
})

describe.only("GET /post/recent",()=>{
    describe.only("성공시", () => {
        it('최근 날짜 순으로 정렬된 목록을 반환한다.',(done)=>{
            request(app)
            .get('/post/recent')
            .expect(200)
            .end((err, res)=>{

                console.log(res);
                res.body.should.be.an.Array();

                done();
            })
        })
    })
})

describe("POST /post", () => {
  describe("성공시", () => {
    it("성공시 201을 반환한다.", (done) => {
      request(app)
        .post("/post")
        .send({
          title: "test",
          banner: null,
          content: "test content",
          author: 1,
        })
        .expect(201)
        .end(done);
    });
  });

  describe("실패시", () => {
    it("유효성 검사 실패시, 400반환한다.", (done) => {
      request(app)
        .post("/post")
        .send({
          title: "test",
          banner: null,
          content: "",
          author: 2,
        })
        .expect(400)
        .end(done);
    });
  });
});
