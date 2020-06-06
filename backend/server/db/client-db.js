const conn = require("./connection")
let client_db = {}

//get all client
client_db.all = () =>{
    return new Promise((resolve,reject)=>{
        conn.query('select * from societe',(err,results)=>{
            if(err){
                return reject(err)
            }
           
            return resolve(results)
        })
    })
};



//get one client
client_db.one = (id) =>{
    return new Promise((resolve,reject)=>{
        conn.query('select * from societe where ID_SOCIETE = ?',id,(err,results)=>{
            if(err){
                return reject(err)
            }
    
            return resolve(results);
        })
    })
}


  //post one client 
client_db.insert=(cl)=>{
    return new Promise((resolve,reject)=>{
        conn.query('INSERT INTO societe set ?',cl, (err,results)=>{
            if(err){
                return reject(err)
            }
    
            return resolve(results);
        })
    })
}

//delete client 
client_db.delete=(id)=>{
    return new Promise((resolve,reject)=>{
        conn.query('delete from societe where ID_SOCIETE = ?',id, (err,results)=>{
            if(err){
                return reject(err)
            }
    
            return resolve(results);
        })
    })
}
// update client
client_db.update=(newCL,id)=>{
    return new Promise((resolve,reject)=>{
        conn.query('update societe  set ? where  ID_SOCIETE = ?',[newCL,id], (err,results)=>{
            if(err){
                return reject(err)
            }
    
            return resolve(results);
        })
    })
}
    


conn.end
module.exports=client_db




