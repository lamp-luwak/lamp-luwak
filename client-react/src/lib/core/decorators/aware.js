import { getInjectInfo } from '../injectInfo';
import { extractCtxFromProps, connectToScope } from '../scope';

export const aware = (DecoratedComponent) => {

  return connectToScope(class extends DecoratedComponent {

    static displayName = DecoratedComponent.name;

    constructor(props, context) {
      super(props, context);

      const info = getInjectInfo(DecoratedComponent);
      if (info) {
        const ctx = extractCtxFromProps(props);
        for (let name of Object.keys(info)) {
          this[name] = ctx(info[name]);
        }
      }
      this.initialized && this.initialized();
    }
  });
};
