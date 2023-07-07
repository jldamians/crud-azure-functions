'use strict';

const { insertEntity } = require('../services/TableService');

module.exports = async function (context, req) {
    try {
        if (!req.body) {
            context.res = {
                status: 400,
                body: 'Please pass a request body',
            };
            return;
        }

        const { blog, title, content } = req.body;

        if (!blog || !title || !content) {
            context.res = {
                status: 400,
                body: 'Please pass blog, title and content',
            };
            return;
        }

        const entity = {
            PartitionKey: { '_': blog },
            RowKey: { '_': new Date().getTime().toString() },
            title: { '_': title },
            content: { '_': content },
        };

        const result = await insertEntity('Posts', entity);

        context.res = {
            status: 200,
            body: result,
        };        
    } catch (error) {
        context.res = {
            status: 500,
            body: error.message,
        };    
    }
}