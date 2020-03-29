import React from 'react'
import { useProvide } from '../lib/core';
import { ListItem } from './ListItem'
import { HeroList } from '../services/HeroList';

export const List = () => {
  const heroList = useProvide(HeroList);
  return (
    <ul>
      {heroList.getList().map(item => (
        <li key={item.store.id}>
          <ListItem item={item} />
        </li>
      ))}
    </ul>
  );
}
