const optionsCor = {
    origin: [ process.env.API_URL || '*' ],
    methods: [ 'GET', 'PUT', 'POST', 'DELETE' ],
    credentials: true,
    allowedHeaders: [ 'Content-type', 'Authorization', 'x-access-token' ] 
}

export default optionsCor;