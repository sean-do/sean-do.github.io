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

const endMagnifyEffect = (container, mask, border) => {
	// enlarge mask
	mask.style.setProperty('--mask-radius', '120vw')
	border.style.setProperty('--mask-radius', '120vw')

	// scroll to body
	const runningHeading = document.querySelector('.article__running-heading')
	document.documentElement.classList.remove('no-scroll')
	document.body.classList.remove('no-scroll')
	setTimeout(() => {
		runningHeading.scrollIntoView({
			behavior: 'smooth',
		})
	}, 200)

	// remove mask
	const metaText = container.querySelectorAll('.article__meta')
	setTimeout(() => {
		border.remove()
		mask.remove()
		metaText.forEach(text => {
			text.style.display = 'none'
		})
		document.body.style.cursor = 'default'
	}, 1000)
	// container.touchAction = 'auto'
	container.removeEventListener('mousemove', handleMouseOver)
	container.releasePointerCapture(e.pointerId)
	// container.removeEventListener('pointerup', handlePointerUp)
	// container.removeEventListener('pointerdown', handlePointerDown)
}

document.addEventListener('DOMContentLoaded', () => {
	const magnifyingContainer = document.querySelector('.magnifying-container')
	const magnifyingMask = document.querySelector('.magnifying-container__mask')
	const magnifyingBorder = document.querySelector('.magnifying-container__border')
	const images = document.querySelectorAll('.image-container--hover')
	const body = document.querySelector('body')
	const quoteFullBleed = document.querySelector('.article__fullscreen-quote')
	const TAP_THRESHOLD = 10
	let startX = 0
	let startY = 0

	if (body.classList.contains('no-scroll')) {
		window.scrollTo(0, 0)
		document.documentElement.classList.add('no-scroll')
		body.style.cursor = 'none'
	}

	if (images) {
		for (const image of images) {
			image.addEventListener('pointermove', handleMouseOver)
		}
	}
	if (quoteFullBleed) {
		resizeQuote(quoteFullBleed)
		window.addEventListener('resize', resizeQuote(quoteFullBleed))
	}

	if (magnifyingContainer) {
		const container = document.querySelector('.magnifying-container')

		function handlePointerDown(e) {
			// stop scroll behaviour
			// e.preventDefault()
			// start listening for move events
			startX = e.clientX
			startY = e.clientY
			container.setPointerCapture(e.pointerId)

			container.addEventListener('pointermove', handleMouseOver)
		}

		function handlePointerUp(e) {
			container.releasePointerCapture(e.pointerId)
			container.removeEventListener('pointermove', handleMouseOver)

			const dx = Math.abs(e.clientX - startX)
			const dy = Math.abs(e.clientY - startY)
			const distance = Math.sqrt(dx * dx + dy * dy)

			if (distance < TAP_THRESHOLD) {
				endMagnifyEffect(magnifyingContainer, magnifyingMask, magnifyingBorder)
			} else {
				return
			}
		}

		container.addEventListener('pointerdown', handlePointerDown, { passive: false })
		container.addEventListener('pointerup', handlePointerUp)

		magnifyingContainer.addEventListener('mousemove', handleMouseOver)
		// magnifyingContainer.addEventListener(
		// 	'click',
		// 	endMagnifyEffect(magnifyingContainer, magnifyingMask, magnifyingBorder)
		// )

		// magnifyingContainer.addEventListener(
		// 	'click',
		// 	() => {
		// 		// enlarge mask
		// 		magnifyingMask.style.setProperty('--mask-radius', '100vw')
		// 		magnifyingBorder.style.setProperty('--mask-radius', '100vw')

		// 		// scroll to body
		// 		const runningHeading = document.querySelector('.article__running-heading')
		// 		document.documentElement.classList.remove('no-scroll')
		// 		runningHeading.scrollIntoView({
		// 			behavior: 'smooth',
		// 		})

		// 		// remove mask
		// 		const metaText = magnifyingContainer.querySelectorAll('.article__meta')
		// 		setTimeout(() => {
		// 			magnifyingBorder.remove()
		// 			magnifyingMask.remove()
		// 			body.style.cursor = 'default'
		// 			metaText.forEach(text => {
		// 				text.style.visibility = 'hidden'
		// 			})
		// 		}, 1000)
		// 		magnifyingBorder.removeEventListener('mousemove', handleMouseOver)
		// 	},
		// 	{ once: true }
		// )
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
