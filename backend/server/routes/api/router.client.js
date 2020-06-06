const express = require('express');
const client_db =require("../../db/client-db");
const router = express.Router();
const clientModel=require("../../model/client.model")
const clientMaper=require("../../model/dataMaper/client_maper")

//get all client
router.get('/',async (req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   try{
       let listClient=[]
       await client_db.all().then(async (results)=>{
        if(!results ||!results.length)
            res.sendStatus(404);
        for (var index in results ){
            var elm=clientMaper(results[index])
            listClient.push(elm);
        }
        res.json(listClient);
       },err=>{
           res.sendStatus(404)
       });
       
   }catch(e){
        console.log(e);
        res.sendStatus(500);
   }
})

//get one client
router.get('/:id',async (req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    try{
        let id = parseInt(req.params.id)
        await client_db.one(id).then(results=>{
            if(!results ||!results.length)
                res.sendStatus(404)  
            let data=clientMaper(results[0])
            res.json(data);
        },err=>{
            res.sendStatus(400)
        });
      
    }catch(e){
         console.log(e);
         res.sendStatus(500);
    }
 })

 //post client
 router.post('/',async (req,res,next)=>{
    try{
        await client_db.insert(req.body).then(results=>{
            console.log(results)
        res.json(results);
      })
      
    }catch(e){
         console.log(e);
         res.sendStatus(500);
    }
 })

 //delete one  client
 router.delete('/:id',async (req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    try{
        let id = parseInt(req.params.id)
        let results = await client_db.delete(id);
        res.json(results);
    }catch(e){
         console.log(e);
         res.sendStatus(500);
    }
 })
 
 router.put('/:id',async (req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    try{
        let id = parseInt(req.params.id)
        let results = await client_db.update(req.body,id);
        res.json(results);
    }catch(e){
         console.log(e);
         res.sendStatus(500);
    }
 })





//export router 
module.exports=router;
