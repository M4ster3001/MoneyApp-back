import { Router } from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';

import jwtConfig from './config/jwt';
import auth from './middleware/authenticate';

dotenv.config({ path: '.env.local' });

const routes = Router();

routes.get( '/', ( req, res ) => { res.status( 200 ).json({ message: 'Ok get' }) });
routes.post( '/', ( req, res ) => { res.status( 200 ).json({ message: 'Ok post' }) });

routes.get( '/login', ( req, res ) => { res.status( 200 ).json({ message: 'Ok login' }) } );

routes.post( '/login', ( req, res ) => {

    if( req.body.user == 'aldo' & req.body.pwd == 'aldo123' ) {

        const id = 1;
        const privateKey = fs.readFileSync( path.resolve('src/private.key'), 'utf-8' );
        const token = jwt.sign({ id }, privateKey, jwtConfig);

        res.cookie( "token", token, {
            maxAge: jwtConfig.expiresIn
        } )
        return res.json({ auth: true, token: token });

    }

    return res.status( 500 ).json({ message: 'Login inválido' });  
} );

routes.get( '/home', auth, ( req, res ) => { return res.send('foi') });

routes.post( '/logout', ( req, res ) => {

    res.json({ auth: false, token: null });
} )

export default routes;