import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { createCita, getCitas, updateCita } from '../controllers/citas.controller.js';

const router = Router();

router.use(authMiddleware);
router.get('/', getCitas);
router.post('/', createCita);
router.patch('/:id', updateCita);

export default router;
