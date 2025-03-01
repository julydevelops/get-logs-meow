import fs from 'fs/promises';

// ENHANCEMENT: Make chunk side configurable/dynamic
const CHUNK_SIZE = 8192;

/**
 * This function reads a file from the end
 * looking for lines containing a given search term. 
 * 
 * Returns up to maxMatches lines, newest first.
 */
export const tailSearch = async (
  logPath: string,
  maxMatches: number,
  searchTerm?: string
): Promise<string[]> => {
  // Get file stats to know its size
  const stats = await fs.stat(logPath);
  let fileSize = stats.size;

  const fd = await fs.open(logPath, 'r');

  try {
    const matchedLines: string[] = [];
    let leftover = '';

    while (fileSize > 0 && matchedLines.length < maxMatches) {
      const readSize = Math.min(CHUNK_SIZE, fileSize);
      const startPos = fileSize - readSize;

      // Read the chunk into a buffer
      const buffer = Buffer.alloc(readSize);
      await fd.read(buffer, 0, readSize, startPos);

      let chunkData = buffer.toString('utf8');

      // Merge leftover data with this chunk (so lines get reconstructed properly)
      chunkData += leftover;

      // Split on newline, then reverse so lines are in newest-first order
      let lines = chunkData.split('\n');
      lines.reverse();

      // The first reversed line might be incomplete. leftover for next iteration
      leftover = lines.pop() || '';

      // Filter lines
      for (const line of lines) {
        if (!searchTerm || line.includes(searchTerm)) {
          matchedLines.push(line);
          if (matchedLines.length >= maxMatches) {
            break;
          }
        }
      }

      // Move to the chunk before this one
      fileSize -= readSize;
    }

    // If leftover is a complete line after finishing the loop, we could check it:
    if (leftover && matchedLines.length < maxMatches) {
      if (!searchTerm || leftover.includes(searchTerm)) {
        matchedLines.push(leftover);
      }
    }

    return matchedLines;
  } finally {
    await fd.close();
  }
}
