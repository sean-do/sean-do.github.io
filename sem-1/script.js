//update width
function updateWidth() {
	const parent = document.querySelector('.item-2-col')
	const video = document.getElementById('video')
	const notifications = document.querySelectorAll('.notification-stack')

	if (parent && video && notifications && window.innerWidth > 991) {
		const width = parent.offsetWidth
		video.style.width = `${width}px`
		notifications.forEach(notification => {
			notification.style.width = `${width}px`
		})
	}
}

window.addEventListener('resize', updateWidth)
window.addEventListener('scroll', updateWidth) // In case of layout shift
updateWidth()

// full-width text
function fitText() {
	const fullscreenText = document.querySelectorAll('.fullscreen-text p')
	fullscreenText.forEach(p => {
		textFit(p, {
			alignHoriz: true,
			alignVert: false,
			multiLine: false,
			maxFontSize: 999,
			widthOnly: true,
		})
	})
}

// // Run once fonts are ready
// if (document.fonts && document.fonts.ready) {
// 	document.fonts.ready.then(fitText)
// } else {
// 	document.addEventListener('load', fitText)
// }

// // Re-run on resize
// window.addEventListener('resize', fitText)

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
			const notifications = document.querySelector('.notification-stack')

			if (change.type === 'notification') {
				const box = document.createElement('div')
				box.className = 'notification-box'
				box.innerHTML = `<strong>${change.title}</strong><br>${change.message}`
				notifications.prepend(box)

				// trigger animation
				box.classList.add('show')

				// auto remove after 5 seconds
				setTimeout(() => {
					box.classList.remove('show')
					setTimeout(() => box.remove(), 300)
				}, 5000)
			}

			if (change.remove) {
				const removeClasses = Array.isArray(change.remove) ? change.remove : [change.remove]
				elements.forEach(el => removeClasses.forEach(cls => el.classList.remove(cls)))
			}

			if (change.add) {
				const addClasses = Array.isArray(change.add) ? change.add : [change.add]
				elements.forEach(el => addClasses.forEach(cls => el.classList.add(cls)))
				// if (change.target === '.cat-text') {
				// 	fitText()
				// }
			}

			appliedTimes[change.time] = true
		})
	})
}

// glitch effect
const videoOverlay = document.querySelectorAll('.video-overlay')

videoOverlay.forEach(el => {
	const original = el.querySelector('.glitch-gif')
	for (let i = 0; i < 12; i++) {
		const clone = original.cloneNode(true)
		const x = Math.random() * window.innerWidth
		const y = Math.random() * window.innerHeight

		clone.style.left = `${x}px`
		clone.style.top = `${y}px`
		el.appendChild(clone)
	}
	original.style.display = 'none'
})

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
const footer = document.querySelector('footer')

if (window.innerWidth > 991) {
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
} else {
	window.addEventListener('scroll', () => {
		const scrollPosition = window.scrollY + window.innerHeight
		const documentHeight = document.documentElement.scrollHeight
		if (window.scrollY > 50) {
			// Move it to the right: 2rem from right edge
			video.style.top = 'calc(100% - 1rem)'
			video.style.transform = 'translateX(-50%) translateY(-100%)'
		} else {
			video.style.top = '50%'
			video.style.transform = 'translate(-50%, -50%)'
		}
		if (scrollPosition >= documentHeight) {
			video.style.opacity = '0'
		} else {
			video.style.opacity = '1'
		}
	})
}

// cat pictures hover
const catPictures = Array.from({ length: 20 }, (_, i) => `${i + 1}.jpg`)
document.querySelectorAll('.cat-pictures').forEach(link => {
	const image = link.querySelector('img')
	const caption = link.querySelector('div')

	link.addEventListener('mouseenter', () => {
		const randomIndex = Math.floor(Math.random() * catPictures.length)
		const randomFile = catPictures[randomIndex]
		image.src = `assets/cat-pictures/${randomFile}`
		caption.textContent = randomFile
	})
})
