const debug = require('debug')('server:conversation:router');
const router = require('express').Router();
const conversationService = require('./service');
const _ = require('underscore');

router.post('/conversation', (req, res) => {
    debug('POST /conversation');

    const body = _.pick(req.body, 'title', 'access', 'ownerList', 'memberList');

    conversationService.createConversation(body.title, body.access, body.ownerList, body.memberList)
        .then((conversation) => {
            res.status(200).json(conversation);
        })
        .catch((err) => {
            res.status(500).send(err);
        });
});

router.put('/conversation', (req, res) => {
    const id = req.body.id;

    const body = _.pick(req.body, 'id', 'title', 'access', 'memberList', 'ownerList');

    debug('PUT /conversation');

    createConversation.updateConversation(body.id, body.title, body.access, body.memberList, body.ownerList)
        .then((conversation) => {
            res.status(200).json(conversation);
        })
        .catch((err) => {
            res.status(500).send(err);
        });
});

router.get('/conversation/:id', (req, res) => {
    const id = req.params.id;

    debug('GET /conversation/' + id);

    conversationService.getConversation(id)
        .then((conversation) => {
            res.status(200).json(conversation);
        })
        .catch((err) => {
            res.status(500).send(err);
        });
});

router.get('/conversation/all', (req, res) => {
    debug('GET /conversation/all');

    conversationService.getAllConversations()
        .then((conversations) => {
            res.send(200).json(conversations);
        })
        .catch((err) => {
            res.send(500).send(err);
        });
});

router.get('/conversation/user', (req, res) => {
    debug('GET /conversation/user');

    const userId = req.session.user._id;

    conversationService.getUserConversations()
        .then((conversations) => {
            res.send(200).json(conversations);
        })
        .catch((err) => {
            res.status(500).send(err);
        });
});

router.delete('/conversation/:id', (req, res) => {
    const id = req.params.id;
    debug('DELETE /conversation/' + id);
    
    res.status(501).send('Not yet implemented');
});

module.exports = router;
