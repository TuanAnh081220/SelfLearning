import React from 'react';

import Aux from '../../../hoc/Auxiliry';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return (
                <li key={igKey}>
                    <span style={{ textTransform: 'capitalize' }}>{igKey}: {props.ingredients[igKey]}</span>
                </li>
            )
        });
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the folloing ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total price: {props.priceSummary}</strong></p>
            <p>Continue to checkout?</p>
            <Button
                btnType="Danger"
                clicked={props.purchaseCanceled}>CANCEL</Button>
            <Button
                btnType="Success"
                clicked={props.purchaseContinued}>CONTINUE</Button>
        </Aux>
    )
};

export default orderSummary;