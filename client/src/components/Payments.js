import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Payments extends Component {
    render() {
        return (
            <StripeCheckout
                name="Emaily"
                description="$5 for 5 email credits"
                amount={500}
                token={token => this.props.handleToken(token)}
                stripeKey={process.env.REACT_APP_STRIPE_KEY}
            >
                <button className="btn">Add Credits</button>
            </StripeCheckout>
        );
    }
}

// We don't want commit stripe publish key, so we defined it in heroku
// In order to rebuild, we'll commit this note, and push to Heroku

export default connect(null, actions)(Payments);
