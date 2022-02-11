import * as express from 'express';
import * as bodyParser from 'body-parser';
import TYPES from './types';
import container from './inversify.config';
import {logger} from './util/Logger';
import 'module-alias/register';
import {RegistrableController} from './controller/RegisterableController';
import * as passport from 'passport';
import './middleware/Authentication';
let cors = require('cors')

const option={
  optionsSuccessStatus: 200,
  credentials: true,
  origin: true
  }
  

const app: express.Application = express();


// create express application

// let express support JSON bodies
app.use(bodyParser.json());
app.use(cors(option))
// grabs the Controller from IoC container and registers all the endpoints
const controllers: RegistrableController[] = container.getAll<RegistrableController>(TYPES.Controller);
controllers.forEach(controller => controller.register(app));

// setup express middleware logging and error handling
app.use(function (err: Error, req: express.Request, res: express.Response, next: express.NextFunction) {
    logger.error(err.stack);
    next(err);
});

app.use(function (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
  return  res.status(err.statusCode || 500).json({message: err.message || 'Internal Server Error'});
});

app.listen(process.env.PORT || 3000, function () {
    logger.info(`Example app listening on port ${process.env.PORT}!`);
});
