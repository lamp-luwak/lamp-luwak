
export const aware = (Component) => (
  class extends Component {
    static displayName = Component.name;

    constructor(props, context) {
      super(props, context);

      const unsubscribers = this.__subjectUnsubscribers = this.__subjectUnsubscribers || [];
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
    }

    componentWillUnmount() {
      super.componentWillUnmount();
      for (let unsubscriber of this.__subjectUnsubscribers) {
        unsubscriber();
      }
    }

  }
);
