const supertest = require('supertest');
const should = require('should');
const server = supertest.agent('http://localhost:8000'); //TODO: [JBI] Create a common test case which uses these dependencies
const _ = require('underscore');

describe('Conversation Module', () => {
    before(() => {
        const loginData = {
            email: 'test@mocha.de',
            password: 'mocha'
        };

        server
            .post('/login')
            .send(loginData)
            .end((err, res) => {
                should.not.exists(err);
                server.saveCookies(res);
            });
    });

    describe('POST /conversations', () => {
        it('Should create a new conversation and return it', (done) => {
            const conversation = {
                title: 'Mocha Test Conversation',
                access: 'public'
            };

            server
                .post('/conversations')
                .send(conversation)
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.data.title.should.equal(conversation.title);
                    res.data.access.should.equal(conversation.access);
                    res.data.owner.should.not.be.null();
                    res.data.members.length.should.equal(1);
                    done();
                });
        });
    });

    describe('PUT /conversations/:id', () => {
        it('Should update a conversation with new properties and and return the old data it', (done) => {

        });
    });

    describe('GET /conversations', () => {
        it('Should return all conversations where the user is a member of', (done) => {
            server
                .get('/users/' + userId + '/conversations')
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    should.not.exists(err);
                    res.should.have.status(200);
                    res.data.should.not.be.null();
                    done();
                });
        });

        it('Should return all conversations with public access', (done) => {
            server
                .get('/app/conversations?filter=public')
                .expect(200)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    should.not.exists(err);
                    res.should.have.status(200);
                    res.data.should.not.be.null();
                    //TODO: [JBI] iterate over array and validate with should
                    res.data[0].access.should.equal('public');
                    done();
                });
        });
    });

    describe('GET /conversations/:id', () => {
        let testConversation = null;

        before(() => {
            const testConversationData = {
                title: 'TEST GET /conversation/:id',
                access: 'public'
            };

            server
                .post('/app/conversations')
                .send(testConversationData)
                .end((err, res) => {
                    testConversation = res.data;
                });
        });

        it('Should return a conversation where the user is a member of', (done) => {
            server
                .get('/app/conversations/' + testConversation._id)
                .expect(200)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    should.not.exists(err);
                    res.data._id.should.equals(testConversation._id);
                    res.data.title.should.equals(testConversation.title);
                    res.data.access.should.equals(testConversation.access);
                    done();
                });
        });

        it('Should return an Error when the user is not a member of the conversation', (done) => {
        });
    });

    describe('DELETE /conversations/:id', () => {
    });
});
