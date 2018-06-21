
export const subscribe = (Component) => (
  class extends Component {
    static displayName = Component.displayName || Component.name;

    constructor(props, context) {
      super(props, context);

      const unsubscribers = this.__mutUnsubscribers = this.__mutUnsubscribers || [];
      const update = () => this.forceUpdate();

      if (this.__injectedPropertyNames) {
        const names = this.__injectedPropertyNames;
        for (let name of names) {
          if (this[name].__mutSubscribe) {
            unsubscribers.push(
              this[name].__mutSubscribe(update)
            );
          }
        }
      }

      for (let name of Object.keys(props)) {
        if (props[name].__mutSubscribe) {
          unsubscribers.push(
            props[name].__mutSubscribe(update)
          );
        }
      }

    }

    componentWillUnmount() {
      super.componentWillUnmount();
      for (let unsubscriber of this.__mutUnsubscribers) {
        unsubscriber();
      }
    }
  }
);
