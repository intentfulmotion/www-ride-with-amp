import React, { useContext } from 'react';

import './style.scss';
import ampLogo from '../images/amp-icon.svg';

import { FaShoppingCart } from 'react-icons/fa';
import { useSiteMetadata } from '../hooks/use-site-metadata'
import { CartContext } from './cart.provider'

export default ({ alt }) => {
	const { title, menuLinks } = useSiteMetadata()
	const { count } = useContext(CartContext)

	let cartCount
	cartCount = count > 0 ? <span>({ count })</span> : null

	let navbarClasses = !alt || alt === false ? 'navbar' : 'navbar has-background-info'

	const showCart = () => {
		document.getElementById('shopping-cart').classList.toggle('is-active')
	}

	const toggleMobileMenu = () => {
		document.getElementById('mobile-menu').classList.toggle('is-active')
		document.getElementById('navbar-menu').classList.toggle('is-active')
	}

	return (
		<div className="hero-head">
			<nav className={navbarClasses}>
				<div className="container">
					<div className="navbar-brand">
						<a className="navbar-item" href="/">
							<img src={ampLogo} alt="Logo" className="navbar-brand-icon" />
						</a>
						<a className="navbar-item is-hidden-mobile" href="/">
							<span className="navbar-item">{title}</span>
						</a>
						<a id="mobile-menu" role="button" class="navbar-burger has-text-white" aria-label="menu" aria-expanded="false" onClick={() => { toggleMobileMenu() }}>
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
										<span className="navbar-item" key={"link-" + link.name}>
											<a className="button is-text" href={link.link}>
												<span>{link.name}</span>
											</a>
										</span>
									)
							}
							<span className="navbar-item">
								<button className="button has-text-white is-primary" onClick={() => {showCart()}}>
									<span className="icon">
										<FaShoppingCart />
									</span>
									<span>Cart { cartCount }</span>
								</button>
							</span>
						</div>
					</div>
				</div>
			</nav>
		</div>
	)
}
