// accept button
function accept() {
	const body = document.body
	const overlay = document.querySelector('.overlay')
	const video = document.querySelector('video')
	overlay.style.display = 'none'
	body.style.overflow = 'visible'
	video.muted = false
	video.play()
}

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
		document.getElementById('location').textContent = 'Location unavailable'
	})

// change position of video on scroll
const myDiv = document.getElementById('video')

window.addEventListener('scroll', () => {
	if (window.scrollY > 50) {
		// Move it to the right: 2rem from right edge
		myDiv.style.left = 'calc(100% - 2rem)'
		myDiv.style.transform = 'translateX(-100%) translateY(-50%)'
	} else {
		// Back to center
		myDiv.style.left = '50%'
		myDiv.style.transform = 'translate(-50%, -50%)'
	}
})
