const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    //#swagger.tags=['Name']
    res.send('Alicia Thompson');});
    
router.use('/books', require('./books'));
router.use('/movies', require('./movies'));

module.exports = router;