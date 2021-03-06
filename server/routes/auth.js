import express from 'express'
import authController from '../controllers/auth_controller'
import Validations from '../middlewares/authValidation'

const routes = express.Router()
// hence we'll be using customized middlewares to validate all the auth requests
routes
.post('/auth/signup', Validations.validatePassword, Validations.validateUser, Validations.userExists, authController.signup)
.post('/auth/signin', Validations.validateSignin, authController.signin)
.post('/auth/signout', Validations.isAuthenticated, authController.signout)
.post('/auth/reset-password', authController.initializeReset)
.post('/auth/reset-password/:reset_token', authController.resetPassword)
export default routes;