import app from './app';

app.set( 'PORT', process.env.PORT || 3334 )

if( app.listen() ) {
    
    let server = app.listen();
    server.close();
}

const server = app.listen( app.get( 'PORT' ), () => { console.log( `Servidor rodando na porta ${ app.get( 'PORT' ) }` ) } )