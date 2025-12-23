import { Router } from 'express';
import { login, me, updateMe } from '../controllers/auth.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/login', login);
router.get('/me', authMiddleware, me);
router.patch('/me', authMiddleware, updateMe);

export default router;
