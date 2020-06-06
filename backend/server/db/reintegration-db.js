const conn = require("./connection")


let reintegre_db = {}


//get all reintegration
reintegre_db.all = () =>{
    return new Promise((resolve,reject)=>{
        conn.query('select * from reintegration  ',(err,results)=>{
            if(err){
                return reject(err)
            }    
           return resolve(results)
        })
    })
};


//post une reintegration 
reintegre_db.post = (reintegration) =>{
    return new Promise((resolve,reject)=>{
        conn.query('insert into reintegration set ?',reintegration,(err,results,fields)=>{
            if(err){
                return reject(err)
            }    
           return resolve(results)
        })
    })
};

//update une reintegration 
reintegre_db.update = (reintegration,id) =>{
    return new Promise((resolve,reject)=>{
        conn.query(' update reintegration set ? where id_reintegration = ? ',[reintegration,id],(err,results)=>{
            if(err){
                return reject(err)
            }    
           return resolve(results)
        })
    })
};

reintegre_db.delete = (id) =>{
    return new Promise((resolve,reject)=>{
        conn.query(' delete from reintegration  where id_reintegration = ?',id,(err,results)=>{
            if(err){
                return reject(err)
            }    
           return resolve(results)
        })
    })
};

module.exports=reintegre_db
