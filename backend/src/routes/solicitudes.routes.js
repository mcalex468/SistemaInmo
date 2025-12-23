import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { createSolicitud, getSolicitudes, updateSolicitud } from '../controllers/solicitudes.controller.js';

const router = Router();

router.use(authMiddleware);
router.get('/', getSolicitudes);
router.post('/', createSolicitud);
router.patch('/:id', updateSolicitud);

export default router;
