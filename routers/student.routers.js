const express = require('express');
const router = express.Router();

const controller = require('../controllers/student.controller');
const validate = require('../middlewares/validation.middleware');
const { authenticate } = require('../middlewares/auth.middleware');

// All student routes now require authentication
router.post('/', authenticate, validate, controller.create);
router.get('/', authenticate, controller.getAll);
router.get('/:id', authenticate, controller.getOne);
router.put('/:id', authenticate, validate, controller.update);
router.delete('/:id', authenticate, controller.remove);

module.exports = router;