export const windows = Object.freeze({
	main: 'main',
	reqBody: 'req-body',
	reqHeaders: 'req-headers',
})

export function openWindow(windowName, options) {
	const features = []

	const width = options.width || 100
	const height = options.height || 100
	features.push('width='+width, 'height='+height)

	if (options.isCentered) {
		const left = screen.width / 2 - width / 2
  	const top = screen.height / 2 - height / 2
		features.push('top='+top, 'left='+left)
	}

	const win = window.open(
		`../${windowName}/index.html`,
		options.title || 'Window',
		features.join(',')
	)

	return win.close
}
