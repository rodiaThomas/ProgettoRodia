const bodyParser = require('body-parser');
const express = require("express");
const http = require('http');
const path = require('path');
const app = express();
const fs= require("fs");

const serverDB = require("./serverDB.js");
const { resolve } = require('url');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));




app.get("/site/title",(req,res) => {

    let results=serverDB.getTitle()
     

      res.json(results)
      
  })

  app.get("/site/info",(req,res) => {

    let results=serverDB.getInfo()
     

      res.json(results)
      
  })



app.use("/", express.static(path.join(__dirname, "public")));
  const server = http.createServer(app);
  const port = 80;
  server.listen(port, () => {
    console.log("- server running on port: " + port);
  });

  
