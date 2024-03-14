const { app, input } = require('@azure/functions');

const cosmosInput = input.cosmosDB({
  databaseName: 'polear-db',
  collectionName: 'packages',
  connectionStringSetting: 'CosmosDBConnection',
});

app.http('feature', {
  methods: ['GET'],
  authLevel: 'anonymous',
  route: 'feature',
  extraInputs: [cosmosInput],
  handler: async function (request, context) {
    try {
      const resource = context.extraInputs.get(cosmosInput);

      return {
        body: JSON.stringify(resource)
      };
    } catch (e) {
      return {
        body: JSON.stringify(e)
      }
    }
  }
});

app