const conn = require("./connection")
let association_db = {}


/////a faire tach-projet/////////////////////////////////////////:/
association_db.tach_projet_link = (data) =>{
    return new Promise((resolve,reject)=>{
        conn.query('insert into afaire set ?',data,(err,results)=>{
            if(err){
                return reject(err)
            }
           
            return resolve(results)
        })
    })
};

//delete tach of project 
association_db.tach_projet_unlink = (idP,code) =>{
    return new Promise((resolve,reject)=>{
        conn.query('delete from afaire where id_tach = ? and ID_PROJET = ?',[code,idP],(err,results)=>{
            if(err){
                return reject(err)
            }
           
            return resolve(results)
        })
    })
};

association_db.tach_projet_data = (id) =>{
    return new Promise((resolve,reject)=>{
        conn.query('select TACHE.id_tach,TACHE.CODE,DESIGNATION,PRIX_U,CHAPITRE,TYPE,UNITE,QT,qt_real,borduro '+
        'from tache,afaire where afaire.id_projet = ? and afaire.id_tach = TACHE.id_tach ',id,(err,results)=>{
            if(err){
                return reject(err)
            }
           
            return resolve(results)
        })
    })
};

association_db.tach_projet_update = (code,idP,data) =>{
    return new Promise((resolve,reject)=>{
        console.log(data)
        conn.query("update afaire set ? where id_tach = ? and id_projet = ? ",[data,code,idP],(err,results)=>{
            if(err){
                return reject(err)
            }
           
            return resolve(results)
        })
    })
};

///////////////////////////consomation projet-produit
association_db.produit_projet_link = (data) =>{
    return new Promise((resolve,reject)=>{
        conn.query('insert into consomation set ?',data,(err,results)=>{
            if(err){
                return reject(err)
            }
           
            return resolve(results)
        })
    })
};

//delete produit of project 
association_db.produit_projet_unlink = (idP,code) =>{
    return new Promise((resolve,reject)=>{
        conn.query('delete from consomation where id_produit = ? and ID_PROJET = ?',[code,idP],(err,results)=>{
            if(err){
                return reject(err)
            }
           
            return resolve(results)
        })
    })
};

association_db.produit_projet_data = (id) =>{
    return new Promise((resolve,reject)=>{
        conn.query('select PRODUIT.ID_PRODUIT,DESIGNATION,PRIX_U,UNITE,QT '+
        'from produit,consomation where consomation.id_projet = ? and consomation.id_produit = produit.id_produit ',id,(err,results)=>{
            if(err){
                return reject(err)
            }
           
            return resolve(results)
        })
    })
};

association_db.produit_projet_update = (data) =>{
    return new Promise((resolve,reject)=>{
        console.log(data)
        conn.query("update consomation set qt=? where id_produit = ? and id_projet = ? ",[data.qt,data.id_produit,data.id_projet],(err,results)=>{
            if(err){
                return reject(err)
            }
           
            return resolve(results)
        })
    })
};
//------------------------Dotation --------------------

//get doatation of project 
association_db.dotation_projet_data = (id) =>{
    return new Promise((resolve,reject)=>{
        conn.query('select * from dotation where id_projet = ?',id,(err,results)=>{
            if(err){
                return reject(err)
            } 
            return resolve(results)
        })
    })
};


association_db.projet_reintegration_data = (id) =>{
    return new Promise((resolve,reject)=>{
        conn.query('select * from reintegration where id_projet = ?',id,(err,results)=>{
            if(err){
                return reject(err)
            } 
            return resolve(results)
        })
    })
}
//--------------projet-client------------------------------
association_db.client_projet_data = (id) =>{
    return new Promise((resolve,reject)=>{
        conn.query('select * from projet where id_societe = ?',id,(err,results)=>{
            if(err){
                return reject(err)
            } 
            return resolve(results)
        })
    })
};
module.exports=association_db;