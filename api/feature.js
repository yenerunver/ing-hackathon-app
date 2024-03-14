const { app } = require('@azure/functions');
const { Schema, createConnection } = require('mongoose');

const connectionString = process.env.MONGODB_URI;

const connection = createConnection(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: true
});

app.http('feature', {
  methods: ['GET'],
  authLevel: 'anonymous',
  route: 'feature',
  handler: async function (request, context) {
    try {
      const resource = await connection.model('Packages', new Schema({ id: String }, {collection: 'packages'})).find({});

      return {
        body: JSON.stringify(resource)
      };
    } catch (e) {
      return {
        status: 400,
        error: JSON.stringify(e)
      }
    }
  }
});