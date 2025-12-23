import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { createCliente, getClientes, updateCliente } from '../controllers/clientes.controller.js';

const router = Router();

router.use(authMiddleware);
router.get('/', getClientes);
router.post('/', createCliente);
router.patch('/:id', updateCliente);

export default router;
