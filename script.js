const base = "{{ site.baseurl | default: '' }}"
const navigate = page => {
	// window.location.href = link
	// const base = window.location.pathname.includes('/pages/') ? '../' : ''
	// window.location.href = `${base}${page === 'index' ? 'index.html' : 'pages/' + page + '.html'}`
	// const base = "{{ site.baseurl | default: '' }}"
	// window.location.href = `${base}/${page}/`

	// Default path logic: goes to /page/ or /repo/page/
	const target = page === 'index' ? `${base}/` : `${base}/${page}/`
	window.location.href = target
}

const handleMouseOver = e => {
	const target = e.currentTarget
	const rect = target.getBoundingClientRect()
	const x = e.clientX - rect.left // distance from container's left
	const y = e.clientY - rect.top // distance from container's top  ✅
	target.style.setProperty('--mouse-x', `${x}px`)
	target.style.setProperty('--mouse-y', `${y}px`)
	if (!target.classList.contains('active')) {
		target.classList.add('active')
	}
}

document.addEventListener('DOMContentLoaded', () => {
	window.scrollTo(0, 0)
	const magnifyingContainer = document.querySelector('.magnifying-container')
	const magnifyingMask = document.querySelector('.magnifying-container__mask')
	const magnifyingBorder = document.querySelector('.magnifying-container__border')
	const body = document.querySelector('body')
	const forms = document.querySelectorAll('form')
	const buttons = document.querySelectorAll('button')
	if (window.scrollY === 0 && body.classList.contains('no-scroll')) {
		document.documentElement.classList.add('no-scroll')
	}
	for (const container of document.querySelectorAll('.image-container, .magnifying-container')) {
		container.addEventListener('mousemove', handleMouseOver)
	}
	magnifyingContainer.addEventListener('click', () => {
		const target = magnifyingContainer.offsetHeight + magnifyingContainer.offsetTop
		magnifyingMask.style.setProperty('--mask-radius', '100vw')
		magnifyingBorder.style.setProperty('--mask-radius', '100vw')
		setTimeout(() => {
			document.documentElement.classList.remove('no-scroll')
			window.scrollTo({
				top: target,
				behavior: 'smooth',
			})
		})
		setTimeout(() => {
			magnifyingBorder.remove()
			magnifyingMask.remove()
			magnifyingContainer.style.cursor = 'default'
		}, 1000)
	})
	// for (const button of buttons) {
	// 	button.addEventListener('onclick', e => {
	// 		e.preventDefault()
	// 		window.location.href = 'truth.html'
	// 	})
	// }
})
