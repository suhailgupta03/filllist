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
    
    function parse(contentList) {
        var contents;
        if(contentList && Array.isArray(contentList))
            contents = contentList;
        else
            contents = readFile();
        var exchangeMap = {};
        if(contents){
            var numberOfLines = contents.length;
            for(var i=0; i<numberOfLines; i++){
                var lineMap = lineParser(contents[i]);
                var idFound = lineMap['id'];
                var quantityFieldExists = lineMap['quantity'];
                var boughtSoldExists = lineMap['bought-sold'];
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
    
    function lineParser(line){
        var lineMap = {};
        if(line){
            var idFound = line.match(/48=[\d]+/);
            var quantityFieldExists = line.match(/32=[\d]+/);
            var boughtSoldExists = line.match(/54=[\d]/);
            lineMap['id'] = idFound;
            lineMap['quantity'] = quantityFieldExists;
            lineMap['bought-sold'] = boughtSoldExists;
        }
        return lineMap;
    }
    return {
        parseFile : parse
    }
}();

module.exports = FileParser;