import React from 'react';
import { useStaticQuery, graphql, Link } from "gatsby";
import './header.scss';

import Navbar from '../navbar';
// import ampPoster from '../images/poster.jpg'
// import ampLogo from '../images/amp-icon.svg';
// import ampVideoLoop from '../videos/amp-intro-loop.mp4'
// import ampBicycle from '../images/amp-bicycle-min.jpg'
import Img from "gatsby-image"

export const heroImage = graphql`
fragment heroImage on File {
  childImageSharp {
		fluid(
			maxWidth: 1352
			traceSVG: { background: "#fff", color: "#663399" }
		) {
      ...GatsbyImageSharpFluid_tracedSVG
    }
  }
}
`

const Header = () => {
	const data = useStaticQuery(graphql`
		query {
			heroImage: file(relativePath: { eq: "amp-bicycle-min.jpg" }) {
				...heroImage
			}
		}
	`)
	return (
		<section className="hero is-fullheight video">
			<Navbar />
			<div className="hero-video">
				{/* <video id="bgvid" poster={ampPoster} playsInline muted autoPlay disableremoteplayback="true" loop>
					<source src={ampVideoLoop} type="video/mp4" />
				</video> */}
				<Img className="hero-image" fluid={data.heroImage.childImageSharp.fluid} fadeIn={true} />
			</div>
			<div className="hero-body">
				<div className="container">
					<div className="columns">
						<div className="column is-half">
							<h1 className="brand-name">aMp</h1>
							<h1 className="title">Smart, reactive lights for your ride</h1>
							<h2 className="subtitle">Beta Available Now.</h2>
							<br/>
							<div className="buttons">
								<Link to="/#what" className="button is-white is-outlined">Learn More</Link>
								<Link to="/shop" className="button is-primary has-text-white">Shop Now</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Header;
