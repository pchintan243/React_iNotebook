const express = require('express')
const app = express()

var cors = require('cors')
app.use(cors())

const port = 8000

require("./db")
// For see in console json file
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!')
})

// Set the path of routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
})