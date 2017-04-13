const util = require("util");
const Guid = require("guid");
const querystring = require('querystring');
const path = require("path");
const bluebird = require("bluebird");
const axios = require("axios");
const fs = bluebird.promisifyAll(require("fs"));
const {getToken} = require("./common");

const stt = async(BING_SPEECH_API_KEY, audioAsBInary)=>{

  var authToken = await getToken(BING_SPEECH_API_KEY), params = "";
  
  /* URI Params. Refer to the README file for more information. */
  var params = {
    "scenarios":"smd",     
    "appid": "D4D52672-91D7-4C74-8AD8-42B1D98141A5",                            
    "locale" :"es-ES",
    "device.os": "wp7",
    "version":"3.0",
    "format": "json",
    "instanceid":"565D69FF-E928-4B7E-87DA-9A750B96D9E3",
    "requestid" : Guid.raw()
  }; 
  var uri = "https://speech.platform.bing.com/recognize?"+querystring.stringify(params);
  
   var config = {
     headers:{
       "Authorization" : "Bearer " + authToken.data,
       "content-type" : "audio/wav; codec=\"audio/pcm\"; samplerate=16000"
     }
   }
  
  /*var audioAsBInary = await fs.readFileAsync("./speak.wav"); */ 
  return await axios.post(uri,audioAsBInary,config ); //just making a request 
}

module.exports = stt;//we need to export the function, because the idea is invoke the function from the index file

