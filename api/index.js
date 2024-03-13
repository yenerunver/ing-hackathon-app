import createError from 'http-errors';
import express from 'express';

import { router } from './routes.js';

const POlearAPI = express();

POlearAPI.use(express.json());
POlearAPI.use(express.urlencoded({ extended: false }));

POlearAPI.use('/api', router);

// catch 404 and forward to error handler
POlearAPI.use(function(req, res, next) {
  next(createError(404));
});

export { POlearAPI };
