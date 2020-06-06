const express = require('express');

const client_db =require("../../db/client-db");
const projet_db =require("../../db/projet-db");
const router = express.Router();
const projetMaper=require("../../model/dataMaper/project_maper")
const clientMaper=require("../../model/dataMaper/client_maper")

 //---------------------------------------------------------PROjet----------------------------------------------------------------------
 //get all projet
 router.get('/',async (req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    try{
        let results 
        var ListMaped= []
        await projet_db.all().then(async results=>{
            if (!results || !results.length)
                  res.sendStatus(404)
        for (var index in results){
            await client_db.one(results[index].ID_SOCIETE).then(clientData=>{
                var client=clientMaper(clientData[0])
                var project=projetMaper(results[index],client)
                ListMaped.push(project)
            })
           
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
 
 //get one projet
 router.get('/:id',async (req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
     try{
         let results=null;
         let id = parseInt(req.params.id)
         await projet_db.one(id).then(async ress=>{
             if (ress === 404)
               res.sendStatus(404)
            await client_db.one(ress[0].ID_SOCIETE).then(clientData=>{
                var client=clientMaper(clientData[0])
                var project=projetMaper(ress[0],client)
                results=project
               res.json(results);
            })
         });
        
     }catch(e){
          console.log(e);
          res.sendStatus(500);
     }
  })

//create project 
router.post('/',async (req,res,next)=>{

     try{
        await projet_db.post(req.body).then((data)=>{
            res.json(data);
        })
        
     }catch(e){
          console.log(e);
          res.sendStatus(500);
     }
  })

//delete project 
router.delete('/:id',async (req,res,next)=>{
    try{
         let results=null;
         let id = parseInt(req.params.id)
         await projet_db.delete(id).then(async res=>{
            results=res
         });
         res.json(results);
     }catch(e){
          console.log(e);
          res.sendStatus(500);
     }
  })

  //update project 
  router.put('/:id',async (req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
     try{
         
         let id = parseInt(req.params.id)
         let results=await projet_db.update(req.body,id)
         res.json(results);
     }catch(e){
          console.log(e);
          res.sendStatus(500);
     }
  })

  //export router 
module.exports=router;
