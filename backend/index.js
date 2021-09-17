const connectToMongo = require("./db");
const express = require("express");
var cors = require('cors')
connectToMongo();

const app = express();
const port = 5000;

//endpoint default
// app.get('/',(req,res)=>{
//   res.send('Hello bro')
// })

app.use(cors());
app.use(express.json()); //middleware

//Available Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

//listening to the port
app.listen(port, () => {
  console.log(`iNotebook backend app listening at http://localhost:${port}`);
});
