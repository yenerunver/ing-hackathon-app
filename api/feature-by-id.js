const { app } = require('@azure/functions');
const { Schema, createConnection } = require('mongoose');

const connectionString = process.env.MONGODB_URI;

const connection = createConnection(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: true
});

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

    const resource = await connection.model('Packages', new Schema({ id: String }, {collection: 'packages'})).find({})
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