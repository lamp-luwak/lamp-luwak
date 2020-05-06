import React, { FC } from 'react';
import { useService, modify, set } from 'lamp-luwak';
import { Overlay, Panel, Body, Footer } from './ui';

class Modal {
  state = {
    text: '',
    opened: false
  };
  open(text: string) {
    set(this, {
      text,
      opened: true
    });
  }
  close() {
    modify(this).opened = false;
  }
}

const ModalButton: FC<{ text: string }> = ({ text, children }) => {
  const modal = useService(Modal);
  return (
    <button onClick={() => modal.open(text)}>
      {children}
    </button>
  )
};

const ModalContainer = () => {
  const modal = useService(Modal);
  const { opened, text } = modal.state;
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
};

export const App = () => (
  <>
    <ModalButton text="My Modal">Open My Modal</ModalButton>
    <ModalContainer />
  </>
);
