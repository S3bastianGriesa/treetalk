const debug = require('debug')('server:conversation:router');
const router = require('express').Router();
const conversationService = require('./service');

router.get('/conversations', (req, res) => {
  debug('GET /conversations');
  conversationService.getAllConversations()
    .then((conversations) => {
      res.status(200).json(conversations);
    })
    .catch((err) => {
      console.error('GET /conversations ${err}');
      res.status(500).end();
    });
});

router.get('/conversations/:id', (req, res) => {
  debug('GET /conversations/${id}');
  const id = req.body.id;
  conversationService.getConversationById(id)
    .then((conversation) => {
      res.status(200).json(conversation);
    })
    .catch((err) => {
      console.error('GET /conversations/${id} ${err}');
      res.status(500).end();
    });
});

router.post('/conversations', (req, res) => {
  debug('POST /conversations');
  conversationService.createConversation(req.body.title, req.body.owner,
      req.body.access)
    .then((conversation) => {
      res.status(200).end();
    })
    .catch((err) => {
      console.error('POST /conversations ${err}');
      res.status(500).end();
    });
});

module.exports = router;
