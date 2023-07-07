'use strict';

const azure = require('azure-storage');

const { queryEntities } = require('../services/TableService');

module.exports = async function (context, req) {
    try {
        const blog = context.bindingData.blog;

        var query = new azure.TableQuery().where("PartitionKey eq ?", blog);

        const result = await queryEntities('Posts', query);
         
        context.res = {
            status: 200,
            body: result
        };
    } catch (error) {
        context.res = {
            status: 500,
            body: error.message
        };
    }
}