const { app } = require('@azure/functions');
const db = require('./db.js');

app.http('feature-update', {
  methods: ['POST'],
  authLevel: 'anonymous',
  route: 'feature',
  handler: async function (request, context) {
    const { namespace = '', locale = '', library = null } = request.body;
    if (!namespace || !locale || !library) {
      return {
        status: 403,
        body: JSON.stringify(context),
      };
    }

    await db.connect(process.env.MONGODB_URI);
    const connection = db.getConnection();
    const packages = connection.collection('packages');
    const resource = await packages.replaceOne({
      namespace,
      locale
    }, request.body);

    if (!resource) {
      return {
        status: 404,
        body: 'Resource not found',
      };
    }

    return {
      status: 200,
      body: JSON.stringify(resource)
    };
  }
});