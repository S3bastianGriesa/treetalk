const debug = require('debug')('server:conversation:router');
const router = require('express').Router();
const conversationService = require('./service');
const conversationMiddleware = require('./middleware');
const _ = require('underscore');

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

    conversationService.updateConversation(req.params.id, properties)
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

router.get('/conversations', (req, res) => {
    debug('GET /conversations?filter=' + req.query.filter);

    let getConversationStrategy = conversationService.getUserConversations;
    let isUserRelatedFunctionCall = true;

    if (req.query.filter === 'public') {
        isUserRelatedFunctionCall = false;
        getConversationStrategy = conversationService.getPublicConversations;
    }

    if (req.query.filter === 'admin') {
        if (req.session.user.role === 'admin') {
            isUserRelatedFunctionCall = false;
            getConversationStrategy = conversationService.getAllConversations;
        }
    }

    let promise;

    if (isUserRelatedFunctionCall) {
        promise = getConversationStrategy(req.session.user._id);
    } else {
        promise = getConversationStrategy();
    }

    promise
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
