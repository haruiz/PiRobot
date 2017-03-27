window.URL = window.URL || window.webkitURL;
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
// Set up forked web audio context, for multiple browsers 'window.' is needed, otherwise Safari explodes.
var ctxClass = ( window.AudioContext || window.webkitAudioContext || window.mozAudioContext ||  window.oAudioContext ||  window.msAudioContext );

var audio = document.querySelector('audio');
var recorder;

var onFail = function (e) {
  console.log('Rejected!', e);
};

var onSuccess = function (s) {
   var context = new ctxClass();
    var mediaStreamSource = context.createMediaStreamSource(s);
    recorder = new Recorder(mediaStreamSource);
    recorder.record();
}

function startRecording() {
  if (navigator.getUserMedia) {
    navigator.getUserMedia({ audio: true }, onSuccess, onFail);
  } else {
    console.log('navigator.getUserMedia not present');
  }
}

function stopRecording() {
    recorder.stop();
    recorder.exportWAV(function(s) {
      send2Server(s);
      audio.src = window.URL.createObjectURL(s);
    });
}

function send2Server(blob){
    console.log(blob);
    var data = new FormData(); data.append('audio', blob); axios.post("/stt",data).then((data)=> console.log(data));    
}
