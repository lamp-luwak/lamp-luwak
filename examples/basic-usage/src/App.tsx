import React from 'react';
import { set, useService } from 'lamp-luwak';

class CounterService {
  state = 0; // Initial state
  increment() {
    set(this, (state) => state + 1);
  }
  decrement() {
    set(this, (state) => state - 1);
  }
}

const Counter = () => {
  const counter = useService(CounterService);
  return (
    <>
      <button onClick={() => counter.increment()}>+</button>
      <button onClick={() => counter.decrement()}>-</button>
      <p>Counter: {counter.state}</p>
    </>
  )
};

export const App = () => <Counter/>;
