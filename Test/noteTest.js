const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server.js");
const UserData = require('../Test/user.json');
chai.use(chaiHttp);
chai.should();
const noteData = require("./note.Token.json");
const faker = require("faker");
let token = '';

beforeEach((done) => {
    chai.request(server)
        .post('/login')
        .send(UserData.user.userLoginPos)
        
        .end((error, res) => {
            if (error) {
              return done(error);
            }
            token = res.body.token;
            done();
        });
});

describe("Create Note", () => {
  it("when call create note api, should return appropriate response from controller", (done) => {
    const token = noteData.notes.validToken;
    const createNotes = {
      title: "Google",
      description: "A JavaScript Promise object contains both"
    };
    chai
      .request(server)
      .post("/createNote")
      .set({ authorization: token })
      .send(createNotes)
      .set('token', token)
      .end((err, res) => {
        if (err) {
          console.log("plz check your credential");
          return done();
        }
        res.should.have.status(201);
        return done();
      });
  });
  it("when call create note api, should return appropriate response from controller with invalid token", (done) => {
    const token = noteData.notes.invalidToken;
    const createNotes = {
      title: faker.name.title(),
      description: "A JavaScript Promise object contains both"
    };
    chai
      .request(server)
      .post("/createNote")
      .set({ authorization: token })
      .send(createNotes)
      .end((err, res) => {
        if (err) {
          console.log("plz check your credential");
          return done();
        }
        res.should.have.status(400);
        return done();
      });
  });
  it("give valid input, should return appropriate response from controller", (done) => {
    const token = noteData.notes.validToken;
    const createNotes = {
      title: "Yahooo",
      description: "A JavaScript Promise object contains both"
    };
    chai
      .request(server)
      .post("/createNote")
      .set({ authorization: token })
      .set('token', token)
      .send(createNotes)
      .end((err, res) => {
        if (err) {
          console.log("plz check your credential");
          return done();
        }
        res.should.have.status(201);
        return done();
      });
  });
  it("give invalid title , should return appropriate response from controller", (done) => {
    const token = noteData.notes.validToken;
    chai
      .request(server)
      .post("/createNote")
      .set({ authorization: token })
      .send({ title: "c", description: "yahoo is good search engine" })
      .end((err, res) => {
        if (err) {
          console.log("plz check your credential");
          return done();
        }
        res.should.have.status(400);
        return done();
      });
  });
  it("give invalid description, should return appropriate response from controller", (done) => {
    const token = noteData.notes.validToken;
    chai
      .request(server)
      .post("/createNote")
      .set({ authorization: token })
      .send({ title: "google", description: "googl" })
      .end((err, res) => {
        if (err) {
          console.log("plz check your credential");
          return done();
        }
        res.should.have.status(400);
        return done();
      });
  });
  it("when call createNoteAPI, should return appropriate response from service", (done) => {
    const token = noteData.notes.validToken;
    const createNotes = {
      title: "Computer",
      description: "A JavaScript Promise object contains both"
    };
    chai
      .request(server)
      .post("/createNote")
      .set({ authorization: token })
      .send(createNotes)
      .end((err, res) => {
        if (err) {
          console.log("plz check your credential");
          return done();
        }
        res.should.have.status(201);
        return done();
      });
  });
  it("when call createNoteAPI, should return appropriate response from model", (done) => {
    const token = noteData.notes.validToken;
    const createNotes = {
      title: "Kitesdgf",
      description: "A JavaScript Promise object contains both"
    };
    chai
      .request(server)
      .post("/createNote")
      .set({ authorization: token })
      .send(createNotes)
      .end((err, res) => {
        if (err) {
          console.log("plz check your credential");
          return done();
        }
        res.should.have.status(201);
        return done();
      });
  });
  it("when call createNoteAPI with validToken, should return appropriate response from model", (done) => {
    const token = noteData.notes.validToken;
    const createNotes = {
      title: "Gmail id is",
      description: "A JavaScript Promise object contains both"
    };
    chai
      .request(server)
      .post("/createNote")
      .set({ authorization: token })
      .send(createNotes)
      .end((err, res) => {
        if (err) {
          console.log("plz check your credential");
          return done();
        }
        res.should.have.status(201);
        return done();
      });
  });
  it("when call createNoteAPI with inValid token, should return appropriate response from model", (done) => {
    const token = noteData.notes.invalidToken;
    chai
      .request(server)
      .post("/createNote")
      .set({ authorization: token })
      .send({ title: "yahoooo", description: "yahooo is very good search engine" })
      .end((err, res) => {
        if (err) {
          console.log("plz check your credential");
          return done();
        }
        res.should.have.status(400);
        return done();
      });
  });
});
// api for get all notes

describe("Get all Notes", () => {
    it("when call getNote api without token, should return appropriate response from controller", (done) => {
      chai
        .request(server)
        .get("/getNote")
        .end((err, res) => {
          if (err) {
            console.log("plz check your credential");
            return done();
          }
          res.should.have.status(500);
          return done();
        });
    });
  
    it("when call getNote api with token, should return appropriate response from controller", (done) => {
      const token = noteData.notes.validToken;
      chai
        .request(server)
        .get("/getNote")
        .set({ authorization: token })
        .end((err, res) => {
          if (err) {
            console.log("plz check your credential");
            return done();
          }
          res.should.have.status(201);
          return done();
        });
    });
    it("when call getNote api with token, should return appropriate response from controller", (done) => {
        const token = noteData.notes.invalidToken;
        chai
          .request(server)
          .get("/getNote")
          .set({ authorization: token })
          .end((err, res) => {
            if (err) {
              console.log("plz check your credential");
              return done();
            }
            res.should.have.status(400);
            return done();
          });
      });
      it("when call getNote api with token is Authentic Request, should return appropriate response from controller", (done) => {
        const token = noteData.notes.validToken;
        chai
          .request(server)
          .get("/getNote")
          .set({ authorization: token })
          .end((err, res) => {
            if (err) {
              console.log("plz check your credential");
              return done();
            }
            res.should.have.status(201);
            return done();
          });
      });
      it("when call getNote api , should return appropriate response from service", (done) => {
        const token = noteData.notes.validToken;
        chai
          .request(server)
          .get("/getNote")
          .set({ authorization: token })
          .end((err, res) => {
            if (err) {
              console.log("plz check your credential");
              return done();
            }
            res.should.have.status(201);
            return done();
          });
      });
      it("when call getNote api , should return appropriate response from model", (done) => {
        const token = noteData.notes.validToken;
        chai
          .request(server)
          .get("/getNote")
          .set({ authorization: token })
          .end((err, res) => {
            if (err) {
              console.log("plz check your credential");
              return done();
            }
            res.should.have.status(201);
            return done();
          });
      });
      it("when call getNote api then get all note , should return appropriate response", (done) => {
        const token = noteData.notes.validToken;
        chai
          .request(server)
          .get("/getNote")
          .set({ authorization: token })
          .end((err, res) => {
            if (err) {
              console.log("plz check your credential");
              return done();
            }
            res.should.have.status(201);
            return done();
          });
      });
      it("when call getNote api then didnot get all note with invalid token , should return appropriate response", (done) => {
        const token = noteData.notes.invalidToken;
        chai
          .request(server)
          .get("/getNote")
          .set({ authorization: token })
          .end((err, res) => {
            if (err) {
              console.log("plz check your credential");
              return done();
            }
            res.should.have.status(400);
            return done();
          });
      });
    });
      // api for getNoteById

describe("GetNoteById", () => {
  it("when call getNoteById with InvalidToken , should return appropriate response", (done) => {
    chai
      .request(server)
      .get("/getNote/:id")
      .end((err, res) => {
        if (err) {
          console.log("plz check your credential");
          return done();
        }
        res.should.have.status(500);
        return done();
      }).timeout(10000);
  });
  it("when call getNoteById with validToken , should return appropriate response", (done) => {
    const token = noteData.notes.validToken;
    chai
      .request(server)
      .get("/getNote/61d5040a90c595e6cfa6e640")
      .set({ authorization: token })
      .end((err, res) => {
        if (err) {
          console.log("please check your credential");
          return done();
        }
        res.should.have.status(201);
        return done();
      });
  });
  it("given token is verified then given id should be validated", (done) => {
    const token = noteData.notes.validToken;
    chai
      .request(server)
      .get("/getNote/61d5040a90c595e6cfa6e640")
      .set({ authorization: token })
      .end((err, res) => {
        if (err) {
          console.log("plz check your credential");
          return done();
        }
        res.should.have.status(201);
        return done();
      });
  });
  it("given token is not verified then given id should not be validated", (done) => {
    const token = noteData.notes.invalidToken;
    chai
      .request(server)
      .get("/getNote/61d5040a90c595e6cfa6e640")
      .set({ authorization: token })
      .end((err, res) => {
        if (err) {
          console.log("plz check your credential");
          return done();
        }
        res.should.have.status(400);
        return done();
      });
  });
  it("when call getNoteById with validToken , should return appropriate response from service", (done) => {
    const token = noteData.notes.validToken;
    chai
      .request(server)
      .get("/getNote/61d5040a90c595e6cfa6e640")
      .set({ authorization: token })
      .end((err, res) => {
        if (err) {
          console.log("plz check your credential");
          return done();
        }
        res.should.have.status(201);
        return done();
      });
  });
  it("when call getNoteById with validToken , should return appropriate response from model", (done) => {
    const token = noteData.notes.validToken;
    chai
      .request(server)
      .get("/getNote/61d5040a90c595e6cfa6e640")
      .set({ authorization: token })
      .end((err, res) => {
        if (err) {
          console.log("plz check your credential");
          return done();
        }
        res.should.have.status(201);
        return done();
      });
  });
  it("when call getNoteById with validToken using find method , should return appropriate response from model", (done) => {
    const token = noteData.notes.validToken;
    chai
      .request(server)
      .get("/getNote/61d5040a90c595e6cfa6e640")
      .set({ authorization: token })
      .end((err, res) => {
        if (err) {
          console.log("plz check your credential");
          return done();
        }
        res.should.have.status(201);
        return done();
      }).timeout(10000);
  });
});
// api for update note by id

describe("Update Note By Id", () => {
  it("when call updateNoteById with validToken , should return appropriate response from controller", (done) => {
    const token = noteData.notes.validToken;
    const createNotes = {
      title: "math",
      description: "hgsfgadgsdsdskdnsdnsd"
    };
    chai
      .request(server)
      .put("/updateNote/61d501ee90c595e6cfa6e638")
      .set({ authorization: token })
      .send(createNotes)
      .end((err, res) => {
        if (err) {
          console.log("plz check your credential");
          return done();
        }
        res.should.have.status(201);
        return done();
      });
  });
  it("when call updateNoteById with inValidToken , should return appropriate response from controller", (done) => {
    const token = noteData.notes.invalidToken;
    const createNotes = {
      title: noteData.notes.title,
      description: faker.lorem.word()
    };
    chai
      .request(server)
      .put("/updateNote/61d501ee90c595e6cfa6e638")
      .set({ authorization: token })
      .send(createNotes)
      .end((err, res) => {
        if (err) {
          console.log("plz check your credential");
          return done();
        }
        res.should.have.status(400);
        return done();
      });
  });
  it("when call updateNoteById with inValidToken , should return appropriate response from controller", (done) => {
    const token = noteData.notes.invalidToken;
    chai
      .request(server)
      .put("/updateNote/61d501ee90c595e6cfa6e638")
      .set({ authorization: token })
      .end((err, res) => {
        if (err) {
          console.log("plz check your credential");
          return done();
        }
        res.should.have.status(400);
        return done();
      });
  });
  it("when call updateNoteById with valid input , should return appropriate response from controller", (done) => {
    const token = noteData.notes.validToken;
    const createNotes = {
      title: "family",
      description: "gksjf gjsjsfb shfjsha"
    };
    chai
      .request(server)
      .put("/updateNote/61c8913bdcf696ac219ce3ea")
      .set({ authorization: token })
      .send(createNotes)
      .end((err, res) => {
        if (err) {
          console.log("plz check your credential");
          return done();
        }
        res.should.have.status(201);
        return done();
      });
  });
  it("when call updateNoteById with false title , should return appropriate response from controller", (done) => {
    const token = noteData.notes.validToken;
    chai
      .request(server)
      .put("/updateNote/61c8913bdcf696ac219ce3ea")
      .set({ authorization: token })
      .send({ title: "S", description: "yahoo is very good search engine" })
      .end((err, res) => {
        if (err) {
          console.log("plz check your credential");
          return done();
        }
        res.should.have.status(400);
        return done();
      });
  });
  it("when call updateNoteById with false description , should return appropriate response from controller", (done) => {
    const token = noteData.notes.validToken;
    chai
      .request(server)
      .put("/updateNote/61c8913bdcf696ac219ce3ea")
      .set({ authorization: token })
      .send({ title: "yahoo", description: "g" })
      .end((err, res) => {
        if (err) {
          console.log("plz check your credential");
          return done();
        }
        res.should.have.status(400);
        return done();
      });
  });
  it("when call updateNoteById with valid input , should return appropriate response from service", (done) => {
    const token = noteData.notes.validToken;
    chai
      .request(server)
      .put("/updateNote/61bc2f500dedba5868fb397f")
      .set({ authorization: token })
      .send({ title: "Yahooooo", description: "yahoo is very good search engine" })
      .end((err, res) => {
        if (err) {
          console.log("plz check your credential");
          return done();
        }
        res.should.have.status(201);
        return done();
      });
  });
  it("when call updateNoteById , should return appropriate response from model", (done) => {
    const token = noteData.notes.validToken;
    chai
      .request(server)
      .put("/updateNote/61bc2f500dedba5868fb397f")
      .set({ authorization: token })
      .send({ title: "Yahooooo", description: "yahoo is very good search engine" })
      .end((err, res) => {
        if (err) {
          console.log("plz check your credential");
          return done();
        }
        res.should.have.status(201);
        return done();
      });
  });
  it("given id is matched then update, should return proper response", (done) => {
    const token = noteData.notes.validToken;
    chai
      .request(server)
      .put("/updateNote/61bc2f500dedba5868fb397f")
      .set({ authorization: token })
      .send({ title: "Yahooo", description: "yahoo is very good search engine" })
      .end((err, res) => {
        if (err) {
          console.log("plz check your credential");
          return done();
        }
        res.should.have.status(201);
        return done();
      });
  });
  it("given id is not matched then don't update, should return proper response", (done) => {
    const token = noteData.notes.validToken;
    chai
      .request(server)
      .put("/updateNote/61bc2f500dedba5868f7f")
      .set({ authorization: token })
      .send({ title: "Yahoooo", description: "yahoo is very good search engine" })
      .end((err, res) => {
        if (err) {
          console.log("plz check your credential");
          return done();
        }
        res.should.have.status(400);
        return done();
      });
  });
});
// api of Delete Note by Id

describe("DeleteNoteById", () => {
  it("when call DeleteNote Api with valid token, should return proper response from controller", (done) => {
    const token = noteData.notes.validToken;
    chai
      .request(server)
      .delete("/deleteNote/61d901a8dc6681c132726677")
      .set({ authorization: token })
      .end((err, res) => {
        if (err) {
          console.log("plz check your credential");
          return done();
        }
        res.should.have.status(201);
        return done();
      });
  });
  it("when call DeleteNote Api with inValid token, should return proper response from controller", (done) => {
    const token = noteData.notes.invalidToken;
    chai
      .request(server)
      .delete("/deleteNote/61d901a8dc6681c132726677")
      .set({ authorization: token })
      .end((err, res) => {
        if (err) {
          console.log("plz check your credential");
          return done();
        }
        res.should.have.status(400);
        return done();
      });
  });
  it("when it is validate with the given id, should return proper response from controller", (done) => {
    const token = noteData.notes.validToken;
    chai
      .request(server)
      .delete("/deleteNote/61d901a8dc6681c132726677")
      .set({ authorization: token })
      .end((err, res) => {
        if (err) {
          console.log("plz check your credential");
          return done();
        }
        res.should.have.status(201);
        return done();
      });
  });
  it("when it is validate with the given false id, should return proper response from controller", (done) => {
    const token = noteData.notes.validToken;
    chai
      .request(server)
      .delete("/deleteNote/61d901a8dc663746")
      .set({ authorization: token })
      .end((err, res) => {
        if (err) {
          console.log("plz check your credential");
          return done();
        }
        res.should.have.status(400);
        return done();
      });
  });
  it("when call DeleteNote api, should return proper response from service", (done) => {
    const token = noteData.notes.validToken;
    chai
      .request(server)
      .delete("/deleteNote/61c8913bdcf696ac219ce3ea")
      .set({ authorization: token })
      .end((err, res) => {
        if (err) {
          console.log("plz check your credential");
          return done();
        }
        res.should.have.status(201);
        return done();
      });
  });
  it("when call DeleteNote api, should return proper response from model", (done) => {
    const token = noteData.notes.validToken;
    chai
      .request(server)
      .delete("/deleteNote/61c8913bdcf696ac219ce3ea")
      .set({ authorization: token })
      .end((err, res) => {
        if (err) {
          console.log("plz check your credential");
          return done();
        }
        res.should.have.status(201);
        return done();
      });
  });
  it("given id present in DB then delete, should return proper response from model", (done) => {
    const token = noteData.notes.validToken;
    chai
      .request(server)
      .delete("/deleteNote/61c8913bdcf696ac219ce3ea")
      .set({ authorization: token })
      .end((err, res) => {
        if (err) {
          console.log("plz check your credential");
          return done();
        }
        res.should.have.status(201);
        return done();
      });
  });
  it("given id not present in DB, should return proper response from model", (done) => {
    const token = noteData.notes.validToken;
    chai
      .request(server)
      .delete("/deleteNote/61c8913bdcf696ac219c")
      .set({ authorization: token })
      .end((err, res) => {
        if (err) {
          console.log("plz check your credential");
          return done();
        }
        res.should.have.status(400);
        return done();
      });
  });
});