const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
app.use(cors());
// app.use(express.urlencoded({extended: trus}))
app.use(express.json());
// app.use(logger)
/* app.get("/", logger, (req,res)=>{

})*/
var routes = require("./routes/record");
app.use(routes); // MUST1
// get driver connection
const dbo = require("./db/conn");
 
app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
    // console.log(err);
  });
  console.log(`Server is running on port: ${port}`);
});

function logger(req, res, next){
  console.log(req.originalUrl)
  next()
}
/*
app.get("/", (req, res) => {
  res.render('')
  res.json()
})
*/