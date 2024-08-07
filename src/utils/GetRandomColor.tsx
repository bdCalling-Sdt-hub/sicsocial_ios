export const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const TemBooks = [
  {
    id: 1,
    content: 'All',
    image: require('../assets/tempAssets/book.jpg'),
  },
  {
    id: 2,
    content: 'Way of Life',
    image: require('../assets/tempAssets/book3.jpg'),
  },
  {
    id: 3,
    content: 'Business',
    image: require('../assets/tempAssets/book2.jpg'),
  },
  {
    id: 4,
    content: 'Human Family',
    image: require('../assets/tempAssets/book4.jpg'),
  },
  {
    id: 5,
    content: 'Human Family',
    image: require('../assets/tempAssets/book5.jpg'),
  },
];
