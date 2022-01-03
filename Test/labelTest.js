const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const faker = require('faker');
const labelDB = require('./label.json');
chai.use(chaiHttp);
const { expect } = require('chai');
chai.should();

describe('Add label by id api ', () => {
    it.only('AddLabelByIdby_Checkingserver', (done) => {
        chai
            .request(server)
            .post('/addlabel/:id')
            .end((err, res) => {
                res.should.have.status(500);
                done();
            });
    });
    it.only('Gives true when token is verify', (done) => {
        const token = labelDB.label.validToken
        chai
            .request(server)
            .post('/addlabel/:id')
            .set({ authorization: token })
            .end((err, res) => {
                res.should.have.status(201);
                done();
            });
    });
    it.only('Should Give false when token is not verify', (done) => {
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
    it.only('If payload of data is validated then it should give true', (done) => {
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
    it.only('Should give true when service layer give response', (done) => {
        const token = labelDB.label.validToken;
        const labelName = {
            labelname: faker.lorem.word()
        }
        chai
            .request(server)
            .post('/addlabel/61d28dcc06b3b1ccde87b8b6')
            .set({ authorization: token })
            .send(labelName)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            })
    })
    it.only('Should give false when service layer , is not returning appropriate response', (done) => {
        const token = labelDB.label.validToken;
        const labelName = {
            labelname: faker.lorem.word()
        }
        chai
            .request(server)
            .post('/addlabel/61d28dcc06b3b1ccde87b8b6')
            .set({ authorization: token })
            .send(labelName)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            })
    })
    it.only('Should give false when service layer , is returning null or undefine', (done) => {
        const token = labelDB.label.validToken;
        const labelName = {
            labelname: faker.lorem.word()
        }
        chai
            .request(server)
            .post('/addlabel/61d28dcc06b3b1ccde87b8b6')
            .set({ authorization: token })
            .send(labelName)
            .end((err, res) => {
                res.should.have.status(401);
                done();
            })
    })
}); 