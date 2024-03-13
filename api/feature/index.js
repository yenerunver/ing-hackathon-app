module.exports = async function (context, req) {
  try {
    context.res = [
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
    ];
  } catch(error) {
    const err = JSON.stringify(error);
    context.res = {
      status: 500,
      body: `Request error. ${err}`
    };
  }
};