async function updateNowPlaying() {
    const music = document.querySelector(".music");
    const label = document.getElementById("now-playing-label");
    const artist = document.getElementById("now-playing-artist");
    const track = document.getElementById("now-playing-track");

    if (!music || !label || !artist || !track) {
        console.error("Now Playing elements not found.");
        return;
    }

    try {
        const response = await fetch("/api/music");

        if (!response.ok) {
            throw new Error(`Music API returned ${response.status}`);
        }

        const data = await response.json();
        const currentTrack = data.recenttracks?.track?.[0];

        if (!currentTrack) {
            music.classList.add("signal-lost");

            label.textContent = "IS LISTENING TO";
            artist.textContent = "";
            track.textContent = "Signal unavailable.";

            return;
        }

        const artistName =
            currentTrack.artist?.["#text"] || "Unknown Artist";

        const title =
            currentTrack.name || "Unknown Track";

        const isPlaying =
            currentTrack["@attr"]?.nowplaying === "true";

        music.classList.remove("signal-lost");

        label.textContent = isPlaying
            ? "IS LISTENING TO"
            : "LAST LISTENED TO";

        artist.textContent = artistName;
        track.textContent = title;

    } catch (error) {
        console.error("Music error:", error);

        music.classList.add("signal-lost");

        label.textContent = "IS LISTENING TO";
        artist.textContent = "";
        track.textContent = "SIGNAL LOST";
    }
}

updateNowPlaying();

setInterval(updateNowPlaying, 30000);