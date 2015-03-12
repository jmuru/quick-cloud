SC.initialize({
	client_id: 'd1406a91a61f2077f85d9e0687a6ad75',
	redirect_uri: "https://soundcloud.com",
});
var play = document.getElementById('play');
var pause = document.getElementById('pause');
var username = document.getElementById('username');

SC.stream('/tracks/293', function(sound){
	play.addEventListener('click', function(e){
		sound.start();
	});
	pause.addEventListener('click', function(e){
		sound.pause();
	});
});


