import UserModel from '../models/user'
import Validations from '../middlewares/authValidation'
import userModel from '../models/user';
const authController = {

    signup : (req, res) => {
        let user = UserModel.createUser(req.body)
        
        if(user){
            Validations.authenticate(user)
            res.status(200)
            .send({
                status : 200,
                data : user
            })
        }
        else{
            res.status(401)
            .send({
                status : 401 ,
                message : user_error
            })
        }
        
    },
    signin : (req, res) => {
        let user = UserModel.findUser(req.body)
        
        if(user){
            Validations.authenticate(user)
            res.status(200)
            .send({
                status : 200 ,
                data : user
            })
        }
        else{
            res.status(401)
            .send({
                status : 401 ,
                message : "Incorrect credentials!"
            })
        }
    },
    signout : (req, res) => {
        process.env.UTOKEN = null
        res.status(200).send({
            message : "User logged out successfully",
            status : 200
        })
    }
}
export default authController