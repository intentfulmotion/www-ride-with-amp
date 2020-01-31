import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Helmet from 'react-helmet';

import KiloGram from '../fonts/kilogram.otf'

export default ({ title, description, tags }) => (
	<StaticQuery
		query={graphql`
			query helmetQuery {
				site {
					siteMetadata {
						title
						author
						description
						keywords
					}
				}
			}
		`}
		render={ data => { 
			const pageTitle = title ? `${title} | ${data.site.siteMetadata.title}` : data.site.siteMetadata.title
			const pageTags = tags ? `${data.site.siteMetadata.keywords}, ${tags}` : data.site.siteMetadata.keywords
			const pageDescription = tags ? description : data.site.siteMetadata.description
			return (
			<Helmet>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
				/>
				<meta name="description" content={pageDescription} />
				<meta name="keywords" content={pageTags} />
				<title>{pageTitle}</title>
				<html lang="en" />
				{/* Google / Search Engine Meta Tags */}
				<meta itemprop="name" content={data.site.siteMetadata.author} />
				<meta
					itemprop="description"
					content={data.site.siteMetadata.description} />
				<link rel="stylesheet" href="https://use.typekit.net/fqo0mlk.css" />
				<link rel="preload" as="font" href={KiloGram} type="font/otf" crossOrigin="anonymous" />
				<script id="stripe-js" src="https://js.stripe.com/v3/" async></script>
			</Helmet>
		)}
	}
	/>
);
