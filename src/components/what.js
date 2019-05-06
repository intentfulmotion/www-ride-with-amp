import React from 'react';
import './style.scss';

export default () => (
	<section className="section" id="what">
		<div className="container has-text-right content">
			<h3 className="title is-3">Say Hello to the Amp</h3>
			<h4 className="subtitle is-4">A smart lighting kit that helps you broadcast your intentions on the road.</h4>
		</div>
		<div className="container">
			<div className="tile is ancestor">
				<div className="tile is-8 is-parent">
				</div>
				<div className="tile is-vertical is-parent">
					<div className="tile is-child box details">
						<h5 className="title is-5">F1 Inspired Brake Lights</h5>
						<p>Whether you're in crap weather or coming to a halt, the Amp pulses your brake light to let drivers know something is up.</p>
					</div>
					<div className="tile is-child box details">
						<h5 className="title is-5">Turn Sensitive Indicators</h5>
						<p>When you turn, the Amp senses your movement and throws on indicators.</p><br/>
						<p>Want to give advance warning? Use your smartwatch to control the lights.</p>
					</div>
					<div className="tile is-child box details">
						<h5 className="title is-5">Works with Your Gear</h5>
						<p>Keep your existing helmet, gloves, and wheels. There's no need to replace 'em with the Amp!</p><br/>
						<p>Find a compatible lighting kit and slap the Amp on your gear to make your own aesthetic.</p>
					</div>
				</div>
			</div>
		</div>
	</section>
)
