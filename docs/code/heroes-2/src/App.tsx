import React from 'react';
import { useProvide, modify } from 'lamp-luwak';

type Hero = {
  name: string;
}

class Heroes {
  store = {
    list: [] as Hero[],
    name: 'Isaac Newton'
  };
  append() {
    const { list, name } = this.store;
    this.store = {
      list: list.concat({ name }),
      name: ''
    }
  }
  setName(name: string) {
    modify(this).name = name;
  }
}

const List = React.memo(() => {
  const heroes = useProvide(Heroes);
  return (
    <ul>
      {heroes.store.list.map((hero) =>(
        <li>{hero.name}</li>
      ))}
    </ul>
  );
});

export const App = () => {
  const heroes = useProvide(Heroes);
  return (
    <>
      <List />
      Type heroes name and press enter<br/>
      <input
        autoFocus
        onKeyDown={(e) => {
          if (e.keyCode === 13) {
            heroes.append();
          }
        }}
        onChange={(e) => heroes.setName(e.target.value)}
        value={heroes.store.name} />
    </>
  );
};
