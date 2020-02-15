import React from 'react'
import { Link } from 'gatsby'
import './footer.scss'

import { useSiteMetadata } from '../../hooks/use-site-metadata'

import AppStore from '../../images/app-store.svg'
import GooglePlay from '../../images/google-play.svg'

export default () => {
	const { footer } = useSiteMetadata()
	return (
	<footer className="footer center has-background-primary has-text-white">
		<div className="columns is-centered is-mobile is-multiline">
			{
				footer
					.map((section, id) => (
						<div className="column is-narrow content" key={`footer-section-${id}`}>
							<p className="is-size-6 bold">{section.section}</p>
							{
								section.links.map(link => {
									if (link.link.indexOf("mailto://") >= 0)
										return (
											<span key={'footer-link-' + link.name}><a className="footer-link is-text" href={link.link}>{link.name}</a><br/></span>
										)
									else return (
										<span key={'footer-link-' + link.name}><Link className="footer-link is-text" to={link.link}>{link.name}</Link><br/></span>
									)
								})
							}
						</div>
					))
			}
			<div className="column is-narrow content is-half-mobile" key="footer-section-mobile-download">
				<p className="is-size-6 bold">Download Amp Mixer</p>
					<a href="https://itunes.apple.com"><img src={AppStore} className="image is-inline-flex download-app" alt="Download Amp Mixer on App Store" /></a>
					<a href="https://play.google.com/store/apps/details?id=com.intentfulmotion.amp"><img src={GooglePlay} className="image is-inline-flex download-app"  alt="Download Amp Mixer on Google Play"/></a>
			</div>
		</div>
		<p className="is-size-6 has-text-centered">
			&copy; {new Date().getFullYear()} Intentful Motion, Inc.
		</p>
	</footer>
	)
}
