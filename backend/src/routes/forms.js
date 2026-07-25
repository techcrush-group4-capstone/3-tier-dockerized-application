const router = require('express').Router();
const { body } = require('express-validator');
const ctrl = require('../controllers/formsController');

router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getOne);
router.post('/', [body('title').notEmpty(), body('fields').isArray()], ctrl.create);
router.put('/:id', ctrl.update);
router.delete('/:id', ctrl.remove);

module.exports = router;