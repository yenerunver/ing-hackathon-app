const { app } = require('@azure/functions');

app.http('feature', {
  methods: ['GET'],
  authLevel: 'anonymous',
  handler: async function (request, context) {
    const locale = request.query.get('locale') || '';
    const id = request.query.get('id') || '';

    if (locale && id) {
      return {
        body: JSON.stringify(
          {
            "namespace": "ing-feat-feet",
            "locale": "nl-NL",
            "library": {
              sample: 'json'
            }
          }
        )};
    }

    if (id) {
      return {
        body: JSON.stringify(
          {
            "namespace": "ing-feat-feet",
            "locales": ["en-GB", "nl-NL"],
            "libraries": {
              "en-GB": {
                sample: 'json'
              },
              "nl-NL": {
                sample: 'json'
              }
            }
          }
        )};
    }

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