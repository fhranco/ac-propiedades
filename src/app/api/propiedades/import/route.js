// src/app/api/propiedades/import/route.js
import { promises as fs } from 'fs';
import path from 'path';
import * as xlsx from 'xlsx';

const dbFilePath = path.join(process.cwd(), 'local_db', 'propiedades.json');

function slugify(text) {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // spaces to -
    .replace(/&/g, '-y-') // & to y
    .replace(/[^a-z0-9-]/g, '') // keep alphanumeric and -
    .replace(/--+/g, '-');
}

/**
 * POST /api/propiedades/import
 * Accepts a CSV (comma delimited) or XLSX file and bulk imports properties.
 * Expected multipart/form-data with field "file".
 */
export async function POST(request) {
  try {
    const contentType = request.headers.get('content-type') || '';
    const buffer = Buffer.from(await request.arrayBuffer());
    let records = [];

    if (contentType.includes('text/csv') || contentType.includes('.csv')) {
      const csvString = buffer.toString('utf8');
      await new Promise((resolve, reject) => {
        parse(csvString, { headers: true, delimiter: ',' })
          .on('error', (error) => reject(error))
          .on('data', (row) => records.push(row))
          .on('end', () => resolve());
      });
    } else if (
      contentType.includes('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') ||
      contentType.includes('.xlsx')
    ) {
      const workbook = xlsx.read(buffer, { type: 'buffer' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      records = xlsx.utils.sheet_to_json(sheet);
    } else {
      return new Response(JSON.stringify({ error: 'Unsupported file type' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const fileContent = await fs.readFile(dbFilePath, 'utf8');
    const existing = JSON.parse(fileContent);

    const processed = records
      .map((item) => {
        if (!item.id) return null; // manual ID required
        if (!item.slug && item.title) item.slug = slugify(item.title);
        return item;
      })
      .filter(Boolean);

    const updated = existing.concat(processed);
    await fs.writeFile(dbFilePath, JSON.stringify(updated, null, 2), 'utf8');

    return new Response(
      JSON.stringify({ message: `${processed.length} propiedades importadas correctamente` }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message || 'Import failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
