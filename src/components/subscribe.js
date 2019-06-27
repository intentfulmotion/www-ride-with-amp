import React from 'react'
import { FaEnvelope } from 'react-icons/fa'

const SubscribeSection = () => (
  <section className="section has-background-info has-text-white" id="subscribe">
    <div className="container">
      <form id="signup-form" action="https://www.getdrip.com/forms/160816409/submissions" method="post" data-drip-embedded-form="160816409" onSubmit={() => {}}>
        <div className="content">
          <h3 className="title bold is-3 has-text-centered has-text-white" data-drip-attribute="headline">Stay in the Loop</h3>
          <p className="subtitle has-text-centered has-text-white" data-drip-attribute="description">Keep up to speed as we support new vehicles, form factors, and release new kits for the Amp.</p>
        </div>
        <div className="columns is-centered">
            <div className="column is-4 has-text-centered">
              <div className="field">
                <p className="control has-icons-left">
                  <input className="input" type="email" name="fields[email]" placeholder="interested@email.com" />
                  <span className="icon is-small is-left">
                    <FaEnvelope />
                  </span>
                </p>
              </div>
              <input type="submit" data-drip-attribute="sign-up-button" autoComplete="false" tabindex="-1" className="button is-primary has-text-centered" value="Sign Up for Updates" />
            </div>
        </div>
      </form>
    </div>
  </section>
)

export default SubscribeSection