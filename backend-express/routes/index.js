// import express
const express = require('express');

// init express router
const router = express.Router();

//import verify token 
const verifyToken = require("../middlewares/auth"); 

// import register controller 
const registerController = require('../controllers/RegisterController');

// import login controller
const loginController = require('../controllers/LoginController');

// user controller
const userController = require('../controllers/UserController');

// import validate register and login
const { validateRegister, validateLogin } = require('../utils/validator/auth');

// import validate user
const {validateUser} = require('../utils/validator/user');

// define route for register
router.post('/register', validateRegister, registerController.register);

// define route for login 
router.post('/login', validateLogin, loginController.login);

// define route from user
router.get('/admin/users', verifyToken, userController.findUsers);

// define route for user create 
router.post('/admin/users', verifyToken, validateUser, userController.createUser);

// define route for user by id | pencarian by Id
router.get('/admin/users/:id', verifyToken, userController.findUserById);

// define route for user update
router.put('/admin/users/:id', verifyToken, validateUser, userController.updateUser);

// delete user
router.delete('/admin/users/:id', verifyToken, userController.deleteUser );

// export router
module.exports = router;