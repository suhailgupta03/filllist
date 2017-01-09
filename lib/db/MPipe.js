var mysql = require('mysql');

var MPipe = function(){
    
    var connectionMap = {
      host : '127.0.0.1',
      user : 'root',
      password : '',
      database : 'filllist'
    };
    
    var connection;
    
    function createConnection(cb){
        try{
            connection = mysql.createConnection(connectionMap);
            connection.connect(function(err) {
                  if (err) {
                    return cb(err,null);
                  }
                  return cb(null,'connected as id ' + connection.threadId);
            });
        }catch(err){
            return cb(err,null);
        }
    }
    
    function query(sqlQuery,cb){
        connection.query(sqlQuery,(err,rows,fields)=>{
            if(err)
                return cb(err,null,null);
            return cb(null,rows,fields);
        });
    }
    
    function closeConnection(){
        connection.end();
    }
    
    return{
        openConnection : createConnection,
        query : query,
        closeConnection : closeConnection
    }
}();

module.exports = MPipe;