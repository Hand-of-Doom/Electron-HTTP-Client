import 'https://cdn.jsdelivr.net/npm/beercss@3.7.10/dist/cdn/beer.min.js'
import 'https://cdn.jsdelivr.net/npm/material-dynamic-colors@1.1.2/dist/cdn/material-dynamic-colors.min.js'
import van from "https://cdn.jsdelivr.net/gh/vanjs-org/van/public/van-1.5.2.min.js"

const {
	article,
	h5,
	div,
	textarea,
} = van.tags

function headersToObject(plainTextHeaders) {
	const objectHeaders = {}

	for (const line of plainTextHeaders.split('\n')) {
		const [key, value] = line.split('=')
		objectHeaders[key] = value
	}

	return objectHeaders
}

function ReqBodyWindow() {
	const { reqHeadersOnchange, reqHeaders } = window.dto

	return article(
		h5('Request Headers'),
		div(
			{class: 'field textarea border extra'},
			textarea({
				onkeyup() {
					const headers = headersToObject(this.value)
					reqHeadersOnchange(headers)
				},
			}, reqHeaders),
		)
	)
}

van.add(document.querySelector('#root'), ReqBodyWindow())
