const express = require('express');
const tachMaper=require('../../model/dataMaper/tach_maper')
const tach_db =require("../../db/tach-db");

const router = express.Router();

router.get('/',async (req,res,next)=>{
  
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   try{
       let listTach=[]
       await tach_db.all().then(async (results)=>{
        if(!results ||!results.length)
            res.sendStatus(404);
        for (var index in results ){
           var elm=tachMaper(results[index])
           listTach.push(elm)
        }
        res.json(listTach);
       },err=>{
           res.sendStatus(404)
       });
       
   }catch(e){
        console.log(e);
        res.sendStatus(500);
   }
})

router.get('/page/:p1/:p2',async (req,res,next)=>{
     let p1=parseInt(req.params.p1)
     let p2=parseInt(req.params.p2)

    
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   try{
       let listTach=[]
       await tach_db.allWithPage(p1,p2).then(async (results)=>{
        if(!results ||!results.length)
            res.sendStatus(404);
        for (var index in results ){
           var elm=tachMaper(results[index])
           listTach.push(elm)
        }
        res.json(listTach);
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
        let results= await tach_db.post(req.body);
        res.json(results) 
   }catch(e){
        console.log(e);
        res.sendStatus(500);
   }
})

router.put('/:id',async (req,res,next)=>{
    try{
         let id = req.params.id
         let results= await tach_db.update(id,req.body);
         res.json(results) 
    }catch(e){
         console.log(e);
         res.sendStatus(500);
    }
 })

 
router.get('/count',async (req,res,next)=>{
     try{   
          let results= await tach_db.count();
          res.json(results[0].nombre) 
     }catch(e){
          console.log(e);
          res.sendStatus(500);
     }
  })

  router.get('/mestach',async (req,res,next)=>{
     try{   
          let listTach=[]
          await tach_db.mestach().then(async (results)=>{
           if(!results ||!results.length)
               res.sendStatus(404);
           for (var index in results ){
              var elm=tachMaper(results[index])
              listTach.push(elm)
           }
           res.json(listTach);
          },err=>{
              res.sendStatus(404)
          });
         
     }catch(e){
          console.log(e);
          res.sendStatus(500);
     }
  })

  
router.get('/borduro',async (req,res,next)=>{
     try{   
          listTach=[]
          await tach_db.getborduro().then(async (results)=>{

               if(!results ||!results.length)
                   res.sendStatus(404);
               for (var index in results ){
                  var elm=tachMaper(results[index])
                  listTach.push(elm)
               }
               res.json(listTach);
              },err=>{
                  res.sendStatus(404)
              });
             
     }catch(e){
          console.log(e);
          res.sendStatus(500);
     }
  })


 router.delete('/:id',async (req,res,next)=>{
     try{
          let id = req.params.id
          let results= await tach_db.delete(id);
          res.json(results) 
     }catch(e){
          console.log(e);
          res.sendStatus(500);
     }
  })



module.exports=router