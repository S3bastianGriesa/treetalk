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

                    data.title.should.equal(properties.title);
                    data.access.should.equal(properties.access);

                    testConversation = data;
                    //TODO: [JBI] find a way to add moderators and members and test if they were added

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
        let testConversation = null;

        before(() => {
            const testConversationData = {
                title: 'TEST GET /conversation/:id',
                access: 'public'
            };

            request
                .post('/app/conversations')
                .send(testConversationData)
                .end((err, res) => {
                    testConversation = res.data;
                    done(new Error('Not yet implemented'));
                });
        });

        it('Should return a conversation where the user is a member of', (done) => {
            request
                .get('/app/conversations/' + testConversation._id)
                .expect(200)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    should.not.exists(err);
                    res.data._id.should.equals(testConversation._id);
                    res.data.title.should.equals(testConversation.title);
                    res.data.access.should.equals(testConversation.access);
                    done(new Error('Not yet implemented'));
                });
        });

        it('Should return an Error when the user is not a member of the conversation', (done) => {
            done(new Error('Not yet implemented'));
        });
    });

    describe('DELETE /conversations/:id', () => {});
});
