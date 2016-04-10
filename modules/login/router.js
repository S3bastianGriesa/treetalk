const router = require('express').Router();
const authenticationService = require('authentication').service;

router.get('/login', (req, res) => {
    res.sendFile('/login.html', {
        root: './public'
    });
});

router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    authenticationService.login(email, password)
        .then((authentication) => {
            if (authentication.isAuthenticated) {
                req.session.user = authentication.user;
                res.redirect('/app/chat');
            } else {
                res.redirect('/login');
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(400).send(err);
        });
});

router.get('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy();
    }
    res.redirect('/login');
});

module.exports = router;
