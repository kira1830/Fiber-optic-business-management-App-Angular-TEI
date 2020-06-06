const mysql = require('mysql');

const conn=mysql.createConnection({
    connectionLimit : 10,
    password : '2846',
    user :'root',
    database : 'tei_facture',
    port : '3306',
    host : 'localhost' 
})


// Connect
conn.connect((err) => {
    if(err){
        console.log("mysql server is disconected")
        throw err
    }
    console.log('MySql Connected...');
});




module.exports=conn;
