import React from 'react';
import { StaticQuery, graphql } from "gatsby"

import './style.scss';
import Helmet from './helmet';
import Header from './header';
import Footer from './footer';

export default ({ children }) => (
  <div>
    <Helmet />
    {children}
    <Footer />
  </div>
);