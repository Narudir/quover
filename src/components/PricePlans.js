import React from 'react';
import FlatButton from 'material-ui/FlatButton';
const NumberFormat = require('react-number-format');

const PricePlans = (props) => {
    const pricePlans = props.pricePlans;
    const pricePlansContents = pricePlans ?
        pricePlans.map((plan) => {
            let perYear = plan.pricePerYear;
            return (<li 
                    className="price_plan" 
                    key={plan.variant}
                    >
                        <NumberFormat 
                            value={perYear.value} 
                            thousandSeparator={true} 
                            suffix={perYear.currency}
                            displayType={'text'}
                        />
                        <FlatButton 
                            label="Select" 
                            primary={true} 
                            style={{marginLeft: "5px"}}
                            onClick={() => alert('New draft has been created, you should receive an email soon.')}
                        />
                    </li>)
        }) : 
        <p>Price plans are not available for this car model.</p>;
    return (
        <div className="price_plans_panel">
            <ul className="price_plans_list">
                {pricePlansContents}
            </ul>
        </div>
    )
}

export default PricePlans;