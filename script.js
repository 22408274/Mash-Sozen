function renderSongList(filteredSongs = songs) {
  const list = document.getElementById("song-list");
  list.innerHTML = "";

  filteredSongs.forEach((song, index) => {
    const li = document.createElement("li");
    li.textContent = song.title;
    li.onclick = () => showSong(songs.indexOf(song));
    list.appendChild(li);
  });
}

function renderChords(chordsText) {
  const chordsDiv = document.getElementById("song-chords");
  chordsDiv.innerHTML = "";

  chordsText.split(" ").forEach(chord => {
    chordsDiv.innerHTML += `
      <div class="chord-img">
        <img src="chords/${chord}.jpg" alt="${chord}">
        <span>${chord}</span>
      </div>
    `;
  });
}

function renderStrumming(strummingText) {
  const container = document.getElementById("song-strumming");
  container.innerHTML = "";

  if (!strummingText) return;

  strummingText.split(" ").forEach(step => {
    const span = document.createElement("span");
    let symbol = "";
    let explanation = "";

    if (step === "D") {
      symbol = "⬇";
      explanation = "Ar bir";
      span.className = "down";
    } else if (step === "U") {
      symbol = "⬆";
      explanation = "Pê tir";
      span.className = "up";
    } else if (step === "B") {
      symbol = "⬇";
      explanation = "Ciqast";
      span.className = "bass";
    }

    span.innerHTML = `<div class="symbol">${symbol}</div><div class="explanation">${explanation}</div>`;
    container.appendChild(span);
  });
}
function renderLyricsWithChords(text) {
  return text.replace(
    /\[([A-Za-z0-9#bm]+)\]([^\s]+)/g,
    (match, chord, word) => {
      return `
<span class="chord-word">
  <span class="chord">${chord}</span>
  <span class="word">${word}</span>
</span>`;
    }
  );
}
function highlightChords(text) {
  const chordRegex = /\b([A-G](?:#|b)?m?(?:7|maj7|sus2|sus4)?)\b/g;

  return text
    .split("\n")
    .map(line => {
      const isChordLine = /^[\sA-G#bm0-9maj7sus]+$/.test(line.trim());

      if (isChordLine) {
        return line.replace(chordRegex, '<span class="chord">$1</span>');
      }

      return line;
    })
    .join("\n");
}

function showSong(index) {
  const song = songs[index];

  document.getElementById("song-title").textContent = song.title;
  document.getElementById("song-author").textContent = "Shoir: " + song.author;
  document.getElementById("song-lyrics").innerHTML =
  highlightChords(song.lyrics.trim());

  renderChords(song.chords);
  renderStrumming(song.strumming);
  const audio = document.getElementById("audio-player");
  if (song.audio && audio) {
    audio.src = song.audio;
    audio.load();
  }
}

function filterSongs() {
  const query = document.getElementById("song-search").value.toLowerCase();
  const filtered = songs.filter(song =>
    song.title.toLowerCase().includes(query) ||
    song.lyrics.toLowerCase().includes(query)
  );
  renderSongList(filtered);
}

window.onload = () => {
  renderSongList();
  showSong(0);

  const searchInput = document.getElementById("song-search");
  if (searchInput) {
    searchInput.addEventListener("input", filterSongs);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll("header nav a");
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  links.forEach(link => {
    const linkPage = link.getAttribute("href");
    if (linkPage === currentPage) {
      link.classList.add("active");
    }
  });
});
const toggleBtn = document.getElementById("theme-toggle");

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  toggleBtn.textContent = "☀️";
}

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
    toggleBtn.textContent = "☀️";
  } else {
    localStorage.setItem("theme", "light");
    toggleBtn.textContent = "🌙";
  }
});
const fsBtn = document.getElementById("fullscreen-btn");

if (fsBtn) {
  fsBtn.addEventListener("click", () => {
    document.body.classList.toggle("fullscreen-mode");

    fsBtn.textContent = document.body.classList.contains("fullscreen-mode")
      ? "✕ Naẋtido"
      : "⛶ Ɣulla ekran";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const scrollBtn = document.getElementById("scroll-top-btn");
  if (!scrollBtn) return;

  window.addEventListener("scroll", () => {
    scrollBtn.style.display = window.scrollY > 300 ? "flex" : "none";
  });

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
});
