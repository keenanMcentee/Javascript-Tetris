/** 
 *  @fileOverview SoundManager file to do exactly what the name says. "Handle the sound".
 *
 *  @author       Keenan McEntee
 */
 
/**
 * A class to handle all the sounds.
 * @class
 *
 * @constructor
 */
function SoundManager()
{
	//an object to hold a name for each sound and its associated buffer (memory holding the sound)
	this.audioBuffers={}
	this.soundReady = false;
	//required for managing and for playing any sound.  Best practise is one per page.
	//It is setup in init() 
	this.audioContext = null;
	this.looping = false;
	this.playing = false;
}

/**
 * Draw function for the square
 * @param {string} name Name of the sound file.
 * @param {boolean} loop Whether or not to loop the sound.
 * @param {double} volume Value between 0-1 to set the sound volume to.
 */
SoundManager.prototype.playSound = function(name, loop, volume)
{
  this.looping = loop;
  console.log(this.audioBuffers[name]);
  if(this.audioBuffers[name] == undefined)
  {
    console.log("Sound '"+name+"' doesn't exist or hasn't been loaded")
    return;
  } 
  //retrieve the buffer we stored earlier
  var audioBuffer = this.audioBuffers[name];

  //create a buffer source - used to play once and then a new one must be made
  var source = this.audioContext.createBufferSource();
  
  var gainNode = this.audioContext.createGain();
  
  source.buffer = audioBuffer;
  source.loop = this.looping;
  source.connect(gainNode);
  gainNode.connect(this.audioContext.destination);
  gainNode.gain.value = volume;
  source.start(0); // Play immediately. 
  this.source = source; // So we can access source in other methods
  source.addEventListener("ended", ended.bind(null, this));
  console.log(source.numberOfOutputs);
  this.playing = true;
  console.log(this.playing);
}
/**
 * Set the sound to loop or not.
 * @param {boolean} loop Whether or not to loop the sound.
 */
SoundManager.prototype.setLoop = function(loop)
{
	this.source.loop = loop;
	this.looping = loop;
}
/**
 * Event called when the sound stops playing.
 * @param {soundManager} soundManager so we can access the "playing variable"
 */
function ended(soundManager , e)
{
	soundManager.playing = false;
	console.log(soundManager.playing);
	console.log("Ended");
}
/**
 * Checks if a sound is playing or not.
 * @param {string} name Name of the sound to check for.
 */
SoundManager.prototype.isPlaying = function(name)
{
  //retrieve the buffer we stored earlier
  var audioBuffer = this.audioBuffers[name];
  //create a buffer source - used to play once and then a new one must be made
  var source = this.audioContext.createBufferSource();
  source.buffer = audioBuffer;
}
/**
 * Stops a sound if it is playing.
 */
SoundManager.prototype.stop = function() {
  this.source.disconnect();
  this.playing = false;
};

/**
Loads a sound file into an audio buffer
@param url is the url to the sound file - you can also use relative path
@param name is you give the sound, it is stored
*/
SoundManager.prototype.loadSoundFile = function (name, url) 
{
	var that = this;
  console.log(url);

  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'arraybuffer';
 
  xhr.onload = function(e) {
      
      //buffer containing sound returned by xhr
      var arrayBuffer=this.response;
	  that.soundReady = true;
      that.audioContext.decodeAudioData(arrayBuffer, function(buffer) {
      //associate the audio buffer with the sound name so can use the decoded audio later.
      that.audioBuffers[name]=buffer;
            
      }, function(e) {
      console.log('Error decoding file', e);
    }); 
	
  };

  //send the xhr request to download the sound file
  xhr.send();
}


/**
*init the audio context
*This function is taken directly from http://www.html5rocks.com/en/tutorials/webaudio/intro/
*/
SoundManager.prototype.init = function () 
{
  try {
    // Fix up for prefixing
    window.AudioContext = window.AudioContext||window.webkitAudioContext;
    this.audioContext = new AudioContext();
  }
  catch(e) {
    alert('Web Audio API is not supported in this browser');
  }
}