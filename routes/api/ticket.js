var keystone = require('keystone');
var Ticket = keystone.list('Ticket').model;
var handlers = {
	list: async function (req, res) {
		const results = await Ticket.find().populate('assignedTo createdBy');
		res.status(200).send(results);
	},
};
module.exports = handlers;
