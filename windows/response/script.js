import 'https://cdn.jsdelivr.net/npm/beercss@3.7.10/dist/cdn/beer.min.js'
import 'https://cdn.jsdelivr.net/npm/material-dynamic-colors@1.1.2/dist/cdn/material-dynamic-colors.min.js'
import van from "https://cdn.jsdelivr.net/gh/vanjs-org/van/public/van-1.5.2.min.js"

const {
	article,
	h5,
	h6,
	textarea,
	table,
	thead,
	tbody,
	tr,
	th,
	td,
	div,
} = van.tags

function ResponseWindow() {
	const {status, body, headers} = window.dto

	console.log(headers)

	return article(
		h5({class: 'win-title'}, 'Response '+status),
		h6('Body'),
		div(
			{class: 'field textarea border extra'},
			textarea(body),
		),
		h6('Headers'),
		table(
			{class: 'border'},
			thead(
				tr(
					th('Header'),
					th('Value')
				)
			),
			tbody(
				...headers.entries().map(([headerName, headerValue]) =>
					tr(td(headerName), td(headerValue))
				)
			)
		),
	)
}

van.add(document.querySelector('#root'), ResponseWindow())
