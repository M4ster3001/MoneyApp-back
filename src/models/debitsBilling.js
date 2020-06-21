import mongoose from 'mongoose';
const { Schema } = mongoose;

const debitsSchema = new Schema({

    name: {
        type: String,
        required: [
            true,
            "Informe o valor do débito"
        ]
    },
    value:  {
        type: Number, 
        min: 0, 
        required: [
            true, 
            "Informe o valor do débito"
        ],
    },
    status: {
        type: String,
        required: false,
        uppercase: true,
        enum: [ 'PAGO', 'PENDENTE', 'AGENDADO' ]
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
    { collections: 'debitsBilling' }
);


let debitsBilling = mongoose.model( 'debitsBilling', debitsSchema );
export default debitsBilling;