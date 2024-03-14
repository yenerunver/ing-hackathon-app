const { app, input } = require('@azure/functions');

const cosmosInput = input.cosmosDB({
  databaseName: 'polear-db',
  collectionName: 'packages',
  namespace: '{id}',
  locale: '{locale}',
  connectionStringSetting: 'CosmosDBConnection',
});

app.http('feature-by-id-and-locale', {
  methods: ['GET'],
  authLevel: 'anonymous',
  route: 'feature/:id/:locale',
  extraInputs: [cosmosInput],
  handler: async function (request, context) {
    const locale = request.query.get('locale') || '';
    const id = request.query.get('id') || '';

    if (!locale || !id) {
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
            "locale": locale,
            "library": resource
          }
        )
    };
  }
});