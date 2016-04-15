const debug = require('debug')('server:conversaion:middleware');

class ConversationMiddleware {

    urlUserIdMustMatchSessionUserId(req, res, next) {
        debug('UrlUserIdMustMatchSessionUserId Session Object: ' + JSON.stringify(req.session, null, 2));
        debug('UrlUserIdMustMatchSessionUserId Session User Object: ' + JSON.stringify(req.session.user, null, 2));
        debug('UrlUserIdMustMatchSessionUserId Session User Object ID: ' + req.session.user._id);
        debug('UrlUserIdMustMatchSessionUserId URL Paramter User ID: ' + req.params.userId);

        if (req.params.userId && req.session && req.session.user && req.session.user._id) {
            const urlUserId = req.params.userId;
            const sessionUserId = req.session.user._id;

            if (urlUserId == sessionUserId) {
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
