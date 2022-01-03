const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const faker = require('faker');
const labelDB = require('./label.json');
chai.use(chaiHttp);
const { expect } = require('chai');
chai.should();
describe('Add label by id api ', () => {
    it('AddLabelById_by_checking_server', (done) => {
        chai
            .request(server)
            .post('/addlabel/:id')
            .end((err, res) => {
                res.should.have.status(500);
                done();
            });
    });
    it('Given Token should give true when token is valid', (done) => {
        const token = labelDB.label.validToken
        chai
            .request(server)
            .post('/addlabel/:id')
            .set({ authorization: token })
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
    it('Given Token Should give false when token is invalidtoken', (done) => {
        const token = labelDB.label.invalidToken
        chai
            .request(server)
            .post('/addlabel/:id')
            .set({ authorization: token })
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });
    it('Given Token Should give true when payload is validate', (done) => {
        const token = labelDB.label.validToken;
        const labelName = {
            labelname: faker.lorem.word()
        }
        chai
            .request(server)
            .post('/addlabel/:id')
            .set({ authorization: token })
            .send(labelName)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            })
    })
    it('Should give true when service layer is giving response', (done) => {
        const token = labelDB.label.validToken;
        const labelName = {
            labelname: faker.lorem.word()
        }
        chai
            .request(server)
            .post('/addlabel/61d28e1906b3b1ccde87b8ba')
            .set({ authorization: token })
            .send(labelName)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            })
    })
    it('Should give true when model layer is giving response', (done) => {
        const token = labelDB.label.validToken;
        const labelName = {
            labelname: faker.lorem.word()
        }
        chai
            .request(server)
            .post('/addlabel/61d28e1906b3b1ccde87b8ba')
            .set({ authorization: token })
            .send(labelName)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            })
    })
    it.only('Should return true when note is belong to same user', (done) => {
        const token = labelDB.label.validToken;
        const labelName = {
            labelname: faker.lorem.word()
        }
        chai
            .request(server)
            .post('/addlabel/61d28e1906b3b1ccde87b8ba')
            .set({ authorization: token })
            .send(labelName)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            })
    })
    it.only('Should give true when fetched user is belong to labelInfo', (done) => {
        const token = labelDB.label.validToken;
        const labelName = {
            labelname: faker.lorem.word()
        }
        chai
            .request(server)
            .post('/addlabel/61d28e1906b3b1ccde87b8ba')
            .set({ authorization: token })
            .send(labelName)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            })
    })  
it.only('Should give true when new label is created', (done) => {
    const token = labelDB.label.validToken;
    const labelName = {
        labelname: faker.lorem.word()
    }
    chai
        .request(server)
        .post('/addlabel/61cc41d4db10efa515b4e1e8')
        .set({ authorization: token })
        .send(labelName)
        .end((err, res) => {
            res.should.have.status(200);
            done();
        })
}) 
})      




