const express = require('express')
const app = express()
require("./db")
const port = 8000

app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
})