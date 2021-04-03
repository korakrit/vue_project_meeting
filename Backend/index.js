const express = require('express');
const server = express();
const expressSession = require('express-session');
const bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator');
// const routes = require('./routes');
const PORT = 3000;

const connect = require("./configs/database");



server.use(expressSession({
    secret: 'meandev',
    resave: false,
    saveUninitialized: true,
    cookie: { }
  }));

server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json())

server.use(require('./configs/middleware'));


server.use('/api',require('./routes'));

server.get('*',(req,res)=>{
    res.end(`<h1>Backend server is started. session is ${req.session.item}</h1>`);
});

server.listen(PORT,()=>console.log(`Server is started Port : ${PORT}`))