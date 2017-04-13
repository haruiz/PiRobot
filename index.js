//const robot = require("./Robot")("Cyg");
const hapi = require("hapi");
const boom = require("boom");
const path = require("path");
const ngrok = require('ngrok');
const bluebird = require("bluebird");
const fs = require("fs");
const Robot = require("./Robot");

const config = JSON.parse(fs.readFileSync("./config.json","utf8"));
const meRobot = new Robot("Cyg", config);

const port = 8080;
const server = new hapi.Server();
server.connection({ port: port, host: '0.0.0.0' });


async function setup() {
  await server.register(require("inert"));
}

ngrok.connect(port,function (err, url) {
  
    setup().then(() => {

      server.route({
        path: "/stt",
        method: "POST",
        config: {
          payload: {
              output: 'stream', 
              maxBytes: 1048576 * 10, /*10MB*/ 
              parse: true, 
              allow: 'multipart/form-data'
            }
        },
        handler: (request,reply)=>{
           if(request.payload.audio){             
             var audioAsBinary = request.payload.audio._data;
             //we order to the robot that please convert the audio into Text
             //for guessing the command that the user is sending, for example take a picture             
             meRobot.speechToText(audioAsBinary)
             //handler to sucess request 
                .then((data)=>{ return reply(data)})
                  //hanlder to error request 
                    .catch((err)=> { console.log(err); return reply(err)});
           }
        }
      });

      //the route just send to user the index.html file where all happen            
      server.route({
        path: "/robot",
        method: "GET",
        handler: {
          file: {
            path: "./views/index.html"
          }
        }
      });

      //once ngrok have generated the uri, the using it
      //we redirect the user at /robot route
      server.route({
        path: "/",
        method: "GET",
        handler: (request,reply)=>{
           return reply().redirect(`${url}/robot`);
        }
      });
      
      //this route let us handler the static content as
      //jquery, axios and others frontend component (css, images etc.) 
      server.route({
        path: "/assets/{path*}",
        method: "GET",
        handler: {
          directory: {
            path: "./public"
          }
        }
      });

      server.start(() => console.log(`the port is running at ${server.info.port}`));

    })

  
});

//process.on('SIGINT', function() {   ngrok.disconnect(); ngrok.kill(); /* kills ngrok process */ });