import express from 'express';

import { packages } from "./routes/packages.js";
import { packageId } from "./routes/package-id.js";
import { packageIdLocale } from "./routes/package-id-locale.js";

const router = express.Router();
packages(router);
packageId(router);
packageIdLocale(router);

export { router };
