const express = require('express')
const auth = require('../middleware/auth')
const router = new express.Router() 
const User = require('../db/models/user')

router.post('/users', async (req, res) => {
    const user = new User(req.body)
    
    try {
        await user.save()
        const token = await user.generateAuthToken()
   
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e.message)
    }
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch(e) {
        res.status(400).send(e.message)
    }
})

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
    })

router.get('/users/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        const user = await User.findById(_id) 
        if (!user) {
            return res.status(404).send('User not found.') 
        }
        res.send(user)
    } catch(e) {
        res.status(500).send(e) 
    }
})

router.patch('/users/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body) 
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        res.status(400).send("Error: Invalid updates") 
    } 

    try {
        const user = await User.findById(req.params.id)

        if (!user) {
           return res.status(404).send("User not found.") 
        }


        updates.forEach((update) => user[update] = req.body[update])
        await user.save()
        res.send(user)

    } catch(e) {
        res.status(400).send(e.message) 
    }
})

router.delete('/users/:id', auth, async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id) 

        if (!user) {
            return res.status(404).send("User not found.") 
        }

        res.send(user)
    } catch(e) {
        res.status(500).send(e) 
    }
})

module.exports = router