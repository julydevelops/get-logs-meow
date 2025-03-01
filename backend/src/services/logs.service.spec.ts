import fs from 'fs';
import path from 'path';
import { tailSearch } from './logs.service'; // Adjust import based on your folder structure

describe('Logs Service', () => {
  describe('tailSearch', () => {
    const testFile = path.join(__dirname, 'test.log');

    beforeAll(() => {
      // If needed, ensure testFile doesn't exist from previous runs
      if (fs.existsSync(testFile)) {
        fs.unlinkSync(testFile);
      }
    });

    afterEach(() => {
      // Clean up after each test if you want a fresh slate
      if (fs.existsSync(testFile)) {
        fs.unlinkSync(testFile);
      }
    });

    it('should returns all lines in reverse order', async () => {
      // Write a small test file
      fs.writeFileSync(testFile, 'line1\nline2\nline3\nline4');

      const result = await tailSearch(testFile, 10);

      expect(result).toEqual(['line4', 'line3', 'line2', 'line1']);
    });

    it('should filters lines that contain the search term', async () => {
      fs.writeFileSync(testFile, `line1 foo\nline2 bar\nline3 foo\nline4 bar`);

      const result = await tailSearch(testFile, 10, 'foo');

      console.log(result);

      expect(result).toEqual(['line3 foo', 'line1 foo']);
    });

    it('should respects limit', async () => {
      fs.writeFileSync(testFile, 'A\nB\nC\nD\nE');

      const result = await tailSearch(testFile, 2);

      expect(result).toEqual(['E', 'D']);
    });

    it('should handled empty files without error', async () => {
      fs.writeFileSync(testFile, '');

      const result = await tailSearch(testFile, 5);

      expect(result).toEqual([]);
    });
  });
});
