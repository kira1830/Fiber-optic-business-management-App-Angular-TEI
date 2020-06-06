const express = require('express');
const router = express.Router();
const association_db=require("../../db/association-db")
const tachMaper=require("../../model/dataMaper/tach_maper")
const produitMaper=require("../../model/dataMaper/charge_maper")
const dotationMaper=require("../../model/dataMaper/dotation_maper")

const projetMaper=require("../../model/dataMaper/project_maper")

//-------------------Association projet tach-------------------
router.post('/projet_tach',async (req,res,next)=>{
    try{
        let results=await association_db.tach_projet_link(req.body);
        res.json(results)
    }catch(e){
          console.log(e);
          res.sendStatus(500);
     }
})

//link tach with project 
router.get('/projet_tach/:id',async (req,res,next)=>{
    try{
        let id = parseInt(req.params.id)
       await association_db.tach_projet_data(id).then((results)=>{
            let listTach=[]
            for (var index in results){
                var elm=tachMaper(results[index])
                listTach.push(elm)
            }   
            res.json(listTach)
        });
        
    }catch(e){
          console.log(e);
          res.sendStatus(500);
     }
})

//update quantite of tach
router.put('/projet_tach/:idP/:idT',async (req,res,next)=>{
    try{
        let idP = req.params.idP
        let idT = req.params.idT
       let results=await association_db.tach_projet_update(idT,idP,req.body)
       res.json(results)
    }catch(e){
          console.log(e);
          res.sendStatus(500);
     }
})

//delete projet of tach
router.delete('/projet_tach/:idProjet/:idTach',async (req,res,next)=>{
    try{
        let idP = parseInt(req.params.idProjet);
        let idT = req.params.idTach;
       let results=await association_db.tach_projet_unlink(idP,idT)
       res.json(results)
    }catch(e){
          console.log(e);
          res.sendStatus(500);
     }
})


//-------------------Association projet produit cosomation-------------------
router.post('/projet_produit',async (req,res,next)=>{
    try{
        let results=await association_db.produit_projet_link(req.body);
        res.json(results)
    }catch(e){
          console.log(e);
          res.sendStatus(500);
     }
})

//link charge with project 
router.get('/projet_produit/:id',async (req,res,next)=>{
    try{
        let id = parseInt(req.params.id)
       await association_db.produit_projet_data(id).then((results)=>{
            let listProduit=[]
            for (var index in results){
                var elm=produitMaper(results[index])
                listProduit.push(elm)
            }   
            res.json(listProduit)
        });
        
    }catch(e){
          console.log(e);
          res.sendStatus(500);
     }
})

//update quantite of charge
router.put('/projet_produit/',async (req,res,next)=>{
    try{
       let results=await association_db.produit_projet_update(req.body)
       res.json(results)
    }catch(e){
          console.log(e);
          res.sendStatus(500);
     }
})

//delete projet of produit
router.delete('/projet_produit/:idProjet/:idProduit',async (req,res,next)=>{
    try{
        let idP = parseInt(req.params.idProjet);
        let idT = req.params.idProduit;
       let results=await association_db.produit_projet_unlink(idP,idT)
       res.json(results)
    }catch(e){
          console.log(e);
          res.sendStatus(500);
     }
})

//-----------------------------------dotation----------------------------------/:
router.get('/projet_reintegration/:id',async (req,res,next)=>{
    try{
        let id = parseInt(req.params.id)
       await association_db.projet_reintegration_data(id).then((results)=>{
            let listDotation=[]
            for (var index in results){
                var elm=results[index]
                listDotation.push(elm)
            }   
            res.json(listDotation)
        });
        
    }catch(e){
          console.log(e);
          res.sendStatus(500);
     }
})

router.get('/projet_dotation/:id',async (req,res,next)=>{
    try{
        let id = parseInt(req.params.id)
       await association_db.dotation_projet_data(id).then((results)=>{
            let listDotation=[]
            for (var index in results){
                var elm=dotationMaper(results[index])
                listDotation.push(elm)
            }   
            res.json(listDotation)
        });
        
    }catch(e){
          console.log(e);
          res.sendStatus(500);
     }
})

//update quantite of tach
router.put('/projet_dotation/:idP/:idD',async (req,res,next)=>{
    try{
        let idP = req.params.idP
        let idD = req.params.idD
       let results=await association_db.tach_projet_update(idD,idP,req.body)
       res.json(results)
    }catch(e){
          console.log(e);
          res.sendStatus(500);
     }
})


//--------------------client-projet----------------------------------------/
router.get('/client_projet/:id',async (req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    try{
        id=parseInt(req.params.id)
        var ListMaped= []
        await association_db.client_projet_data(id).then(async results=>{
            if (!results || !results.length)
                  res.sendStatus(404)
        for (var index in results){
                var project=projetMaper(results[index],null)
                ListMaped.push(project)
        }
        res.json(ListMaped);
    },
    err=>{
        res.sendStatus(404)
    });
   
    }catch(e){
         console.log(e);
         res.sendStatus(500);
    }
 })
module.exports=router;
