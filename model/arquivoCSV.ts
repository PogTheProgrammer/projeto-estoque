// model/arquivoCSV.ts
import { parse } from 'csv-parse/sync';
import fs from 'fs';
import { Item } from './interfaceData';

export function lerCSV(filePath: string): string[][] {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  return parse(fileContent, { columns: false, skip_empty_lines: true });
}

export function salvarCSV(filePath: string, items: Item[]): void {
  // Example: Convert items to CSV and write to file
  const csv = items.map(item => `${item.id},${item.name},${item.weight},${item.value},${item.quantity},${item.active}`).join('\n');
  fs.writeFileSync(filePath, csv);
}