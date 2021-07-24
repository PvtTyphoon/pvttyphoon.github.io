myAudio = document.getElementById('audio');
myAudio.addEventListener('canplaythrough', function() {
  this.currentTime = Math.floor((Math.random() * 2500) + 1);
  this.play();
});