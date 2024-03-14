const { app } = require('@azure/functions');

app.cosmosDB('cosmosDBToStorage', {
    connectionStringSetting: process.env['polear-db_DOCUMENTDB'],
    databaseName: 'polear-db',
    collectionName: 'packages',
    createLeaseCollectionIfNotExists: true,
    handler: (documents, context) => {
        context.log(`Cosmos DB function processed ${documents.length} documents`);
    }
});



