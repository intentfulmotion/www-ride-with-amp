import React from 'react';
import './style.scss';

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
      </div>
    </div>
  </>
)
