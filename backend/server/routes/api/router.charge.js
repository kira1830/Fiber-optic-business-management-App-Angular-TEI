const express = require('express');
const chargeMaper=require('../../model/dataMaper/charge_maper')
const charge_db =require("../../db/charge-db");

const router = express.Router();

router.get('/',async (req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   try{
       let listProduit=[]
       await charge_db.all().then(async (results)=>{
        console.log(results)
        if(!results ||!results.length)
            res.sendStatus(404);
        for (var index in results ){
           var elm=chargeMaper(results[index])
           listProduit.push(elm)
        }
        res.json(listProduit);
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
      
        let results= await charge_db.post(req.body);
        res.json(results) 
   }catch(e){
        console.log(e);
        res.sendStatus(500);
   }
})

router.put('/:id',async (req,res,next)=>{
    try{
         let id = req.params.id
         let results= await charge_db.update(id,req.body);
         res.json(results) 
    }catch(e){
         console.log(e);
         res.sendStatus(500);
    }
 })

 module.exports = router