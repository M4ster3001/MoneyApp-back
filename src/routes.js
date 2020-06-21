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

import CreditsBilling from './controllers/creditsBillingController';
const creditsBilling = new CreditsBilling();

import DebitsBilling from './controllers//debitsBillingController';
const debitsBilling = new DebitsBilling();

import Users from './controllers/usersController';
const UserController = new Users();


routes.get( '/', ( req, res ) => { res.status( 200 ).json({ message: 'Ok get' }) });
routes.post( '/', ( req, res ) => { res.status( 200 ).json({ message: 'Ok post' }) });

routes.get( '/login', ( req, res ) => { res.status( 200 ).json({ message: 'Ok login' }) } );

//Users
routes.post( '/login', Login.validations, UserController.login );
routes.post( '/user/register', User.validations, UserController.insert );
routes.get( '/user/update/:id', [ auth, User.validations ], UserController.update );
routes.get( '/user/delete/:id', [ auth, User.validations ], UserController.del );

//Billing routes
routes.get( '/billing', auth, BillingCycle.index );
routes.post( '/billing', auth, BillingCycle.insert );
routes.put( '/billing/update/:id', auth, BillingCycle.update );
routes.delete( '/billing/delete/:id', auth, BillingCycle.del );

//credits
routes.post( '/billing/credits', auth, creditsBilling.insert );
routes.put( '/billing/credits/update/:id', auth, creditsBilling.update );
routes.delete( '/billing/credits/delete/:id', auth, creditsBilling.del );

//debits
routes.post( '/billing/debits', auth, debitsBilling.insert );
routes.put( '/billing/debits/update/:id', auth, debitsBilling.update );
routes.delete( '/billing/debits/delete/:id', auth, debitsBilling.del );

routes.post( '/logout', ( req, res ) => {

    res.json({ auth: false, token: null });
} )

export default routes;