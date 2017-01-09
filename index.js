var FileParser = require('./lib/parser/FileParser');
var MPipe = require('./lib/db/MPipe');

var express = require('express');
var app = express();
app.use(express.static('public'));

MPipe.openConnection((err,res)=>{
   if(err)
       console.log('Failed to open connection to MySQL');
    else
        console.log(res);
});

var server = app.listen(8081,()=>{
                console.log(`Server started at port ${server.address().port}`);
            });


app.get('/',function(req,res,next){
   res.sendFile('index.html',(err)=>{
       if(err)
           console.log('Failed to complete the get request');
   }) 
});

app.get('/data/all',(req,res,next)=>{
    var storedProcedure = "call get_product_info(null)";
    MPipe.query(storedProcedure,(err,row,fields)=>{
        var responseObject = {};
       if(err)
           responseObject['error'] = "Failed to fetch data";
        else
            responseObject['data'] = row[0]; 
        res.json(responseObject)
            .end();
    });
});

app.param('id',function(req, res, next, id){
    req.id = id; 
    next();
});

app.get('/instrument/:id',(req,res,next)=>{
   var storedProcedure = `call get_product_info(${req.id})`;
    MPipe.query(storedProcedure,(err,row,fields)=>{
       var response = '';
        if(err)
            response.status = 404;
        else{
            if(row[0].length == 0){
                // Id not found
                response = 404;
            }else{
                response = row[0][0]['status'];
            }
        }
            
        res.json(response)
        .end();
    });
});

app.post('/addItem/',(req,res,next)=>{
    
});
//var map = FileParser.parseFile();
//
//if(map) {
//    MPipe.openConnection((err,res) => {
//        if(err)
//            throw err;
//        if(res){
//            var numberOfRowsInserted = 0;
//            var numberOfRowsFailedToInsert = 0;
//            for(var id in map){
//                var position = map[id]['position'];
//                var status = map[id]['status'];
//                var callToStoredProcedure = `call insert_product_info(${id},${position},${status})`;
//                MPipe.query(callToStoredProcedure, (err,rows,fields) => {
//                    if(err)
//                        console.log(`${++numberOfRowsFailedToInsert} rows(s) failed to insert, ${err}`);
//                    else
//                        console.log(`${++numberOfRowsInserted} row(s) inserted`);
//                });
//            }
//        }
//             
//    });
//}