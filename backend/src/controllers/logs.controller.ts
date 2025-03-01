import fs from 'fs';
import path from 'path';

import { tailSearch } from '../services/logs.service';

/**
 * Reads log lines from the specified file and returns matching lines.
 * 
 * @param filename The filename in /var/log to read (e.g., 'syslog')
 * @param searchTerm Optional keyword to filter lines
 * @param limit Maximum number of lines to return
 */
export const readLogs = async (
  filename: string,
  limit: number,
  searchTerm?: string,
): Promise<string[]> => {

  if (!validFilename(filename)) {
    throw new Error('Invalid filename');
  }
  const logPath = path.join('/var/log', path.basename(filename));

  // Validate if the file exists
  if (!fs.existsSync(logPath)) {
    throw new Error('File not found');
  }

  try {
    const results = await tailSearch(logPath, limit, searchTerm);
    return results;
  } catch (error: any) {
    throw new Error(`Error reading logs: ${error.message}`);
  }
};

const validFilename = (filename: string): boolean => {
  return /^[a-zA-Z0-9._-]+$/.test(filename);
}