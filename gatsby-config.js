if (process.env.NODE_ENV != 'production')
	require("dotenv").config({path: `.env.${process.env.NODE_ENV}`})

module.exports = {
	siteMetadata: {
		title: 'Amp by Intentful Motion',
		author: 'Intentful Motion, Inc.',
		description: 'Reactive, smart brake and turn lights for your ride',
		keywords: `Amp, smart lights, bicycle lights, longboard lights, Boosted Board lights, OneWheel lights, scooter lights, brake lights, indicators`,
		siteUrl: `https://amp.intentfulmotion.com`,
		menuLinks: [
      {
        name: `What Is It`,
        link: `/#what`
      },
      {
        name: `Specs`,
        link: `/#specs`
      },
      {
        name: `Mix It Up`,
        link: `/#mixer`
      },
			{
        name: `Subscribe`,
        link: `/#subscribe`
			},
			{
				name: `Shop Now`,
				link: `/shop`
			}
		],
		footer: [
      {
				section: `Info`,
				link: '/',
        links: [
          {
            name: `Contact`,
            link: `mailto://chat@intentfulmotion.com?subject=Contact`
					},
					{
            name: `Terms`,
            link: `/terms`
          },
          {
            name: `Privacy`,
            link: `/privacy`
          }
        ]
			}
    ]
	},
	plugins: [
		'gatsby-plugin-sharp',
		'gatsby-transformer-sharp',
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `images`,
				path: `${__dirname}/src/images`
			}
		},
		'gatsby-plugin-react-helmet',
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: 'Amplify Your Ride',
				short_name: 'Amp',
				start_url: '/',
				background_color: '#2980b9',
				theme_color: '#2980b9',
				display: 'standalone',
				icon: 'src/images/amp-icon.svg',
				orientation: 'portrait'
			}
		},
		`gatsby-plugin-sass`,
		{
			resolve: `gatsby-plugin-google-analytics`,
			options: {
				trackingId: 'UA-139611338-1',
				// Setting this parameter is optional (required for some countries such as Germany)
				anonymize: true
			}
		},
		`gatsby-plugin-sitemap`,
		'gatsby-transformer-remark',
		{
			resolve: `gatsby-source-contentful`,
			options: {
				spaceId: `smrlz4o6hk32`,
				accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
				downloadLocal: true
			}
		},
		{
			resolve: `gatsby-plugin-drip`,
			options: {
				accountId: '6140706'
			}
		},
		{
      resolve: `gatsby-plugin-stripe`,
      options: {
        async: true,
      },
    },
		// this (optional) plugin enables Progressive Web App + Offline functionality
		// To learn more, visit: https://gatsby.app/offline
		// 'gatsby-plugin-offline',
	]
};
