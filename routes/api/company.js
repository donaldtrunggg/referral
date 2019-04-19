var keystone = require('keystone');
var Company = keystone.list('Company').model;
var handlers = {
	list: async function (req, res) {
		const results = await Company.find();
		res.status(200).send(results);
	},
};
module.exports = handlers;
