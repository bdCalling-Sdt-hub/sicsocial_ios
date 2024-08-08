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
    category: 'Comic',
    title : "Educated a memoir",
  publisher : "UAE Book Publications",
    image: require('../assets/tempAssets/book.jpg'),
  },
  {
    id: 2,
    category: 'Way of Life',
    title : "The Quran (Arabic, English)",
    publisher : "World publication ltd.",
    image: require('../assets/tempAssets/book3.jpg'),
  },
  {
    id: 3,
    category: 'Business',
    title : "The Quran (Arabic, English)",
    publisher : "World publication ltd.",
    image: require('../assets/tempAssets/book2.jpg'),
  },
  {
    id: 4,
    category: 'Econimic',
    title : "The Quran (Arabic, English)",
    publisher : "World publication ltd.",
    image: require('../assets/tempAssets/book4.jpg'),
  },
  {
    id: 5,
    category: 'Joke',
    title : "The Quran (Arabic, English)",
    publisher : "World publication ltd.",
    image: require('../assets/tempAssets/book5.jpg'),
  },
];
