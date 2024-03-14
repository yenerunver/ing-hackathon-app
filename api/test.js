const { app } = require('@azure/functions');

app.http('test', {
  methods: ['GET'],
  authLevel: 'anonymous',
  handler: async function (request, context) {
    return {
        body: 'deploy successful'
    };
  }
});