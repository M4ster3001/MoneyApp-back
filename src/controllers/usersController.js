import users from '../models/users';
import fs from 'fs';
import path from 'path';
import jwt from "jsonwebtoken";

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

            if( !resp._id ) { return res.status( 400 ).json({ error: "Usuário não localizado" }); }

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
                
        //return res.status( 500 ).json({ message: 'Login inválido' });
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

        let { name, email, password } = req.body;
        password = bCrypt.hashSync( password, salts )

        const newUser = new users({ name, email, password, status: true });    

        await newUser.save()
        .then( resp => {

            if( !resp ) { return res.status( 400 ).json({ error: "Problema ao salvar o usuário" }); }

            return res.status( 200 ).json( resp ); 

        } )
        .catch( er => {

            return res.status( 400 ).json( er )
        } )
    }

    async update( req, res ){
        const errors = validationResult( req );
        if ( !errors.isEmpty() ) {

            return res.status( 422 ).json({ errors: errors.array() });
        }

        let { name, email, password, old_password } = req.body;
        const { id } = req.params

        if( id & ( name || email || ( password & old_password ) ) ) {

            if( password & old_password ) {

                password = password && password.trim();
                password = bCrypt.hashSync( password, salts )

                old_password = old_password & old_password.trim()

                await users.findOne({ _id: id }).select( 'password' )
                .then( resp => {

                    if( !bCrypt.compareSync( old_password, resp.password ) ) {

                        return res.status( 400 ).json({ error: 'Senha antiga incorreta' })
                    }
                } )
                .catch( er => {

                    console.log( er );
                } )
            }

            try {

                await users.findOneAndUpdate({ _id: id }, name, email, { password })
                .then( resp => {

                    if( !resp ) { return res.status( 400 ).json({ error: "Problema ao atualizar os dados" }); }

                    return res.json({ message: 'Dados atualizados' })
                }).catch( er => {

                    console.log( er )
                })

            }catch( er ) {

                console.log( er )
            }

        }

    }

    async del( req, res ){
        const { id } = req.params

        try {

            await users.findByIdAndDelete( id )
            .then( resp => {

                if( !resp ) { return res.status( 400 ).json({ error: "Problema ao deletar o usuário" }); }

                return res.status( 202 )

            }).catch( er => {

                console.log( er )
            })
            
        }catch( er ) {

            console.log( er )
        }
        
    }

}

export default Users;