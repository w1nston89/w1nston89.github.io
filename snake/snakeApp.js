let http = require("http");
let fs = require("fs");
 
http.createServer(function(request, response){
     
    console.log(`Запрошенный адрес: ${request.url}`);
    if(request.url.startsWith("")){
         
        // получаем путь после слеша
        let filePath = request.url.substr(1);
        fs.readFile(filePath, 'utf8', function(error, data){
                 
            if(error){
                     
                response.statusCode = 404;
                response.end("Ресурс не найден!");
            }   
            else{
                response.end(data);
            }
            return;
        })
    }
    else{
        // во всех остальных случаях отправляем строку hello world!
        response.end("Hello World!");
    }
}).listen(3000);