document.addEventListener('DOMContentLoaded', () => {
	const runningHeading = document.querySelector('.running-heading')
	const imageFullBleed = document.querySelector('.image-container--full-bleed')
	imageFullBleed.style.height = `${imageFullBleed.offsetHeight - runningHeading.offsetHeight}px`
	console.log()
	// console.log(heightofHeading)
	// console.log(imageFullBleed.offsetHeight)
})
