import { config } from '../utils/config.js';
import { createRecord, listRecords, updateRecord } from '../services/airtable.service.js';

const buildFilter = (query) => {
  const filters = [];
  if (query.search) {
    filters.push(`OR(FIND('${query.search}', nombre), FIND('${query.search}', email), FIND('${query.search}', telefono))`);
  }
  if (query.estado_lead) filters.push(`{estado_lead} = '${query.estado_lead}'`);
  if (query.intencion) filters.push(`{intencion} = '${query.intencion}'`);
  if (query.canal) filters.push(`{canal} = '${query.canal}'`);
  if (query.prioridad) filters.push(`{prioridad} = '${query.prioridad}'`);
  if (query.from) filters.push(`IS_AFTER({fecha_creacion}, '${query.from}')`);
  if (query.to) filters.push(`IS_BEFORE({fecha_creacion}, '${query.to}')`);
  if (!filters.length) return undefined;
  return `AND(${filters.join(',')})`;
};

export const getClientes = async (req, res, next) => {
  try {
    const records = await listRecords(config.airtable.tables.clientes, {
      filterByFormula: buildFilter(req.query),
      sort: [{ field: 'fecha_creacion', direction: 'desc' }]
    });
    res.json(records);
  } catch (error) {
    next(error);
  }
};

export const createCliente = async (req, res, next) => {
  try {
    const created = await createRecord(config.airtable.tables.clientes, req.body);
    res.status(201).json(created);
  } catch (error) {
    next(error);
  }
};

export const updateCliente = async (req, res, next) => {
  try {
    const updated = await updateRecord(config.airtable.tables.clientes, req.params.id, req.body);
    res.json(updated);
  } catch (error) {
    next(error);
  }
};
