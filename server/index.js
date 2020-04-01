var express = require('express');
var bodyParser = require('body-parser')
var nunjucks = require('nunjucks')
var Parse = require('parse/node');
var app = express();
app.use(bodyParser.json())
nunjucks.configure('files', {
  autoescape: true,
  express: app
});
const MASTER_KEY = 'sIp7z8wSUV3bAWcmnqI7ZqL6uZpE6l4o0tAJ13JZeyga1o3VQmzizy0oYjfiQikd'
const parsePort = ''
//  the parse object with master key becasue we are the server too 
Parse.initialize("backend",null, MASTER_KEY);
Parse.serverURL = 'https://api.logicx.ca/'; //= 'http://localhost:'+parsePort.toString()+parsePath
app.post('/l', async (req,res)=>{
    // look for the sepsific token and if you get a real one 
    //  put all the data that we find in the log object so 
    //  that we can view it on the front end 
    console.log(req.body.token)
    if(req.body.token){
      //  if we have a tokend then we can look for the matching log object 
      const query = new Parse.Query(RedirectLog);
      query.equalTo("token", req.body.token);
      const results = await query.first();
      console.log(results)
      console.log(results.get('waitingForResponse'))
      if(results == 1 && results.get('waitingForResponse')){
        results.set('waitingForResponse', false);
        results.set('requestData',req.body);
        try{
          await results.save()
          console.log("should be saved")
        }catch{
          console.log('asdasdasd')
        }
      }
        

      
    }
    res.send("")
});

const RedirectUrl = Parse.Object.extend("Redirecturl");
const RedirectLog = Parse.Object.extend("Redirectlog");
var fs = require('fs');
var jsPayload;
fs.readFile( __dirname + '/files/fontDetector.js', function (err, data) {
  if (err) {
    throw err; 
  }
  jsPayload = data.toString();
  //console.log(data.toString());
});

//  use the rest as the redirect 
app.get('*', async (req,res)=>{
  console.log(req.url)
    //  so every other thing to this we search the urls thing
    //  for the url and if it exists then we 
    
    const query = new Parse.Query(RedirectUrl);
    query.equalTo("redirecturl", req.url.substring(1));
    const results = await query.find();
    
    if(results.length == 1){
        const token = makeid(64);
        console.log(results[0].get('url'))
        //  with the url create the token with the log data 
        //  going to have to make sure that the thing is good enought 

        //  make the log object
        var log = new RedirectLog();
        log.set('linkobject',results[0])
        log.set('token',token);
        //  incase we are behind it 
        log.set('ip', req.headers['x-forwarded-for'] || req.connection.remoteAddress)
        log.set('userAgent', req.headers['user-agent'])
        log.set('waitingForResponse', true)
        try{
          await log.save()
        }catch{
          //  log some sort of error 
          console.log("error saving log object ")
          return
        }
        
        //  now we are done lets send the redirect payload 
        res.render('redirect.html', { redirectUrl: results[0].get('url'),
         scriptPayload:jsPayload,
        token : token });
        return;
       
    }
    //  if you reach here then it is a not found or something or link them 
    //  to something random. 
    
});








var appPort = 4001;
app.listen(appPort, function() {
    console.log('redirect server' + appPort + '.');
  });


function makeid(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}
