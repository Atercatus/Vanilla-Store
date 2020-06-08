import VanillaDispatcher from "../../dispatchers/vanilla-dispatcher/vanilla-dispatcher";
import SliderActionTypes from "./slider-action-types";

class SliderAction {
  public static slide(num: number): void {
    VanillaDispatcher.dispatch({
      type: SliderActionTypes.SLIDE,
      payload: {
        num,
      },
    });
  }
}

export default SliderAction;
