const conn = require("./connection")


let tach_db = {}


//get all tach
tach_db.all = () =>{
    return new Promise((resolve,reject)=>{
        //SELECT * FROM tbl LIMIT 5,10;
        conn.query('select * from tache ORDER BY designation ASC  ',(err,results)=>{
            if(err){
                return reject(err)
            }    
           return resolve(results)
        })
    })
};

tach_db.getborduro = () =>{
    return new Promise((resolve,reject)=>{
        //SELECT * FROM tbl LIMIT 5,10;
        conn.query('select * from tache where borduro = 1 ORDER BY designation ASC',(err,results)=>{
            if(err){
                return reject(err)
            }    
           return resolve(results)
        })
    })
};

tach_db.mestach = () =>{
    return new Promise((resolve,reject)=>{
        //SELECT * FROM tbl LIMIT 5,10;
        conn.query('select * from tache where borduro = 0  ORDER BY designation ASC',(err,results)=>{
            if(err){
                return reject(err)
            }    
           return resolve(results)
        })
    })
};

tach_db.count=()=>{
    return new Promise((resolve,reject)=>{
        //SELECT * FROM tbl LIMIT 5,10;
        conn.query('select count(code) as nombre from tache ',(err,results)=>{
            if(err){
                return reject(err)
            }    
           return resolve(results)
        })
    })
};

tach_db.allWithPage = (p1,p2) =>{
    return new Promise((resolve,reject)=>{
       
        conn.query('select * from tache LIMIT ? , ? ',[p1,p2],(err,results)=>{
            if(err){
                return reject(err)
            }    
           return resolve(results)
        })
    })
};


//post une tach 
tach_db.post = (tach) =>{
    return new Promise((resolve,reject)=>{
        conn.query('insert into tache set ?',tach,(err,results)=>{
            if(err){
                return reject(err)
            }    
           return resolve(results)
        })
    })
};

//update une tach 
tach_db.update = (id,tach) =>{
    return new Promise((resolve,reject)=>{
        conn.query(' update tache set ? where id_tach = ?',[tach,id],(err,results)=>{
            if(err){
                return reject(err)
            }    
           return resolve(results)
        })
    })
};

//update une tach 
tach_db.delete = (id) =>{
    return new Promise((resolve,reject)=>{
        conn.query(' delete from tache where id_tach = ?',id,(err,results)=>{
            if(err){
                return reject(err)
            }    
           return resolve(results)
        })
    })
};
module.exports=tach_db