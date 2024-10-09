import 'https://cdn.jsdelivr.net/npm/beercss@3.7.10/dist/cdn/beer.min.js'
import 'https://cdn.jsdelivr.net/npm/material-dynamic-colors@1.1.2/dist/cdn/material-dynamic-colors.min.js'
import van from "https://cdn.jsdelivr.net/gh/vanjs-org/van/public/van-1.5.2.min.js"

import { openWindow, windows } from '../../lib/window.js'

const {header, nav, div, input, i, button, span, select, option} = van.tags

function sendRequest() {

}

function MainWindow() {
	return div(
		header(nav(
			{class: 'no-space'},
			div({class: 'field small suffix border left-round req-body-navbar-button'},
				select(
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
						// width: 600,
						// height: 450,
						isCentered: true,
					})
				},
			}, 'Add Body'),
			button({
				class: 'border no-round',
				onclick() {
					openWindow(windows.reqHeaders, {
						title: 'Request headers form',
						width: 600,
						height: 800,
						isCentered: true,
					})
				},
			}, 'Add Headers'),
			button({
				class: 'border right-round fill',
				onclick: sendRequest
			}, i('send')),
		)),
		div({class: 'main-win-content'},
			div(
				{class: 'field border'},
				input({type: 'text'}),
				span({class: 'helper'}, 'Request URL')
			)
		)
	)
}

van.add(document.querySelector('#root'), MainWindow())
