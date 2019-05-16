const jwt = require('jsonwebtoken')
const User = require('../db/models/user')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'learninmuhnode')
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token})

        if (!user) {
            res.status(404).send('User not authenticated.')
        }

        req.user = user
        next()
    } catch(e) {
        res.status(401).send(e.message)
    }
}

module.exports = auth
