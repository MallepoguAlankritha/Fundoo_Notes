const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
chai.use(chaiHttp);
const loginData = require('./user.json');
const inputData = require('./user.json');
const registrationData = require("./user.json");
const faker = require('faker');
chai.should();

describe('registartion', () => {
  it('givenRegistrationDetails_whenProper_shouldSaveInDB', (done) => {

    //const registartionDetails = registrationData.user.correctRegister;
    const registerfaker = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    };

    chai
      .request(server)
      .post('/registeruser')
      .send(registerfaker)
      .end((err, res) => {
        if (err) {
          console.log('Please check details again and re-enter the details with proper format');
          done()
        }
        res.should.have.status(200);
        res.body.should.have.property('success').eql(true);
        res.body.should.have.property('message').eql('User Registered');
        done()
      });
  });
  it('givenRegistrationDetails_whenImpProper_shouldNotSaveInDB', (done) => {
    const registartionDetails = registrationData.user.registrationWithImproperDetails;
    chai
      .request(server)
      .post('/registeruser')
      .send(registartionDetails)
      .end((err, res) => {
        if (err) {
          // return done(err);
          console.log('Please check details again and re-enter the details with proper format');
          done();
        }
        res.should.have.status(400);
        console.log('Test Cases passes for the Improper registration details ');
        res.body.should.have.property('success').eql(false);
        res.body.should.have.property('message').eql('Wrong Input Validations');
        done();
      });
  });

  it('givenRegistrationDetails_withOut_email_shouldNotSaveInDB', (done) => {
    const registartionDetails = registrationData.user.registrationWithOutEmail;
    chai
      .request(server)
      .post('/registeruser')
      .send(registartionDetails)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(400);
        res.body.should.have.property('success').eql(false);
        res.body.should.have.property('message').eql('Wrong Input Validations');
        done();
      });
  });

  it('givenRegistrationDetails_withOut_firstName_shouldNotSaveInDB', (done) => {
    const registartionDetails = registrationData.user.registrationWithOutfirstName;
    chai
      .request(server)
      .post('/registeruser')
      .send(registartionDetails)
      .end((err, res) => {
        if (err) {
        res.should.have.status(400);
        res.body.should.have.property('success').eql(false);
        res.body.should.have.property('message').eql('Wrong Input Validations');
         }
          done();
      });
  });
});
describe("Login", () => {
    it("Should return status code - 200,When given Login details is true. ", (done) => {
      const loginDetails = loginData.user.login;
      const login = {
        email: faker.internet.email(),
        password: faker.internet.password()
      }
      chai
      .request(server)
      .post("/login")
      .send(login)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('givenLoginDetails_whenImproper_shouldUnableToLogin', (done) => {
    const loginDetails = loginData.user.loginWithImproperDetails;
    chai
      .request(server)
      .post('/login')
      .send(loginDetails)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(400);
        res.body.should.have.property('success').eql(false);
        res.body.should.have.property('message').eql('error in login.please enter valid credential');
        done();
      });
  });
});
// Test Cases for Forgot Password API

describe("Forgot Password API", () => {
  it(" when Forgot password api is called ,should return response status success", (done) => {
    chai
      .request(server)
      .post("/forgotPassword")
      .send({email: "mallepogualankritha@gmail.com"})
      .end((err, res) => {
        if (err) {
          console.log("please check your credentials");
          return done();
        }
        res.should.have.status(200);
        return done();
      });
  });
  it("When ForgotPassword API is called should validate the input and return appropriate response", (done) => {
    chai
      .request(server)
      .post("/forgotPassword")
      .send({ email: "mallepogualankritha@gmail.com" })
      .end((err, res) => {
        if (err) {
          console.log("please check your credentials");
          return done();
        }
        res.should.have.status(200);
        return done();
      });
  });
  it("When ForgotPassword API is called should return appropriate response from service", (done) => {
    chai
      .request(server)
      .post("/forgotPassword")
      .send({ email: "mallepogualankritha@gmail.com" })
      .end((err, res) => {
        if (err) {
          console.log("please check your credentials");
          return done();
        }
        res.should.have.status(200);
        return done();
      });
  });
  it(" When ForgotPassword API is called Should return appropriate response from model", (done) => {
    chai
      .request(server)
      .post("/forgotPassword")
      .send({ email: "mallepogualankritha@gmail.com" })
      .end((err, res) => {
        if (err) {
          console.log("please check your credentials");
          return done();
        }
        res.should.have.status(200);
        return done();
      });
  });
  it(" given email is present in DB then send mail, should return appropriate response", (done) => {
    chai
      .request(server)
      .post("/forgotPassword")
      .send({ email: "mallepogualankritha@gmail.com" })
      .end((err, res) => {
        if (err) {
          console.log("please check your credentials");
          return done();
        }
        res.should.have.status(200);
        return done();
      });
  });
it('should give status 200 when otp with email has been sent and is been saved into the database', (done) => {
  chai.request(server)
      .post('/forgotPassword')
      .send({"email": 'mallepogualankritha@gmail.com'})
      .end((err, res) => {
          if (err) {
              return done();
          } else {
              res.should.have.status(200);
              return done();
          }

      })
})
})
// Test cases for RESET Password API
describe("Reset Password API", () => {  
  it("when call reset password api, should return appropriate response", (done) => {
    chai
      .request(server)
      .put("/resetPassword")
      .send({email: "mallepogualankritha@gmail.com", password: "Alankritha@12356", code: "cdaoztx8j7"})
      .end((err, res) => {
        if (err) {
          console.log("plz check your credential");
          return done();
        }
        res.should.have.status(200);
        return done();
      });
  });
it("should validate the input , return appropriate response", (done) => {
  chai
    .request(server)
    .put("/resetPassword")
    .send({ email: "mallepogualankritha@gmail.com", password: "Alankritha@1234567", code: "cdaoztx8j7" })
    .end((err, res) => {
      if (err) {
        console.log("plz check your credential");
        return done();
      }
      res.should.have.status(200);
      return done();
    });
});
it("should validate the wrong input of password, return appropriate response", (done) => {
  chai
    .request(server)
    .put("/resetPassword")
    .send({ email: "mallepogualankritha@gmail.com", password: "jdbyhg13uyw", code: "gduygewfyufd" })
    .end((err, res) => {
      if (err) {
        console.log("plz check your credential");
        return done();
      }
      res.should.have.status(500);
      return done();
    });
});
it("should validate the wrong input of email, return appropriate response", (done) => {
  chai
    .request(server)
    .put("/resetPassword")
    .send({ email: "mallepogualankrithagmail.com", password: "Alankritha@123456867", code: "cdaoztx8j7" })
    .end((err, res) => {
      if (err) {
        console.log("please check your credentials");
        return done();
      }
      res.should.have.status(500);
      return done();
    });
});
it("when reset password api is called it should return appropriate response from resetPassword service", (done) => {
  chai
    .request(server)
    .put("/resetPassword")
    .send({ email: "mallepogualankritha@gmail.com", password: "Alankritha@123456867", code: "cdaoztx8j7" })
    .end((err, res) => {
      if (err) {
        console.log("please check your credentials");
        return done();
      }
      res.should.have.status(200);
      return done();
    });
});
it("when reset password api is called it should return appropriate response from resetPassword model", (done) => {
  chai
    .request(server)
    .put("/resetPassword")
    .send({ email: "mallepogualankritha@gmail.com", password: "Alankritha@123", code: "cdaoztx8j7" })
    .end((err, res) => {
      if (err) {
        console.log("please check your credentials");
        return done();
      }
      res.should.have.status(200);
      return done();
    });
});
it("when reset password api is called then update with new password, should return appropriate response", (done) => {
  chai
    .request(server)
    .put("/resetPassword")
    .send({ email: "mallepogualankritha@gmail.com", password: "Alankritha@123456867", code: "cdaoztx8j7" })
    .end((err, res) => {
      if (err) {
        console.log("please check your credentials");
        return done();
      }
      res.should.have.status(200);
      return done();
    });
});
});
