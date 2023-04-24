/* var audio = document.getElementById('player');
var BtnPlay = document.getElementById('icon_play');
var BtnPrev = document.getElementById('icon_back');
var BtnNext = document.getElementById('icon_front');
var TimePlay = document.getElementById('time_play');
var TimeEnd = document.getElementById('time_end');
var SongTitle = document.getElementById('name');
var SongArtist = document.getElementById('artist');
var SongImage = document.getElementById('mp3_image'); */

const List = [
    {
        title: 'Quartz Quadrant Zone (Act 1) - Sonic CDX OST',
        artist: 'Daan Demmers',
        file: 'music/Quartz_Quadrant_Zone_(Act1).mp3',
        image: 'imgs/SonicCDX_QQZ1.jpg',
        duration: '3:06'
    },
    {
        title: 'Palmtree Panic Zone (Act 1) - Sonic CDX OST',
        artist: 'Daan Demmers',
        file: 'music/Palmtree_Panic_Zone_(Act1).mp3',
        image: 'imgs/SonicCDX_PPZ1.jpg',
        duration: '3:40'
    },
    {
        title: 'Alto\'s Odyssey Main Theme',
        artist: 'Alto\'s Odyssey OST',
        file: 'music/Altos_Odyssey.mp3',
        image: 'imgs/AltosOdyssey.png',
        duration: '5:25'
    },
    {
        title: 'SpeedRunners Level 1',
        artist: 'DoubleDutch Games',
        file: 'music/SpeedRunners_Level1.mp3',
        image: 'imgs/Speedrunners.png',
        duration: '2:03'
    }/* ,
    {
        title: '',
        artist: '',
        file: '',
        image: '',
        duration: '0'
    } */
];

var currentSong = 0;
var IsPlaying = false;

function loadSong(n){
    currentSong = n;
    const song = List[n];

    var audio = document.getElementById('player');
    audio.addEventListener('timeupdate', updateTime);

    var SongTitle = document.getElementById('name');
    var SongArtist = document.getElementById('artist');
    var SongImage = document.getElementById('mp3_image');
    
    var TimeEnd = document.getElementById('time_end');

    audio.setAttribute('src', song.file);
    playSong();

    SongTitle.innerText = song.title;
    SongArtist.innerText = song.artist;
    SongImage.setAttribute('src', song.image);

    
    TimeEnd.innerText = song.duration;
    
    ChangeImg(song.image);
}

function ChangeImg(img){
    var X = document.body;
    X.style.backgroundImage = 'url('+ img + ')';
}

function togglePlay(){
    if(IsPlaying == false){
        playSong();
    }
    else{
        pauseSong();
    }

}

function playSong(){
    IsPlaying = true;

    var audio = document.getElementById('player');
    audio.play();

    var SongImage = document.getElementById('mp3_image');
    SongImage.style.animation = 'rotate 20s linear infinite';

    var BtnPlay = document.getElementById('icon_play');
    BtnPlay.setAttribute('src', 'icons/pause.png');
}

function pauseSong(){
    IsPlaying = false;

    var audio = document.getElementById('player');
    audio.pause();

    var SongImage = document.getElementById('mp3_image');
    SongImage.style.animation = 'none';

    var BtnPlay = document.getElementById('icon_play');
    BtnPlay.setAttribute('src', 'icons/play.png');
}

function PrevSong(){
    currentSong--;
    if(currentSong < 0){
        currentSong = List.length - 1;
    }

    loadSong(currentSong);
}

function NextSong(){
    currentSong++;
    if(currentSong > List.length - 1){
        currentSong = 0;
    }

    loadSong(currentSong);
}

function updateTime(){
    var audio = document.getElementById('player');
    var bar = document.getElementById('progress_bar');
    var TimePlay = document.getElementById('time_play');
    /* var TimeEnd = document.getElementById('time_end'); */

    var current = audio.currentTime;
    var duration = audio.duration;

    bar.value = (current / duration) * 100;

    var minutes = Math.floor(current / 60);
    var seconds = Math.floor(current % 60);

    if(seconds < 10){
        seconds = '0' + seconds;
    }

    TimePlay.innerText = minutes + ':' + seconds;

    if(current == duration){
        NextSong();
    }
}