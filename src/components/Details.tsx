import { observer } from 'mobx-react-lite'
import React from 'react'
import { IAddition, ICoffee, IShopStore } from '../interfaces'
import { ButtonsGroup } from './ButtonsGroup'

type IDetails = {
    store: IShopStore
}

const Details = (props: IDetails) => {
    var totalSum = 0;
    return (
        <>
            <button onClick={() => props.store.setCurrentStep(1)}>назад</button>
            <div className="menu">
                {
                    props.store.basket.map((coffee: ICoffee, coffeeIndex: number) => {
                        var sum = coffee.price;
                        return (
                            <div className="menu-item" key={coffeeIndex}>
                                <h3 onClick={() => props.store.increaseItemCount(coffee)}>{ coffee.name }</h3>
                                <p>{ coffee.description }</p>
                                <hr style={{width: "30px", float: "left"}} />
                                <div className="additions">
                                    {
                                        props.store.additions.map((addition: IAddition, additionsIndex: number) => {
                                            const coffeeAddition = coffee.additions!.filter((i: IAddition) => i.id == addition.id);
                                            const coffeeAdditionCount = coffeeAddition.length == 1 ? coffeeAddition[0].count : 0;
                                            return (
                                                <div className="addition" key={additionsIndex}>
                                                    <span>{ addition.name }</span>
                                                    <ButtonsGroup 
                                                        count={coffeeAdditionCount} 
                                                        price={addition.price}
                                                        onDecrease={() => props.store.decreaseCoffeeAdditionByIndex(addition, coffeeIndex)} 
                                                        onIncrease={() => props.store.increaseCoffeeAdditionByIndex(addition, coffeeIndex)} />
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <div>
                                    Сумма: <b>{coffee.price + coffee.additions!.reduce((total, current) => total + current.price * current.count!, 0)}</b> KZT
                                </div>
                            </div>
                        )
                    })
                }
            </div>

            <input type="radio" id="here" checked={props.store.orderType === "here"} onChange={(e: any) => props.store.setOrderType(e.target.checked ? "here" : "away")} />
            <label htmlFor="here">здесь</label>

            <input type="radio" id="away" checked={props.store.orderType === "away"} onChange={(e: any) => props.store.setOrderType(e.target.checked ? "away" : "here")} />
            <label htmlFor="away">с собой</label>


            <br />
            <button onClick={() => props.store.setCurrentStep(3)}>
                оформить заказ ({
                    props.store.basket.reduce((totalCoffee, currentCoffee) => { 
                        return  totalCoffee + 
                                currentCoffee.price + 
                                currentCoffee.additions!.reduce(
                                    (totalAddition, currentAddition) => totalAddition + currentAddition.price * currentAddition.count!, 0)
                    }, 0)
                } KZT)
            </button>
        </>
    )
}

export default observer(Details);