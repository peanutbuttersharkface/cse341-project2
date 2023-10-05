const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    //#swagger.tags=['Name']
    res.send('Alicia Thompson');});
    
router.use('/books', require('./books'));
router.use('/movies', require('./movies'));
router.use('/audio_books', require('./audio_books'));
router.use('/magazines', require('./magazines'));


module.exports = router;