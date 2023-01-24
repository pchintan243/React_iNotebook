const express = require('express')
const app = express()
require("./db")
const port = 8000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/api/auth', require('./routes/auth'))
app.use('/api/auth', require('./routes/notes'))

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
})