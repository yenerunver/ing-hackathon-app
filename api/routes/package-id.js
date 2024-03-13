const packageId = router => {
  /* GET user per id. */
  router.get('/package/:id', function (req, res) {
    const response = {
      packageId: 'id'
    };
    res.send(response);
  });

  /* PUT user per id. */
  router.put('/package/:id', function (req, res) {
    const response = {
      response: 'create package id'
    };
    res.send(response);
  });

  /* POST user per id. */
  router.post('/package/:id', function (req, res) {
    const response = {
      response: 'update package id'
    };
    res.send(response);
  });

  /* DELETE user per id. */
  router.delete('/package/:id', function (req, res) {
    const response = {
      response: 'update package id'
    };
    res.send(response);
  });
}

export { packageId };