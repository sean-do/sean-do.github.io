const navigate = page => {
	const base = window.BASE || ''
	console.log(`${base}/${page}`)

	window.location.href = `${base}/${page}`
}

const scrollToTop = () => {
	window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handleMouseOver = e => {
	const target = e.currentTarget
	const rect = target.getBoundingClientRect()
	const x = e.clientX - rect.left // distance from container's left
	const y = e.clientY - rect.top // distance from container's top
	target.style.setProperty('--mouse-x', `${x}px`)
	target.style.setProperty('--mouse-y', `${y}px`)
	if (!target.classList.contains('active')) {
		target.classList.add('active')
	}
}

const resizeQuote = quote => {
	const runningHeading = document.querySelector('.article__running-heading')
	const svh = window.innerHeight
	quote.style.setProperty('--min-height', `${svh - runningHeading.offsetHeight}px`)
}

document.addEventListener('DOMContentLoaded', () => {
	const magnifyingContainer = document.querySelector('.magnifying-container')
	const magnifyingMask = document.querySelector('.magnifying-container__mask')
	const magnifyingBorder = document.querySelector('.magnifying-container__border')
	const images = document.querySelectorAll('.image-container--hover')
	const body = document.querySelector('body')
	const quoteFullBleed = document.querySelector('.article__fullscreen-quote')

	if (body.classList.contains('no-scroll')) {
		window.scrollTo(0, 0)
		document.documentElement.classList.add('no-scroll')
		body.style.cursor = 'none'
	}

	if (images) {
		for (const image of images) {
			image.addEventListener('mousemove', handleMouseOver)
		}
	}
	if (quoteFullBleed) {
		resizeQuote(quoteFullBleed)
		window.addEventListener('resize', resizeQuote(quoteFullBleed))
	}
	if (magnifyingContainer) {
		magnifyingContainer.addEventListener('mousemove', handleMouseOver)
		magnifyingContainer.addEventListener(
			'click',
			() => {
				// enlarge mask
				magnifyingMask.style.setProperty('--mask-radius', '100vw')
				magnifyingBorder.style.setProperty('--mask-radius', '100vw')

				// scroll to body
				const runningHeading = document.querySelector('.article__running-heading')
				document.documentElement.classList.remove('no-scroll')
				runningHeading.scrollIntoView({
					behavior: 'smooth',
				})

				// remove mask
				const metaText = magnifyingContainer.querySelectorAll('.article__meta')
				setTimeout(() => {
					magnifyingBorder.remove()
					magnifyingMask.remove()
					body.style.cursor = 'default'
					metaText.forEach(text => {
						text.style.visibility = 'hidden'
					})
				}, 1000)
				magnifyingBorder.removeEventListener('mousemove', handleMouseOver)
			},
			{ once: true }
		)
	}

	// SCROLLING BEHAVIOUR
	document.addEventListener('click', e => {
		const link = e.target.closest('a[data-href^="#"]')
		if (!link) return

		const targetSelector = link.dataset.href
		const target = document.querySelector(targetSelector)
		if (!target) return

		e.preventDefault()

		target.scrollIntoView({
			behavior: 'smooth',
			block: 'end',
		})
	})
})
