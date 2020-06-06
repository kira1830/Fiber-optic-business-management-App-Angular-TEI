const express = require('express');
const router = express.Router();
const tool_db=require("../../db/tools-db")

//-------------------UNITE-------------------
router.get('/unite',async (req,res,next)=>{
    try{
        let results=await tool_db.getUnite();
        res.json(results)
    }catch(e){
          console.log(e);
          res.sendStatus(500);
     }
})


router.post('/unite',async (req,res,next)=>{
    try{
        let results=await tool_db.postUnite(req.body);
        res.json(results)
    }catch(e){
          console.log(e);
          res.sendStatus(500);
     }
})
//---------------------new tach------------------------

router.get('/tach_code_hint',async (req,res,next)=>{
    try{
        let results=await tool_db.getTachCodeHint();
        var hint = parseInt(results[0].hint) + 1
        res.json(hint)
    }catch(e){
          console.log(e);
          res.sendStatus(500);
     }
})

//------------facture number ----------------

router.get('/facture_get_number',async (req,res,next)=>{
    try{
        let results=await tool_db.getFactureNum();
        if (results[0].hint == null)
             res.json(1)
        let hint = parseInt(results[0].hint)+1
        res.json(hint)
    }catch(e){
          console.log(e);
          res.sendStatus(500);
     }
})

router.get('/proforma_get_number',async (req,res,next)=>{
    try{
        let results=await tool_db.getProformaNum();
        if (results[0].hint == null)
             res.json(1)
        let hint = parseInt(results[0].hint)+1
        res.json(hint)
    }catch(e){
          console.log(e);
          res.sendStatus(500);
     }
})

//-----------------------TEI mes info ------------------------------------
router.get('/TEI',async (req,res,next)=>{
    try{
        let results=await tool_db.getTei();
        res.json(results[0])
    }catch(e){
          console.log(e);
          res.sendStatus(500);
     }
})

router.put('/TEI',async (req,res,next)=>{
    try{
        let results=await tool_db.updateTei(req.body);
        res.json(results[0])
    }catch(e){
          console.log(e);
          res.sendStatus(500);
     }
})

router.get('/check-facture-exist/:id',async (req,res,next)=>{
    try{
        let id=req.params.id
        let results=await tool_db.checkIfFactureExist(id);
        res.json(results[0].exist)
    }catch(e){
          console.log(e);
          res.sendStatus(500);
     }
})

router.get('/check-proforma-exist/:id',async (req,res,next)=>{
    try{
        let id=req.params.id
        let results=await tool_db.checkIfProformaExist(id);
        res.json(results[0].exist)
    }catch(e){
          console.log(e);
          res.sendStatus(500);
     }
})


///----check numero proforma if exist 
router.get('/check-facture-number/:num/:idP',async (req,res,next)=>{
    try{
        let num=req.params.num
        let idP=req.params.idP
        let results=await tool_db.checkNumFacture(num,idP);
        res.json(results[0].exist)
    }catch(e){
          console.log(e);
          res.sendStatus(500);
     }
})

router.get('/check-proforma-number/:num/:idP',async (req,res,next)=>{
    try{
        console.log(req.params)
        let num=req.params.num
        let idP=req.params.idP
        let results=await tool_db.checkNumProforma(num,idP);
        res.json(results[0].exist)
    }catch(e){
          console.log(e);
          res.sendStatus(500);
     }
})
module.exports=router
