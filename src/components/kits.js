import React from 'react';
import './style.scss';

import DIYKit from "../images/diy.svg"
import BicycleKit from "../images/bicycle.svg"
import ScooterKit from "../images/scooter.svg"
import LongboardKit from "../images/longboard.svg"

export default () => (
  <>
    <div className="section has-background-info has-text-white" id="kits">
      <h3 className="title is-3 bold has-text-centered has-text-white">Find a Kit For You</h3>
    </div>
    <div className="section">
      <div className="container">
        <div className="columns">
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
                <a className="card-footer-item has-text-white" href="https://store.intentfulmotion.com/product/amp-beta">Get Yours</a>
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
                <a className="card-footer-item has-text-white" href="https://store.intentfulmotion.com/product/boosted-stop-and-turn-kit-beta">Get Yours</a>
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
        </div>
      </div>
    </div>
  </>
)
