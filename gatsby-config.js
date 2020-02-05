if (process.env.NODE_ENV != 'production')
	require("dotenv").config({path: `.env.${process.env.NODE_ENV}`})

module.exports = {
	siteMetadata: {
		title: 'Amp by Intentful Motion',
		author: 'Intentful Motion, Inc.',
		description: 'Reactive, smart brake and turn lights for your ride',
		keywords: `Amp, smart lights, bicycle lights, longboard lights, Boosted Board lights, OneWheel lights, scooter lights, brake lights, indicators`,
		siteUrl: `https://amp.intentfulmotion.com`,
		snipcartKey: process.env.SNIPCART_PUBLIC_API_KEY,
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
        name: `Find a Kit`,
        link: `/#kits`
			},
			{
        name: `Subscribe`,
        link: `#subscribe`
      }
		],
		footer: [
      {
        section: `About`,
        links: [
          {
            name: `Home`,
            link: `/`
          },
          {
            name: `Contact`,
            link: `mailto://team@intentfulmotion.com?subject=Contact`
          }
        ]
			},
			{
        section: `Shop`,
        links: [
					{
            name: `DIY Kits`,
            link: `/diy`
          },
          {
            name: `Longboard Kits`,
            link: `/longboards`
          }
        ]
      },
      {
        section: "Legal",
        links: [
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
		{
			resolve: 'gatsby-plugin-snipcartv3',
			options: {
				apiKey: process.env.SNIPCART_PUBLIC_API_KEY,
				jquery: false,
				styles: false,
				autopop: true
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
		}
		// this (optional) plugin enables Progressive Web App + Offline functionality
		// To learn more, visit: https://gatsby.app/offline
		// 'gatsby-plugin-offline',
	]
};
