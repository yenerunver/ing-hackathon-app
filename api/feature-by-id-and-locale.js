const { app, input } = require('@azure/functions');
const db = require('./db.js')

app.http('feature-by-id-and-locale', {
  methods: ['GET'],
  authLevel: 'anonymous',
  route: 'feature/{id}/{locale}',
  handler: async function (request, context) {
    const locale = request.query.get('locale') || '';
    const id = request.query.get('id') || '';

    if (!locale || !id) {
      return {
        status: 403,
        body: 'Bad request!',
      };
    }

    await db.connect(process.env.MONGODB_URI);
    const connection = db.getConnection(process.env.MONGODB_URI);
    const packages = connection.collection('packages');
    const cursor = await packages.find({});
    const resource = [];
    for await (const doc of cursor) {
      resource.push(doc);
    }


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