var exec = require('child_process').exec;
var util = require("util");

var talk = (message, lang) =>{
  lang = lang === "es" ? (' -l es-ES ') : (' -l en-US ');
  const cmd = util.format("pico2wave -w speak.wav %s '%s' && sox speak.wav -r 48k speak.mp3 pitch -200 && omxplayer speak.mp3", lang, message)
  console.log(cmd);
  exec(cmd, function(error, stdout, stderr) {
    if(error)
      console.error(error);
  });
}

module.exports = { talk : talk }//export the talk functions to Robot.js file, This will allow him to speak