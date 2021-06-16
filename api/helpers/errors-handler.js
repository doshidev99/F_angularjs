function errorHandler(err, req, res, done) {
	if (err.name === 'UnauthorizedError') {
		return res.status(401).json({
			success: false,
			message: 'The user is not authorized'
		})
	}

	// if (err.name === 'ValidationError') {
	// 	return res.status(401).json({
	// 		success: false,
	// 		message: err
	// 	})
	// }

	return res.status(500).json({
		success: false,
		message: err
	})

}

module.exports = errorHandler