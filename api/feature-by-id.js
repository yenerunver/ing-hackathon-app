const { app } = require('@azure/functions');
const db = require('./db.js')


app.http('feature-by-id', {
  methods: ['GET'],
  authLevel: 'anonymous',
  route: 'feature/{id}',
  handler: async function (request, context) {
    if (!id) {
      return {
        status: 403,
        body: 'Bad request!',
      };
    }
    await db.connect(process.env.MONGODB_URI);
    const connection = db.getConnection();
    const packages = connection.collection('packages');
    const cursor = await packages.find({});
    const resource = await packages.findOne({});
    // const resource = [];
    // for await (const doc of cursor) {
    //   resource.push(doc);
    // }


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
          "libraries": resource,
          "request": request,
          "context": context
        }
      )
    };
  }
});