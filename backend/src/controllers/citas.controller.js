import { config } from '../utils/config.js';
import { createRecord, listRecords, updateRecord } from '../services/airtable.service.js';

const buildFilter = (query) => {
  const filters = [];
  ['lead_id', 'inmueble_id', 'estado', 'agente'].forEach(field => {
    if (query[field]) filters.push(`{${field}} = '${query[field]}'`);
  });
  if (query.from) filters.push(`IS_AFTER({fecha_creacion}, '${query.from}')`);
  if (query.to) filters.push(`IS_BEFORE({fecha_creacion}, '${query.to}')`);
  if (query.range === 'upcoming') filters.push(`IS_AFTER({fecha_hora}, TODAY())`);
  if (!filters.length) return undefined;
  return `AND(${filters.join(',')})`;
};

export const getCitas = async (req, res, next) => {
  try {
    const records = await listRecords(config.airtable.tables.citas, {
      filterByFormula: buildFilter(req.query),
      sort: [{ field: 'fecha_hora', direction: 'asc' }]
    });
    res.json(records);
  } catch (error) {
    next(error);
  }
};

export const createCita = async (req, res, next) => {
  try {
    const created = await createRecord(config.airtable.tables.citas, req.body);
    res.status(201).json(created);
  } catch (error) {
    next(error);
  }
};

export const updateCita = async (req, res, next) => {
  try {
    const updated = await updateRecord(config.airtable.tables.citas, req.params.id, req.body);
    res.json(updated);
  } catch (error) {
    next(error);
  }
};
