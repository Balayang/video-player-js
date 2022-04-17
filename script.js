// Select Elements
const player = document.querySelector('.player');
const video = document.querySelector('.video');
const progressRange = document.querySelector('.progress-range');
const progressBar = document.querySelector('.progress-bar');
const playBtn = document.getElementById('play-btn');
const volumeIcon = document.getElementById('volume-icon');
const volumeRange = document.querySelector('.volume-range');
const volumeBar = document.querySelector('.volume-bar');
const speed = document.querySelector('.player-speed');
const currentTime = document.querySelector('.time-elapsed');
const duration = document.querySelector('.time-duration');
const fullscreenBtn = document.querySelector('.fullscreen');

// Show Play Icon
showPlayIcon = () => {
	playBtn.classList.replace('fa-play', 'fa-pause');
	playBtn.setAttribute('title', 'Pause');
};

// Play and Pause
togglePlay = () => {
	if (video.paused) {
		video.play();
		playBtn.classList.replace('fa-play', 'fa-pause');
		playBtn.setAttribute('title', 'Pause');
	} else {
		video.pause();
		showPlayIcon();
	}
};

// On Video End Show Play ButtonIcon
video.addEventListener('ended', showPlayIcon);

// Calculate Display Time Format
displayTime = (time) => {
	const minutes = Math.floor(time / 60);
	let seconds = Math.floor(time % 60);
	seconds = seconds > 9 ? seconds : `0${seconds}`;

	return `${minutes}:${seconds}`;
};

// Update Progress bar as video plays
updateProgress = () => {
	progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`;
	currentTime.textContent = `${displayTime(video.currentTime)} /`;
	duration.textContent = `${displayTime(video.duration)}`;
};

// Click to seek within the video
setProgress = (e) => {
	const newTime = e.offsetX / progressRange.offsetWidth;
	progressBar.style.width = `${newTime * 100}%`;
	video.currentTime = newTime * video.duration;
};

// Volume Controls
let lastVolume = 1;

// Volume Bar
changeVolume = (e) => {
	let volume = e.offsetX / volumeRange.offsetWidth;
	// Rounding volume up or down
	if (volume < 0.1) {
		volume = 0;
	}
	if (volume > 0.9) {
		volume = 1;
	}
	volumeBar.style.width = `${volume * 100}%`;
	video.volume = volume;
	// Change icon depending on volume
	volumeIcon.className = '';
	if (volume > 0.7) {
		volumeIcon.classList.add('fas', 'fa-volume-up');
	} else if (volume < 0.7 && volume > 0) {
		volumeIcon.classList.add('fas', 'fa-volume-down');
	} else if (volume === 0) {
		volumeIcon.classList.add('fas', 'fa-volume-off');
	}
	lastVolume = volume;
};

// Mute and Unmute
toggleMute = () => {
	volumeIcon.className = '';
	if (video.volume) {
		lastVolume = video.volume;
		video.volume = 0;
		volumeBar.style.width = 0;
		volumeIcon.classList.add('fas', 'fa-volume-mute');
		volumeIcon.setAttribute('title', 'Unmute');
	} else {
		video.volume = lastVolume;
		video.volume = 1;
		volumeBar.style.width = `${lastVolume * 100}%`;
		volumeIcon.classList.add('fas', 'fa-volume-up');
		volumeIcon.setAttribute('title', 'Mute');
	}
};

// Change Playback Speed
changeSpeed = () => {
	video.playbackRate = speed.value;
};

// Fullscreen ------------------------------- //

//detect Escape key press
window.addEventListener('keydown', (e) => {
	if (e.key === 'Escape' && fullscreen) {
		e.preventDefault();
		closeFullscreen();
		fullscreen = !fullscreen;
	}
});

/* View in fullscreen */
openFullscreen = (element) => {
	if (element.requestFullscreen) {
		element.requestFullscreen();
	} else if (element.mozRequestFullScreen) {
		/* Firefox */
		element.mozRequestFullScreen();
	} else if (element.webkitRequestFullscreen) {
		/* Chrome, Safari and Opera */
		element.webkitRequestFullscreen();
	} else if (element.msRequestFullscreen) {
		/* IE/Edge */
		element.msRequestFullscreen();
	}
	video.classList.add('video-fullscreen');
};

/* Close fullscreen */
closeFullscreen = () => {
	if (document.exitFullscreen) {
		document.exitFullscreen();
	} else if (document.mozCancelFullScreen) {
		/* Firefox */
		document.mozCancelFullScreen();
	} else if (document.webkitExitFullscreen) {
		/* Chrome, Safari and Opera */
		document.webkitExitFullscreen();
	} else if (document.msExitFullscreen) {
		/* IE/Edge */
		document.msExitFullscreen();
	}
	video.classList.remove('video-fullscreen');
};

let fullscreen = false;

// Toggle fullscreen
toggleFullscreen = () => {
	!fullscreen ? openFullscreen(player) : closeFullscreen();
	fullscreen = !fullscreen;
};

// Event Listeners
playBtn.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('timeupdate', updateProgress);
video.addEventListener('canplay', updateProgress);
progressRange.addEventListener('click', setProgress);
volumeRange.addEventListener('click', changeVolume);
volumeIcon.addEventListener('click', toggleMute);
speed.addEventListener('change', changeSpeed);
fullscreenBtn.addEventListener('click', toggleFullscreen);
