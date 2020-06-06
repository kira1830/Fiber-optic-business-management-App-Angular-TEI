const conn = require("./connection")


let dotation_db = {}


//get all dotation
dotation_db.all = () =>{
    return new Promise((resolve,reject)=>{
        conn.query('select * from dotation  ',(err,results)=>{
            if(err){
                return reject(err)
            }    
           return resolve(results)
        })
    })
};


//post une dotation 
dotation_db.post = (dotation) =>{
    return new Promise((resolve,reject)=>{
        conn.query('insert into dotation set ?',dotation,(err,results,fields)=>{
            if(err){
                return reject(err)
            }    
           return resolve(results)
        })
    })
};

//update une dotation 
dotation_db.update = (dotation,id) =>{
    return new Promise((resolve,reject)=>{
        conn.query(' update dotation set ? where ID_DOTATION = ? ',[dotation,id],(err,results)=>{
            if(err){
                return reject(err)
            }    
           return resolve(results)
        })
    })
};

dotation_db.delete = (id) =>{
    return new Promise((resolve,reject)=>{
        conn.query(' delete from dotation  where ID_DOTATION = ?',id,(err,results)=>{
            if(err){
                return reject(err)
            }    
           return resolve(results)
        })
    })
};

module.exports=dotation_db
