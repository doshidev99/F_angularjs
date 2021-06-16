const express = require('express');
const EmployeeController = require('../controllers/employeeController');

const router = express.Router();

router.post('/login', EmployeeController.login);
router.get('/getMe', EmployeeController.getMe);

module.exports = router;
