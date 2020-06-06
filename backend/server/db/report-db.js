const conn = require("./connection")

let report_db = {}

//---------------facture ---------------------------------
report_db.getFacture=(idP)=>{
    return new Promise((resolve,reject)=>{
        conn.query('select * from facture where id_projet = ?',idP,(err,results)=>{
            if(err){
                return reject(err)
            }    
           return resolve(results)
        })
    })
}



//cree une facture
report_db.postFacture=(data)=>{
    return new Promise((resolve,reject)=>{
        conn.query('insert into facture set ? ',data,(err,results)=>{
            if(err){
                return reject(err)
            }    
           return resolve(results)
        })
    })
}


report_db.updateFacture=(idP,data)=>{
    return new Promise((resolve,reject)=>{
        conn.query('update facture set ?  where id_projet = ?',[data,idP],(err,results)=>{
            if(err){
                return reject(err)
            }    
           return resolve(results)
        })
    })
}

report_db.updateProforma=(idP,data)=>{
    return new Promise((resolve,reject)=>{
        conn.query('update proforma set ?  where id_projet = ?',[data,idP],(err,results)=>{
            if(err){
                return reject(err)
            }    
           return resolve(results)
        })
    })
}
//---------------proforma---------------------------
//get Proforma
report_db.getProforma=(idP)=>{
    return new Promise((resolve,reject)=>{
        conn.query('select * from proforma where id_projet = ?',idP,(err,results)=>{
            if(err){
                return reject(err)
            }    
           return resolve(results)
        })
    })
}


//cree une facture
report_db.postProforma=(data)=>{
    return new Promise((resolve,reject)=>{
        conn.query('insert into proforma set ? ',data,(err,results)=>{
            if(err){
                return reject(err)
            }    
           return resolve(results)
        })
    })
}

report_db.deleteProforma=(id)=>{
    return new Promise((resolve,reject)=>{
        conn.query('delete  from proforma where num_facture = ? ',id,(err,results)=>{
            if(err){
                return reject(err)
            }    
           return resolve(results)
        })
    })
}//


module.exports=report_db;