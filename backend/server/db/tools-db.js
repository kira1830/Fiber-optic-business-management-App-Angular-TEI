const conn = require("./connection")

let tool_db = {}

tool_db.getUnite=()=>{
    return new Promise((resolve,reject)=>{
        conn.query('select * from unites ',(err,results)=>{
            if(err){
                return reject(err)
            }    
           return resolve(results)
        })
    })
}

tool_db.postUnite=(data)=>{
    return new Promise((resolve,reject)=>{
        conn.query('insert into unites set ? ',data,(err,results)=>{
            if(err){
                return reject(err)
            }    
           return resolve(results)
        })
    })
}

tool_db.getTachCodeHint=()=>{
    return new Promise((resolve,reject)=>{
        conn.query('SELECT count(id_tach) as hint FROM tache where code like ("z%")',(err,results)=>{
            if(err){
                return reject(err)
            }    
           return resolve(results)
        })
    })
}

tool_db.getProformaNum=()=>{
    return new Promise((resolve,reject)=>{
        conn.query('SELECT max(num_facture) as hint FROM proforma',(err,results)=>{
            if(err){
                return reject(err)
            }    
           return resolve(results)
        })
    })
}

tool_db.getFactureNum=()=>{
    return new Promise((resolve,reject)=>{
        conn.query('SELECT max(n_facture) as hint FROM facture',(err,results)=>{
            if(err){
                return reject(err)
            }    
           return resolve(results)
        })
    })
}

tool_db.insertUnite=(data)=>{
    return new Promise((resolve,reject)=>{
        conn.query('insert into unites set ? ',data,(err,results)=>{
            if(err){
                return reject(err)
            }    
           return resolve(results)
        })
    })
}

tool_db.getTei=()=>{
    return new Promise((resolve,reject)=>{
        conn.query('select * from TEI where id_c = 1 ',(err,results)=>{
            if(err){
                return reject(err)
            }    
           return resolve(results)
        })
    })
}

tool_db.updateTei=(data)=>{
    return new Promise((resolve,reject)=>{
        conn.query('update TEI set ? where id_c = 1 ',data,(err,results)=>{
            if(err){
                return reject(err)
            }    
           return resolve(results)
        })
    })
}

tool_db.checkIfProformaExist=(idP)=>{
    return new Promise((resolve,reject)=>{
        conn.query('SELECT EXISTS(SELECT * FROM proforma WHERE id_projet = ? ) as exist',idP,(err,results)=>{
            if(err){
                return reject(err)
            }    
           return resolve(results)
        })
    })
}


tool_db.checkIfFactureExist=(idP)=>{
    return new Promise((resolve,reject)=>{
        conn.query('SELECT EXISTS(SELECT * FROM facture WHERE id_projet = ? ) as exist',idP,(err,results)=>{
            if(err){
                return reject(err)
            }    
           return resolve(results)
        })
    })
}




tool_db.checkNumProforma=(nPr,idP)=>{
    return new Promise((resolve,reject)=>{
        conn.query('SELECT EXISTS(SELECT * FROM proforma WHERE num_facture = ? and id_projet != ?) as exist',[nPr,idP],(err,results)=>{
            if(err){
                return reject(err)
            }    
           return resolve(results)
        })
    })
}


tool_db.checkNumFacture=(nF,idP)=>{
    return new Promise((resolve,reject)=>{
        conn.query('SELECT EXISTS(SELECT * FROM facture WHERE n_facture = ? and  id_projet != ? ) as exist',[nF,idP],(err,results)=>{
            if(err){
                return reject(err)
            }    
           return resolve(results)
        })
    })
}
module.exports=tool_db