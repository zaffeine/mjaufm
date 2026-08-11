async function updateNowPlaying() {
    const label = document.getElementById("now-playing-label");
    const track = document.getElementById("now-playing-track");

    if (!label || !track) {
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
            label.textContent = "No Broadcast";
            track.textContent = "Nothing has come through yet.";
            return;
        }

        const artist = currentTrack.artist?.["#text"] || "Unknown Artist";
        const title = currentTrack.name || "Unknown Track";
        const isPlaying =
            currentTrack["@attr"]?.nowplaying === "true";

        label.textContent = isPlaying
            ? "Now Playing"
            : "Last Played";

        track.textContent = `${artist} — ${title}`;

    } catch (error) {
        console.error("Music error:", error);
        label.textContent = "Music Signal";
        track.textContent = "Signal unavailable.";
    }
}

updateNowPlaying();

setInterval(updateNowPlaying, 30000);