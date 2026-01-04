import Airtable from 'airtable';
import { config } from '../utils/config.js';

const base = new Airtable({ apiKey: config.airtable.apiKey }).base(config.airtable.baseId);

const mapRecord = (record) => ({ id: record.id, ...record.fields });

export const listRecords = async (
  table,
  { filterByFormula, sort, pageSize = 20, offset } = {}
) => {
  const selectOptions = {};

  // Solo incluir si es string no vacía
  if (typeof filterByFormula === "string" && filterByFormula.trim() !== "") {
    selectOptions.filterByFormula = filterByFormula;
  }

  // sort si viene bien formado
  if (Array.isArray(sort) && sort.length) {
    selectOptions.sort = sort;
  }

  // pageSize como número
  if (pageSize !== undefined && pageSize !== null) {
    const ps = Number(pageSize);
    if (Number.isFinite(ps)) selectOptions.pageSize = ps;
  }

  // offset: inclúyelo solo si existe (y si es numérico conviértelo)
  if (offset !== undefined && offset !== null && offset !== "") {
    const offNum = Number(offset);
    selectOptions.offset = Number.isFinite(offNum) ? offNum : offset;
  }

  const records = await base(table).select(selectOptions).firstPage();
  return records.map(mapRecord);
};


export const getRecord = async (table, recordId) => {
  const record = await base(table).find(recordId);
  return mapRecord(record);
};

export const createRecord = async (table, fields) => {
  const record = await base(table).create(fields);
  return mapRecord(record);
};

export const updateRecord = async (table, recordId, fields) => {
  const record = await base(table).update(recordId, fields);
  return mapRecord(record);
};
