import mongoose from 'mongoose';
const { Schema } = mongoose;

const billingCycleSchema = new Schema(

    {
        name: {
            type: String,
            required: [
                true,
                "Informe o nome da conta"
            ]
        },
        month: {
            type: Number, 
            min: [
                1, 
                "Somente é válido o valor 1 ou maior"
            ],
            max: [
                12, 
                "Só há 12 meses, informe um valor menor ou igual a 12"
            ],
            required: [
                true, 
                "Informe o mês referente a conta"
            ]
        },
        year: {
            type: Number,
            min: [
                1970,
                "Coloque um ano maior que 1970"
            ],
            max: [
                2100,
                "O ano limite é 2100"
            ],
            required: [
                true, 
                "Informe o ano da conta"
            ]
        },
        id_user: {
            type: String,
            required: true
        }

    },
    { timestamps: true },
    { collections: 'billingCycle' }
)

let billingCycle = mongoose.model( 'billingCycle', billingCycleSchema );
export default billingCycle;