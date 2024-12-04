/**
 * Alcuni post dovranno rimanere senza immagine, quindi avere la proprietà image = undefined
 */

export const posts = [
  {
    id: 1,
    title: 'Post 1',
    image: 'https://picsum.photos/600/400' /* compila questo campo */,
    content: 'contenuto testo blog article 1',
    tags: ['html', 'css'],
    published: true,
  },
  {
    id: 2,
    title: 'Post 2',
    image: '' /* compila questo campo */,
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit animi unde quasi enim non esse ratione voluptas voluptate, officiis veritatis magni blanditiis possimus nobis cum id inventore corporis deserunt hic.',
    tags: ['js', 'css'],
    published: true,
  },
  {
    id: 3,
    title: 'Post 3',
    image: 'https://picsum.photos/700/400' /* compila questo campo */,
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit animi unde quasi enim non esse ratione voluptas voluptate, officiis veritatis magni blanditiis possimus nobis cum id inventore corporis deserunt hic.',
    tags: ['js', 'php'],
    published: true,
  },
  {
    id: 4,
    title: 'Post 4',
    image: 'https://picsum.photos/500/400' /* compila questo campo */,
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit animi unde quasi enim non esse ratione voluptas voluptate, officiis veritatis magni blanditiis possimus nobis cum id inventore corporis deserunt hic.',
    tags: ['html'],
    published: false,
  },
];
