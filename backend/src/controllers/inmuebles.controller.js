import { config } from '../utils/config.js';
import { createRecord, listRecords, updateRecord } from '../services/airtable.service.js';

const buildFilter = (query) => {
  const filters = [];
  if (query.search) filters.push(`OR(FIND('${query.search}', ref), FIND('${query.search}', zona), FIND('${query.search}', direccion_aprox))`);
  ['tipo_operacion', 'tipo_inmueble', 'zona', 'estado'].forEach(field => {
    if (query[field]) filters.push(`{${field}} = '${query[field]}'`);
  });
  if (query.activo) filters.push(`{activo} = ${query.activo === 'true' ? '1' : '0'}`);
  if (query.min_precio) filters.push(`{precio} >= ${query.min_precio}`);
  if (query.max_precio) filters.push(`{precio} <= ${query.max_precio}`);
  if (!filters.length) return undefined;
  return `AND(${filters.join(',')})`;
};

export const getInmuebles = async (req, res, next) => {
  try {
    const records = await listRecords(config.airtable.tables.inmuebles, {
      filterByFormula: buildFilter(req.query),
      sort: [{ field: 'fecha_alta', direction: 'desc' }]
    });
    res.json(records);
  } catch (error) {
    next(error);
  }
};

export const createInmueble = async (req, res, next) => {
  try {
    const created = await createRecord(config.airtable.tables.inmuebles, req.body);
    res.status(201).json(created);
  } catch (error) {
    next(error);
  }
};

export const updateInmueble = async (req, res, next) => {
  try {
    const updated = await updateRecord(config.airtable.tables.inmuebles, req.params.id, req.body);
    res.json(updated);
  } catch (error) {
    next(error);
  }
};
