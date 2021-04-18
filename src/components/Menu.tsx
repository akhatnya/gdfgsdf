import { observer } from 'mobx-react-lite';
import React from 'react';
import { ICoffee, IShopStore } from '../interfaces';
import { ButtonsGroup } from './ButtonsGroup';

type IMenu = {
    store: IShopStore
};

const Menu = (props: IMenu) => {
    return (
        <>
            <div className="menu">
                {
                    props.store.coffees.map((coffee: ICoffee) => {
                        const coffeeCount = props.store.basket.filter((i: ICoffee, index: number) => i.id == coffee.id).length;
                        
                        return (
                            <div className="menu-item">
                                <h3 onClick={() => props.store.increaseItemCount(coffee)}>{ coffee.name }</h3>
                                <p>{ coffee.description }</p>
                                <ButtonsGroup 
                                    count={coffeeCount} 
                                    price={coffee.price}
                                    onIncrease={() => props.store.increaseItemCount(coffee)} 
                                    onDecrease={() => props.store.decreaseItemCount(coffee)} />
                            </div>
                        )
                    })
                }
            </div>
            {
                props.store.basket.length > 0 ?
                    <button onClick={() => props.store.setCurrentStep(2)}>Далее</button> : null
            }
        </>
    )
}

export default observer(Menu);