const express = require('express')
const chalk = require('chalk')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

//app.use((req, res, next) => {
//    res.status(503).send("This server is running maintenance mode. Please try again later.")
//})

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log(chalk.green.inverse('Server is listening on port ' + port))
})
