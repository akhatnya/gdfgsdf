import React from 'react';

export const ButtonsGroup = (props: any) => {
    if (props.count > 0) {
        return (
            <div className="count-control">
                <button onClick={props.onDecrease} >-</button>
                <span>{props.count}</span>
                <button onClick={props.onIncrease}>+</button>
            </div>
        )
    }
    return <button onClick={props.onIncrease}>{props.price} KZT</button>
}