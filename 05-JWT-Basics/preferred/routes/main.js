const express = require('express')
const router = express.Router()

const {logon, hello} = require('../controllers/main');

const authMiddleware = require('../middleware/auth')

router.route('/hello').get(authMiddleware, hello)
router.post('/logon', logon)


module.exports = router
