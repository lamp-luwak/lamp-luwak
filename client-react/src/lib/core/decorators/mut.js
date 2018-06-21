import React from 'react';

export const mut = (Prototype, property) => {
  const isReactComponent = Prototype instanceof React.Component;

  if (!Prototype.__mutSubscribe && !isReactComponent) {
    Object.assign(Prototype, {
      __mutSubscribe(updater) {
        const updaters = this.__mutUpdaters = this.__mutUpdaters || new Map();
        updaters.set(updater, updater);
        return () => {
          updaters.delete(updater);
        };
      },
      __mutNotify() {
        if (this.__mutUpdaters) {
          for (let [updater] of this.__mutUpdaters) {
            updater();
          }
        }
      }
    });
  }

  return {
    get() {
      if (this.__mutValues) {
        return this.__mutValues[property];
      }
    },
    set(value) {
      const values = this.__mutValues = this.__mutValues || {};
      if (values[property] !== value) {
        values[property] = value;

        if (isReactComponent) {
          this.forceUpdate();
        } else {
          this.__mutNotify();
        }
      }
    },
    configurable: false,
    enumerable: true
  }
};
