export const scrollToSection = () => {
	document.addEventListener('click', e => {
		const link = e.target.closest('a[data-href^="#"]')
		if (!link) return

		const target = document.querySelector(link.dataset.href)
		if (!target) return

		e.preventDefault()
		target.scrollIntoView({ behavior: 'smooth', block: 'end' })
	})
}
