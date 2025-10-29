import { handleMouseOver } from './mouseover.js'

export const magnifyEffect = () => {
	const magnifyingContainer = document.querySelector('.magnifying-container')
	if (!magnifyingContainer) return
	const magnifyingMask = document.querySelector('.magnifying-container__mask')
	const magnifyingBorder = document.querySelector('.magnifying-container__border')
	const TAP_THRESHOLD = 10
	let startX = 0
	let startY = 0

	const endMagnifyEffect = (container, mask, border) => {
		mask.style.setProperty('--mask-radius', '120vw')
		border.style.setProperty('--mask-radius', '120vw')

		const runningHeading = document.querySelector('.article__running-heading')
		document.documentElement.classList.remove('no-scroll')
		document.body.classList.remove('no-scroll')

		setTimeout(() => {
			runningHeading.scrollIntoView({ behavior: 'smooth' })
		}, 200)

		const metaText = container.querySelectorAll('.article__meta')
		setTimeout(() => {
			border.remove()
			mask.remove()
			metaText.forEach(text => {
				text.style.display = 'none'
			})
			document.body.style.cursor = 'default'
		}, 1000)

		container.removeEventListener('mousemove', handleMouseOver)
		document.body.style.touchAction = 'auto'
		document.documentElement.style.touchAction = 'auto'
	}

	function handlePointerDown(e) {
		startX = e.clientX
		startY = e.clientY
		this.setPointerCapture(e.pointerId)
		this.addEventListener('pointermove', handleMouseOver)
	}

	function handlePointerUp(e) {
		try {
			e.currentTarget.releasePointerCapture(e.pointerId)
		} catch {}
		e.currentTarget.removeEventListener('pointermove', handleMouseOver)
		this.releasePointerCapture(e.pointerId)
		this.removeEventListener('pointermove', handleMouseOver)

		const dx = Math.abs(e.clientX - startX)
		const dy = Math.abs(e.clientY - startY)
		const distance = Math.sqrt(dx * dx + dy * dy)

		if (distance < TAP_THRESHOLD) {
			endMagnifyEffect(magnifyingContainer, magnifyingMask, magnifyingBorder)
		}
	}

	magnifyingContainer.addEventListener('pointerdown', handlePointerDown, { passive: false })
	magnifyingContainer.addEventListener('pointerup', handlePointerUp)
	magnifyingContainer.addEventListener('mousemove', handleMouseOver)
}
