const video = document.querySelector(".bg video");

video.addEventListener("loadedmetadata", () => {
    video.playbackRate = 0.5;
});