import { action, makeAutoObservable } from "mobx";
import { IAddition, ICoffee, IShopStore } from "../interfaces";

class ShopStore implements IShopStore {
    currentStep: 1 | 2 | 3;
    orderType: "here" | "away";
    basket: ICoffee[];
    coffees: ICoffee[];
    additions: IAddition[];

    setOrderType = (orderType: "here" | "away") => {
        this.orderType = orderType;
    }

    increaseItemCount = (coffee: ICoffee) => {
        this.basket.push({ ...coffee, additions: [] });
    }

    decreaseItemCount = (coffee: ICoffee) => {
        const itemIndex = this.basket.map((i: ICoffee) => i.id).indexOf(coffee.id);

        if (itemIndex > -1) {
            this.basket.splice(itemIndex, 1);
        }
    }

    increaseCoffeeAdditionByIndex = (addition: IAddition, coffeeIndex: number) => {
        this.basket.map((i: ICoffee, index: number) => {
            if (coffeeIndex == index) {
                const additionIndex: any = i.additions?.map((a: IAddition) => a.id).indexOf(addition.id);

                if (additionIndex > -1) {
                    i.additions![additionIndex].count!++;
                } else {
                    i.additions!.push({ ...addition, count: 1});
                }
            }
        });
    }

    decreaseCoffeeAdditionByIndex = (addition: IAddition, coffeeIndex: number) => {
        this.basket.map((i: ICoffee, index: number) => {
            if (coffeeIndex == index) {
                const additionIndex: any = i.additions?.map((a: IAddition) => a.id).indexOf(addition.id);

                if (additionIndex > -1) {
                    i.additions![additionIndex].count!--;
                }

                i.additions = i.additions!.filter((a: IAddition) => a.count! > 0);
            }
        });
    }

    performOrder = () => {
        this.setCurrentStep(3);
    }

    setCurrentStep = (step: 1 | 2 | 3) => {
        this.currentStep = step;
    }

    constructor(){
        this.currentStep = 1;
        this.orderType = "here";
        this.basket = [];
        this.coffees = [{
            id: 1,
            description: "???????????????? ?? ?????????????? ?????????? ?? ????",
            name: "????????????????",
            price: 880
        }, {
            id: 2,
            description: "??????????-???? ??????????",
            name: "??????????????????",
            price: 550
        }, {
            id: 3,
            description: "?????????????????????? ?????????? ??????????",
            name: "??????????",
            price: 510
        }, {
            id: 4,
            description: "?????????? ????????",
            name: "??????????????????????",
            price: 42500
        }];
        this.additions = [{
            id: 1,
            name: "?????????? 2????",
            price: 20
        }, {
            id: 2,
            name: "?????????? ?????????? 25????",
            price: 120
        }, {
            id: 3,
            name: "???????????? 1????",
            price: 40
        }];

        makeAutoObservable(this, {
            decreaseCoffeeAdditionByIndex: action,
            increaseCoffeeAdditionByIndex: action,
            decreaseItemCount: action,
            increaseItemCount: action,
            performOrder: action,
            setCurrentStep: action,
            setOrderType: action
        })
    }

}

export default new ShopStore() as ShopStore
