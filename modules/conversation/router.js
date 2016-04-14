const debug = require('debug')('server:conversation:router');
const router = require('express').Router();
const conversationService = require('./service');
const _ = require('underscore');

router.post('/conversation', (req, res) => {
    debug('POST /conversation');
    debug('Body Content: ' + JSON.stringify(req.body, null, 2));
    
    conversationService.createConversation(req.body.title, req.body.access)
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

router.get('/conversation', (req, res) => {
    debug('GET /conversation');

    const filterMode = req.query.filter;
    let query = null;

    if (filterMode === 'public') {
        query = conversationService.getPublicConversations;
    } else if (filterMode === 'user') {
        query = conversationService.getUserConversations;
    } else if (filterMode === 'all') {
        query = conversationService.getAllConversations;
    } else {
        res.status(400).send('Wrong filter value given: ' + filterMode);
    }

    if (filterMode !== null && filterMode !== undefined) {
        query()
            .then((conversations) => {
                res.status(200).json(conversations);
            })
            .catch((err) => {
                res.status(500).send(err);
            });
    }
});

router.delete('/conversation/:id', (req, res) => {
    const id = req.params.id;
    debug('DELETE /conversation/' + id);

    res.status(501).send('Not yet implemented');
});

module.exports = router;
