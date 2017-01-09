var express = require('express');
var app = express();
app.use(express.static('public'));

var server = app.listen(port,()=>{
                console.log(`Server started at port ${server.address().port}`);
            });


app.get('/',function(req,res,next){
   res.sendFile('index.html',(err)=>{
       if(err)
           console.log('Failed to complete the get request');
   }) 
});
