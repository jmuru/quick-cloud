var play = document.getElementById('play');
var pause = document.getElementById('pause');
var username = document.getElementById('username');
var player = document.getElementById('player')

SC.initialize({
	client_id: 'd1406a91a61f2077f85d9e0687a6ad75',
	redirect_uri: 'http://0.0.0.0:8080/redirect.html'
});

// SC.stream('/tracks/293', function(sound){
// 	play.addEventListener('click', function(e){
// 		sound.start();
// 	});
// 	pause.addEventListener('click', function(e){
// 		sound.pause();
// 	});
// });

function mySounds(){
	SC.connect(function(){
		SC.get('/me', function(me){
			alert('Hello, ' + me.username);
		});
	});
}

mySounds();




