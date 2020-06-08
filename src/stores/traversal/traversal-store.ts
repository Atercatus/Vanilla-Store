import Action from "../../actions/action";
import Store from "../store";
import VanillaDispatcher from "../../dispatchers/vanilla-dispatcher/vanilla-dispatcher";

class TraversalStore extends Store<Action, number> {
  constructor() {
    super(VanillaDispatcher); // 이후 store 상위 클래스에서 주입하도록 변경
  }

  protected reduce(state: number, action: Action): number {
    switch (action.type) {
      default:
        break;
    }

    return state + 1;
  }

  public getInitialState(): number {
    return 0;
  }
}

export default new TraversalStore();
