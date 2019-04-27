var { mongoose } = require("../db/mongoose");

var Purchase = mongoose.model("Purchase", {
	username: {
		type: String,
		required: true
	},
	purchase: [
		{
			name: String,
			quantity: Number
		}
	]
});

module.exports = {
	Purchase
};