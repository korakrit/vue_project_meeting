const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const { onRegister } = require('../services/account');

router.post('/register',[
    body('u_username','กรุณากรอกข้อมูล').not().isEmpty(),
    body('u_password').not().isEmpty(),
    body('u_firstname').not().isEmpty(),
    body('u_lastname').not().isEmpty()
], async (req,res)=>{

    try {
        // validationResult(req).throw();
        req.validate();
        const create = await onRegister(req.body);
        res.json(create);
        
    }
    catch(ex){
        
        
        // return res.status(400).json( { errors: errors.array()[0].msg });
        // return res.status(400).json( { errors: errors.array() });

            res.error(ex);
        
    }
    
});

module.exports = router;