### Core Concepts

- Services
- Stores
- Communication _(action/subscribe/dispatch)_
- Modules

### Services
Service - it single instantiated class or memoized result of function factory. Service can be accessed from any place of your app code.

```typescript
import { useProvide, modify } from "lamp-luwak";

class Modal {
  store = {
    text: '',
    opened: false
  };
  open(text: string) {
    this.store = {
      text,
      opened: true
    }
  }
  close() {
    modify(this).opened = false;
  }
}

const ModalButton = ({ text, children }) => {
  const modal = useProvide(Modal);
  return (
    <button onClick={() => modal.open(text)}>
      {children}
    </button>
  )
}

const ModalContainer = () => {
  const modal = useProvide(Modal);
  const { opened, text } = modal.store;
  if (!opened) return null;
  return (
    <Overlay>
      <Panel>
        <Body>{text}</Body>
        <Footer>
          <button onClick={() => modal.close()}>Close</button>
        </Footer>
      </Panel>
    </Overlay>
  )
}
```
[![Example on codesandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/betula/lamp-luwak/tree/master/docs/code/modal)

We use single Modal service in ModalButton and ModalContainer components. Each update of Modal service store these two compononents will be updated too, because they get Modal service instance by call `useProvide` function inside.

### Stores
### Communication
### Modules
