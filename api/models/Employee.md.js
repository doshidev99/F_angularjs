const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const { Schema } = mongoose

const EmployeeSchema = new Schema({
	name: String,
	password: String,
	email: { type: String, unique: true },
	zone: String,
	image: String,
	role: { type: String, default: 'Employee' },
	enrollDate: { type: Date, default: Date.now },
	status: { type: String, default: 'Working' }
}, {
	timestamps: true,
	versionKey: false
})


EmployeeSchema.methods.gravatar = (size) => {
	if (!this.size) size = 200;
	if (!this.email) {
		return `https://gravatar.com/avatar/?s${size}&d=retro`
	} else {
		const md5 = bcrypt.hashSync(this.email, 10);
		return `https://gravatar.com/avatar/${md5}?s${size}&d=retro`
	}
}



module.exports = mongoose.model('Employee', EmployeeSchema)
