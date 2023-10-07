const express = require('express');
const router = express.Router();
const magazineController =  require('../controller/magazines');
//const validation = require('../middleware/validate');
const {isAuthenticated } = require("../middleware/authenticate");


router.get('/', magazineController.getAllMags);

router.get('/:id', magazineController.getSingleMag);

router.post('/', isAuthenticated, magazineController.createMag);

router.put('/:id', isAuthenticated, magazineController.updateMag);

router.delete('/:id', isAuthenticated, magazineController.deleteMag);

module.exports = router;