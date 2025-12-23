import { Router } from 'express';
import { getNotifications } from '../controllers/notifications.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/', authMiddleware, getNotifications);

export default router;
