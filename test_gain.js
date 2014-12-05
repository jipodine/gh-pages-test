window.onload = init;
var context;

var lookAhead = 1; // secondes

var oceanUrl = 'http://www.freesound.org/data/previews/174/174763_7037-lq.mp3';
var oceanBuffer = null;
var oceanGain = null;

function init() {
    context = new AudioContext(); // monkey in context

    var request = new XMLHttpRequest();
    request.open("GET", oceanUrl, true);
    request.responseType = "arraybuffer";

    // Decode asynchronously
    request.onload = function decode() {
        context.decodeAudioData(request.response,
                                oceanBufferStart,
                                function(error) {
                                    alert('decodeAudioData error for url <' +
                                          oceanUrl + '>', error);
                                });
    };
    
    request.send();


}

function oceanBufferStart(buffer) {
    oceanBuffer = buffer;

    var source = context.createBufferSource();
    source.buffer = oceanBuffer;

    oceanGain = context.createGain();
    // oceanGain.gain.setValueAtTime(context.currentTime, dBToAmp(0) );
    source.connect(oceanGain);

    oceanGain.connect(context.destination);

    source.start(0);

    var volume = document.getElementById('oceanVolume');
    volume.addEventListener('input', changeVolume, false);
}

function changeVolume() {
    var volume = parseFloat(this.value);

    // // OK
    // oceanGain.gain.value = dBToAmp(volume);

    var now = context.currentTime;

    // oceanGain.gain.value is never updated on Firefox
    oceanGain.gain.cancelScheduledValues(now);
    // ramp starts now
    oceanGain.gain.setValueAtTime(oceanGain.gain.value, now);
    
    // ramp ends in lookAhead
    oceanGain.gain.linearRampToValueAtTime(
        dBToAmp(volume), now + lookAhead);
    
}



function dBToAmp(dbValue) {
    return Math.pow(10, dbValue / 20);
}
