const debug = require('debug')('server:conversation:router');
const router = require('express').Router();
const conversationService = require('./service');
const conversationMiddleware = require('./middleware');
const _ = require('underscore');

router.use('/users/:userId/conversations', conversationMiddleware.urlUserIdMustMatchSessionUserId);

router.post('/conversations', (req, res) => {
    debug('POST /conversations');
    debug('Body Content: ' + JSON.stringify(req.body, null, 2));

    conversationService.createConversation(req.body.title, req.body.access, req.session.user._id)
        .then((conversation) => {
            res.status(200).json(conversation);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send(err);
        });
});

router.put('/conversations/:id', (req, res) => {
    debug('PUT /conversations/' + req.params.id);
    debug('Body Content: ' + JSON.stringify(req.body, null, 2));

    const properties = _.pick(req.body, 'title', 'access', 'moderators', 'members');

    createConversation.updateConversation(req.params.id, properties)
        .then((conversation) => {
            res.status(200).json(conversation);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send(err);
        });
});

router.get('/conversations/:id', (req, res) => {
    debug('GET /conversations/' + req.params.id);

    conversationService.getConversation(req.params.id)
        .then((conversation) => {
            res.status(200).json(conversation);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send(err);
        });
});

router.get('/users/:userId/conversations', (req, res) => {
    debug('GET /users/' + req.params.userId + '/conversations');

    conversationService.getUserConversations(req.params.userId)
        .then((conversations) => {
            res.status(200).json(conversations);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send(err);
        });
});

router.delete('/conversations/:id', (req, res) => {
    debug('DELETE /conversations/' + req.params.id);

    conversationService.removeConversation(req.params.id)
        .then((conversation) => {
            res.status(200).json(conversation);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send(err);
        });
});

module.exports = router;
