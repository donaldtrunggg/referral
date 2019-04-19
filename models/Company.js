var keystone = require('keystone');
var Types = keystone.Field.Types;

var Company = new keystone.List('Company', {
	autokey: { from: 'title', path: 'slug', unique: true },
});

var storage = new keystone.Storage({
	adapter: keystone.Storage.Adapters.FS,
	fs: {
		path: keystone.expandPath('./public/uploads/company-images'),
		publicPath: '/uploads/company-images/',
	},
	schema: {
		url: true,
	},
});

Company.schema.virtual('url').get(function () {
	return '/companies/' + this.slug;
});

Company.add({
	name: { type: String, initial: true, default: '', required: true },
	description: { type: Types.Textarea },
	logo: { type: Types.File, storage: storage, thumb: true },
	companySlug: Types.Url,
	createdAt: { type: Types.Datetime, default: Date.now },
	updatedAt: { type: Types.Datetime, default: Date.now },
});

Company.defaultColumns = 'name|20%, slug, logo|15%, description, createdAt';

Company.register();
