const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
chai.use(chaiHttp);
const redisServer = require("./redis.json");
chai.should();

describe("Implementing redis for get label by Id", () => {
  it("ShouldGetLabel_when_ProperDetails_is_given", (done) => {
    const token = redisServer.redis.validToken;
    chai
      .request(server)
      .get("/getlabel/61d5040a90c595e6cfa6e640")
      .set({ authorization: token })
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });
  it("Should_ Not_Getlabel givenDetails_is_not_proper", (done) => {
    const token = redisServer.redis.invalidToken;
    chai
      .request(server)
      .get("/getlabel/61d5040a90c595e6cfa6e640")
      .set({ authorization: token })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it("Get label by ID api with redis", (done) => {
    const token = redisServer.redis.validToken;
    chai
      .request(server)
      .get("/getlabel/61d5040a90c595e6cfa6e640")
      .set({ authorization: token })
      .end((err, res) => {
        res.should.have.status(201);
      
        done();
      });
  });
  it("ShouldGetlabel_when_given_Details_is_Proper", (done) => {
    const token = redisServer.redis.validToken;
    chai
      .request(server)
      .get("/getlabel/61d5040a90c595e6cfa6e640")
      .set({ authorization: token })
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });
}); 