const { app } = require('@azure/functions');
const db = require('./db.js');

app.http('feature-update', {
  methods: ['POST'],
  authLevel: 'anonymous',
  route: 'feature',
  handler: async function (request, context) {
    const requestData = await request.json();
    const { namespace = '', locale = '', library = null } = requestData;
  
    if (!namespace || !locale || !library) {
      return {
        status: 403,
        body: 'Bad request',
      };
    }

    await db.connect(process.env.MONGODB_URI);
    const connection = db.getConnection();
    const packages = connection.collection('packages');
    const resource = await packages.replaceOne({
      namespace,
      locale
    }, requestData);

    if (!resource) {
      return {
        status: 404,
        body: 'Resource not found',
      };
    }

    return {
      status: 204
    };
  }
});