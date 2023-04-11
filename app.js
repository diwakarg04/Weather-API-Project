const express = require("express") ;
const app = express() ;
const https = require("https") ;
const bodyParser = require("body-parser") ;

app.use(bodyParser.urlencoded({extended: true})) ;

app.listen(2500 , function(){
    console.log("Server hosted at port 2500") ;
}) ;

app.get("/" , function(req,res){
   
    res.sendFile(__dirname +"/index.html") ;
})

app.post("/" , function(req,res){

    const query = req.body.cityName ;
    const appKey  = "c92034c51515c7c0046695522c022573" ;
    const units = "metric" ;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query+ "&appid=" + appKey + "&units=" + units  ;
    
    https.get(url,function(response){
        console.log(response.statusCode) ;

        response.on("data" , function(data){
            const ans = JSON.parse(data) ;
            const temp = ans.main.temp ;
            const description = ans.weather[0].description ;
            console.log(temp) ;
            console.log(description) ;
            res.write("<p>The Weather is currently:" + description + "</p>") ;
            res.write("<h1><em>The Temperature of " + query + " is : " + temp + " degree celsius.</h1></em>") ;
            res.send() ;
        })
    })
    
})
