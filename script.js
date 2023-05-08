//#region Variables
/* Variables of the musics, contains their info, image and file path */
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
    },
    {
        title: 'Theia Sky Ruins - Pokémon Unite OST',
        artist: 'Pokémon Unite',
        file: 'music/Theia_Sky_Ruins.mp3',
        image: 'imgs/PokemonUnite.jpg',
        duration: '3:29'
    },
    {
        title: 'Sweet Mountain (Act 1) - Sonic Colors OST',
        artist: 'Deoxys Prime',
        file: 'music/Sweet_Mountain_(Act1).mp3',
        image: 'imgs/SonicColors.jpeg',
        duration: '3:49'
    }
    /* ,
    {
        title: '',
        artist: '',
        file: '',
        image: '',
        duration: '0'
    } */
];

/* Variables to control the order of playing, toggle play and random play */
var currentSong = 0;
var IsPlaying = false;
var Loop = 0;
var RandomList = [];
var RandomListIndex = 0;
var RandomListExist = false;

/* Variables to get control of the DOM */
var audio = document.getElementById('player');
var bar = document.getElementById('progress_bar');

var SongTitle = document.getElementById('name');
var SongArtist = document.getElementById('artist');
var SongImage = document.getElementById('mp3_image');

var TimePlay = document.getElementById('time_play');
var TimeEnd = document.getElementById('time_end');

var BtnPlay = document.getElementById('icon_play');
var BtnLoop = document.getElementById('icon_loop');
var BtnVolume = document.getElementById('icon_volume');

var VolumeVar = document.getElementById('volume_bar');
var Vol = document.getElementById('volume');

var box = document.getElementById('box_volume_bar');

var box_list = document.getElementById('box_list');

/* EventListeners to modify the audio when a mouse pointer or a finger touch the control */
VolumeVar.addEventListener('mousemove', changeVolume);
VolumeVar.addEventListener('touchmove', changeVolume);

/* EventListener to charge the music list when the page starts */
window.addEventListener('load', LoadAllSongs);
//#endregion

//#region Load All Songs
/* This function, write in the DOM all the music that are available from the List when the HTML is loaded correctly */
function LoadAllSongs(){
    for(var i = 0; i <= List.length - 1; i++){
        var info = List[i];
        box_list.innerHTML += '<!-- Music ' + (i + 1) + ' --> <div class="box_music" onclick="loadListSong( ' + i + ' )"><div class="box_list_img"><img src="' + info.image + '" class="list_img"></div><div class="box_list_info"><div class="list_name">' + info.title + '</div><div class="list_artist">' + info.artist + '</div></div><div class="list_duration">' + info.duration + '</div></div>';
    }
}
//#endregion

//#region Load Song
/* Load a Song if is selected from the List */
function loadListSong(x){
    RandomListExist = false;
    loadSong(x);
}

/* Load a Song when another song finish or is clicked the Prev/Next button */
function loadSong(n){
    currentSong = n;
    const song = List[n];

    audio.addEventListener('timeupdate', updateTime);

    audio.setAttribute('src', song.file);
    playSong();

    window.document.title = song.title + ' - MP3 Improvisado';

    SongTitle.innerText = song.title;
    SongArtist.innerText = song.artist;
    SongImage.setAttribute('src', song.image);

    TimeEnd.innerText = song.duration;
    
    ChangeImg(song.image);
}

/* Changes the image showed in the MP3 Player */
function ChangeImg(img){
    var X = document.body;
    X.style.backgroundImage = 'url('+ img + ')';
}
//#endregion

//#region Toggle Play
/* Toggle between Play/Pause, modify the audio, the "disk" and the button image */
function togglePlay(){
    var src = audio.getAttribute('src');
    
    if(src != null){
        if(IsPlaying == false){
            playSong();
        }
        else{
            pauseSong();
        }
    }
    else{
        loadSong(0);
    }

}

function playSong(){
    IsPlaying = true;

    audio.play();

    SongImage.style.animation = 'rotate 20s linear infinite';

    BtnPlay.setAttribute('src', 'icons/pause.png');
}

function pauseSong(){
    IsPlaying = false;

    audio.pause();

    SongImage.style.animation = 'none';

    BtnPlay.setAttribute('src', 'icons/play.png');
}
//#endregion

//#region Change Song
/* Move to Previous Song */
function PrevSong(){
    if(Loop == 0 || Loop == 1){
        currentSong--;
        if(currentSong < 0){
            currentSong = List.length - 1;
        }

        RandomListExist == false;
    }
    else{
        setRandomList();

        RandomListIndex--;
        if(RandomListIndex < 0){
            RandomListIndex = List.length - 1;
        }
        currentSong = RandomList[RandomListIndex];
    }

    loadSong(currentSong);
}

/* Move to Next Song */
function NextSong(){
    if(Loop == 0 || Loop == 1){
        currentSong++;
        if(currentSong > List.length - 1){
            currentSong = 0;
        }

        RandomListExist == false;
    }
    else{
        setRandomList();

        RandomListIndex++;
        if(RandomListIndex > RandomList.length - 1){
            RandomListIndex = 0;
        }
        currentSong = RandomList[RandomListIndex];
    }

    loadSong(currentSong);
}
//#endregion

//#region Loop
/* Changes between repeat all, repeat one and random */
function toggleLoop(){
    var LoopImg = 'icons/';

    switch(Loop){
        case 0:
            Loop ++; //1
            LoopImg += 'repeat-one.png';
        break;

        case 1:
            Loop ++; //2
            LoopImg += 'random.png';
        break;
        
        case 2:
            Loop = 0;
            LoopImg += 'repeat.png';
        break;
    }
    
    BtnLoop.setAttribute('src', LoopImg);
}
//#endregion

//#region Update Time
function updateTime(){
    var current = audio.currentTime;
    var duration = audio.duration;

    bar.value = (current / duration) * 100;

    /* Make the duration to a time that can be see correctly */
    var minutes = Math.floor(current / 60);
    var seconds = Math.floor(current % 60);

    if(seconds < 10){
        seconds = '0' + seconds;
    }

    TimePlay.innerText = minutes + ':' + seconds;

    /* When the music finish do: */
    if(current == duration){
        switch(Loop){
            case 0:
                NextSong();
            break;

            case 1:
                playSong();
            break;

            case 2:
                setRandomList();

                if(RandomListExist == true){
                    NextSong();
                }
            break;
        }
    }
}
//#endregion

//#region Random List
/* To set a random list and avoid that the current song continues with a random play */
function setRandomList(){
    if(RandomListExist == false){
        RandomListIndex = -1;
        RandomList = [];
        for(var i = 0; i <= List.length - 1; i++){
            RandomList.push(i);
        }

        for(var i = List.length - 1; i >= 0; i--){
            const x = Math.floor(Math.random() * (i + 1));
            [RandomList[i], RandomList[x]] = [RandomList[x], RandomList[i]];
        }

        var n = RandomList.indexOf(currentSong);
        RandomList.splice(n, 1);
        RandomList.push(currentSong);
        console.log(RandomList);

        RandomListExist = true;
    }
}
//#endregion

//#region Volume Control
/* Show volume bar with the control and the volume info */
function showVolumeBar(){
    box.style.display = 'flex';
    box.style.top = event.clientY + 'px';
    box.style.left = event.clientX + 'px';
}

/* Hide the volume box (with controls and info) */
function hideVolumeBar(){
    box.style.display = 'none';
}

/* With this function, the audio volume can be changed */
function changeVolume(){
    Vol.innerText = VolumeVar.value + ' / 100';
    audio.volume = VolumeVar.value/100;
}
//#endregion

