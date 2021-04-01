const express = require('express');
const server = express();
const expressSession = require('express-session');
const bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator');
const PORT = 3000;


server.use(expressSession({
    secret: 'meandev',
    resave: false,
    saveUninitialized: true,
    cookie: { }
  }));

// parse application/x-www-form-urlencoded
server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json())

server.post('/', [

    body('firstname').not().isEmpty(),
    body('lastname').not().isEmpty()
    
], (req,res)=>{
    try {
        validationResult(req).throw();
        res.json(req.body);
    }
    catch(ex){
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        // return res.status(400).json( { errors: errors.array()[0].msg });
        return res.status(400).json( { errors: errors.array() });
        }
    }
    
});

// server.get('/s',(req,res)=>{
//      req.session.item = 'Hello World';
//      res.end('set session');

// });

// server.post('/',(req,res) => res.json(req.body));

server.get('*',(req,res)=>{
    res.end(`<h1>Backend server is started. session is ${req.session.item}</h1>`);
});

server.listen(PORT,()=>console.log(`Server is started Port : ${PORT}`))