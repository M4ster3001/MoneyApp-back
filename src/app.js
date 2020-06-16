import express from 'express';
import router from './routes';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';

//import dotenv from 'dotenv';
//dotenv.config({ path: '.env' });

import optCors from './config/cors.js';


const app = express();

app.use( cors( optCors ) );
app.use( helmet() );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ urlencoded: true, extended: true }) );

app.use( '/', router );

export default app;