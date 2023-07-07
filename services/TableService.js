'use strict';

const azure = require('azure-storage');

const AZURE_STORAGE_CONNECTION_STRING = 'myrestapipractice';
const AZURE_STORAGE_ACCESS_KEY = process.env.AZURE_STORAGE_ACCESS_KEY;

const tableSvc = azure.createTableService(
  AZURE_STORAGE_CONNECTION_STRING, 
  AZURE_STORAGE_ACCESS_KEY);

const insertEntity = (table, entity) => {
  return new Promise((resolve, reject) => {
    tableSvc.insertEntity(table, entity, { 
      echoContent: true,
      payloadFormat: 'application/json;odata=nometadata' }, (error, _result, response) => {
      if (error) {
        reject(error);
      } else {
        resolve(response.body);
      }
    });
  });
};

const queryEntities = (table, query) =>{
  return new Promise((resolve, reject) => {
    tableSvc.queryEntities(
      table, 
      query, 
      null,
      { payloadFormat: 'application/json;odata=nometadata' }, 
      (error, _result, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response.body);
        }
    });
  });
}

const updateEntity = (table, entity) => {
  return new Promise((resolve, reject) => {
    tableSvc.mergeEntity(table, entity, (error, _result, _response) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

const deleteEntity = (table, entity) => {
  return new Promise((resolve, reject) => {
    tableSvc.deleteEntity(table, entity, (error, _result, _response) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  }); 
}

exports.insertEntity = insertEntity;
exports.queryEntities = queryEntities;
exports.updateEntity = updateEntity;
exports.deleteEntity = deleteEntity;