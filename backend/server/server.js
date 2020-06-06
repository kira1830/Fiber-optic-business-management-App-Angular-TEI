const express = require('express');
const RouterClient =require('./routes/api/router.client')
const RouterProjet =require('./routes/api/router.projet')
const RouterTools =require('./routes/api/router.tools')
const RouterTach =require('./routes/api/router.tach')
const RouterProduit =require('./routes/api/router.charge')
const RouterDotation =require('./routes/api/router.dotation')
const RouterReport =require('./routes/api/router.report')
const RouterAssotion =require('./routes/api/router.association')
const RouterReintegration =require('./routes/api/router.reintegration')
const app = express();
const bodyparser=require('body-parser');
const cors = require('cors');

app.use(bodyparser.json());
app.use(express.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : false}))

//Api
app.use('/api/projet',RouterProjet);
app.use('/api/client',RouterClient);
app.use('/api/tool',RouterTools);
app.use('/api/tach',RouterTach);
app.use('/api/produit',RouterProduit);
app.use('/api/dotation',RouterDotation);
app.use('/api/reintegration',RouterReintegration);
app.use('/api/report',RouterReport);
app.use('/api/link',RouterAssotion);


app.listen(process.env.PORT || '3000', ()=>{
    console.log(`server is running : ${process.env.PORT || '3000'}`)
})