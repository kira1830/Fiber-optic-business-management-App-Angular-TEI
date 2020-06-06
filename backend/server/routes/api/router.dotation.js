const express = require('express');
const dotationMaper=require('../../model/dataMaper/dotation_maper')
const dotation_db =require("../../db/dotation-db");

const router = express.Router();

router.get('/',async (req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   try{
       let listDot=[]
       await dotation_db.all().then(async (results)=>{
        console.log(results)
        if(!results ||!results.length)
            res.sendStatus(404);
        for (var index in results ){
           var elm=dotationMaper(results[index])
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
        let results= await dotation_db.post(req.body);
        res.json(results) 
   }catch(e){
        console.log(e);
        res.sendStatus(500);
   }
})

router.put('/:id',async (req,res,next)=>{
    try{
         let id = req.params.id
         let results= await dotation_db.update(req.body,id);
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
         let results= await dotation_db.delete(id,req.body);
         res.json(results) 
    }catch(e){
         console.log(e);
         res.sendStatus(500);
    }
 })


 module.exports = router