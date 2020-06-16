import { Router } from 'express';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const routes = Router();

routes.get( '/', ( req, res ) => { res.status( 200 ).json({ message: 'Ok get' }) });
routes.post( '/', ( req, res ) => { res.status( 200 ).json({ message: 'Ok post' }) });

export default routes;