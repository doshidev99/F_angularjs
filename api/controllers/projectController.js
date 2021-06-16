const mongoose = require('mongoose')
const ProjectModel = require('../models/Project.md')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const config = require('../config')

exports.getAll = (req, res) => {
	return ProjectModel.find()
		.then((response) => {
			return res.status(200).json({
				success: true,
				message: 'Get Project ~successfully',
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

	return ProjectModel.findById(req.params.id).select('-password')
		.then((project) => {
			return res.status(200).json({
				success: true,
				message: 'Get Project ~successfully',
				payload: project
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

	const newEmployee = new ProjectModel({
		...req.body,
		password: bcrypt.hashSync(password)
	});

	newEmployee.image = newEmployee.gravatar();

	return newEmployee.save()
		.then((project) => {
			return res.status(200).json({
				success: true,
				message: 'Get Project ~successfully',
				payload: project
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

	return await ProjectModel.findOneAndDelete(req.params.id)
		.then((response) => {
			return res.status(200).json({
				success: true,
				message: 'Delete Project ~successfully',
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
	const currentEmployee = await ProjectModel.findById(req.params.id).select('-password')
	const { password } = req.body

	const newPassword = password ? bcrypt.hashSync(password) : currentEmployee.password;

	const newEmployee = {
		...req.body,
		password: newPassword
	}

	return await ProjectModel.findByIdAndUpdate(req.params.id, newEmployee, { new: true }).select('-password')
		.then((response) => {
			return res.status(200).json({
				success: true,
				message: 'Update Project ~successfully',
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
