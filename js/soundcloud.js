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

(function(){
    'use strict';


    var $trackName = document.getElementById('track-name');
    var $artist = document.getElementById('artist');
    var $artwork = document.getElementById('artwork');
    var $play = document.getElementById('play');
    var $pause = document.getElementById('pause');
    var status = 0, track; //track starts at 0 meaning not loaded, when the window loads




    SC.initialize({
        client_id: 'd1406a91a61f2077f85d9e0687a6ad75',
        redirect_uri: 'http://0.0.0.0:8080/redirect.html'
    });

    function play(){
        $play.style.visibility = 'hidden';
        $pause.style.visibility = 'initial';

        //checks if the song is loaded
        console.log("Play triggered");
        if( track ){
            track.play();
        }
        // sets songs state to 1 or "loaded"
        status = 1;
    }
    function pause() {
        $play.style.visibility = 'initial';
        $pause.style.visibility = 'hidden';
        track.pause();
        status = 0;
    }

    $play.addEventListener('click', play);

    $pause.addEventListener('click', pause);

    function startStream(_track, callback) {
        SC.stream('/tracks/' + _track.id, callback);
    }

    function dwnld(track) {
        if (track.downloadable === true) {
            var link = document.createElement('a');
            // creates text in between the opening and closing html tags
            var linkText = document.createTextNode('Download Now');
            link.appendChild(linkText);
            link.id = 'download';
            link.href = track.download_url;
            return document.body.appendChild(link);
        } else {
            return "";
        }
    }

    function selectedArtist() {
        SC.get('/tracks', {
            user_id: 483960,
            limit: 30
        }, function(tracks) {
            // var randomIdx = ~~(Math.random() * tracks.length);
            var randomIdx = Math.floor(Math.random() * tracks.length);
            var selTrack = tracks[randomIdx];
            startStream(selTrack, function(_track){
                /* because the variable track is used already (global var), you must redefine
                track as something else within the scope of its encapsulating function 
                in order to use it again, look at pause and play functions */
                track = _track;
                // if track is loaded then call play function 
                if( status == 1 ){
                    play();
                }
            });
            $trackName.textContent = selTrack.title;
            $artist.textContent = 'Artist: ' + selTrack.user.username;
            $artwork.src = selTrack.artwork_url;
            dwnld(selTrack);
        });
    }

    selectedArtist();

})();