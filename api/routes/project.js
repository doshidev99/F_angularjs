const express = require('express');
const ProjectController = require('../controllers/projectController');

const router = express.Router();

router.get('/', ProjectController.getAll);
router.get('/:id', ProjectController.getOne);
router.post('/', ProjectController.create);
router.put('/:id', ProjectController.update);
router.delete('/:id', ProjectController.delete);

module.exports = router;
