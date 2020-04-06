import React, { FC } from 'react';
import { useProvide, modify } from 'lamp-luwak';
import { Overlay, Panel, Body, Footer } from './ui';

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

const ModalButton: FC<{ text: string }> = ({ text, children }) => {
  const modal = useProvide(Modal);
  return (
    <button onClick={() => modal.open(text)}>
      {children}
    </button>
  )
};

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
};

export const App = () => (
  <>
    <ModalButton text="My Modal">Open My Modal</ModalButton>
    <ModalContainer />
  </>
);
