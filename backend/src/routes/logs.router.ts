import { Router, Response, NextFunction } from 'express';

import { readLogs } from '../controllers/logs.controller';
import { LogsRequest } from './logs.router.types';

const router = Router();

/**
 * GET /logs
 *   Query params:
 *    - filename: which log file in /var/log to read
 *    - search:   optional keyword to filter lines
 *    - limit:    optional number of matched lines
 *
 * Example:
 *   GET /logs?filename=syslog&search=error&limit=20
 */
router.get('/', async (req: LogsRequest, res: Response, next: NextFunction) => {
  try {
    // Assuming that we may want defaults for the limit and filename if they're not provided
    const { filename = 'syslog', search, limit = '10' } = req.query;
    const limitNum = parseInt(limit, 10);

    const lines = await readLogs(filename, limitNum, search);

    res.status(200).json({ data: lines });
  } catch (error: any) {
    next(error);
  }
});

export default router;
