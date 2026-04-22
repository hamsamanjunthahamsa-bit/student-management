const express = require('express');
const router = express.Router();

const controller = require('../controllers/student.controller');
const validate = require('../middlewares/validation.middleware');

router.post('/', validate, controller.create);
router.get('/', controller.getAll);
router.get('/:id', controller.getOne);
router.put('/:id', validate, controller.update);
router.delete('/:id', controller.remove);

module.exports = router;