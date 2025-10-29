export const navigate = page => {
	const base = window.BASE || ''
	console.log(`${base}/${page}`)
	window.location.href = `${base}/${page}`
}

export const scrollToTop = () => {
	window.scrollTo({ top: 0, behavior: 'smooth' })
}

export const resizeQuote = quote => {
	const runningHeading = document.querySelector('.article__running-heading')
	const svh = window.innerHeight
	quote.style.setProperty('--min-height', `${svh - runningHeading.offsetHeight}px`)
}
