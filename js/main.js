import { navigate, scrollToTop, resizeQuote } from './utilities.js'
import { handleMouseOver } from './mouseover.js'
import { magnifyEffect } from './magnify.js'
import { scrollToSection } from './scroll.js'

document.addEventListener('DOMContentLoaded', () => {
	const body = document.body
	const images = document.querySelectorAll('.image-container--hover')
	const quoteFullBleed = document.querySelector('.article__fullscreen-quote')

	if (body.classList.contains('no-scroll')) {
		window.scrollTo(0, 0)
		document.documentElement.classList.add('no-scroll')
		body.style.cursor = 'none'
	}

	if (images.length) {
		for (const image of images) {
			image.addEventListener('pointermove', handleMouseOver)
		}
	}

	if (quoteFullBleed) {
		resizeQuote(quoteFullBleed)
		window.addEventListener('resize', () => resizeQuote(quoteFullBleed))
	}

	magnifyEffect()
	scrollToSection()
	window.navigate = navigate
	window.scrollToTop = scrollToTop
})
