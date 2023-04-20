const music = new Audio('singers/arijit/1.mp3');
const songCard = Array.from(document.getElementsByClassName('song-card'));
let overlay = Array.from(document.getElementsByClassName('overlay'));
let download=document.getElementById("downloadlink");
let index = 0;

// music.play();

// insert song data
const song = [
    { songName: "Agar Tum Saath Ho.mp3", album: "tamasha", poster: "singers/arijit/1.webp" },
    { songName: "Bandeya.mp3", album: " Bandeya (From 'Dil Juunglee')", poster: "singers/arijit/2.webp" },
    { songName: "chal ghar chale.mp3", album: "malang", poster: "singers/arijit/3.webp" },
    { songName: "Haan Tum Ho.mp3", album: " Love Aaj Kal", poster: "singers/arijit/4.webp" },
    { songName: "Rasiya Reprise.mp3", album: "Brahmāstra 2022", poster: "singers/arijit/5.webp" },
    { songName: "shayad.mp3", album: "Love Aaj Kal", poster: "singers/arijit/6.webp" },
    { songName: "woh din.mp3", album: "Chhichhore", poster: "singers/arijit/7.webp" },
    { songName: "Ami Je Tomar.mp3", album: "Bhool Bhulaiyaa 2", poster: "singers/arijit/8.webp" },
    { songName: "Dance Ka Bhoot.mp3", album: "Brahmāstra 2022", poster: "singers/arijit/9.webp" },
    { songName: "Fitoor.mp3", album: " Shamshera 2022", poster: "singers/arijit/10.webp" },
    { songName: "Kaala Jaadu.mp3", album: "Bhool Bhulaiyaa 2", poster: "singers/arijit/11.webp" },
    { songName: "O Bedardeya.mp3", album: "t j m m", poster: "singers/arijit/12.webp" },
    { songName: "Rait Zara Si.mp3", album: "Atrangi Re", poster: "singers/arijit/13.webp" },
    { songName: "tere hawale.mp3", album: "laal singh chhadda", poster: "singers/arijit/14.webp" },
];

songCard.forEach((element, i) => {
    //  console.log(i);
    if (song[i]) {
        element.getElementsByTagName("img")[0].src = song[i].poster;
        // element.getElementsByTagName("alt")[0].innerHTML=song[i].songName;
        element.getElementsByClassName("song-name")[0].innerText = song[i].songName;
    }
});

// music player
let masterPlay = document.getElementById('playbtn');
let masterPause = document.getElementById('pause');
masterPlay.addEventListener('click', () => {
    if (music.paused || music.currentTime <= 0) {
        music.play();
        masterPlay.style.display = "none";
        masterPause.style.display = "inline";
        overlay.forEach((e, i) => {
            if (i == index - 1) {
                e.classList.remove('overlay');
                e.classList.add('overlay-pause');
                //  console.log(index);
            }
        })
   }
})
masterPause.addEventListener('click', () => {
    if (music.play || music.currentTime >= 0) {

        music.pause();
        masterPlay.style.display = "inline";
        masterPause.style.display = "none";
        makeAllplays();
    }

});

let poster = document.getElementById('poster_master_play');
let title = document.getElementById('postername');
let Album = document.getElementById('posterAlbumName');
// let overlay=Array.from(document.getElementsByClassName('overlay'));
//  let index=0;


const makeAllplays = () => {
    overlay.forEach((s) => {
        s.classList.add('overlay');
        s.classList.remove('overlay-pause');
    })
}

Array.from(document.getElementsByClassName('overlay')).forEach((e) => {
    e.addEventListener('click', (el) => {
        index = el.target.id;
        // console.log(index);
        music.src = `singers/arijit/${index}.mp3`;
        poster.src = `singers/arijit/${index}.webp`;
        music.play();
        music.volume = Vol.value / 100;
 
        if (el.target.classList == 'overlay') {
            makeAllplays();
            el.target.classList.remove('overlay');
            el.target.classList.add('overlay-pause');
            masterPlay.style.display = "none";
            masterPause.style.display = "inline";

        }
        else {
            el.target.classList.add('overlay');
            el.target.classList.remove('overlay-pause');
            masterPlay.style.display = "inline";
            masterPause.style.display = "none";
            music.pause();
        }



        let songTitles = song.filter((ele, i) => {
            return i == index - 1;
            // console.log(song[i]);
        });

       

        songTitles.forEach(eles => {
            let { songName, album } = eles;
            title.innerHTML = songName;
            Album.innerHTML = album;
            download.setAttribute('download',songName);
             //downlod button link update
            download.href=`singers/arijit/${index}.mp3`;
            //console.log(title);
        })
    })

});

// seekbaar time

let timeStart = document.getElementById("timestart");
let timeEnd = document.getElementById("timeend");
let Seek = document.getElementById("seek_range");
let bar2 = document.getElementById("seek_bar");
let dot = document.getElementsByClassName('dot')[0];

music.addEventListener('timeupdate', () => {
    let music_curr = music.currentTime;
    let music_dur = music.duration;
    if (music_curr == music_dur) {
        music.pause();
        masterPlay.style.display = "inline";
        masterPause.style.display = "none";
    }
    //duration value set
    let min1 = Math.floor(music_dur / 60);
    let sec1 = Math.floor(music_dur % 60);
    // console.log(min1+" "+sec1);
    if (music.play || music.pause) {
        if (sec1 < 10) {
            sec1 = `0${sec1}`;
        }
        timeEnd.innerText = `${min1} : ${sec1}`;
    }
    // current playing time set
    let min2 = Math.floor(music_curr / 60);
    let sec2 = Math.floor(music_curr % 60);
    if (sec2 < 10) {
        sec2 = `0${sec2}`;
    }
    timeStart.innerText = `${min2} : ${sec2}`;

    let progressBar = parseInt((music_curr / music_dur) * 100);
    Seek.value = progressBar;
    //    console.log(Seek.value);
    let seekbar = Seek.value;
    bar2.style.width = `${seekbar}%`;
    dot.style.left = `${seekbar}%`;
});

Seek.addEventListener('change', () => {
    if (music.paused) {
        music.play();
        masterPlay.style.display = "none";
        masterPause.style.display = "inline";
    }

    music.currentTime = Seek.value * music.duration / 100;
});

// set volume button
let Vol = document.getElementById("Vol_range");
let volBar = document.getElementById("volbar");
let volDot = document.getElementById("voldot");
// let val = Vol.value;
music.volume = Vol.value / 100;
volBar.style.width = `${Vol.value}%`;
volDot.style.left = `${Vol.value}%`;
Vol.addEventListener('change', () => {
    let val = Vol.value;
    volBar.style.width = `${val}%`;
    volDot.style.left = `${val}%`;
    music.volume = Vol.value / 100;
});

// NEXT PREV BUTTON HANDLE
let Back = document.getElementById("prev");
let Next = document.getElementById('next');
 
Back.addEventListener('click', () => {
    index -= 1;
    if (index < 1) {
        index = 14;
    }
    makeAllplays();
    // overlay[index].classList.remove("overlay");
    overlay[index - 1].classList.add("overlay-pause");
    music.src = `singers/arijit/${index}.mp3`;
    poster.src = `singers/arijit/${index}.webp`;
    music.play();
    let songTitles = song.filter((ele, i) => {
        return i == index - 1;
    });

    songTitles.forEach(eles => {
        let { songName, album } = eles;
        title.innerHTML = songName;
        Album.innerHTML = album;
        download.setAttribute('download',songName);
        //downlod button link update
        download.href=`singers/arijit/${index}.mp3`;
    })
});

Next.addEventListener('click', () => {
     index ++;
    if (index > 14) {
        index = 1;
    }
    makeAllplays();
    masterPlay.style.display="none";
    masterPause.style.display="inline";
    overlay[index - 1].classList.add("overlay-pause");
    music.src = `singers/arijit/${index}.mp3`;
    poster.src = `singers/arijit/${index}.webp`;
    music.play();
      
    let songTitles = song.filter((ele, i) => {
        return i == index - 1;
    });

    songTitles.forEach(eles => {
        let { songName, album } = eles;
        title.innerHTML = songName;
        Album.innerHTML = album;
        download.setAttribute('download',songName);
        //downlod button link update
        download.href=`singers/arijit/${index}.mp3`;
    })
});

// repeat button functionality
const Repeat = document.getElementsByClassName('repeat')[0];
Repeat.addEventListener('click',()=>{
    if(Repeat.classList=="repeat"){
        Repeat.classList.remove("repeat");
    }
    else{
        Repeat.classList.add("repeat");
    }
});
const repeat_music= () =>{
    index;
    music.src = `singers/arijit/${index}.mp3`;
    poster.src = `singers/arijit/${index}.webp`;
    music.play();
    music.volume = Vol.value / 100;
    masterPlay.style.display = "none";
    masterPause.style.display = "inline";
    let songTitles = song.filter((ele, i) => {
        return i == index - 1;
    });
    songTitles.forEach(eles => {
        let { songName, album } = eles;
        title.innerHTML = songName;
        Album.innerHTML = album;
        download.setAttribute('download',songName);
         //downlod button link update
        download.href=`singers/arijit/${index}.mp3`;
        //console.log(title);
    })
};


// when music completly play
const next_music= () =>{
    index++;
    if(index>song.length){index=1;}
    music.src = `singers/arijit/${index}.mp3`;
    poster.src = `singers/arijit/${index}.webp`;
    music.play();
    music.volume = Vol.value / 100;
    masterPlay.style.display = "none";
    masterPause.style.display = "inline";
    let songTitles = song.filter((ele, i) => {
        return i == index - 1;
    });
    songTitles.forEach(eles => {
        let { songName, album } = eles;
        title.innerHTML = songName;
        Album.innerHTML = album;
        download.setAttribute('download',songName);
         //downlod button link update
        download.href=`singers/arijit/${index}.mp3`;
        //console.log(title);
    })
};

//music END LISTNER
music.addEventListener('ended',()=>{
if(Repeat.classList=="repeat"){
    repeat_music();
}
else{
    next_music();
}
});