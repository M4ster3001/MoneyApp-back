import { Router } from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';

dotenv.config({ path: '.env.local' });

const routes = Router();

//Middleware
import auth from './middleware/authenticate';
import { Login, User } from './middleware/validation';
 
//Controllers
import BillingCycles from './controllers/billingCycleController';
const BillingCycle = new BillingCycles();

import Users from './controllers/usersController';
const UserController = new Users();


routes.get( '/', ( req, res ) => { res.status( 200 ).json({ message: 'Ok get' }) });
routes.post( '/', ( req, res ) => { res.status( 200 ).json({ message: 'Ok post' }) });

routes.get( '/login', ( req, res ) => { res.status( 200 ).json({ message: 'Ok login' }) } );

//Users
routes.post( '/login', User.validations, UserController.login );
routes.get( '/user/register', User.validations, UserController.insert );
routes.get( '/user/update/:id', [ auth, User.validations ], UserController.update );
routes.get( '/user/delete/:id', [ auth, User.validations ], UserController.del );

//Billing routes
routes.get( '/billing', auth, BillingCycle.index );
routes.post( '/billing', auth, BillingCycle.insert );
routes.put( '/billing/update/:id', auth, BillingCycle.update );
routes.delete( '/billing/delete/:id', auth, BillingCycle.del );

routes.post( '/logout', ( req, res ) => {

    res.json({ auth: false, token: null });
} )

export default routes;