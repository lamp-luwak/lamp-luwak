import React from 'react';
import { useService, modify, set } from 'lamp-luwak';

type Hero = {
  name: string;
}

class Heroes {
  state = {
    list: [] as Hero[],
    name: 'Isaac Newton'
  };
  append() {
    const { list, name } = this.state;
    set(this, {
      list: list.concat({ name }),
      name: ''
    });
  }
  setName(name: string) {
    modify(this).name = name;
  }
}

export const App = () => {
  const heroes = useService(Heroes);
  return (
    <>
      <ul>
        {heroes.state.list.map((hero) =>(
          <li>{hero.name}</li>
        ))}
      </ul>
      Type heroes name and press enter<br/>
      <input
        autoFocus
        onKeyDown={(e) => {
          if (e.keyCode === 13) {
            heroes.append();
          }
        }}
        onChange={(e) => heroes.setName(e.target.value)}
        value={heroes.state.name} />
    </>
  );
};
