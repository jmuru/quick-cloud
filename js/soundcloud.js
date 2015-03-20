var play = document.getElementById('play');
var pause = document.getElementById('pause');
var username = document.getElementById('username');
var player = document.getElementById('player')
var ul = document.getElementById('track-listing');
var node = document.createElement('LI');


SC.initialize({
    client_id: 'd1406a91a61f2077f85d9e0687a6ad75',
    redirect_uri: 'http://0.0.0.0:8080/redirect.html'
});

// SC.stream('/tracks/293', function(sound){
//  play.addEventListener('click', function(e){
//      sound.start();
//  });
//  pause.addEventListener('click', function(e){
//      sound.pause();
//  });
// });

// function mySounds(){
//  SC.connect(function(){
//      SC.get('/me', function(me){
//          alert('Hello, ' + me.username);
//      });
//  });
// }

// mySounds();

function playMusic(track) {
    SC.stream('/tracks/' + track.id, function(track) {
        play.addEventListener('click', function(e) {
            play.style.visibility = 'hidden';
            pause.style.visibility = 'initial';
            track.play();

        });
        pause.addEventListener('click', function(e) {
            play.style.visibility = 'initial';
            pause.style.visibility = 'hidden';
            track.pause();
        });
    });
}

// helper function that return length of track in miliseconds
function getTrackDuration(track) {
    //console.log(track.duration);
    return track.duration;
}

function selectedArtist() {
    SC.get('/tracks', {
        user_id: 483960,
        limit: 20
    }, function(tracks) {
        console.log(tracks);
        var random = Math.floor(Math.random() * tracks.length);
        var duration = getTrackDuration(tracks[random]);
        console.log(duration);
        playMusic(tracks[random]);
    });
}

// helper function to get user id of specific artist on soundcloud
//takes in a string version of the url appends it to the resolve api reference
// function getId(url) {
//     SC.get('/resolve/?url=' + url, function(result) {
//         console.log(result);
//     });
// }
//getId('https://soundcloud.com/Soulection');
selectedArtist();