const conn = require("./connection")
const client_db=require("./client-db")

let projet_db = {}


//get mesProjet page 
projet_db.all = () =>{
    return new Promise((resolve,reject)=>{
        conn.query('select * from projet ',(err,results)=>{
            if(err){
                return reject(err)
            }    
           return resolve(results)
        })
    })
};

//get one projet
projet_db.one = (id) =>{
    return new Promise((resolve,reject)=>{
        conn.query('select * from projet where ID_PROJET = ?',id,(err,results)=>{
            if(err){
                return  reject(err)
            }
            if (!results || !results.length) {
                return  resolve(404)
            }
            
           return resolve(results);
        })
    })
}
//post project 
projet_db.post = (projet) =>{
    return new Promise((resolve,reject)=>{
        conn.query('INSERT INTO projet set ?',projet,(err,results)=>{
            if(err){
                return  reject(err)
            }
           return resolve(results);
        })
    })
}

//delete one projet 
projet_db.delete=(id)=>{
    return new Promise((resolve,reject)=>{
        conn.query('delete from projet where ID_PROJET = ?',id,(err,results)=>{
            if(err){
                return  reject(err)
            }
           return resolve(results);
        })
    })
}

// update projet
projet_db.update=(newPR,id)=>{
    return new Promise((resolve,reject)=>{
        conn.query('update projet  set ? where  ID_PROJET = ?',[newPR,id], (err,results)=>{
            if(err){
                return reject(err)
            }
    
            return resolve(results);
        })
    })
}
conn.end
module.exports=projet_db