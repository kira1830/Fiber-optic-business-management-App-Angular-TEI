const conn = require("./connection")


let produit_db = {}


//get all produit
produit_db.all = () =>{
    return new Promise((resolve,reject)=>{
        conn.query('select * from produit  ',(err,results)=>{
            if(err){
                return reject(err)
            }    
           return resolve(results)
        })
    })
};


//post une produit 
produit_db.post = (produit) =>{
    return new Promise((resolve,reject)=>{
        conn.query('insert into produit set ?',produit,(err,results,fields)=>{
            if(err){
                return reject(err)
            }    
           return resolve(results)
        })
    })
};

//update une produit 
produit_db.update = (id,produit) =>{
    return new Promise((resolve,reject)=>{
        conn.query(' update produit set ? where ID_PRODUIT = ?',[produit,id],(err,results)=>{
            if(err){
                return reject(err)
            }    
           return resolve(results)
        })
    })
};

module.exports=produit_db
