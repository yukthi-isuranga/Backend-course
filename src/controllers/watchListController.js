import { prisma } from '../config/db.js';

const addToWatchList = async (req, res) => {
  //   console.log('Received request body:', req.body); // Log the incoming request body
  const { movieId, status, rating, notes, userId } = await req.body;

  //veryfy if the movieId is valid and exists in the database
  const movie = await prisma.movie.findUnique({
    where: { id: movieId },
  });
  if (!movie) {
    return res.status(404).json({ error: 'Movie not found' });
  }

  //check allready exists in the user's watch list
  const existingEntry = await prisma.watchList.findUnique({
    where: {
      userId_movieId: {
        userId,
        movieId,
      },
    },
  });

  // if already exists in the watch list, return an error response
  if (existingEntry) {
    return res.status(400).json({ error: 'Movie already in watch list' });
  }

  const watchListEntry = await prisma.watchList.create({
    data: {
      userId,
      movieId,
      status: status || 'PLANNED', // Default to PLANNED if not provided
      rating,
      notes,
    },
  });

  res
    .status(201)
    .json({ message: 'Movie added to watch list', watchListEntry });
};

export { addToWatchList };
