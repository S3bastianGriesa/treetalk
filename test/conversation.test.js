const SERVER_URL = 'http://localhost:8000';

const should = require('should');
const request = require('supertest').agent(SERVER_URL);
const _ = require('underscore');

let testConversation = null;

describe('Conversation Module', () => {
    before((done) => {
        const loginData = {
            email: 'test@mocha.de',
            password: 'test'
        };

        request
            .post('/login')
            .send(loginData)
            .end((err, res) => {
                should.not.exist(err);
                done();
            });
    });

    describe('POST /conversations', () => {
        it('Should create a new conversation and return it', (done) => {
            const conversation = {
                title: 'Mocha Test Conversation',
                access: 'public'
            };

            request.post('/app/conversations')
                .send(conversation)
                .expect(200)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    should.not.exist(err);
                    res.status.should.equal(200);

                    const data = JSON.parse(res.text);

                    data.title.should.equal(conversation.title);
                    data.access.should.equal(conversation.access);
                    data.owner.should.not.be.null();
                    data.members.length.should.equal(1);
                    data.moderators.length.should.equal(0);

                    testConversation = data;

                    done();
                });
        });
    });

    describe('PUT /conversations/:id', () => {
        it('Should update a conversation and return it', (done) => {
            const properties = {
                title: 'TEST Changed Title',
                access: 'private'
            };

            request
                .put('/app/conversations/' + testConversation._id)
                .send(properties)
                .expect(200)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    should.not.exist(err);
                    res.status.should.equal(200);

                    const data = JSON.parse(res.text);

                    should.exist(data.owner);
                    data.title.should.equal(properties.title);
                    data.access.should.equal(properties.access);
                    data.members.should.containEql(data.owner);

                    testConversation = data;

                    done();
                });
        });
    });

    describe('GET /conversations', () => {
        it('Should return all conversations where the user is a member of', (done) => {
            request
                .get('/app/conversations')
                .expect(200)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    should.not.exist(err);
                    should.exist(res.text);
                    res.status.should.equal(200);

                    const data = JSON.parse(res.text);

                    data.should.containEql(testConversation);

                    done();
                });
        });

        it('Should return all conversations with public access', (done) => {
            request
                .get('/app/conversations?filter=public')
                .expect(200)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    should.not.exist(err);
                    should.exist(res.text);
                    res.status.should.equal(200);

                    const data = JSON.parse(res.text);

                    const isEveryConversationPublic = _.every(data, (conversation) => {
                        return conversation.access.should.equal('public');
                    });

                    if (isEveryConversationPublic) {
                        done();
                    } else {
                        done(new Error('Not all conversations are public'));
                    }
                });
        });
    });

    describe('GET /conversations/:id', () => {
        it('Should return a conversation where the user is a member of', (done) => {
            request
                .get('/app/conversations/' + testConversation._id)
                .expect(200)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    should.not.exists(err);
                    should.exist(res.text);
                    res.status.should.equal(200);

                    const data = JSON.parse(res.text);

                    data._id.should.equal(testConversation._id);
                    data.title.should.equal(testConversation.title);
                    data.access.should.equal(testConversation.access);

                    done();
                });
        });

        it('Should return an Error when the user is not a member of the conversation', (done) => {
            done(new Error('Not yet implemented'));
        });
    });

    describe('DELETE /conversations/:id', () => {
        it('Should delete a conversation where the user is the owner', (done) => {
            request
                .del('/app/conversations/' + testConversation._id)
                .expect(200)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    should.not.exist(err);
                    should.exist(res.text);
                    res.status.should.equal(200);

                    const data = JSON.parse(res.text);

                    data.should.eql(testConversation);

                    done();
                });
        });
    });
});
