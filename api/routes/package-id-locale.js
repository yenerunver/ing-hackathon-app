const packageIdLocale = router => {
  /* GET user id locale. */
  router.get('/package/:id/:locale', function (req, res) {
    const response = {
      packageId: 'id'
    };
    res.send(response);
  });

  /* PUT user id locale. */
  router.put('/package/:id/:locale', function (req, res) {
    const response = {
      response: 'create package id locale'
    };
    res.send(response);
  });

  /* POST user id locale. */
  router.post('/package/:id/:locale', function (req, res) {
    const response = {
      response: 'update package id locale'
    };
    res.send(response);
  });

  /* DELETE user id locale. */
  router.delete('/package/:id/:locale', function (req, res) {
    const response = {
      response: 'delete package id locale'
    };
    res.send(response);
  });
}

export { packageIdLocale };