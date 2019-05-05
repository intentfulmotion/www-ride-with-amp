import React from 'react';

import './style.scss';
import ampLogo from '../images/amp-icon.svg';

import StoreButton from './storeButton'
import { useSiteMetadata } from '../hooks/use-site-metadata'

export default ({ alt }) => {
	const { title, menuLinks } = useSiteMetadata()

	let navbarClasses = !alt || alt === false ? 'navbar' : 'navbar has-background-info'

	return (
		<div className="hero-head is-hidden-mobile">
			<nav className={navbarClasses}>
				<div className="container">
					<div className="navbar-brand">
						<a className="navbar-item" href="/">
							<img src={ampLogo} alt="Logo" className="navbar-brand-icon" />
						</a>
						<span className="navbar-item">{title}</span>
					</div>
					<div id="navbarMenuHeroA" className="navbar-menu">
						<div className="navbar-end">
							{
								menuLinks
									.map(link =>
										<span className="navbar-item" key={"link-" + link.name}>
											<a className="button is-text" href={link.link}>
												<span>{link.name}</span>
											</a>
										</span>
									)
							}
							<span className="navbar-item">
								<StoreButton />
							</span>
						</div>
					</div>
				</div>
			</nav>
		</div>
	)
}
