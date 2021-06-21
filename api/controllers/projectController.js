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
	const newEmployee = new ProjectModel({
		...req.body,
	});

	return newEmployee.save()
		.then((project) => {
			return res.status(200).json({
				success: true,
				message: 'Create Project ~successfully',
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

	return await ProjectModel.deleteOne({ _id: req.params.id })
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
	// const currentProject = await ProjectModel.findById(req.params.id);

	const newProject = {
		...req.body,
	}

	return await ProjectModel.findByIdAndUpdate(req.params.id, newProject, { new: true })
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
