import Airtable from 'airtable';
import { config } from '../utils/config.js';

const base = new Airtable({ apiKey: config.airtable.apiKey }).base(config.airtable.baseId);

const mapRecord = (record) => ({ id: record.id, ...record.fields });

export const listRecords = async (table, { filterByFormula, sort, pageSize = 20, offset } = {}) => {
  const records = await base(table)
    .select({ filterByFormula, sort, pageSize, offset })
    .firstPage();
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
