/**
 * @author Shun
 * @email vytngms@gmail.com
 * @create date 2022-08-18 23:00:02
 * @modify date 2022-08-18 23:08:51
 * @desc [Mail API 위한 명세서]
 */

 describe("GET /mail/:email", () => {
  describe("성공시", () => {
    it("해당 이메일로 인증번호를 전송한다.", (done) => {
      request(app)
        .get("/mail")
        .expect(200)
        .end((err, res
          ) => {
          res.body.should.have.properties("email");
          done();
        });
    });
  });

  describe("실패시", () => {
    it("전송실패", (done) => {
        request(app).get("/mail").expect(400).end(done);
      });
  });
});