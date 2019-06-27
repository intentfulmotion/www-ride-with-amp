import React from 'react'
import Layout from "../components/layout"
import Navbar from "../components/navbar"

const SubscribeSuccessPage = () => (
  <Layout>
    <Navbar alt={true} />
    <div className="section">
      <div className="container">
        <div className="content">
          <h2>Thanks, we'll keep you posted!</h2>
          <p>Please check your email and click the link provided to confirm your subscription.</p>
        </div>
      </div>
    </div>
  </Layout>
)

export default SubscribeSuccessPage