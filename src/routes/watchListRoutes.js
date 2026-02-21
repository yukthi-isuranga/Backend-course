import express from 'express';
import { addToWatchList } from '../controllers/watchListController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const watchListRouter = express.Router();

watchListRouter.use(authMiddleware);

watchListRouter.post('/', addToWatchList);

export default watchListRouter;
