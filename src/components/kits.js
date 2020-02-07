import React from 'react';
import './style.scss';

// import DIYKit from "../images/diy.svg"
// import BicycleKit from "../images/bicycle.svg"
// import ScooterKit from "../images/scooter.svg"
// import LongboardKit from "../images/longboard.svg"

export default () => (
  <>
    <div className="section has-background-info has-text-white" id="kits">
      <h3 className="title is-3 bold has-text-centered has-text-white">Find a Kit For You</h3>
    </div>
    <div className="section">
    <div className="pricing-table">
      <div className="container">
          <div className="columns">
            <div className="column">
              <div className="pricing-plan">
                <div className="plan-header">Do It Yourself</div>
                <div className="plan-price">Starting at: <span className="plan-price-amount"><span className="plan-price-currency">$</span>59.99</span></div>
                <div className="plan-items">
                  <div className="plan-item">Mix and match LED strips</div>
                  <div className="plan-item">Great for bags, jackets, or helmets</div>
                  <div className="plan-item">Customize in Amp Mixer</div>
                  <div className="plan-item">Beta Available Now</div>
                </div>
                <div className="plan-footer">
                  <button className="button is-primary" onClick={() => window.location.href = '/diy'}>Make Your Kit</button>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="pricing-plan">
                <div className="plan-header">Longboards + E-skates</div>
                <div className="plan-price">Starting at: <span className="plan-price-amount"><span className="plan-price-currency">$</span>74.99</span></div>
                <div className="plan-items">
                  <div className="plan-item">Front truck running lights</div>
                  <div className="plan-item">Motor mount brake lights</div>
                  <div className="plan-item">Deck mounted underglow / indicators</div>
                  <div className="plan-item">Beta Available Now</div>
                </div>
                <div className="plan-footer">
                  <button className="button is-primary" onClick={() => window.location.href = '/longboards'}>Find a Kit</button>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="pricing-plan">
                <div className="plan-header">Bicycles</div>
                <div className="plan-price">Pricing <span className="plan-price-amount">TBA</span></div>
                <div className="plan-items">
                  <div className="plan-item">Front fork running lights</div>
                  <div className="plan-item">Rear fork brake lights</div>
                  <div className="plan-item">Handlebar mount controller</div>
                  <div className="plan-item">Alpha Available Soon</div>
                </div>
                <div className="plan-footer">
                  <button className="button is-primary is-outlined" onClick={() => window.location.href = '#subscribe'}>Notify Me</button>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="pricing-plan">
                <div className="plan-header">Scooters</div>
                <div className="plan-price">Pricing <span className="plan-price-amount">TBA</span></div>
                <div className="plan-items">
                  <div className="plan-item">Handlebar running lights and indicators</div>
                  <div className="plan-item">Rear fender brake lights</div>
                  <div className="plan-item">Deck running style lights</div>
                  <div className="plan-item">Coming soon</div>
                </div>
                <div className="plan-footer">
                  <button className="button is-primary is-outlined" onClick={() => window.location.href = '#subscribe'}>Notify Me</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="columns">
          <div className="column">
            <div className="card kit-card">
              <div className="card-content">
                <figure className="image is-square">
                  <img src={DIYKit} />
                </figure>
                <div className="content">
                  <h3 className="title has-text-primary">Build Your Own</h3>
                  <ul>
                    <li>Mix and match LED strips</li>
                    <li>Great for bags, jackets, or helmets</li>
                    <li className="has-text-primary">BETA available now</li>
                  </ul>
                </div>
              </div>
              <div className="card-footer">
                <a className="card-footer-item has-text-white" href="/diy">Get Yours</a>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="card kit-card">
              <div className="card-content">
                <figure className="image is-square">
                  <img src={LongboardKit} />
                </figure>
                <div className="content">
                  <h3 className="title has-text-primary">Longboards + E-skates</h3>
                  <ul>
                    <li>Front truck running lights</li>
                    <li>Motor mount brake lights</li>
                    <li>Deck running style lights</li>
                    <li className="has-text-primary">BETA available now</li>
                  </ul>
                </div>
              </div>
              <div className="card-footer">
                <a className="card-footer-item has-text-white" href="/longboards">Get Yours</a>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="card kit-card">
              <div className="card-content">
                <figure className="image is-square">
                  <img src={ScooterKit} />
                </figure>
                <div className="content">
                  <h3 className="title has-text-primary">Scooters</h3>
                  <ul>
                    <li>Handlebar running lights and indicators</li>
                    <li>Rear fender brake lights</li>
                    <li>Deck running style lights</li>
                  </ul>
                </div>
              </div>
              <div className="card-footer">
                <a className="card-footer-item has-text-white" href="#subscribe">Notify Me</a>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="card kit-card">
              <div className="card-content">
                <figure className="image is-square">
                  <img src={BicycleKit} />
                </figure>
                <div className="content">
                  <h3 className="title has-text-primary">Bicycles</h3>
                  <ul>
                    <li>Front fork lights</li>
                    <li>Rear fork lights</li>
                  </ul>
                </div>
              </div>
              <div className="card-footer">
                <a className="card-footer-item has-text-white" href="#subscribe">Notify Me</a>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  </>
)
