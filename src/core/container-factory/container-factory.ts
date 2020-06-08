import Container from "../../containers/container";
import Store from "../../stores/store";
import Action from "../../actions/action";

class ContainerFactory {
  public static generate(container: new () => Container) {
    class ControllView extends container {
      constructor() {
        super();
        this.stores = super.getStores();
        this.getStores = () => this.stores;

        if (super.subscribe) {
          super.subscribe();
        }

        this.caculateStates = super.caculateStates;
        this.render = super.render;
      }

      private stores: Store<Action, {}>[];
    }

    return ControllView;
  }
}

export default ContainerFactory;
