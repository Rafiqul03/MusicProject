const nav = document.querySelector("nav");
const toggleButton = document.querySelector(".toggle-button");
const buttonElement = document.querySelector(".button-element");
const buttonText = document.querySelector(".button-text");

let direction = "left";

const songs = [
  {
    id: 0,
    name: "Yesterday",
    genre: "rock",
    url: "./songs/Yesterday_320(PaglaSongs).mp3",
    img: "./images/yesterday.jpg",
    playlist: "",
    artist: "Alen Walker",
  },
  {
    id: 1,
    name: "Mayores",
    genre: "pop",
    url: "./songs/Mayores_320(PaglaSongs).mp3",
    img: "./images/download.jpg",
    playlist: "",
    artist: "Backy G",
  },
  {
    id: 2,
    name: "I Was Never",
    genre: "pop",
    url: "./songs/I-Was-Never.mp3",
    img: "./images/weeknd.jpg",
    playlist: "",
    artist: "Weeknd",
  },
  {
    id: 3,
    name: "Come Down",
    genre: "hiphop",
    url: "./songs/Come_Down.mp3",
    img: "./images/come down.jpg",
    playlist: "",
    artist: "Selena Gomez",
  },
  {
    id: 4,
    name: "We Can Done",
    genre: "rock",
    url: "./songs/We-Caa-Done.mp3",
    img: "./images/drake.jpg",
    playlist: "",
    artist: "Drake",
  },
];

const songList = document.querySelector(".song-list");
const selectedSong = document.querySelector("#song-select");
const playerContainer = document.querySelector(".player-container");
const songImg = document.querySelector(".song-img");
const songName = document.querySelector(".song-name");
const artistName = document.querySelector(".artist-name");
const myAudio = document.querySelector("#my-audio");
const downloadAudio = document.querySelector("#download-audio");

const getSong = (song) => {
  songImg.src = song.img;
  songImg.alt = song.name;
  songName.innerHTML = song.name;
  artistName.innerHTML = song.artist;
  myAudio.src = song.url;
  downloadAudio.href = song.url;
};
let songId = 0;

const getSongs = (values) => {
  values.forEach((item) => {
    const song = document.createElement("div");
    song.className = "song";
    // song.style.backgroundColor = "purple";
    // song.style.marginBottom = "5px";
    // song.style.borderRadius = "5px";
    // song.style.color = "white";
    // song.style.padding = "5px";

    song.innerHTML = item.name;
    song.addEventListener("click", () => {
      getSong(item);
      songId = item.id;
    });

    songList.append(song);
  });
};

let updatedSongs = songs;
getSongs(updatedSongs);
getSong(updatedSongs[songId]);

document.querySelector(".prev-button").addEventListener("click", () => {
  if (songId === 0) {
    const lastSongId = updatedSongs.length - 1;
    getSongs(updatedSongs[lastSongId]);
    songId = lastSongId;
  } else {
    songId -= 1;
    getSong(updatedSongs[songId]);
  }
});
document.querySelector(".next-button").addEventListener("click", () => {
  if (songId === updatedSongs.length - 1) {
    songId = 0;
    getSongs(updatedSongs[songId]);
  } else {
    songId += 1;
    getSong(updatedSongs[songId]);
  }
});

selectedSong.addEventListener("change", () => {
  songList.innerHTML = null;
  if (selectedSong.value === "all") updatedSongs = songs;
  else
    updatedSongs = [...songs].filter(
      (item) => item.genre === selectedSong.value
    );
  getSongs(updatedSongs);
});

const myPlaylist = document.querySelector(".all-playlist");
const currPlaylist = document.querySelector(".curr-playlist");
const allPlaylist = [];
let currentList = "";

const getCurrPlayList = (list) => {
  currPlaylist.innerHTML = null;

  list.forEach((item) => {
    const listItem = document.createElement("div");
    listItem.className = "song";
    listItem.innerHTML = item.name;
    currPlaylist.append(listItem);
  });
};

document.querySelector(".playlist-button").addEventListener("click", () => {
  songs[songId].playlist = currentList;
  console.log(currentList);
  const filterdSongs = songs.filter((item) => item.playlist === currentList);
  getCurrPlayList(filterdSongs);
});

const getPlaylist = (list) => {
  myPlaylist.innerHTML = null;
  list?.forEach((item) => {
    const listItem = document.createElement("div");
    listItem.className = "song";
    listItem.innerHTML = item;
    // if (item === currentList) {
    //   listItem.style.color = "yellow";
    // } else listItem.style.color = "black";
    listItem.addEventListener("click", () => {
      currentList = item;
      const filterdSongs = songs.filter(
        (item) => item.playlist === currentList
      );
      getCurrPlayList(filterdSongs);
      // listItem.style.color = "yellow";
    });
    myPlaylist.append(listItem);
  });
};

getPlaylist(allPlaylist);

const myForm = document.querySelector(".my-form");
myForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.querySelector(".my-input").value;
  if (!allPlaylist.includes(name)) {
    currentList = name;
    allPlaylist.push(name);
    getPlaylist(allPlaylist);
  } else alert("Playlist already exists!");
});

const section = document.querySelectorAll(".section");
const song = document.querySelectorAll(".song");
const main = document.querySelector("main");

toggleButton.addEventListener("click", () => {
  //ES6 metod()=>{}arrow function;
  if (direction == "right") {
    toggleButton.style.flexDirection = "row";
    nav.style.backgroundColor = "#27296d";
    buttonElement.style.backgroundColor = "#27296d";
    buttonText.innerHTML = "Dark";
    direction = "left";
    //section.style.backgroundColor = "#a393eb";
    playerContainer.style.backgroundColor = "#a393eb";
    main.style.backgroundColor = "white";
    section.forEach((item) => {
      item.style.backgroundColor = "#a393eb";
    });
    song.forEach((item) => {
      item.style.backgroundColor = "purple";
    });
  } else if (direction == "left") {
    toggleButton.style.flexDirection = "row-reverse";
    nav.style.backgroundColor = "#3c3939";
    buttonElement.style.backgroundColor = "#3c3939";
    buttonText.innerHTML = "Light";
    direction = "right";
    //section.style.backgroundColor = "#3c3939";
    playerContainer.style.backgroundColor = "grey";
    main.style.backgroundColor = "gray";
    section.forEach((item) => {
      item.style.backgroundColor = "#3c3939";
    });
    song.forEach((item) => {
      item.style.backgroundColor = "grey";
    });
  }
});
