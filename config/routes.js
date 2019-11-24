const express = require('express')
const router = express.Router()

const customersController = require('../app/controllers/customersController')
const departmentsController = require('../app/controllers/departmentsController')
const employeesController = require('../app/controllers/employeesController')
const ticketsController = require('../app/controllers/ticketsController')
const usersController = require('../app/controllers/usersController')
const authentication = require("../app/middlewares/authentication")


router.post('/users/register', usersController.create)
router.post('/users/login', usersController.login)
// router.put('/users/updatePassword', authentication, usersController.updatePassword)
router.get('/users/account', authentication, usersController.show)
router.delete('/users/logout', authentication, usersController.destroy)
router.delete('/users/logoutAll', authentication, usersController.destroyAll)


router.get('/customers', authentication, customersController.list)
router.post('/customers', authentication, customersController.create)
router.put('/customers/:id',  authentication, customersController.update)
router.delete('/customers/:id',  authentication, customersController.destroy)
router.get('/customers/:id', authentication, customersController.show)

router.get('/departments', authentication, departmentsController.list)
router.post('/departments', authentication, departmentsController.create)
router.put('/departments/:id',  authentication, departmentsController.update)
router.delete('/departments/:id',  authentication, departmentsController.destroy)
router.get('/departments/:id', authentication, departmentsController.show)

router.get('/employees', authentication, employeesController.list)
router.post('/employees', authentication, employeesController.create)
router.put('/employees/:id',  authentication, employeesController.update)
router.delete('/employees/:id',  authentication, employeesController.destroy)
router.get('/employees/:id', authentication, employeesController.show)

router.get('/tickets', authentication, ticketsController.list)
router.post('/tickets', authentication, ticketsController.create)
router.put('/tickets/:id',  authentication, ticketsController.update)
router.delete('/tickets/:id',  authentication, ticketsController.destroy)
router.get('/tickets/:id', authentication, ticketsController.show)

module.exports = router