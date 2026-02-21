import express from 'express';
import {
  addToWatchList,
  removeFromWatchList,
} from '../controllers/watchListController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const watchListRouter = express.Router();

watchListRouter.use(authMiddleware);

watchListRouter.post('/', addToWatchList);

watchListRouter.delete('/:id', removeFromWatchList);

export default watchListRouter;
