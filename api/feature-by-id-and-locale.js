const { app } = require('@azure/functions');
const db = require('./db.js');

app.http('feature-by-id-and-locale', {
  methods: ['GET'],
  authLevel: 'anonymous',
  route: 'feature/{id}/{locale}',
  handler: async function (request, context) {
    await db.connect(process.env.MONGODB_URI);
    const connection = db.getConnection();
    const packages = connection.collection('packages');
    const resource = await packages.findOne({
      namespace: request.params.id,
      locale: request.params.locale
    });

    if (!resource) {
      return {
        status: 404,
        body: 'Resource not found',
      };
    }

    return {
      body: JSON.stringify(
        {
          "namespace": request.params.id,
          "locale": request.params.locale,
          "library": resource.package
        }
      )
    };
  }
});