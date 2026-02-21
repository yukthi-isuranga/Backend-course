import express from 'express';
import {
  addToWatchList,
  removeFromWatchList,
  updateWatchListItem,
} from '../controllers/watchListController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { addToWatchListSchema } from '../validators/watchListValidators.js';

const watchListRouter = express.Router();

watchListRouter.use(authMiddleware);

watchListRouter.post(
  '/',
  validateRequest(addToWatchListSchema),
  addToWatchList,
);

watchListRouter.delete('/:id', removeFromWatchList);

watchListRouter.patch('/:id', updateWatchListItem);

export default watchListRouter;
