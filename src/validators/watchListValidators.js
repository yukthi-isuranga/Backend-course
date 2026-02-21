import { z } from 'zod';

const addToWatchListSchema = z.object({
  movieId: z.string().uuid(),
  status: z
    .enum(['PLANNED', 'WATCHING', 'COMPLETED', 'DROPPED'], {
      error: () => ({
        message: 'Status must be one of PLANNED, WATCHING, COMPLETED, DROPPED',
      }),
    })
    .optional(),
  rating: z.coerce
    .number()
    .int({
      error: 'Rating must be an integer',
    })
    .min(1, {
      message: 'Rating must be at least 1',
    })
    .max(10, {
      message: 'Rating must be at most 10',
    })
    .optional(),
  notes: z.string().optional(),
});

export { addToWatchListSchema };
