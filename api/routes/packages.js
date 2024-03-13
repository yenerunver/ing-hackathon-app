const packages = router => {
  /* GET users listing. */
  router.get('/package', function (req, res) {
    res.send({
      response: 'package'
    });
  });

  /* PUT users listing. */
  router.put('/package', function (req, res) {
    res.send({
      response: 'create packages'
    });
  });

  /* POST users listing. */
  router.post('/package', function (req, res) {
    res.send({
      response: 'update packages'
    });
  });

  /* DELETE users listing. */
  router.delete('/package', function (req, res) {
    res.send({
      response: 'delete packages'
    });
  });
}

export { packages };