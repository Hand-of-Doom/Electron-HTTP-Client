import 'https://cdn.jsdelivr.net/npm/beercss@3.7.10/dist/cdn/beer.min.js'
import 'https://cdn.jsdelivr.net/npm/material-dynamic-colors@1.1.2/dist/cdn/material-dynamic-colors.min.js'
import van from "https://cdn.jsdelivr.net/gh/vanjs-org/van/public/van-1.5.2.min.js"

import { openWindow, windows } from '../../lib/window.js'

const {
	header,
	nav,
	div,
	input,
	i,
	button,
	span,
	select,
	option
} = van.tags

function headersToObject(plainTextHeaders) {
	const objectHeaders = {}

	for (const line of plainTextHeaders.split('\n')) {
		const [key, value] = line.split('=')
		objectHeaders[key] = value
	}

	return objectHeaders
}

async function sendRequest({url, method, reqBody, headers}) {
	try {
		const resp = await fetch(url, {
			method,
			body: reqBody ? reqBody : undefined,
			headers: headers ? headersToObject(headers) : {},
		})

		const respBody = await resp.text()

		openWindow(windows.response, {
			title: 'Response',
			width: 900,
			height: 750,
			isCentered: true,
			dto: {
				status: `${resp.status} ${resp.statusText}`,
				body: respBody,
				headers: resp.headers,
			}
		})
	} catch (err) {
		alert(err.message.split(':').pop())
	}
}

function MainWindow() {
	let reqUrl = 'https://example.com'
	let reqMethod = 'GET'
	let reqBody = ''
	let reqHeaders = ''

	return div(
		header(nav(
			{class: 'no-space'},
			div({class: 'field small suffix border left-round req-body-navbar-button'},
				select(
					{
						onchange() { reqMethod = this.value }
					},
					option('GET'),
					option('POST'),
					option('PUT'),
					option('PATCH'),
					option('DELETE'),
					option('HEAD'),
					option('OPTIONS'),
				),
				i('arrow_drop_down')
			),
			button({
				class: 'border no-round',
				onclick() {
					openWindow(windows.reqBody, {
						title: 'Request body form',
						width: 600,
						height: 450,
						isCentered: true,
						isNotResizable: true,
						dto: {
							reqBodyOnchange(body) {
								reqBody = body
							},
							reqBody,
						}
					})
				},
			}, 'Add Body'),
			button({
				class: 'border no-round',
				onclick() {
					openWindow(windows.reqHeaders, {
						title: 'Request headers form',
						width: 600,
						height: 450,
						isCentered: true,
						isNotResizable: true,
						dto: {
							reqHeadersOnchange(headers) {
								reqHeaders = headers
							},
							reqHeaders,
						}
					})
				},
			}, 'Add Headers'),
			button({
				class: 'border right-round fill',
				onclick() {
					sendRequest({
						url: reqUrl,
						method: reqMethod,
						reqBody,
						headers: reqHeaders,
					})
				}
			}, i('send')),
		)),
		div({class: 'main-win-content'},
			div(
				{class: 'field border'},
				input({
					type: 'text',
					onkeyup() {
						reqUrl = this.value
					}
				}),
				span({class: 'helper'}, 'Request URL')
			)
		)
	)
}

van.add(document.querySelector('#root'), MainWindow())
