const express = require('express')
const userSignup = require('../controllers/userSignup')
const userLogin = require('../controllers/userLogin')
const {fetchUser, deleteUser, updateUser} = require('../controllers/userControl')
const verifyAuth = require('../middleware/verifyAuth')

const router = express.Router()
router.post('/signUp', userSignup)

// router.use(verifyAuth)

// router.post('/', fetchUser)
// router.patch('/:id', updateUser)
// router.delete('/:id', deleteUser)


module.exports = router