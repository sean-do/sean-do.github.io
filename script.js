//video width
function updateVideoWidth() {
	const parent = document.querySelector('.item-2-col')
	const video = document.getElementById('video')

	if (parent && video) {
		const width = parent.offsetWidth
		video.style.width = `${width}px`
	}
}

window.addEventListener('resize', updateVideoWidth)
window.addEventListener('scroll', updateVideoWidth) // In case of layout shift
updateVideoWidth()

// accept button
function accept() {
	const body = document.body
	const overlay = document.querySelector('.overlay')
	const video = document.querySelector('video')
	overlay.style.display = 'none'
	body.style.overflow = 'visible'
	video.muted = false
	video.play()

	const appliedTimes = {}

	video.addEventListener('timeupdate', function () {
		const changesAtCurrentTime = classChanges.filter(
			change => video.currentTime >= change.time && !appliedTimes[change.time]
		)

		changesAtCurrentTime.forEach(change => {
			const elements = document.querySelectorAll(change.target)

			if (change.remove) {
				const removeClasses = Array.isArray(change.remove) ? change.remove : [change.remove]
				elements.forEach(el => removeClasses.forEach(cls => el.classList.remove(cls)))
			}

			if (change.add) {
				const addClasses = Array.isArray(change.add) ? change.add : [change.add]
				elements.forEach(el => addClasses.forEach(cls => el.classList.add(cls)))
			}

			appliedTimes[change.time] = true
		})
	})
}

// glitch effect
const videoOverlay = document.querySelector('.video-overlay')
const original = document.querySelector('.glitch-gif')

for (let i = 0; i < 12; i++) {
	const clone = original.cloneNode(true)
	const x = Math.random() * window.innerWidth
	const y = Math.random() * window.innerHeight

	clone.style.left = `${x}px`
	clone.style.top = `${y}px`
	videoOverlay.appendChild(clone)
}

original.style.display = 'none'

// full-width text
function fitText() {
	const fullscreenText = document.querySelectorAll('.fullscreen-text p')
	fullscreenText.forEach(el => {
		textFit(el, {
			alignHoriz: true,
			alignVert: false,
			multiLine: false,
			maxFontSize: 999,
			widthOnly: true,
		})
	})
}

if (document.fonts) {
	document.fonts.ready.then(fitText) // Safari waits for fonts
} else {
	window.onload = fitText // fallback
}

window.onresize = fitText

// clock
function updateClock() {
	const now = new Date()
	const options = {
		hour: 'numeric',
		minute: '2-digit',
		second: '2-digit',
		hour12: true,
	}
	document.getElementById('clock').textContent = now
		.toLocaleTimeString(undefined, options)
		.toUpperCase()
}
setInterval(updateClock, 1000)
updateClock()

// location
fetch('https://ipapi.co/json/')
	.then(res => res.json())
	.then(data => {
		const location = `${data.city}, ${data.country_name}`
		document.getElementById('location').textContent = location.toUpperCase()
	})
	.catch(() => {
		document.getElementById('location').textContent = 'why are you hiding your position?'
	})

// change position of video on scroll
const video = document.getElementById('video')

window.addEventListener('scroll', () => {
	if (window.scrollY > 50) {
		// Move it to the right: 2rem from right edge
		video.style.left = 'calc(100% - 2rem)'
		video.style.transform = 'translateX(-100%) translateY(-50%)'
	} else {
		// Back to center
		video.style.left = '50%'
		video.style.transform = 'translate(-50%, -50%)'
	}
})
