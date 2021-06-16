const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const logger = require('morgan')
const cors = require('cors');

const config = require('./config')

const authJwt = require('./helpers/jwt')
const errorHandler = require('./helpers/errors-handler')

const employeeRoute = require('./routes/employee')
const accountRoute = require('./routes/account')
const projectRoute = require('./routes/project')

const app = express()
app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(logger('dev'))
app.use(cors())
app.options(config.URL, cors());

app.use(authJwt())
app.use(errorHandler)

mongoose.connect('mongodb://localhost:27017/fptShop', { useNewUrlParser: true })
	.then(() => {
		console.log('Database connected')
	})
	.catch((error) => {
		console.log('Error connecting to database', error)
	})


app.get('/', (req, res) => {
	res.status(200).json({
		message: 'Welcome to Project with Nodejs Express and MongoDB',
	})
})

app.use('/v1/api/employee', employeeRoute)
app.use('/v1/api/accounts', accountRoute)
app.use('/v1/api/project', projectRoute)

app.listen(3000, () => {
	console.log('Server up')
})