const { app } = require('@azure/functions');
const db = require('./db.js');

app.http('feature-by-id', {
  methods: ['GET'],
  authLevel: 'anonymous',
  route: 'feature/{id}',
  handler: async function (request, context) {
    await db.connect(process.env.MONGODB_URI);
    const connection = db.getConnection();
    const packages = connection.collection('packages');
    const cursor = await packages.find({
      namespace: request.params.id
    });

    if (cursor.length === 0) {
      return {
        status: 404,
        body: 'Resource not found',
      };
    }

    const libraries = {};
    for await (const doc of cursor) {
      libraries[doc.locale] = doc.library;
    }

    return {
      body: JSON.stringify(
        {
          "namespace": request.params.id,
          "locales": Object.keys(libraries),
          "libraries": libraries
        }
      )
    };
  }
});