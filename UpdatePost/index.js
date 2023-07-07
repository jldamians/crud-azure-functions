'use strict';

const Joi = require('joi');
const { StatusCodes } = require('http-status-codes');
const MiddlewareHandler = require('azure-middleware');

const updatePostHandler = require('./handler');
const { validateBody } = require('../middlewares/validator');

const schema = Joi.object().keys({
	title: Joi.string().optional(),
	content: Joi.string().optional(),
}).or('title', 'content');

const updatePost = new MiddlewareHandler()
	.use((context) => {
		// this is where to put your middleware logic
		validateBody(context, context.req.body, schema);
		context.next();
	})
	.use(updatePostHandler)
	.catch((error, context) => {
		context.res = {
			status: StatusCodes.INTERNAL_SERVER_ERROR,
			body: error.message
		};
		context.done();
	})
	.listen();

module.exports = updatePost;
