import { action, watch, dispatch, modify } from "lamp-luwak";
import { uniqid } from "../../lib/uniqid";

export const ItemChanged = action();
export const ItemCompletedChanged = action();
export const RemoveItem = action();

type Props = {
  id?: string,
  label: string;
  completed?: boolean;
}
type State = {
  id: string;
  label: string;
  completed: boolean;
}

export class Item {
  state: State;

  constructor(props?: Props) {
    this.state = {
      id: props?.id || uniqid(),
      label: props?.label || '',
      completed: props?.completed || false
    };
    watch(this, ItemChanged);
    watch(this, this.onChange.bind(this));
  }

  protected onChange(state: State, prevState: State) {
    if (state.completed !== prevState.completed) {
      dispatch(ItemCompletedChanged, state, prevState);
    }
  }

  public get id() {
    return this.state.id;
  }
  public get completed() {
    return this.state.completed;
  }
  public get label() {
    return this.state.label;
  }

  public setCompleted(completed: boolean) {
    if (completed !== this.state.completed) {
      modify(this).completed = completed;
    }
  }

  public setLabel(label: string) {
    if (label !== this.state.label) {
      modify(this).label = label;
    }
  }

  public remove() {
    dispatch(RemoveItem, this);
  }

}
