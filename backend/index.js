const connectToMongo = require('./db');
const express = require('express')
connectToMongo()

const app = express()
const port = 3000

//endpoint default
// app.get('/',(req,res)=>{
//   res.send('Hello bro')
// })

app.use(express.json())


//Available Routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

//listening to the port
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})