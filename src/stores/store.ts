import Dispatcher from "../dispatchers/dispatcher";
import { DispatchToken } from "../dispatchers/dispatch-token";

abstract class Store<TAction, TState> {
  constructor(dispatcher: Dispatcher<TAction>) {
    this.state = this.getInitialState();
    this.dispatcher = dispatcher;
    this.dispatchToken = this.dispatcher.register((payload: TAction) =>
      this.invokeOnDispatch(payload)
    );
    this.emitter = new EventTarget();
    // this.isChanged = false;
    this.changeEvent = "change";
  }

  protected dispatcher: Dispatcher<TAction>;
  protected dispatchToken: DispatchToken;
  protected emitter: EventTarget;
  // protected isChanged: boolean;
  protected changeEvent: string;
  protected state: TState;

  // 재구현 필요
  protected isEqual(a: any, b: any): boolean {
    return a === b;
  }

  protected abstract reduce(state: TState, action: TAction): TState;

  public abstract getInitialState(): TState;

  public invokeOnDispatch(action: TAction) {
    // this.isChanged = false;
    const currentState = this.state;
    const endState = this.reduce(currentState, action);

    if (endState === undefined) {
      console.error("reduce의 반환 값이 undefined 입니다.");
      return;
    }

    if (!this.isEqual(currentState, endState)) {
      this.state = endState;
      this.emitter.dispatchEvent(new Event(this.changeEvent));
    }
  }

  public addListener(callback: Function): void {
    this.emitter.addEventListener(this.changeEvent, () => {
      callback();
    });
  }

  public getState(): TState {
    return this.state;
  }
}

export default Store;
