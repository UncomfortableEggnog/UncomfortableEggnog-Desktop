//====Web Speech Audio======//

  // if (!('webkitSpeechRecognition' in window)) {
  //   upgrade();
  // } else {
  //   var recognition = new webkitSpeechRecognition();
  //   recognition.onresult = function(event) {
  //     console.log(event.results[0][0].transcript);
  //   };
  //   recognition.start();
  // }
  // var button = document.getElementById('record');
  // button.addEventListener('click', function () {
  //   recognition.start();
  // });


var el = document.getElementById('playerbox'); //assuming here that el is your <audio> element
var audioSources = [
"../assets/audio/voicetest.wav",
"../assets/audio/voicetest_1.wav",
"../assets/audio/voicetest_2.wav",
"../assets/audio/voicetest_3.wav",
"../assets/audio/voicetest_4.wav",
"../assets/audio/voicetest_5.wav",
"../assets/audio/voicetest_6.wav",
"../assets/audio/voicetest_7.wav",
"../assets/audio/voicetest_8.wav",
"../assets/audio/voicetest_9.wav",
"../assets/audio/voicetest_10.wav",
"../assets/audio/voicetest_11.wav",
"../assets/audio/voicetest_12.wav",
"../assets/audio/voicetest_13.wav",
"../assets/audio/voicetest_14.wav",
"../assets/audio/voicetest_15.wav",
"../assets/audio/voicetest_16.wav",
"../assets/audio/voicetest_17.wav",
"../assets/audio/voicetest_18.wav",
"../assets/audio/voicetest_19.wav",
"../assets/audio/voicetest_20.wav"
];


var index = 0;

function playNext(index){
  el.src = audioSources[index];
  el.play(); //this will play the element
  el.addEventListener('ended', function(){ //this will bind a function to the "ended" event
    //increment the index to target the next element
    index++;
    if(index < audioSources.length){
      //plays the next song and binds the function to the ended event again until the queue is empty
      playNext(index);
    }
  });
}
playNext(index);
