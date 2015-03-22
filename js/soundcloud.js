
var trackName = document.getElementById('track-name');
var artist = document.getElementById('artist');
var artwork = document.getElementById('artwork');


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


// helper function to get user id of specific artist on soundcloud
//takes in a string version of the url appends it to the resolve api reference
// function getId(url) {
//     SC.get('/resolve/?url=' + url, function(result) {
//         console.log(result);
//     });
// }
//getId('https://soundcloud.com/Soulection');


SC.initialize({
    client_id: 'd1406a91a61f2077f85d9e0687a6ad75',
    redirect_uri: 'http://0.0.0.0:8080/redirect.html'
});

//return length of track in miliseconds
function getTrackDuration(track) {
    //console.log(track.duration);
    return track.duration;
}

function getTrackName(track){
    return track.title;
}

function getArtistName(track){
    return track.user.username;
}

function getBackground(track){
    return track.artwork_url;
}

function playMusic(track) {
    var play = document.getElementById('play');
    var pause = document.getElementById('pause');

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

function dwnld(track){
    if(track.downloadable === true){
        var link = document.createElement('a');
        var linkText = document.createTextNode('Download Now');
        link.appendChild(linkText);
        link.id = 'download';
        link.href = track.download_url;
        return document.body.appendChild(link);
    }else{
        return "";
    }
}

function selectedArtist() {
    SC.get('/tracks', {
        user_id: 483960,
        limit: 30
    }, function(tracks) {
        //console.log(tracks);
        var random = Math.floor(Math.random() * tracks.length);
        var duration = getTrackDuration(tracks[random]);
        //console.log(duration);
        console.log(tracks[random]);
        playMusic(tracks[random]);
        trackName.textContent = getTrackName(tracks[random]);
        artist.textContent = 'Artist: ' + getArtistName(tracks[random]);
        console.log(getBackground(tracks[random]));
        artwork.src = getBackground(tracks[random]);
        dwnld(tracks[random]);
    });
}


selectedArtist();