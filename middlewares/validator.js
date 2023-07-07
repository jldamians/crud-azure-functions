'use strict';

const { StatusCodes } = require('http-status-codes');

exports.validateBody = async (context, body, schema) => {
  try {
    if (!body) {
      context.res = {
        status: StatusCodes.BAD_REQUEST,
        body: 'Request body is empty'
      };

			context.done();

      return;
    }

    await schema.validateAsync(body);
  } catch (error) {
    context.res = {
      status: StatusCodes.BAD_REQUEST,
      body: error.message
    };

    context.done();
  }
};
