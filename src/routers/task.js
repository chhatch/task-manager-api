const express = require('express')
const router = new express.Router() 
const Task = require('../db/models/task')
const auth = require('../middleware/auth')

router.post('/tasks', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })
    try {
        await task.save()
        res.status(201).send(task)
    } catch(e) {
        res.status(400).send(e) 
    }
})

router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch(e) {
        res.status(500).send(e) 
    }
})

router.get('/tasks/:id', async (req, res) => {
    const id = req.params.id
    try {
        const task = await Task.findById(id)
        if (!task) {
            return res.status(404).send('Task not found.') 
        }
        res.send(task)
    } catch(e) {
       res.status(500).send(e) 
    }
})

router.patch('/tasks/:id', async (req, res) => {

    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        res.status(400).send("Error: Invalid updates") 
    } 

    try {
        const task = await Task.findById(req.params.id)

        if (!task) {
           return res.status(404).send("Task not found.") 
        }


        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        res.send(task)

    } catch(e) {
        res.status(400).send(e.message) 
    }
})

router.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id) 

        if (!task) {
            return res.status(404).send("Task not found.") 
        }

        res.send(task)
    } catch(e) {
        res.status(500).send(e) 
    }
})

module.exports = router
