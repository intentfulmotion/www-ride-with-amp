module.exports = {
	siteMetadata: {
		title: 'Light up your ride',
		author: '@intentfulmotion',
		description: 'Ride safer with the Amp smart lighting kit for bicycles, scooters, and longboards.',
		keywords: `Amp, smart lights, bicycle lights, longboard lights, Boosted Board lights, OneWheel lights, scooter lights, brake lights, indicators`,
		siteUrl: `https://www.ridewithamp.com`,
		menuLinks: [
      {
        name: `What Is It`,
        link: `#what`
      },
      {
        name: `Specs`,
        link: `#specs`
      },
      {
        name: `Mix It Up`,
        link: `#mixer`
      },
      {
        name: `Find a Kit`,
        link: `#kits`
      }
		],
		storeLink: {
      text: `Get Yours`,
      collection: `5b9163da2af10714007ba8ec`
		},
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
		'gatsby-plugin-react-helmet',
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `images`,
				path: `${__dirname}/src/images`
			}
		},
		'gatsby-transformer-sharp',
		'gatsby-plugin-sharp',
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
				trackingId: 'UA-XXXXXXXX-X',
				// Setting this parameter is optional (required for some countries such as Germany)
				anonymize: true
			}
		},
		`gatsby-plugin-sitemap`
		// this (optional) plugin enables Progressive Web App + Offline functionality
		// To learn more, visit: https://gatsby.app/offline
		// 'gatsby-plugin-offline',
	]
};
