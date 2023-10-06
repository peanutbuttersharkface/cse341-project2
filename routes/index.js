const router = require('express').Router();
const passport = require('passport');

router.use('/', require('./swagger'));
router.use('/books', require('./books'));
router.use('/movies', require('./movies'));
router.use('/audio_books', require('./audio_books'));
router.use('/magazines', require('./magazines'));

router.get('/login', passport.authenticate('github'), (req, res) => {});

router.get('/logout', function(req, res, next) {
    req.logout(function(err){
        if(err){ return next(err);} 
        res.redirect ('/');
    });
});

module.exports = router;