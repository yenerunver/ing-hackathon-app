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
      const resource = await packages.findOne({});
      // const resource = [];
      // for await (const doc of cursor) {
      //   resource.push(doc);
      // }

      return {
        body: JSON.stringify(resource)
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