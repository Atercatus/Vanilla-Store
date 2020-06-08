import View from "../views/view";
import Store from "../stores/store";
import Action from "../actions/action";

// Controll-View
interface Container extends View {
  subscribe?: () => void;
  caculateStates<Props>(props?: Props): {};
  getStores(): Store<Action, {}>[];
}

export default Container;
