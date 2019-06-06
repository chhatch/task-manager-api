const app = require('./app')
const port = process.env.PORT
const chalk = require('chalk')

app.listen(port, () => {
    console.log(chalk.green.inverse('Server is listening on port ' + port))
})
