export const navigate = page => {
	const base = window.BASE || ''
	console.log(`${base}/${page}`)
	window.location.href = `${base}/${page}`
}

export const scrollToTop = () => {
	window.scrollTo({ top: 0, behavior: 'smooth' })
}

export const setViewportHeight = () => {
	const vh = window.innerHeight * 0.01
	document.documentElement.style.setProperty('--vh', `${vh}px`)
}

export const resizeQuote = quote => {
	const runningHeading = document.querySelector('.article__running-heading')
	const vh = window.innerHeight
	quote.style.setProperty('--min-height', `${vh - runningHeading.offsetHeight}px`)
}
