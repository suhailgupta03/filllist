var fs = require('fs');
var os = require('os')

var FileParser = function(){
    
    const fileToRead = "filllist";
    const sold = 2;
    const bought = 1;
    
    function readFile(){
        var fileContent = fs.readFileSync(fileToRead);
        if(fileContent){
            return fileContent.toString().split(os.EOL);        
        }else {
            return null;
        }    
    }
    
    function parse() {
        var contents = readFile();
        var exchangeMap = {};
        if(contents){
            var numberOfLines = contents.length;
            for(var i=0; i<numberOfLines; i++){
                var idFound = contents[i].match(/48=[\d]+/);
                var quantityFieldExists = contents[i].match(/32=[\d]+/);
                var boughtSoldExists = contents[i].match(/54=[\d]/);
                if(idFound && quantityFieldExists && boughtSoldExists) {
                    var id = idFound[0].split("=")[1];
                    var quantity = parseInt(quantityFieldExists[0].split("=")[1]);
                    var boughtOrSold = parseInt(boughtSoldExists[0].split("=")[1]);
                    if(exchangeMap[id]){
                        // If the id exists in the map
                        var temp = exchangeMap[id];
                        temp['status'] = boughtOrSold;
                        if(boughtOrSold == sold){
                            temp['position'] -= quantity;
                        }else if(boughtOrSold == bought){
                            temp['position'] += quantity;
                        }
                    }else{
                        // If id doesn't exist in the map
                        var temp = {};
                        temp['status'] = boughtOrSold;
                        if(boughtOrSold == sold){
                            temp['position'] = -quantity;
                        }else if(boughtOrSold == bought){
                            temp['position'] = quantity;
                        }
                        exchangeMap[id] = temp;
                    }
                }
            }
        }
        return exchangeMap;
    }
    
    return {
        parseFile : parse
    }
}();

module.exports = FileParser;