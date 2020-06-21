import creditsBilling from '../models/creditsBilling';

class creditsBillings {

    async index( req, res ) {
        
        await creditsBilling.find({}, ( err, data ) => {

            if( err ) { return res.status( 401 ).json({ error: `Erro: ${ err }` }) }

            if( !data ) { return res.status( 404 ).json({ error: `Erro: ${ err }` }) }

            return res.status( 200 ).json( data );
        })
    }

    async insert( req, res ) {
         
        const { id_billing, name, value, status } = req.body;
        const newCredit = new creditsBilling({ id_billing, name, value, status });

        try {

            await newCredit.save( ( err, message ) => {

                //return res.status( 401 ).json(err) 
                if( err ) { 

                    /*if( err.errors.month.kind === Number || 
                        err.errors.year.kind === Number || 
                        err.errors.debts[0].value.kind === Number ||
                        err.errors.credits[0].value.kind === Number
                    ) {

                        return res.status( 401 ).json({ error: "Valor inválido" }) 
                    }

                    if( err.errors.month.value === null ) {

                        return res.status( 401 ).json({ error: "Campo mês é obrigatório" }) 
                    }
                    
                    if( err.errors.name.value === null ) {

                        return res.status( 401 ).json({ error: "Campo nome é obrigatório" }) 
                    }

                    if( err.errors.year.value === null ) {

                        return res.status( 401 ).json({ error: "Campo ano é obrigatório" }) 
                    }

                    if( err.errors.debts[0].name.value === null ) {

                        return res.status( 401 ).json({ error: "é obrigatório o nome no débito" }) 
                    }

                    if( err.errors.debts[0].value.value === null ) {
                        
                        return res.status( 401 ).json({ error: "é obrigatório o valor no débito" }) 
                    }*/

                    return res.status( 401 ).json( err.errors ) 
                }

                if( !message ) { return res.status( 400 ).json(err) }

                return res.status( 200 ).json({ success: true, id: message._id }); 
            } )

        }catch( er ) {

            return res.status( 400 ).json( er )
        }
        
    }

    async update( req, res ) {

        let { id_billing, name, value, status } = req.body;
        const { id } = req.params;
        let data_update = { id_billing };

        if( name ) data_update = { name };
        if( value ) data_update = { value };
        if( status ) data_update = { status };

        await creditsBilling.findOneAndUpdate({ _id: id }, data_update, { new: true, useFindAndModify: true })
        .then( ( data ) => {

            return res.status( 200 ).json({ success: true, up: data }); 
        } )
        .catch( ( er ) => {

            return res.status( 401 ).json(err)
        } )

    }

    async del( req, res ) {

        const { id } = req.params;

        await creditsBilling.findOneAndDelete({ _id: id }, ( err, message ) => {

            if( err ) { return res.status( 401 ).json(err) }

            if( !message ) { return res.status( 400 ).json(err) }

            return res.status( 200 ).json({ success: true }); 
        })
        
    }
}

export default creditsBillings; 