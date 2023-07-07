'use strict';

const azure = require('azure-storage');

const { queryEntities } = require('../services/TableService');

module.exports = async function (context, req) {
    try {
        const { id, blog } = context.bindingData;

        const query = new azure
            .TableQuery()
            .where("PartitionKey eq ? and RowKey eq ?", blog, id.toString());

        const result = await queryEntities('Posts', query);
         
        context.res = {
            status: 200,
            body: result.value[0]
        };
    } catch (error) {
        context.res = {
            status: 500,
            body: error.message
        };
    }
}