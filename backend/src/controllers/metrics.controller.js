import { getMetrics } from '../services/metrics.service.js';

export const fetchMetrics = async (req, res, next) => {
  try {
    const data = await getMetrics(req.query.range || 'today');
    res.json(data);
  } catch (error) {
    next(error);
  }
};
