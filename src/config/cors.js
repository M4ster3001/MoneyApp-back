const optionsCor = {
    origin: process.env.API_URL || '*',
    methods: [ 'GET', 'PUT', 'POST', 'DELETE' ],
    credentials: true,
    allowedHeaders: [ 'Content-type', 'Authorization' ] 
}

export default optionsCor;