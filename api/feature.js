const { app } = require('@azure/functions');

app.http('feature/:id', {
  methods: ['GET'],
  authLevel: 'anonymous',
  handler: async function (request, context) {
    const { id } = context.bindingdata;
    return {
        body: id
    };
  }
});

app.http('feature', {
  methods: ['GET'],
  authLevel: 'anonymous',
  handler: async function (request, context) {
    return {
        body: JSON.stringify(
          [
            {
              "id": "ing-feat-feet",
              "name": "My human readable package name 2",
              "description": "Because all decent package deserve a description that nobody will maintain",
              "locales": ["nl-NL"]
            },
            {
              "id": "ing-feat-back-pain",
              "name": "My human readable package name 2",
              "description": "Because all decent package deserve a description that nobody will maintain",
              "locales": ["nl-NL"]
            },
            {
              "id": "ing-feat-sugar-rush",
              "name": "My human readable package name 3",
              "description": "Because all decent package deserve a description that nobody will maintain",
              "locales": ["nl-NL"]
            }
          ]
      )};
  }
});

app