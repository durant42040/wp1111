import { Router } from 'express';
import cors from 'cors';
import ScoreCardRouter from './scoreCard.js';

const router = Router();
router.use(cors());
router.use('/', ScoreCardRouter);
export default router;