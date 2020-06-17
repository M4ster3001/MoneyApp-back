import mongoose from 'mongoose';
const { Schema } = mongoose;

const users = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
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