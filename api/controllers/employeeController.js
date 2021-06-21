const mongoose = require('mongoose')
const EmployeeModel = require('../models/Employee.md')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const config = require('../config')

exports.getAll = (req, res) => {
	return EmployeeModel.find()
		.then((response) => {
			return res.status(200).json({
				success: true,
				message: 'Get Employee ~successfully',
				payload: response
			})
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				success: false,
				message: 'Server error. Please try again.',
				error: error.message,
			})
		})
}


exports.getOne = async (req, res) => {

	return EmployeeModel.findById(req.params.id).select('-password')
		.then((employee) => {
			return res.status(200).json({
				success: true,
				message: 'Get Employee ~successfully',
				payload: employee
			})
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				success: false,
				message: 'Server error. Please try again.',
				error: error.message,
			})
		})
}

exports.create = (req, res) => {
	const { password } = req.body

	const newEmployee = new EmployeeModel({
		...req.body,
		password: bcrypt.hashSync(password)
	});

	newEmployee.image = newEmployee.gravatar();

	return newEmployee.save()
		.then((employee) => {
			return res.status(200).json({
				success: true,
				message: 'Get Employee ~successfully',
				payload: employee
			})
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				success: false,
				message: 'Server error. Please try again.',
				error: error.message,
			})
		})
}

exports.delete = async (req, res) => {

	return await EmployeeModel.deleteOne({_id: req.params.id})
		.then((response) => {
			return res.status(200).json({
				success: true,
				message: 'Delete Employee ~successfully',
			})
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				success: false,
				message: 'Server error. Please try again.',
				error: 'Please check again!',
			})
		})
}
exports.update = async (req, res) => {
	const currentEmployee = await EmployeeModel.findById(req.params.id).select('-password')
	const { password } = req.body

	const newPassword = password ? bcrypt.hashSync(password) : currentEmployee.password;

	const newEmployee = {
		...req.body,
		password: newPassword
	}

	return await EmployeeModel.findByIdAndUpdate(req.params.id, newEmployee, { new: true }).select('-password')
		.then((response) => {
			return res.status(200).json({
				success: true,
				message: 'Update Employee ~successfully',
				payload: response
			})
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				success: false,
				message: 'Server error. Please try again.',
				error: error.message,
			})
		})
}



exports.login = async (req, res) => {
	try {
		const { password, email } = req.body
		const currentEmployee = await EmployeeModel.findOne({ email })

		if (!currentEmployee) {
			return res.status(500).json({
				success: false,
				message: 'The Employee Not found!',
			})
		}

		if (currentEmployee && bcrypt.compareSync(password, currentEmployee.password)) {
			const token = jwt.sign({
				employeeId: currentEmployee._id,
			}, config.SECRET, { expiresIn: '1d' })

			res.status(200).json({
				success: true,
				message: 'Login ~successfully',
				_id: currentEmployee._id,
				payload: currentEmployee.email,
				token
			})
		} else {
			res.status(400).json({
				success: false,
				message: 'password is correct',
			})
		}

	} catch (error) {
		console.log(error)
		res.status(500).json({
			success: false,
			message: 'Server error. Please try again.',
			error: error.message,
		})
	}
}

exports.getMe = async (req, res) => {
	try {
		const currentEmployee = await EmployeeModel.findById(req.user.employeeId).select('-password');

		if (!currentEmployee) {
			res.status(500).json({
				success: false,
				message: 'The Employee not found!',
			})
		}

		res.status(200).json({
			success: false,
			message: 'Get Employee successfully!',
			payload: currentEmployee
		})

	} catch (error) {
		console.log(error)
		res.status(500).json({
			success: false,
			message: 'The employee can\'t retrieved',
			error: error.message,
		})
	}
}