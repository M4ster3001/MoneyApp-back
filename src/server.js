import 'babel-polyfill';
import app from './app';
import mongoose, { Error } from 'mongoose';

import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

mongoose.Promise = global.Promise;

mongoose.connect( process.env.DB, 
    { 
        useUnifiedTopology: true, 
        useNewUrlParser: true,
        useFindAndModify: false
    } 
)
.then( ( ) => {
    
    app.set( 'PORT', process.env.PORT || 3334 )
    
    if( app.listen() ) {
        
        let server = app.listen();
        server.close();
    }
    
    const server = app.listen( app.get( 'PORT' ), () => { console.log( `Servidor rodando na porta ${ app.get( 'PORT' ) }` ) } );

} ).catch( ( er ) => {

    console.log( er ); 
    return;
})
