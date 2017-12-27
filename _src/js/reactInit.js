import React from 'react'
import ReactDOM from 'react-dom'
import appConfig from './appConfig.js'
import Header from './Header'
import Navigation from './Navigation'
ReactDOM.render(
	<Header data={appConfig.header}>
		<Navigation data={appConfig.siteNavigation} />
	</Header>,
	document.getElementById('page-header')
)

