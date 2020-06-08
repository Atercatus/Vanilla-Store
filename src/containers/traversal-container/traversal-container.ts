import Container from "../container";
import TraversalStore from "../../stores/traversal/traversal-store";
import ContainerFactory from "../../core/container-factory/container-factory";
import SliderAction from "../../actions/slider-action/slider-action";

interface TraversalContainerProps {}

class TraversalContainer implements Container {
  public subscribe() {
    TraversalStore.addListener(() => {
      this.render();
    });
  }

  public caculateStates() {
    return { value: TraversalStore.getState(), onClick: SliderAction.slide };
  }

  public getStores() {
    return [TraversalStore];
  }

  public render(props?: TraversalContainerProps) {
    const { value, onClick } = this.caculateStates();

    const div = document.createElement("div");
    div.innerHTML = value.toString();
    div.addEventListener("click", () => {
      onClick(2);
    });

    return div;
  }
}

export default ContainerFactory.generate(TraversalContainer);
