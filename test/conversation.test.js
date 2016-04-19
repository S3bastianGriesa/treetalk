const supertest = require('supertest');
const should = require('should');
const server = supertest.agent('http://localhost:8000'); //TODO: [JBI] Create a common test case which uses these dependencies

let userId;

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
                if (!err) {
                    userId = res.data.user._id;
                    done();
                } else {
                    return err;
                }
            });
    });

    describe('POST /conversations', () => {
        it('Should create a new Conversation and return it', (done) => {
            const conversation = {
                title: 'Mocha Test Conversation',
                access: 'public',
                owner: ''
            };

            server
                .post('/conversations')
                .send(conversation)
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    res.data.should.equal(conversation);
                    done();
                });
        });
    });

    describe('PUT /conversations/:id', () => {
        it('Should update a Conversation with new properties and return it', (done) => {

        });
    });

    describe('GET /users/:userId/conversations', () => {
        it('Should return all Conversations where the User is a member of', (done) => {
          server
          .get('/users/' + userId + '/conversations')
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            
          });
        });

        it('Should return an Error when the URL Parameter :userId is not the same as the logged in User ID', (done) => {

        });
    });

    describe('GET /conversations/:id', () => {
        it('Should return a Conversation where the User is a member of', (done) => {

        });

        it('Should return a Conversation where the User is not a member of but the User has an administrator role', (done) => {

        });

        it('Should return an Error when the User is not a member of the Conversation and has no admin role', (done) => {

        });

        it('Should return an Error when the Conversation is 1 to 1 and the User is not a member of it', (done) => {

        });
    });

    describe('DELETE /conversations/:id', () => {
        it('Should delete a Conversation when the User is the owner of it', (done) => {

        });

        it('Should delete a Conversation when the User has the admin role', (done) => {

        });

        it('Should delete a 1 to 1 Conversation when the User is a member of it', (done) => {

        });

        it('Should return an Error when the Conversation is a 1 to 1 Conversation and the User is no member of it', (done) => {

        });

        it('Should return an Error when the User is not the Owner of the Conversation', (done) => {

        });
    });
});
