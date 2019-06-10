import jwtDecode from 'jwt-decode'
import userModel from '../models/users';

let errors = []
const AuthValidations = {
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
        next()
        errors = []
        
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
        next()
        errors = []
    },
    isAuthenticated : (req, res, next) => {
        let auth = req.headers.authorization ? req.headers.authorization.split(' ') : null
        if(auth && auth[0] === 'Bearer' && auth.length === 2){
            let user = userModel.findById(jwtDecode(auth[1]).id)
            if(!user) res.status(403).send({ status : 403, message : "You must login to access this location"})
            userModel.setAuthUser(user)
        }
        next()
    }
    
}
export default AuthValidations