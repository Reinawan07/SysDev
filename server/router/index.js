const UsersControllers = require('../controllers/controllers');
const authentication = require('../middleware/authentication');
const errorHandler = require('../middleware/errorHandler');

const router = require('express').Router();

router.get('/', (req, res) => res.json({message: "Buat Server"}));

router.post('/login', UsersControllers.Login);
router.post('/register', UsersControllers.Register);

router.use(authentication)
router.get('/users', UsersControllers.GetUsers);

router.use(errorHandler)

module.exports = router;