import 'https://cdn.jsdelivr.net/npm/beercss@3.7.10/dist/cdn/beer.min.js'
import 'https://cdn.jsdelivr.net/npm/material-dynamic-colors@1.1.2/dist/cdn/material-dynamic-colors.min.js'
import van from "https://cdn.jsdelivr.net/gh/vanjs-org/van/public/van-1.5.2.min.js"

const {
	h5,
	div,
	textarea,
} = van.tags

function ReqBodyWindow() {
	const { reqHeadersOnchange, reqHeaders } = window.dto

	return div(
		{class: 'win'},
		h5('Request Headers'),
		div(
			{class: 'field textarea border extra'},
			textarea({
				onkeyup() {
					reqHeadersOnchange(this.value)
				},
				placeholder: 'Content-Type=application/json'
			}, reqHeaders),
		)
	)
}

van.add(document.querySelector('#root'), ReqBodyWindow())
