const express = require('express');
const router = express.Router();

const magazineController =  require('../controller/magazines');
const validation = require('../middleware/validate');

router.get('/', magazineController.getAllMag);

router.get('/:id', magazineController.getSingleMag);

router.post('/', validation.saveMag, magazineController.createMag);

router.put('/:id', validation.saveMag, magazineController.updateMag);

router.delete('/:id', magazineController.deleteMag);

module.exports = router;