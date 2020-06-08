import TraversalContainer from "./containers/traversal-container/traversal-container";
import VanillaDOM from "./core/vanilla-dom";

function render() {
  const c = new TraversalContainer();
  const root = document.querySelector("#root") as Node;
  VanillaDOM.render(root, c.render({ parent: root }));
}

window.addEventListener("DOMContentLoaded", () => {
  render();
});
