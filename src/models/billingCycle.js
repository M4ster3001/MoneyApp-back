import mongoose from 'mongoose';
const { Schema } = mongoose;

const creditSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    value:  {
        type: Number, 
        required: true,
    },
    status: {
        type: String,
        required: false,
        uppercase: true,
        enum: [ 'RECEBIDO', 'PENDENTE', 'AGENDADO' ]
    }
});

const debtSchema = new Schema({

    name: {
        type: String, 
        required: true,
    },
    value: {
        type: Number,
        min: 0,
        required: true
    },
    status: {
        type: String,
        required: false,
        uppercase: true,
        enum: [ 'PAGO', 'PENDENTE', 'AGENDADO' ]
    }
})

const billingCycleSchema = new Schema(

    {
        name: {
            type: String,
            required: true
        },
        month: {
            type: Number, 
            min: 1,
            max: 12,
            required: true
        },
        year: {
            type: Number,
            min: 1970,
            max: 2100,
            required: true
        },
        credits:
            [creditSchema],
        debts: 
            [debtSchema]

    },
    { timestamps: true },
    { collections: 'money' }
)

let billingCycle = mongoose.model( 'billingCycle', billingCycleSchema );
export default billingCycle;