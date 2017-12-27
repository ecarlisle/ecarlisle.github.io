import React from 'react'

class Navigation extends React.Component {
	render () {
		return (
			<nav className="page-navigation" itemScope itemType="http://schema.org/SiteNavigationElement">
				<ul>
				{this.props.data.map(item =>
					<li key={item.id}>
						<a href={item.url}>{item.title}</a>
					</li>
				)}
				</ul>
			</nav>
		)
	}
}

export default Navigation
