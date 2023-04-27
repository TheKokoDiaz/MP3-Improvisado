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
var Loop = 0;
var RandomList = [];
var RandomListIndex = 0;
var RandomListExist = false;

function loadListSong(x){
    RandomListExist = false;
    loadSong(x);
}

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

    window.document.title = song.title + ' - MP3 Improvisado';

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
    var audio = document.getElementById('player');
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

function toggleLoop(){
    var BtnLoop = document.getElementById('icon_loop');
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

function updateTime(){
    var audio = document.getElementById('player');
    var bar = document.getElementById('progress_bar');
    var TimePlay = document.getElementById('time_play');

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

/* function showMsg(msg, div){
    var box = document.getElementById('msg_hover');
    box.innerText = msg;

    var coord = div.getBoundingClientRect();
    var x = Math.floor(coord.left);
    var h = Math.floor(coord.height) + 5;
    var y = Math.floor(coord.top);

    box.style.left = x + 'px';
    box.style.top = (y + h) + 'px';
    

    console.log(coord, x, y);
    console.log(msg);
}

function hideMsg(){
    var box = document.getElementById('msg_hover');
    box.style.display = 'none';
} */