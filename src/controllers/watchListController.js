import { prisma } from '../config/db.js';

const addToWatchList = async (req, res) => {
  //   console.log('Received request body:', req.body); // Log the incoming request body
  const { movieId, status, rating, notes } = await req.body;

  const userId = req.user.id; // Get the user ID from the authenticated user

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

// Delete a movie from the watch list
const removeFromWatchList = async (req, res) => {
  const { id } = req.params; // Get the watch list entry ID from the URL parameters
  const userId = req.user.id; // Get the user ID from the authenticated user
  // Check if the watch list entry exists and belongs to the user
  const watchListEntry = await prisma.watchList.findUnique({
    where: { id },
  });
  if (!watchListEntry || watchListEntry.userId !== userId) {
    return res.status(404).json({ error: 'Watch list entry not found' });
  }

  // ensure only the owner of the watch list entry can delete it
  if (watchListEntry.userId !== userId) {
    return res.status(403).json({
      error: 'Forbidden, You can only delete your own watch list entries',
    });
  }

  await prisma.watchList.delete({
    where: { id },
  });
  res.json({ message: 'Movie removed from watch list' });
};

// Update a watch list entry (e.g., change status, rating, or notes)
const updateWatchListItem = async (req, res) => {
  const { id } = req.params; // Get the watch list entry ID from the URL parameters
  const { status, rating, notes } = req.body; // Get the updated fields from the request body
  const userId = req.user.id; // Get the user ID from the authenticated user

  // Check if the watch list entry exists and belongs to the user
  const watchListEntry = await prisma.watchList.findUnique({
    where: { id },
  });
  if (!watchListEntry || watchListEntry.userId !== userId) {
    return res.status(404).json({ error: 'Watch list entry not found' });
  }

  // ensure only the owner of the watch list entry can update it
  if (watchListEntry.userId !== userId) {
    return res.status(403).json({
      error: 'Forbidden, You can only update your own watch list entries',
    });
  }

  const updatedEntry = await prisma.watchList.update({
    where: { id },
    data: {
      status,
      rating,
      notes,
    },
  });

  res.json({ message: 'Watch list entry updated', updatedEntry });
};

export { addToWatchList, removeFromWatchList, updateWatchListItem };
