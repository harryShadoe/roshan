const express = require('express');
const router = express.Router();
const {homePage,register,login} = require('../controller/usercontroller')
const {checkphone} = require('../middlewares/checkphone')



router
.get('/',homePage)
.post('/register', checkphone,register )
.post('/login', login)

module.exports = router;


