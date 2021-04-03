const { body, validationResult } = require('express-validator');

module.exports = function (req,res,next) {

    req.validate = function (){

        const errors = validationResult(req).array();
         if(errors.length == 0) return;
         validationResult(req).throw();
        //  throw new Error(`${errors[0].param} : ${errors[0].msg}`)

    };


    res.error = function (ex,status=400) {
        
        //   res.status(status).json({message:ex.message});
        const errors = validationResult(req);

        if (!errors.isEmpty()) {

           return res.status(status).json( `${errors.array()[0].param} : ${errors.array()[0].msg}`);
        }else{

           return res.status(status).json(ex);
        }
         
        
    }
    next();
};