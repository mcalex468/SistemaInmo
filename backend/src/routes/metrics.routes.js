import { Router } from 'express';
import { fetchMetrics } from '../controllers/metrics.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/', authMiddleware, fetchMetrics);

export default router;
