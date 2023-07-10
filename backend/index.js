const connecttoMongo = require('./db')
const express = require('express')
const app = express()
const port = 3000
connecttoMongo();  //js works on non blocking nature hence asynchronous nature execute hta rhega call back fire hta rhega

app.use(express.json())
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/note'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

