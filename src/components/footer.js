import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import './style.scss';

import { useSiteMetadata } from '../hooks/use-site-metadata'

import AppStore from '../images/app-store.svg'
import GooglePlay from '../images/google-play.svg'

export default () => {
	const { footer } = useSiteMetadata()
	return (
	<footer className="footer center has-background-primary has-text-white">
		<div className="columns is-centered is-mobile is-multiline">
			{
				footer
					.map((section, id) => (
						<div className="column is-narrow content" key={`footer-section-${id}`}>
							<p className="is-size-6">{section.section}</p>
							{
								section.links.map(link => 
									<span key={'footer-link-' + link.name}><a className="footer-link is-text" href={link.link}>{link.name}</a><br/></span>
								)
							}
						</div>
					))
			}
			<div className="column is-narrow content is-half-mobile" key="footer-section-mobile-download">
				<p className="is-size-6">Download</p>
					<a href="https://itunes.apple.com"><img src={AppStore} className="image is-inline-flex download-app" /></a>
					<a href="https://play.google.com/store/apps/details?id=com.intentfulmotion.amp"><img src={GooglePlay} className="image is-inline-flex download-app" /></a>
			</div>
		</div>
		<p className="is-size-6 has-text-centered">
			&copy; {new Date().getFullYear()} Intentful Motion, Inc.
		</p>
	</footer>
	)
}
