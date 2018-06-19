import { getInjectInfo } from '../injectInfo';
import { ctx } from '../ctx';

export const aware = (Component) => (
  class extends Component {
    static displayName = Component.name;

    constructor(props, context) {
      super(props, context);
      const info = getInjectInfo(Component);
      if (info) {
        for (let name of Object.keys(info)) {
          this[name] = ctx(info[name]);
        }
      }
      this.ctxReady && this.ctxReady();
    }
  }
);
