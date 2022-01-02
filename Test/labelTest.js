const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
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
}); 