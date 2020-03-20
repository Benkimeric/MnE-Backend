import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import modules from './modules';

const app = express();

app.use(morgan('dev'));
app.use(cors());

// Parse incoming requests data
app.use(
  bodyParser.urlencoded({
    limit: '50mb',
    extended: true
  })
);

app.use(bodyParser.json());

// set base url for api
modules(app);

// catch all routers
app.use('*', (req, res) => res.status(404).json({
  message: 'Not Found. Use /api/v1 to access the Api'
}));

export default app;
