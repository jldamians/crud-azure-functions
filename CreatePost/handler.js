'use strict';

const { StatusCodes } = require('http-status-codes');
const { insertEntity } = require('../services/TableService');

const createPostHandler = async (context, req) => {
  try {
    const { blog, title, content } = req.body;

    const entity = {
      PartitionKey: { '_': blog },
      RowKey: { '_': new Date().getTime().toString() },
      title: { '_': title },
      content: { '_': content },
    };

    const result = await insertEntity('Posts', entity);

    context.res = {
      status: StatusCodes.OK,
      body: result,
    };

    context.done();
  } catch (error) {
		context.res = {
			status: StatusCodes.INTERNAL_SERVER_ERROR,
			body: error.message,
		};

		context.done();
  }
};

module.exports = createPostHandler;
