import React, { useContext } from 'react';
import './style.scss';

import Navbar from './navbar';
import ampPoster from '../images/poster.jpg'
import ampLogo from '../images/amp-icon.svg';
import ampVideoLoop from '../videos/amp-intro-loop.mp4'

const Header = () => (
	<section className="hero is-fullheight video">
		<Navbar />
		<div className="hero-video">
			<video id="bgvid" poster={ampPoster} playsInline muted autoPlay disableremoteplayback="true" loop>
				<source src={ampVideoLoop} type="video/mp4" />
			</video>
		</div>
		<div className="hero-body">
			<div className="container">
				<h1 className="brand-name">aMp</h1>
				<h1 className="title">Smart running lights for your commute</h1>
				<h2 className="subtitle">Beta Available Now.</h2>
				<br/>
				<div className="buttons">
					<a className="button is-white is-outlined" href="#what">
						<span>Learn More</span>
					</a>
					<a className="button is-primary has-text-white" href="#kits">
						<span>Get Your Kit</span>
					</a>
				</div>
			</div>
		</div>
	</section>
);

export default Header;
