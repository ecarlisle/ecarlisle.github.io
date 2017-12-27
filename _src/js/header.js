import React from 'react'

class Header extends React.Component {
	render () {
		return (
			<header className="page-header" itemScope itemType="http://schema.org/WPHeader">
				<div className="header-title">
					<a href="/">
						<span className="name">{this.props.data.title} :</span>
						<span className="job rfloat">{this.props.data.subtitle}</span>
					</a>
				</div>
				<span className="hamburger-menu">&#9776;</span>
				{this.props.children}
			</header>
		)
	}
}

export default Header
