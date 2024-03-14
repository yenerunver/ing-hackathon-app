const { app } = require("@azure/functions");

app.http('feature-test/:id', {
  methods: ['GET'],
  authLevel: 'anonymous',
  handler: async function (request, context) {
    return {
      body: JSON.stringify({
        request,
        context
      })
    };
  }
});