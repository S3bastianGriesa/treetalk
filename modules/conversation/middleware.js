class ConversationMiddleware {

    urlUserIdMustMatchSessionUserId(req, res, next) {
        if (req.params.userId && req.session && req.session.user) {
            const urlUserId = req.params.userId;
            const sessionUserId = req.session.user._id;

            if(urlUserId === sessionUserId) {
              next();
            } else {
              res.status(503).send('Unauthorized');
            }
        } else {
          res.status(503).send('Unauthorized');
        }
    }

}

module.exports = new ConversationMiddleware();
