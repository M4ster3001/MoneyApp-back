import users from '../models/users';

import crypto from 'crypto';
import bCrypt from 'bcrypt';
const salts = 12;

import { validationResult } from 'express-validator';

import jwtConfig from '../config/jwt';


class Users {

    async login( req, res ){

        const errors = validationResult( req );
        if ( !errors.isEmpty() ) {

            return res.status( 422 ).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        await users.findOne({ email: email })
        .then( async resp => {

            if( !resp ) { return res.status( 400 ).json({ error: "Usuário não localizado" }); }

            if( !bCrypt.compareSync( password, resp.password ) ) {

                return res.status( 400 ).json({ error: "Login ou senha inválidos" });
            }

            const id = resp._id;
            const privateKey = fs.readFileSync( path.resolve('src/private.key'), 'utf-8' );
            const token = jwt.sign( { id }, privateKey, jwtConfig );
            
            res.cookie( "token", token, {
                maxAge: jwtConfig.expiresIn
            } )

            await users.findOneAndUpdate({ _id: resp._id }, { token: token })

            return res.json({ auth: true, token: token });

        } )
        .catch( er => {

            return res.status( 400 ).json( er )
        } )
        
        
        return res.status( 500 ).json({ message: 'Login inválido' });
    }

    async show( req, res ){

        const errors = validationResult( req );
        if ( !errors.isEmpty() ) {

            return res.status( 422 ).json({ errors: errors.array() });
        }

        const { id } = req.params;
        
        await users.findOne({ _id: id })
        .then( resp => {

            if( !resp ) { return res.status( 400 ).json({ error: "Usuário não localizado" }); }

            return res.status( 200 ).json( resp ); 

        } )
        .catch( er => {

            return res.status( 400 ).json( er )
        } )
    }

    async insert( req, res ){

        const errors = validationResult( req );
        if ( !errors.isEmpty() ) {

            return res.status( 422 ).json({ errors: errors.array() });
        }

        const { name, email, password } = req.body;
        
        await users.save({ name, email, password, status: true })
        .then( resp => {

            if( !resp ) { return res.status( 400 ).json({ error: "Problema ao salvar o usuário" }); }

            return res.status( 200 ).json( resp ); 

        } )
        .catch( er => {

            return res.status( 400 ).json( er )
        } )
    }

    async update( req, res ){
        
    }

    async del( req, res ){
        
    }

}

export default Users;