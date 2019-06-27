import React from 'react'
import Layout from "../components/layout"
import Navbar from "../components/navbar"

const OrderSuccessPage = () => (
  <Layout>
    <Navbar alt={true} />
    <div className="section">
      <div className="container">
        <div className="content">
          <h2>Order Confirmation</h2>
          <p>Thank you for your order!</p>
          <p>Hang tight, we'll keep you updated as we process your order.</p>
        </div>
      </div>
    </div>
  </Layout>
)

export default OrderSuccessPage