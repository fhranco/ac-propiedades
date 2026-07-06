import { promises as fs } from 'fs';
import path from 'path';

const dbFilePath = path.join(process.cwd(), 'local_db', 'agencias.json');

export async function GET() {
  try {
    const data = await fs.readFile(dbFilePath, 'utf8');
    return new Response(data, { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Failed to read agencies' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}

export async function POST(request) {
  try {
    const newData = await request.json();
    const fileContent = await fs.readFile(dbFilePath, 'utf8');
    const agencies = JSON.parse(fileContent);
    const updated = Array.isArray(newData) ? agencies.concat(newData) : [...agencies, newData];
    await fs.writeFile(dbFilePath, JSON.stringify(updated, null, 2), 'utf8');
    return new Response(JSON.stringify({ message: 'Agency(s) added' }), { status: 201, headers: { 'Content-Type': 'application/json' } });
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Failed to add agency' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}

export async function PUT(request) {
  try {
    const { id, updates } = await request.json();
    const fileContent = await fs.readFile(dbFilePath, 'utf8');
    const agencies = JSON.parse(fileContent);
    const index = agencies.findIndex((a) => a.id === id);
    if (index === -1) {
      return new Response(JSON.stringify({ error: 'Agency not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
    }
    agencies[index] = { ...agencies[index], ...updates };
    await fs.writeFile(dbFilePath, JSON.stringify(agencies, null, 2), 'utf8');
    return new Response(JSON.stringify(agencies[index]), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Failed to update agency' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();
    const fileContent = await fs.readFile(dbFilePath, 'utf8');
    const agencies = JSON.parse(fileContent);
    const filtered = agencies.filter((a) => a.id !== id);
    await fs.writeFile(dbFilePath, JSON.stringify(filtered, null, 2), 'utf8');
    return new Response(JSON.stringify({ message: 'Agency deleted' }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Failed to delete agency' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
