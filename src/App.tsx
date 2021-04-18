import { observer } from 'mobx-react-lite';
import './App.css';
import Details from './components/Details';
import Menu from './components/Menu';
import { IShopStore } from './interfaces';
import ShopStore from './stores/ShopStore';

type IApp = {
  store: IShopStore
};

function App(props: IApp) {
  if (props.store.currentStep == 1)
    return <Menu store={props.store} />

  if (props.store.currentStep == 2)
    return <Details store={props.store} />

  return <h3>Заказ успешно оформлен!</h3>
  
}

export default observer(App);
