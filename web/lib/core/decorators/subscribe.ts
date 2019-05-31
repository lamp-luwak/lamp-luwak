
export const subscribe = (Component: ObjectConstructor) => (
  class SubscribedComponent<P = {}> extends Component {
    public static displayName = (Component as any).displayName || Component.name;

    constructor(props: P, context?: any) {
      super(props, context);

      const unsubscribers = this.__mutUnsubscribers = this.__mutUnsubscribers || [];
      const update = this.forceUpdate.bind(this);

      if (this.__injectedPropertyNames) {
        const names = this.__injectedPropertyNames;
        for (const name of names) {
          if (this[name].__mutSubscribe) {
            unsubscribers.push(this[name].__mutSubscribe(update));
          }
        }
      }

      for (const name of Object.keys(props)) {
        if (props[name].__mutSubscribe) {
          unsubscribers.push(props[name].__mutSubscribe(update));
        }
      }

    }

    componentWillUnmount() {
      super.componentWillUnmount();
      for (const unsubscriber of this.__mutUnsubscribers) {
        unsubscriber();
      }
    }
  }
);
