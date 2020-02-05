import React from 'react';

import './style.scss';
import ampLogo from '../images/amp-icon.svg';

import { FaShoppingBag } from 'react-icons/fa';
import { useSiteMetadata } from '../hooks/use-site-metadata'

export default ({ alt, invert }) => {
	const { menuLinks } = useSiteMetadata()

	let navbarClasses = !alt || alt === false ? 'navbar' : 'navbar has-background-info'
	let invertClasses = !invert || invert === false ? '' : 'invert'
	let itemInvertClasses = !invert || invert === false ? 'has-text-white' : 'has-text-black'

	const toggleMobileMenu = () => {
		document.getElementById('mobile-menu').classList.toggle('is-active')
		document.getElementById('navbar-menu').classList.toggle('is-active')
	}

	return (
		<div className="hero-head">
			<nav className={`${navbarClasses} ${invertClasses}`}>
				<div className="container">
					<div className="navbar-brand">
						<a className={`navbar-item ${itemInvertClasses}`} href="/">
							<img src={ampLogo} alt="Logo" className="navbar-brand-icon" />
						</a>
						<a className={`navbar-item has-text-white is-hidden-mobile`} href="/">
							<span className={`navbar-item ${itemInvertClasses}`}>Light up your ride.</span>
						</a>
						<a id="mobile-menu" role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" onClick={() => { toggleMobileMenu() }}>
							<span aria-hidden="true"></span>
							<span aria-hidden="true"></span>
							<span aria-hidden="true"></span>
						</a>
					</div>
					<div id="navbar-menu" className="navbar-menu">
						<div className="navbar-end">
							{
								menuLinks
									.map(link =>
										<span className={`navbar-item`} key={"link-" + link.name}>
											<a className={`button is-text	${itemInvertClasses}`} href={link.link}>
												<span>{link.name}</span>
											</a>
										</span>
									)
							}
							<span className={`navbar-item`}>
								<button className={`button is-outline is-text snipcart-checkout ${itemInvertClasses}`}>
									<span className="icon">
										<FaShoppingBag />
									</span>
									<span class="snipcart-items-count"></span>
								</button>
							</span>
						</div>
					</div>
				</div>
			</nav>
		</div>
	)
}
