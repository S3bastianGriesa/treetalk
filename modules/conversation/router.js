const debug = require('debug')('server:conversation:router');
const router = require('express').Router();
const conversationService = require('./service');
const conversationMiddleware = require('./middleware');
const _ = require('underscore');

router.use('/:userId/conversations', conversationMiddleware.urlUserIdMustMatchSessionUserId);

router.post('/conversations', (req, res) => {
    debug('POST /conversations');
    debug('Body Content: ' + JSON.stringify(req.body, null, 2));

    conversationService.createConversation(req.body.title, req.body.access, req.params.userId)
        .then((conversation) => {
            res.status(200).json(conversation);
        })
        .catch((err) => {
            res.status(500).send(err);
        });
});

router.put('/conversations/:id', (req, res) => {
    debug('PUT /conversations/' + req.params.id);
    debug('Body Content: ' + JSON.stringify(req.body, null, 2));

    createConversation.updateConversation(req.params.id, req.body.title, req.body.access, req.body.memberList, req.body.ownerList)
        .then((conversation) => {
            res.status(200).json(conversation);
        })
        .catch((err) => {
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
            res.status(500).send(err);
        });
});

router.get('/:userId/conversations', (req, res) => {
    debug('GET /' + req.params.userId + '/conversations');

    conversationService.getUserConversations(req.params.userId)
        .then((conversations) => {
            res.status(200).json(conversations);
        })
        .catch((err) => {
            res.status(500).send(err);
        });
});

router.delete('/conversations/:id', (req, res) => {
    debug('DELETE /conversations/' + req.params.id);

    res.status(501).send('Not yet implemented');
});

module.exports = router;
