class VanillaDOM {
  public static render(container: Node, child: Node) {
    container.appendChild(child);
  }
}

export default VanillaDOM;
