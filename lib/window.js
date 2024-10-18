export const windows = Object.freeze({
	main: 'main',
	reqBody: 'req-body',
	reqHeaders: 'req-headers',
	response: 'response'
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

	if (options.isNotResizable) {
		features.push('resizable=0')
	}

	const win = window.open(
		`../${windowName}/index.html`,
		options.title || 'Window',
		features.join(',')
	)

	win.dto = options.dto

	return win.close
}
