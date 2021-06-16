const expressJwt = require('express-jwt')
const config = require('../config')


function 	authJwt() {
	const secret = config.SECRET

	return expressJwt({
		secret,
		algorithms: ['HS256'],
		isRevoked
	}).unless({
		path: [
			{ url: /\/public\uploads(.*)/, methods: ['GET', 'OPTIONS'] },
			`${config.API}/accounts/login`
			// `${config.API}/accounts`
		]
	})
}

async function isRevoked(req, payload, done) {
	done();
}

module.exports = authJwt;