const supertest = require('supertest');
const should = require('should');
const request = supertest.agent('http://localhost:8000'); //TODO: [JBI] Create a common test case which uses these dependencies
const _ = require('underscore');

describe('Conversation Module', () => {
    before((done) => {
        const loginData = {
            email: 'test@mocha.de',
            password: 'mocha'
        };

        request
            .post('/login')
            .send(loginData)
            .end((err, res) => {
                should.not.exist(err);
                request.saveCookies(res);
                done();
            });
    });

    describe('POST /conversations', () => {
        it('Should create a new conversation and return it', (done) => {
            const conversation = {
                title: 'Mocha Test Conversation',
                access: 'public'
            };

            request
                .post('/conversations')
                .send(conversation)
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    should.not.exist(err);
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
        let testConversation = null;
        before((done) => {
            testConversation = createTestConversation('TEST_PUT_TITLE', 'public');
            done();
        });

        it('Should update a conversation and return it', (done) => {
            const properties = {
                title: 'TEST Changed Title',
                access: 'private',
                moderators: ['TEST_USER_ID']
            };

            request
                .put('/app/conversations/' + testConversation._id)
                .send(properties)
                .expect(200)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if (err) return done(err);
                    res.status.should.equal(200);
                    res.data.title.should.equal(properties.title);
                    res.data.access.should.equal(properties.access);
                    res.data.moderators.should.containEql('TEST_USER_ID');
                    res.data.members.should.containEql('TEST_USER_ID');
                    done();
                });
        });
    });

    describe('GET /conversations', () => {
        it('Should return all conversations where the user is a member of', (done) => {
            request
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
            request
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

            request
                .post('/app/conversations')
                .send(testConversationData)
                .end((err, res) => {
                    testConversation = res.data;
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
                    done();
                });
        });

        it('Should return an Error when the user is not a member of the conversation', (done) => {});
    });

    describe('DELETE /conversations/:id', () => {});
});

function createTestConversation(title, access) {
    request
        .post('/app/conversations')
        .send({
            title: title,
            access: access
        })
        .end((err, res) => {
            if (err) return done(err);
            return res.data;
        });
}
