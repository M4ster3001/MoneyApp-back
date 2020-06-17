import { check } from 'express-validator';

export const Login = {

    validations: [
        check( 'email' ).trim().escape().normalizeEmail().isEmail().isLength({ min: 1 }),
        check( 'password' ).trim().escape().isLength({ min: 6 })
    ]
}

export const User = {

    validations: [
        check( 'name' ).trim().escape(),
        check( 'email' ).trim().escape().normalizeEmail().isEmail(),
        check( 'password' ).trim().escape().isLength({ min: 6 }),
    ]
}