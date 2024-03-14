const { app, input } = require('@azure/functions');

const cosmosInput = input.cosmosDB({
  databaseName: 'polear-db',
  collectionName: 'packages',
  namespace: '{id}',
  connectionStringSetting: 'CosmosDBConnection',
});

app.http('feature-by-id', {
  methods: ['GET'],
  authLevel: 'anonymous',
  route: 'feature/:id',
  extraInputs: [cosmosInput],
  handler: async function (request, context) {
    const id = request.query.get('id') || '';

    if (!id) {
      return {
        status: 403,
        body: 'Bad request!',
      };
    }

    const resource = context.extraInputs.get(cosmosInput);
    if (!resource) {
      return {
        status: 404,
        body: 'Resource not found',
      };
    }

    return {
      body: JSON.stringify(
        {
          "namespace": id,
          "locales": [],
          "libraries": resource
        }
      )
    };
  }
});