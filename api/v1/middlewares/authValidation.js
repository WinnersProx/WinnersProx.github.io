import crypto from 'crypto'
import UserModel from '../models/user'
let errors = []
export default {
    validateUser : (req, res, next) => {
        
        const { email, first_name, last_name, password, password_confirm, address } = req.body
        // email validation
        if(!email && !email.trim()){
            errors.push("The email cannot be empty")
        }
        // firstname validation
        if(!first_name && !first_name.trim()){
            errors.push("The first name cannot be empty")
        }
        
        // last name validation
        if(!last_name && !last_name.trim()){
            errors.push("The last name cannot be empty")
        }

        // passwords validation
        if((password && password.trim()) && (password_confirm && password_confirm.trim())){
            // no error
            if(password != password_confirm){
                errors.push("The password and password confirm must match")
            }
        }
        else{
            errors.push('The password is required')
        }

        // address validations
        if(!address.trim()){
            errors.push('The address is required')
        }
        
        if(errors.length)
            res.status(400).send({ status : 400, errors : errors})
        errors = []
        next()
    },
    authenticate : (user) => {
        // generate token basing on the email, password and id
        // const { email, password, id } = user;
        // generate random token
        let token = ((user.id) + '.' + crypto.randomBytes(8).toString('hex'));
        process.env.UTOKEN = token 
        user.token = token;
        return user;
    },
    validateSignin : (req, res, next) => {
        const { email, password } = req.body
        // email validation
        if(!email && !email.trim()){
            errors.push("The email should not be empty")
        }
        // password validation
        if(!password && !password.trim()){
            errors.push("The password should not be empty")
        }

        if(errors.length)
            res.status(400).send({ status : 400, errors : errors})
        errors = []
        next()
    },
    isAuthenticated : (req, res, next) => {
        const authorization = req.headers.authorization
        let user = UserModel.findById(authorization.split('.')[0])

        if(!user && !(authorization === process.env.UTOKEN)){
            res.status(401).send({ status : 401, message : "Invalid token"})
        }
        next()
    }
    
}
