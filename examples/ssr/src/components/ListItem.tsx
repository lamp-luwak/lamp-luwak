import React, { FC } from 'react'
import { Hero } from '../services/HeroList/Hero';

type Props = {
  item: Hero
}

export const ListItem: FC<Props> = ({ item }) => {
  const { id, name, saying } = item.store;
  return (
    <div>
      {id}: {name}
      <pre>"{saying}"</pre>
    </div>
  )
}
