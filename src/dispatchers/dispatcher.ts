import { DispatchToken } from "./dispatch-token";

class Dispatcher<T> {
  constructor() {
    this.lastId = 0;
    this.isDispatching = false;
    this.callbacks = {};
    this.isPending = {};
    this.isHandled = {};
  }

  private callbacks: { [key: string]: (payload: T) => void };
  private lastId: number;
  private isHandled: { [key: string]: boolean }; // history
  private isPending: { [key: string]: boolean }; // current store state
  private isDispatching: boolean;
  private pendingPayload!: T;

  private invokeCallback(id: DispatchToken) {
    this.isPending[id] = true;
    this.callbacks[id](this.pendingPayload);
    this.isHandled[id] = true;
  }

  private prepareDispatch(payload: T) {
    for (let id in this.callbacks) {
      this.isPending[id] = false;
      this.isHandled[id] = false;
    }

    this.pendingPayload = payload;
    this.isDispatching = true;
  }

  private clearDispatch() {
    this.isDispatching = false;
    delete this.pendingPayload;
  }

  public register(callback: (payload: T) => void): DispatchToken {
    this.callbacks[this.lastId++] = callback;

    return "ID_" + this.lastId;
  }

  public unregister(dispatchToken: DispatchToken): void {
    delete this.callbacks[dispatchToken];
  }

  public waitFor(dependencies: DispatchToken[]) {
    if (this.isDispatching) {
      console.error(
        "Dispatcher.waitFor(...) 는 dispatch 중에 호출될 수 없습니다."
      );
      return;
    }

    dependencies.forEach((dependency) => {
      if (this.isPending[dependency]) {
        if (this.isHandled[dependency]) {
          console.error(
            `완료된 작업 ${this.callbacks[dependency]} 에 대해서 대기하고 있습니다`
          );
        }
        return;
      }
      this.invokeCallback(dependency);
    });
  }

  public dispatch(payload: T): void {
    if (this.isDispatching) {
      console.error(
        "Dispatcher.dispatch(...) 는 dispatch 중에 호출될 수 없습니다. "
      );
    }

    this.prepareDispatch(payload);

    for (let id in this.callbacks) {
      this.invokeCallback(id);
    }

    this.clearDispatch();
  }
}

export default Dispatcher;
