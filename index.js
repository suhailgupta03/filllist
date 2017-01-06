var FileParser = require('./lib/parser/FileParser');
var MPipe = require('./lib/db/MPipe');

var map = FileParser.parseFile();

if(map) {
    MPipe.openConnection((err,res) => {
        if(err)
            throw err;
        if(res){
            var numberOfRowsInserted = 0;
            var numberOfRowsFailedToInsert = 0;
            for(var id in map){
                var position = map[id]['position'];
                var status = map[id]['status'];
                var callToStoredProcedure = `call insert_product_info(${id},${position},${status})`;
                MPipe.query(callToStoredProcedure, (err,rows,fields) => {
                    if(err)
                        console.log(`${++numberOfRowsFailedToInsert} rows(s) failed to insert, ${err}`);
                    else
                        console.log(`${++numberOfRowsInserted} row(s) inserted`);
                });
            }
        }
             
    });
}