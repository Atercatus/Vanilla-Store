interface View {
  render<TProps>(props?: TProps, children?: View[]): Node;
}

export default View;
