const express = require('express');
const EmployeeController = require('../controllers/employeeController');

const router = express.Router();

router.get('/', EmployeeController.getAll);
router.get('/:id', EmployeeController.getOne);
router.post('/', EmployeeController.create);
router.put('/:id', EmployeeController.update);
router.delete('/:id', EmployeeController.delete);
router.post('/login', EmployeeController.login);

module.exports = router;
