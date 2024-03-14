const { app } = require('@azure/functions');
const db = require('./db.js')


app.http('feature', {
  methods: ['GET'],
  authLevel: 'anonymous',
  route: 'feature',
  handler: async function (request, context) {
    try {
      await db.connect(process.env.MONGODB_URI);
      const connection = db.getConnection();
      const packages = connection.collection('packages');
      const cursor = await packages.find({});
      const resource = {};
      for await (const doc of cursor) {
        if(!resource[doc.namespace]) {
          resource[doc.namespace] = [];
        }

        if (!resource[doc.namespace].includes(doc.locale)){
          resource[doc.namespace].push(doc.locale);
        }
      }

      return {
        body: JSON.stringify(Object.keys(resource).map(namespace => ({
          namespace,
          locales: resource[namespace],
        })))
      };
    } catch (e) {
      console.log(e)
      return {
        status: 400,
        error: JSON.stringify(e)
      }
    }
  }
});