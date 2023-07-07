'use strict';

const { deleteEntity } = require('../services/TableService');

module.exports = async function (context, req) {
    try {
        const { id, blog} = context.bindingData;

        const entity = {
            PartitionKey: { '_': blog },
            RowKey: { '_': id.toString() }
        };

        await deleteEntity('Posts', entity);        
    } catch (error) {
        context.res = {
            status: 500,
            body: error.message
        };   
    }
}