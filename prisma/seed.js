import 'dotenv/config';
import { PrismaClient } from '../src/generated/prisma/index.js';
import { PrismaNeon } from '@prisma/adapter-neon';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is not set in the environment');
}

const adapter = new PrismaNeon({ connectionString });

const prisma = new PrismaClient({
  adapter,
  log: ['error'],
});

const creatorID = 'bd2f6567-bb51-4884-80db-38d88222ffb9';

const movies = [
  {
    title: 'Inception',
    overview:
      'A skilled thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.',
    releaseYear: 2010,
    genres: ['Sci-Fi', 'Action', 'Thriller'],
    runtime: 148,
    posterUrl:
      'https://image.tmdb.org/t/p/w500/8IB2e4r4oVhHnANbnm7O3Tj6tF8.jpg',
    createdBy: creatorID,
  },
  {
    title: 'The Dark Knight',
    overview:
      'Batman faces the Joker, a criminal mastermind who plunges Gotham City into chaos and tests the hero’s resolve.',
    releaseYear: 2008,
    genres: ['Action', 'Crime', 'Drama'],
    runtime: 152,
    posterUrl:
      'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
    createdBy: creatorID,
  },
  {
    title: 'Interstellar',
    overview:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    releaseYear: 2014,
    genres: ['Sci-Fi', 'Adventure', 'Drama'],
    runtime: 169,
    posterUrl:
      'https://image.tmdb.org/t/p/w500/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg',
    createdBy: creatorID,
  },
  {
    title: 'Parasite',
    overview:
      'A poor family schemes to become employed by a wealthy family, infiltrating their household one by one.',
    releaseYear: 2019,
    genres: ['Drama', 'Thriller'],
    runtime: 132,
    posterUrl:
      'https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg',
    createdBy: creatorID,
  },
  {
    title: 'The Shawshank Redemption',
    overview:
      'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
    releaseYear: 1994,
    genres: ['Drama'],
    runtime: 142,
    posterUrl:
      'https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg',
    createdBy: creatorID,
  },
  {
    title: 'Avengers: Endgame',
    overview:
      "After the devastating events of Infinity War, the Avengers assemble once more to reverse Thanos' actions and restore balance to the universe.",
    releaseYear: 2019,
    genres: ['Action', 'Adventure', 'Sci-Fi'],
    runtime: 181,
    posterUrl:
      'https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg',
    createdBy: creatorID,
  },
  {
    title: 'Joker',
    overview:
      'A mentally troubled comedian embarks on a downward spiral that leads to the creation of an iconic villain.',
    releaseYear: 2019,
    genres: ['Crime', 'Drama', 'Thriller'],
    runtime: 122,
    posterUrl:
      'https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg',
    createdBy: creatorID,
  },
  {
    title: 'The Matrix',
    overview:
      'A computer hacker learns about the true nature of reality and his role in the war against its controllers.',
    releaseYear: 1999,
    genres: ['Sci-Fi', 'Action'],
    runtime: 136,
    posterUrl:
      'https://image.tmdb.org/t/p/w500/aOIuZAjPaRIE6CMzbazvcHuHXDc.jpg',
    createdBy: creatorID,
  },
];

const main = async () => {
  console.log('Seeding database with movies...');
  for (const movie of movies) {
    await prisma.movie.create({
      data: movie,
    });
    console.log(`Created movie: ${movie.title}`);
  }
  console.log('Database seeding completed!');
};

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
