import React from 'react';
import { scopeToPropKey } from './keys';

const Scope = React.createContext();

export const extractCtxFromProps = (props) => {
  return props[scopeToPropKey];
}

export const connectToScope = (ConnectedComponent) => (
  (props) => (
    <Scope.Consumer>
      {(ctx) => (
        <ConnectedComponent
          {...props}
          {...{[scopeToPropKey]: ctx}}
        />
      )}
    </Scope.Consumer>
  )
)

const ctx = (ctor) => {
  const inst = new ctor(ctx);
  console.log('ctx', ctor, inst);
  return inst;
}

export const Provider = ({ children }) => (
  <Scope.Provider value={ctx}>
    {children}
  </Scope.Provider>
)
