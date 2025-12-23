import { config } from '../utils/config.js';
import { listRecords } from './airtable.service.js';

const isWithinRange = (dateStr, range) => {
  if (!dateStr) return false;
  const date = new Date(dateStr);
  const now = new Date();
  const start = new Date();

  if (range === 'today') {
    start.setHours(0, 0, 0, 0);
  } else if (range === 'week') {
    const day = start.getDay();
    const diff = start.getDate() - day + (day === 0 ? -6 : 1);
    start.setDate(diff);
    start.setHours(0, 0, 0, 0);
  } else if (range === 'month') {
    start.setDate(1);
    start.setHours(0, 0, 0, 0);
  } else {
    return false;
  }
  return date >= start && date <= now;
};

export const getMetrics = async (range = 'today') => {
  const clientes = await listRecords(config.airtable.tables.clientes, {});
  const solicitudes = await listRecords(config.airtable.tables.solicitudes, {});
  const citas = await listRecords(config.airtable.tables.citas, {});

  const leadsNuevos = clientes.filter(c => isWithinRange(c.fecha_creacion, range)).length;
  const leadsCualificados = clientes.filter(c => ['cualificando', 'visita agendada', 'en seguimiento', 'cerrado'].includes((c.estado_lead || '').toLowerCase())).length;
  const solicitudesNuevas = solicitudes.filter(s => isWithinRange(s.fecha_creacion, range)).length;
  const citasCreadas = citas.filter(c => isWithinRange(c.fecha_creacion, range)).length;
  const citasConfirmadas = citas.filter(c => c.estado === 'confirmada' && isWithinRange(c.fecha_hora, range)).length;

  const pendientesAccion = clientes.filter(c => ['alta', 'media'].includes((c.prioridad || '').toLowerCase()) && ['nuevo', 'cualificando'].includes((c.estado_lead || '').toLowerCase())).length
    + solicitudes.filter(s => ['alta'].includes((s.prioridad || '').toLowerCase()) && ['abierta', 'en proceso'].includes((s.estado || '').toLowerCase())).length
    + citas.filter(c => (c.estado || '').toLowerCase() === 'propuesta' && (() => {
      if (!c.fecha_hora) return false;
      const fecha = new Date(c.fecha_hora);
      const now = new Date();
      const diffHours = (fecha - now) / (1000 * 60 * 60);
      return diffHours <= 48 && diffHours >= 0;
    })()).length;

  const interaccionesEstimadas = leadsNuevos + solicitudesNuevas + citasCreadas;
  const minutosAhorrados = interaccionesEstimadas * config.metrics.minutosPorInteraccion;
  const eurosAhorrados = (minutosAhorrados / 60) * config.metrics.costeHoraHumano;

  return {
    leads_nuevos: leadsNuevos,
    leads_cualificados: leadsCualificados,
    solicitudes_nuevas: solicitudesNuevas,
    citas_creadas: citasCreadas,
    citas_confirmadas: citasConfirmadas,
    pendientes_accion: pendientesAccion,
    minutos_ahorrados: Math.round(minutosAhorrados),
    euros_ahorrados: Math.round(eurosAhorrados)
  };
};
