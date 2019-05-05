import React from 'react';
import './style.scss';

const SpecSection = () => (
  <div className="section has-background-info has-text-white" id="specs">
    <div className="container">
      <div className="content">
      <h3 className="title is-3 has-text-centered has-text-white">Specs</h3>
      </div>
      <div className="columns">
        <div className="spec column has-text-centered">
          <h1 className="is-size-1">8+</h1>
          <p className="subtitle has-text-white">hours of battery life</p>
        </div>
        <div className="spec column has-text-centered">
          <h1 className="is-size-1">4</h1>
          <p className="subtitle has-text-white">up to LED strips</p>
        </div>
        <div className="spec column has-text-centered">
          <h1 className="is-size-1">3</h1>
          <p className="subtitle has-text-white">customizable lighting modes</p>
        </div>
        <div className="spec column has-text-centered">
          <ul className="spec-list">
            <li className="subtitle has-text-white">USB Type C charging</li>
            <li className="subtitle has-text-white">Bluetooth Low Energy</li>
            <li className="subtitle has-text-white">Over the Air Updates</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

export default SpecSection;
