import mongoose from 'mongoose';
const { Schema } = mongoose;

const creditSchema = new Schema({

    name: {
        type: String,
        required: [
            true,
            "Informe o valor do crédito"
        ]
    },
    value:  {
        type: Number, 
        min: 0, 
        required: [
            true, 
            "Informe o valor do crédito"
        ],
    },
    status: {
        type: String,
        required: false,
        uppercase: true,
        enum: [ 'RECEBIDO', 'PENDENTE', 'AGENDADO' ]
    },
    date: {
        type: Date,
        required: false
    },
    id_billing: {
        type: String,
        required: true
    }
    
}, 
    { timestamps: true },
    { collections: 'creditsBilling' }
);


let creditsBilling = mongoose.model( 'creditsBilling', creditSchema );
export default creditsBilling;