import React, { useContext } from 'react';
import { Link } from 'gatsby'

import './navbar.scss';
import ampLogo from '../../images/amp-icon.svg';

import { FaShoppingBag } from 'react-icons/fa';
import { useSiteMetadata } from '../../hooks/use-site-metadata'
import { CartContext } from '../cart-provider'

export default ({ alt, invert }) => {
	const { menuLinks } = useSiteMetadata()
	const { count } = useContext(CartContext)

	let navbarClasses = !alt || alt === false ? 'navbar' : 'navbar has-background-info'
	let invertClasses = !invert || invert === false ? '' : 'invert'
	let itemInvertClasses = !invert || invert === false ? 'has-text-white' : 'has-text-black'

	const toggleMobileMenu = () => {
		document.getElementById('mobile-menu').classList.toggle('is-active')
		document.getElementById('navbar-menu').classList.toggle('is-active')
	}

	let cartCount
	cartCount = count > 0 ? <span>{ count }</span> : null

	return (
		<div className="hero-head">
			<nav className={`${navbarClasses} ${invertClasses}`}>
				<div className="container">
					<div className="navbar-brand">
						<Link className={`navbar-item ${itemInvertClasses}`} to="/">
							<img src={ampLogo} alt="Logo" className="navbar-brand-icon" />
						</Link>
						<Link className={`navbar-item has-text-white is-hidden-mobile`} to="/">
							<span className={`navbar-item ${itemInvertClasses}`}>Light up your ride.</span>
						</Link>
						<span className={`navbar-item mobile-cart`}>
							<Link className={`button is-outline is-text ${itemInvertClasses}`} to={`checkout`}>
								<span className="icon">
									<FaShoppingBag />
								</span>
								{ cartCount }
							</Link>
						</span>
						<a id="mobile-menu" role="button" className={`navbar-burger ${itemInvertClasses}`} aria-label="menu" aria-expanded="false" onClick={() => { toggleMobileMenu() }}>
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
											<Link className={`button is-text ${itemInvertClasses}`} to={link.link}>{link.name}</Link>
										</span>
									)
							}
							<span className={`navbar-item`}>
								<Link className={`button is-outline is-text is-hidden-mobile ${itemInvertClasses}`} to={`checkout`}>
									<span className="icon">
										<FaShoppingBag />
									</span>
									{ cartCount }
								</Link>
							</span>
						</div>
					</div>
				</div>
			</nav>
		</div>
	)
}