require('dotenv').config()
const express = require("express");
const cors = require("cors");
const app = express();
const https = require("https");
const fs = require("fs")
var corsOptions = {
  origin: ["https://game-finder-425ea.web.app/","http://localhost:4200"] //destination
};

var key = fs.readFileSync('key.pem');
var cert = fs.readFileSync('cert.pem');
var options = {
  key: key,
  cert: cert
};

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

var server = https.createServer(options, app);
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to game reviews api server." });
});
require("./app/routes/appList.routes.js")(app);
require("./app/routes/detailList.routes.js")(app);
require("./app/routes/languageList.routes.js")(app);
require("./app/routes/genreList.routes.js")(app);
require("./app/routes/categoryList.routes.js")(app);
require("./app/routes/featured.routes.js")(app);

var currentdate = new Date(); 
var datetime = "[" + currentdate.getFullYear() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getDate()+ " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds()+"] ";
// set port, listen for requests
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(datetime+"Server starting on port : " + PORT)
});
