import { promises as fs } from 'fs';

export const getFileData = async (filePath: string) => {
  const file = await fs.readFile(process.cwd() + filePath, 'utf8');
  const data = JSON.parse(file);
  return data;
};
