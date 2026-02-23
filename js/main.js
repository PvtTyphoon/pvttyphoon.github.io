const typedText = "fetch";
const typedTextElement = document.getElementById("typed-text");
const additionalText = document.getElementById("additional-text");
const lastfmInfo = document.getElementById("lastfm-info");

let index = 0;

function type() {
  if (index < typedText.length) {
    typedTextElement.textContent += typedText[index];
    index++;
    setTimeout(type, 200);
  } else {
    setTimeout(() => {
      additionalText.classList.remove("hidden");
      fetchLastfmData();
    }, 1000);
  }
}

function fetchLastfmData() {
  const lastfmUsername = "LiamsNotABot";
  const lastfmApiKey = "615322f0047e12aedbc610d9d71f7430";
  const apiUrl = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${lastfmUsername}&api_key=${lastfmApiKey}&format=json&limit=1`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const track = data.recenttracks.track[0];
      if (track) {
        displayLastfmInfo(track);
      }
    })
    .catch((error) => console.error("Error fetching Last.fm data:", error));
}

function displayLastfmInfo(track) {
  const albumCoverUrl = track.image[2]["#text"];
  const songName = track.name;
  const artistName = track.artist["#text"];
  const isNowPlaying = track["@attr"] && track["@attr"].nowplaying === "true";

  const albumCoverElement = document.createElement("a");
  albumCoverElement.href = track.url;
  albumCoverElement.target = "_blank";
  albumCoverElement.classList.add("lastfm-album-cover");

  const albumCoverImage = document.createElement("img");
  albumCoverImage.src = albumCoverUrl;
  albumCoverImage.alt = "Album Cover";
  albumCoverElement.appendChild(albumCoverImage);

  const lastfmTextElement = document.createElement("p");

  if (isNowPlaying) {
    lastfmTextElement.innerHTML = `&nbsp;Currently listening to <span style="color: #ff6767; text-shadow: 0 0 2px #ff6767;">${songName}</span> by <span style="color: #ff6767; text-shadow: 0 0 2px #ff6767;">${artistName}</span>`;
  } else {
    const listenedTime = new Date(track.date.uts * 1000);
    const currentTime = new Date();
    const timeDifference = Math.floor(
      (currentTime - listenedTime) / (1000 * 60),
    );
    if (timeDifference < 10) {
      lastfmTextElement.innerHTML = `&nbsp;Just listened to <span style="color: #ff6767; text-shadow: 0 0 2px #ff6767;">${songName}</span> by <span style="color: #ff6767; text-shadow: 0 0 2px #ff6767;">${artistName}</span>`;
    } else if (timeDifference < 60) {
      lastfmTextElement.innerHTML = `&nbsp;Was listening to <span style="color: #ff6767; text-shadow: 0 0 2px #ff6767;">${songName}</span> by <span style="color: #ff6767; text-shadow: 0 0 2px #ff6767;">${artistName}</span> ${timeDifference} minutes ago`;
    } else {
      const hoursDifference = Math.floor(timeDifference / 60);
      lastfmTextElement.innerHTML = `&nbsp;Was listening to <span style="color: #ff6767; text-shadow: 0 0 2px #ff6767;">${songName}</span> by <span style="color: #ff6767; text-shadow: 0 0 2px #ff6767;">${artistName}</span> ${hoursDifference} hours ago`;
    }
  }
  lastfmInfo.appendChild(albumCoverElement);
  lastfmInfo.appendChild(lastfmTextElement);
}

document
  .getElementById("button-close")
  .addEventListener("click", playButtonClickSound);
document
  .getElementById("button-minimize")
  .addEventListener("click", playButtonClickSound);
document
  .getElementById("button-maximize")
  .addEventListener("click", playButtonClickSound);

function playButtonClickSound() {
  const buttonClickSound = new Audio("assets/sounds/pipe.mp3");
  buttonClickSound.play();
}

document.addEventListener("DOMContentLoaded", type);
