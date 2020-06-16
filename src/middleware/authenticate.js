import jwt from "jsonwebtoken";
import fs from 'fs';
import path from 'path';

const auth = ( req, res, next ) => {

    const token = req.headers['x-access-token'];

    if( !token ) {

        return res.status( 401 ).json({ auth: false, message: "Token não informado" });
    }

    const publicKey = fs.readFileSync( path.resolve('src/public.key'), 'utf-8' );

    jwt.verify( token, publicKey, { algorithm: ["RS256"] }, ( err, decoded ) =>{

        if( err ) {

            return res.status( 500 ).json({ auth: false, messagem: "Token inválido" });
        }

        req.user_id = decoded.id;

        next();
    } )


    return res.status( 202 );
}

export default auth;