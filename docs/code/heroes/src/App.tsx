import React, { useState } from 'react';
import { useProvide } from '@impress/react';

type Hero = {
  name: string;
}

class Heroes {
  store = [] as Hero[];
  add(hero: Hero) {
    this.store = [ ...this.store, hero ];
  }
}

export const App = () => {
  const [name, setName] = useState('Isaac Newton');
  const heroes = useProvide(Heroes);
  return (
    <>
      <ul>
        {heroes.store.map((hero) =>(
          <li>{hero.name}</li>
        ))}
      </ul>
      Type heroes name and press enter<br/>
      <input
        autoFocus
        onKeyDown={(e) => {
          if (e.keyCode === 13) {
            heroes.add({ name });
            setName('');
          }
        }}
        onChange={(e) => setName(e.target.value)}
        value={name} />
    </>
  );
};
