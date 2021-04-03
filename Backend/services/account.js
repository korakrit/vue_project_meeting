const connection = require('../configs/database');
const { password_hash } = require('../configs/security');



onRegister = (value) => new Promise((resolve, reject) => {

    value.u_password = password_hash(value.u_password);
    connection.query('INSERT INTO tb_users SET ?',value,(error,result)=>{
        if (error){
            return reject({ 
                            status : 0,
                            msg : 'fail',
                            data :error.sqlMessage,
                            
                          });
        }else{
            resolve({
                    status : 1,
                    msg : 'succuss',
                    data : 'insert complete'
                    
            });
        }
    });
});
module.exports = {
    onRegister
};