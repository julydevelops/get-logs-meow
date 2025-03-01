import { Request } from 'express';

interface LogsQuery {
  filename?: string;
  search?: string;
  limit?: string; 
}

export interface LogsRequest extends Request<{}, any, any, LogsQuery> {}
