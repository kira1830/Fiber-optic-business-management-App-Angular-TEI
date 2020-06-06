const express = require('express');
const router = express.Router();
const report_db=require("../../db/report-db")

//-------------------Facture-------------------
router.get('/facture/:idP',async (req,res,next)=>{
    try{
        let idP = parseInt(req.params.idP)
        let results=await report_db.getFacture(idP);
        if(!results ||!results.length)
            res.sendStatus(404);
        res.json(results[0])
    }catch(e){
          console.log(e);
          res.sendStatus(500);
     }
})

//get proformat
router.get('/proforma/:idP',async (req,res,next)=>{
    try{
        let idP = parseInt(req.params.idP)
        let results=await report_db.getProforma(idP);
        if(!results ||!results.length)
            res.sendStatus(404);
        res.json(results[0])
    }catch(e){
          console.log(e);
          res.sendStatus(500);
     }
})

//create proforma
router.post('/proforma/',async (req,res,next)=>{
    try{
        let results=await report_db.postProforma(req.body);
        res.json(results)
    }catch(e){
          console.log(e);
          res.sendStatus(500);
     }
})

//delete proforma 
router.delete('/proforma/:nP',async (req,res,next)=>{
    try{
        let np = req.params.nP
        let results=await report_db.deleteProforma(np);
        res.json(results)
    }catch(e){
          console.log(e);
          res.sendStatus(500);
     }
})


router.post('/facture/',async (req,res,next)=>{
    try{
        let results=await report_db.postFacture(req.body);
        res.json(results)
    }catch(e){
          console.log(e);
          res.sendStatus(500);
     }
})

router.put('/facture/:idP',async (req,res,next)=>{
    try{
        let idP = parseInt(req.params.idP)
        let results=await report_db.updateFacture(idP,req.body);
        res.json(results)
    }catch(e){
          console.log(e);
          res.sendStatus(500);
     }
})

router.put('/proforma/:idP',async (req,res,next)=>{
    try{
        let idP = parseInt(req.params.idP)
        let results=await report_db.updateProforma(idP,req.body);
        res.json(results)
    }catch(e){
          console.log(e);
          res.sendStatus(500);
     }
})

//------------dotation---------------

module.exports=router