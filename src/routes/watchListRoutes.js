import express from 'express';
import { addToWatchList } from '../controllers/watchListController.js';

const watchListRouter = express.Router();

watchListRouter.post('/', addToWatchList);

export default watchListRouter;
