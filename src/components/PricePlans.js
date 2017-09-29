import React, { Component } from 'react';

class PricePlans extends Component {
    render() {
        const pricePlans = this.props.pricePlans;
        const pricePlansContents = pricePlans ?
            pricePlans.map((plan) => {
                let perYear = plan.pricePerYear;
                return <li key={plan.variant}>{perYear.value} {perYear.currency}</li>;
            }) : 
            <p>Price plans are not available for this car model.</p>;
        return (
            <ul className="pricePlansPanel">
                {pricePlansContents}
            </ul>
        )
    }
}

export default PricePlans;