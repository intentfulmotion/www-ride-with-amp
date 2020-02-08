import React from 'react';
import './home.scss';

import AmpMixer from '../../images/amp-mixer.gif'

export default () => (
  <section className="section" id="mixer">
    <div className="container content">
      <h3 className="title bold is-3">Customize with Amp Mixer</h3>
			<h4 className="subtitle is-4">Create your own light aesthetic with the iOS and Android app.</h4>
    </div>
		<div className="container">
			<div className="columns is-vcentered">
				<div className="column is-4">
					<div className="box details">
						<h5 className="title bold is-5">Remote Control</h5>
						<p>Use Mixer to control the braking and turn indications for the Amp in remote control mode.</p>
          </div>
          <div className="box details">
						<h5 className="title bold is-5">Customize Your Lights</h5>
						<p>Customize which parts of the lights connected to the Amp should be used for braking, turning, and for headlights.</p>
					</div>
					<div className="box details">
						<h5 className="title bold is-5">Share Your Amp</h5>
						<p>Want to re-use one Amp between your bicycle and longboard?</p><br/>
						<p>Load up a new profile or create your own in Mixer and you're on your way.</p>
					</div>
        </div>
				<div className="column is-offset-3 is-3">
					<figure className="image">
						<img src={AmpMixer} alt="Customise your lights with Amp Mixer" />
					</figure>
				</div>
			</div>
    </div>
	</section>
)
