import React from 'react';
import './home.scss';

import AmpFront from '../../images/amp-front.png'

export default () => (
	<section className="section" id="what">
		<div className="container has-text-right content">
			<h3 className="title bold is-3">Say Hello to the Amp</h3>
			<h4 className="subtitle is-4">A smart lighting system that reacts to the way you move.</h4>
		</div>
		<div className="container">
			<div className="columns is-vcentered">
				<div className="column is-offset-3 is-2">
					<figure className="image">
						<img src={AmpFront} alt="The brains for smart lighting" />
					</figure>
				</div>
				<div className="column is-offset-3">
					<div className="box details">
						<h5 className="title bold is-5">F1 Inspired Brake Lights</h5>
						<p>Whether you're riding in bad weather or decelerating, the Amp flashes a brake flight to warn those around you.</p>
					</div>
					<div className="box details">
						<h5 className="title bold is-5">Turn Sensitive Indicators</h5>
						<p>Use motion, your smartwatch, or the Amp Mixer app to indicate turns well in advance to warn others on the road.</p><br/>
					</div>
					<div className="box details">
						<h5 className="title bold is-5">Works with Your Gear</h5>
						<p>Keep your existing helmet, gloves, and wheels. There's no need to replace 'em with the Amp!</p><br/>
						<p>Pair up the Amp with one of our kits or your own lights to build your own aesthetic.</p>
					</div>
				</div>
			</div>
		</div>
	</section>
)
