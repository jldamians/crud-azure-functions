'use strict';

const { StatusCodes } = require('http-status-codes');
const { updateEntity } = require('../services/TableService');

const updatePostHandler = async (context, req) => {
	try {
		const { title, content } = req.body;

		const {id, blog} = context.bindingData;

		const entity = {
				PartitionKey: { '_': blog },
				RowKey: { '_': id.toString() },
		};

		if (title) {
				entity.title = { '_': title };
		}

		if (content) {
				entity.content = { '_': content };
		}

		await updateEntity('Posts', entity);

		context.done();
	} catch (error) {
		context.res = {
			status: StatusCodes.INTERNAL_SERVER_ERROR,
			body: error.message,
		};

		context.done();
	}
}

module.exports = updatePostHandler;
