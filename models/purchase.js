var { mongoose } = require("../db/mongoose");

var Purchase = mongoose.model("Purchase", {
	userName: {
		type: String,
		required: true
	},
	quantity: {
		type: Number,
		required: true
	},
	productId: {
		type: Number,
		required: true
	},
	purchaseDate: {
		type: Date,
		required: true
	}
});

module.exports = {
	Purchase
};