import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { authorizeRoles } from '../middleware/role.middleware.js';
import { createInmueble, getInmuebles, updateInmueble } from '../controllers/inmuebles.controller.js';

const router = Router();

router.use(authMiddleware);
router.use(authorizeRoles('admin'));
router.get('/', getInmuebles);
router.post('/', createInmueble);
router.patch('/:id', updateInmueble);

export default router;
