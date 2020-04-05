import React, { Component } from 'react';

import Aux from '../../hoc/Auxiliry';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-order';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            meat: 0,
            salad: 0,
            bacon: 0,
            cheese: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        purchaseLoading: false
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map((igKey) => { return ingredients[igKey]; })
            .reduce((sum, el) => sum + el);
        this.setState(
            {
                purchasable: sum > 0
            }
        );
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredient = {
            ...this.state.ingredients
        };
        updatedIngredient[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const updatedPrice = oldPrice + priceAddition;
        this.setState(
            {
                ingredients: updatedIngredient,
                totalPrice: updatedPrice
            }
        )
        this.updatePurchaseState(updatedIngredient);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount - 1;
        const updatedIngredient = {
            ...this.state.ingredients
        };
        updatedIngredient[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const updatedPrice = oldPrice - priceDeduction;
        this.setState(
            {
                ingredients: updatedIngredient,
                totalPrice: updatedPrice
            }
        )
        this.updatePurchaseState(updatedIngredient);
    }

    purchaseHandler = () => {
        this.setState(
            {
                purchasing: true
            }
        )
    }

    purchaseCanceler = () => {
        this.setState(
            {
                purchasing: false
            }
        )
    }

    purchaseContinuer = () => {
        this.setState({
            purchaseLoading: true
        })
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            info: {
                name: "Nguyen Dinh Anh Tuan",
                age: 19,
                gender: 'male'
            },
            delivery: 'fastest'
        }
        axios.post('/orders.json', order).then(response => {
            this.setState({
                purchaseLoading: false,
                purchasing: false
            })
        }).catch(error => {
            this.setState({
                purchaseLoading: false,
                purchasing: false
            })
        })
    }

    render() {
        const disableInfo = {
            ...this.state.ingredients
        };
        for (let key in disableInfo) {
            disableInfo[key] = (disableInfo[key] <= 0)
        }
        let orderSummary = <OrderSummary
            ingredients={this.state.ingredients}
            priceSummary={this.state.totalPrice}
            purchaseCanceled={this.purchaseCanceler}
            purchaseContinued={this.purchaseContinuer} />
        if (this.state.purchaseLoading) {
            orderSummary = <Spinner />
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCanceler}>
                    {orderSummary}
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BurgerControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disableInfo}
                    purchasable={this.state.purchasable}
                    price={this.state.totalPrice}
                    ordered={this.purchaseHandler} />
            </Aux>
        )
    }
};

export default BurgerBuilder;