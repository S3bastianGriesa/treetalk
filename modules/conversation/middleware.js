const debug = require('debug')('server:conversaion:middleware');

class ConversationMiddleware {

    urlUserIdMustMatchSessionUserId(req, res, next) {
        debug('#urlUserIdMustMatchSessionUserId()');
        debug('URL Paramter User ID: ' + req.params.userId);
        debug('Session: ' + JSON.stringify(req.session, null, 2));
        debug('Session User: ' + JSON.stringify(req.session.user, null, 2));
        if (req.params.userId && req.session && req.session.user) {
            const urlUserId = req.params.userId;
            const sessionUserId = req.session.user._id;

            if (urlUserId === sessionUserId) {
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
