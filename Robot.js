const tts = require("./tts");//Text to Speech 
const stt = require("./stt");//Speech to Text

class Robot{
  constructor(name, config){
    this.name = name;
    this.config = config;
  }
  //just the phrase that you want the robot repeat for you
  textToSpeech(phrase){
    tts.talk("Hi all from raspberry pi");
  }
  //.wav file as binary, it comming from web interface
  //we could be more strict and put all the code inside a try/ catch block, we are just

  //assuming that everything'll be perfect :),  is just a robot
  async speechToText(audioAsBinary){    
    var response = await stt(this.config.BING_SPEECH_API_KEY, audioAsBinary);  return response.data.results;
  }
  //assuming that everything'll be perfect :), is just a robot
  async speechToText(audioAsBinary){
    var response = await stt(audioAsBinary);  return response.data.results;
  }
}

module.exports = Robot; //we are exporting the class Robot, to be used at the index file 
