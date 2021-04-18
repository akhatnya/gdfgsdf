export interface IAddition {
    id: number,
    name: string,
    price: number,
    count?: number
}

export interface ICoffee {
    id: number,
    name: string,
    description: string,
    price: number,
    additions?: IAddition[]
}

export interface IShopStore {
    currentStep: 1 | 2 | 3,
    basket: ICoffee[],
    coffees: ICoffee[],
    additions: IAddition[],
    orderType: "here" | "away",
    increaseItemCount: (coffee: ICoffee) => void,
    decreaseItemCount: (coffee: ICoffee) => void,
    increaseCoffeeAdditionByIndex: (addition: IAddition, coffeeIndex: number) => void,
    decreaseCoffeeAdditionByIndex: (addition: IAddition, coffeeIndex: number) => void,
    performOrder: () => void,
    setCurrentStep: (step: 1 | 2 | 3) => void,
    setOrderType: (orderType: "here" | "away") => void
}
