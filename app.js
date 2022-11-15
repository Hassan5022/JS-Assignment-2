var spotify = new Spotify;
var ui = new UI;

var search = document.querySelector('#search');
var submit = document.querySelector('#submit');
var hamburger = document.querySelector('.left #nav .hamburger');
var home = document.querySelector('.home');
var like = document.querySelector('.liked');


window.addEventListener('resize', (e) => {
    if(window.innerWidth > '425'){
        home.style.display = "flex";
        like.style.display = "flex";
    }
    e.preventDefault();
});

hamburger.addEventListener('click', (e) => {
    if(home.style.display === "flex" && like.style.display === "flex"){
        home.style.display = "none";
        like.style.display = "none";
    }else{
        home.style.display = "flex";
        like.style.display = "flex";
    }
    e.preventDefault();
});


search.addEventListener('keypress', (e) => {
    if(e.key === 'Enter'){
        e.preventDefault();
        load(e);
    }
})

submit.addEventListener('click', load);

function load(e) {
    if (search.value !== '') {
        spotify.getSong(search.value)
            .then(res => {
                // console.log(res);
                ui.showSong(res);
            })
            .catch(err => {
                console.log(err);
            })
        e.preventDefault();
        search.value = '';
    }
}

var songs = document.querySelector('#songs');

songs.addEventListener('click', (e) => {
    if (e.target.nodeName == 'I') {
        var modal = document.getElementById(e.target.parentNode.parentNode.parentNode.nextSibling.id);
        var audio = e.target.parentNode.parentNode.parentNode.nextSibling.childNodes[0].childNodes[2];
        modal.style.display = "block";
        audio.play();
        var close = e.target.parentNode.parentNode.parentNode.nextSibling.childNodes[0].lastElementChild;
        close.addEventListener('click', () => {
            audio.pause();
            modal.style.display = "none";
        });
        window.onclick = function (event) {
            if (event.target == modal) {
                audio.pause();
                modal.style.display = "none";
            }
        }
    }
});