import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import authRoutes from './routes/auth.routes.js';
import metricsRoutes from './routes/metrics.routes.js';
import notificationsRoutes from './routes/notifications.routes.js';
import clientesRoutes from './routes/clientes.routes.js';
import solicitudesRoutes from './routes/solicitudes.routes.js';
import citasRoutes from './routes/citas.routes.js';
import inmueblesRoutes from './routes/inmuebles.routes.js';
import { errorHandler } from './middleware/error.middleware.js';

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.use('/auth', authRoutes);
app.use('/metrics', metricsRoutes);
app.use('/notificaciones', notificationsRoutes);
app.use('/clientes', clientesRoutes);
app.use('/solicitudes', solicitudesRoutes);
app.use('/citas', citasRoutes);
app.use('/inmuebles', inmueblesRoutes);

app.use(errorHandler);

export default app;
