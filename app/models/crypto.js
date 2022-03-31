const mongoose = require('mongoose')

const cryptoSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		dateCreated: {
			type: String,
			required: true,
		},
		totalSupply: {
			type: Number,
		},
		currentPrice:{
			type: Number,
			required: true,
		},
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model('Crypto', cryptoSchema)
