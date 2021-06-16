const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const { Schema } = mongoose

const ProjectSchema = new Schema({
	name: String,
	startDate: { type: Date, default: Date.now },
	endDate: { type: Date },
	teamSize: {type: Number, default: 0},
	budget: {type: Number, default: 0},
	expense: {type: Number, default: 0},
	status: { type: String, default: 'Working' }
}, {
	timestamps: true,
	versionKey: false
})


ProjectSchema.methods.gravatar = (size) => {
	if (!this.size) size = 200;
	if (!this.email) {
		return `https://gravatar.com/avatar/?s${size}&d=retro`
	} else {
		const md5 = bcrypt.hashSync(this.email, 10);
		return `https://gravatar.com/avatar/${md5}?s${size}&d=retro`
	}
}



module.exports = mongoose.model('Project', ProjectSchema)
