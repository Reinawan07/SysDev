const { comparePassword } = require('../helpers/bcrypt');
const { signToken } = require('../helpers/jwt');
const { User } = require('../models')

class UsersControllers {

    static async Login(req, res, next) {
        try {
            const { username, password } = req.body

            if (!username) {
                throw({ name: "Username is missing" })
            }

            if (!password) {
                throw({ name: "Password is missing" })
            }

            const user = await User.findOne({ where: { username } })

            if (!user)  {
                throw ({ name: "Invalid username/password"})
            }

            const isPasswordValid = comparePassword(password, user.password)
            if (!isPasswordValid) {
                throw ({ name: "Invalid username/password"})
            }

            const access_token = signToken({ id: user.id })

            res.status(200).json({ access_token })
        } catch (error) {            
            next(error)
        }
    }

    static async Register(req, res, next) {
        try {
            const { username, password, age } = req.body
            const users = await User.create({ username, password, age })
            res.status(201).json({ users })
        } catch (error) {
            next(error)
        }
    }

    static async GetUsers(req, res, next) {
        try {
            const users = await User.findAll()
            res.status(200).json({ users })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = UsersControllers