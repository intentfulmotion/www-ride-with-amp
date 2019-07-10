import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Helmet from 'react-helmet';

import KiloGram from '../fonts/kilogram.otf'
import NexaBold from '../fonts/nexa-bold.otf'
import NexaLight from '../fonts/nexa-light.otf'

export default () => (
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
		render={data => (
			<Helmet>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
				/>
				<meta name="description" content={data.site.siteMetadata.description} />
				<meta name="keywords" content={data.site.siteMetadata.keywords} />
				<title>{data.site.siteMetadata.title}</title>
				<html lang="en" />
				{/* Google / Search Engine Meta Tags */}
				<meta itemprop="name" content={data.site.siteMetadata.author} />
				<meta
					itemprop="description"
					content={data.site.siteMetadata.description} />
				<link rel="preload" as="font" href={KiloGram} type="font/otf" crossOrigin="anonymous" />
				<link rel="preload" as="font" href={NexaBold} type="font/otf" crossOrigin="anonymous" />
				<link rel="preload" as="font" href={NexaLight} type="font/otf" crossOrigin="anonymous" />
			</Helmet>
		)}
	/>
);
