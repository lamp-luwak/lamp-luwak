import { NextApiResponse } from 'next'

const Data = [
  {
    id: 11,
    name: 'Maxwell Smart',
    saying: 'Missed it by that much.'
  },
  {
    id: 12,
    name: 'Bullwinkle J. Moose',
    saying: 'Watch me pull a rabbit out of a hat.'
  },
  {
    id: 13,
    name: 'Muhammad Ali',
    saying: 'Float like a butterfly, sting like a bee.'
  },
  {
    id: 14,
    name: 'Eleanor Roosevelt',
    saying: 'No one can make you feel inferior without your consent.'
  }
];

export default (_: unknown, res: NextApiResponse) => {
  res.status(200).json(Data)
}
