import { config } from '../utils/config.js';
import { listRecords } from '../services/airtable.service.js';

export const getNotifications = async (req, res, next) => {
  try {
    const [solicitudes, citas, clientes] = await Promise.all([
      listRecords(config.airtable.tables.solicitudes, {}),
      listRecords(config.airtable.tables.citas, {}),
      listRecords(config.airtable.tables.clientes, {})
    ]);

    const now = new Date();
    const notifications = [];

    solicitudes.filter(s => ['urgente', 'alta'].includes((s.urgencia || s.prioridad || '').toLowerCase()) && ['abierta', 'en proceso'].includes((s.estado || '').toLowerCase()))
      .forEach(s => notifications.push({
        tipo: 'solicitud',
        titulo: 'Solicitud urgente',
        descripcion: `Solicitud ${s.request_id || s.id} requiere atención inmediata`,
        fecha: s.fecha_creacion
      }));

    citas.filter(c => (c.estado || '').toLowerCase() === 'confirmada').forEach(c => {
      if (!c.fecha_hora) return;
      const fecha = new Date(c.fecha_hora);
      const diffHours = (fecha - now) / (1000 * 60 * 60);
      if (diffHours <= 48 && diffHours >= 0) {
        notifications.push({
          tipo: 'cita',
          titulo: 'Cita próxima',
          descripcion: `Cita ${c.appointment_id || c.id} confirmada en menos de 48h`,
          fecha: c.fecha_hora
        });
      }
    });

    clientes.filter(c => ['alta'].includes((c.prioridad || '').toLowerCase())).forEach(c => {
      if (!c.ultimo_contacto) {
        notifications.push({
          tipo: 'cliente',
          titulo: 'Cliente sin contacto',
          descripcion: `${c.nombre || c.lead_id} sin contacto reciente`,
          fecha: c.fecha_creacion
        });
        return;
      }
      const ultimo = new Date(c.ultimo_contacto);
      const diffDays = (now - ultimo) / (1000 * 60 * 60 * 24);
      if (diffDays > 7) {
        notifications.push({
          tipo: 'cliente',
          titulo: 'Cliente prioridad alta sin contacto',
          descripcion: `${c.nombre || c.lead_id} lleva ${Math.floor(diffDays)} días sin contacto`,
          fecha: c.ultimo_contacto
        });
      }
    });

    res.json(notifications);
  } catch (error) {
    next(error);
  }
};
