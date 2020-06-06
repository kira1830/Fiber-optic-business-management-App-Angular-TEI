const express = require('express');
const reintegration_db =require("../../db/reintegration-db");

const router = express.Router();

router.get('/',async (req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   try{
       let listDot=[]
       await reintegration_db.all().then(async (results)=>{
        console.log(results)
        if(!results ||!results.length)
            res.sendStatus(404);
        for (var index in results ){
           var elm=results[index]
           listDot.push(elm)
           
        }
        res.json(listDot);
       },err=>{
           res.sendStatus(404)
       });
       
   }catch(e){
        console.log(e);
        res.sendStatus(500);
   }
})

router.post('/',async (req,res,next)=>{
   try{
        let results= await reintegration_db.post(req.body);
        res.json(results) 
   }catch(e){
        console.log(e);
        res.sendStatus(500);
   }
})

router.put('/:id',async (req,res,next)=>{
    try{
         let id = req.params.id
         let results= await reintegration_db.update(req.body,id);
         console.log(results)
         res.json(results) 
    }catch(e){
         console.log(e);
         res.sendStatus(500);
    }
 })

 router.delete('/:id',async (req,res,next)=>{
    try{
         let id = req.params.id
         let results= await reintegration_db.delete(id,req.body);
         res.json(results) 
    }catch(e){
         console.log(e);
         res.sendStatus(500);
    }
 })


 module.exports = router