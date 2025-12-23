import { config } from '../utils/config.js';
import { createRecord, listRecords, updateRecord } from '../services/airtable.service.js';

const buildFilter = (query) => {
  const filters = [];
  ['lead_id', 'tipo', 'zona', 'urgencia', 'prioridad', 'estado'].forEach(field => {
    if (query[field]) filters.push(`{${field}} = '${query[field]}'`);
  });
  if (query.from) filters.push(`IS_AFTER({fecha_creacion}, '${query.from}')`);
  if (query.to) filters.push(`IS_BEFORE({fecha_creacion}, '${query.to}')`);
  if (!filters.length) return undefined;
  return `AND(${filters.join(',')})`;
};

export const getSolicitudes = async (req, res, next) => {
  try {
    const records = await listRecords(config.airtable.tables.solicitudes, {
      filterByFormula: buildFilter(req.query),
      sort: [{ field: 'fecha_creacion', direction: 'desc' }]
    });
    res.json(records);
  } catch (error) {
    next(error);
  }
};

export const createSolicitud = async (req, res, next) => {
  try {
    const created = await createRecord(config.airtable.tables.solicitudes, req.body);
    res.status(201).json(created);
  } catch (error) {
    next(error);
  }
};

export const updateSolicitud = async (req, res, next) => {
  try {
    const updated = await updateRecord(config.airtable.tables.solicitudes, req.params.id, req.body);
    res.json(updated);
  } catch (error) {
    next(error);
  }
};
