import React from 'react';
import './style.scss';

import AmpMixer from '../images/amp-mixer.gif'

export default () => (
  <section className="section" id="mixer">
    <div className="container content">
      <h3 className="title bold is-3">Customize with Amp Mixer</h3>
			<h4 className="subtitle is-4">Create your own light aesthetic with the iOS and Android app.</h4>
    </div>
		<div className="container">
			<div className="tile is ancestor">
				<div className="tile is-vertical is-parent">
					<div className="tile is-child box details">
						<h5 className="title bold is-5">Remote Control</h5>
						<p>Manually control the light states and view the battery status of your Amp.</p>
          </div>
          <div className="tile is-child box details">
						<h5 className="title bold is-5">Custom Light Layouts</h5>
						<p>Mix up your own brake, indicator, and running lights layout to for each LED strip.</p>
					</div>
					<div className="tile is-child box details">
						<h5 className="title bold is-5">Share Your Amp</h5>
						<p>Want to share one Amp between your bicycle and longboard?</p><br/>
						<p>Load up a new profile or create your own in Mixer and you're on your way.</p>
					</div>
        </div>
				<div className="tile is-8 is-parent">
					<div className="tile is-child">
						<div className="columns is-centered">
							<div className="column is-half">
								<img src={AmpMixer} alt="Customise your lights with Amp Mixer" />
							</div>
						</div>
					</div>
				</div>
			</div>
    </div>
	</section>
)
