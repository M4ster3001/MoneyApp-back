import mongoose from 'mongoose';
const { Schema, Error } = mongoose;

const users = new Schema(
    {
        name: {
            type: String,
            required: [ 
                true, 
                "Informe o seu nome" 
            ]
        },
        email: {
            type: String,
            required: [
                true,
                "Informe um e-mail"
            ]
        },
        password: {
            type: String,
            required: [
                true,
                "Informe a senha"
            ]
        },
        token: {
            type: String,
            required: false
        },
        status: {
            type: Boolean,
            required: false
        }
    }, 
    { timestamps: true },
    { collections: "users" }
)

const Users = mongoose.model( 'Users', users );
export default Users;