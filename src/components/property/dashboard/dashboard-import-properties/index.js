import React, { useState } from 'react';
import { Modal, Button, Table, Alert, Spinner } from 'react-bootstrap';

/**
 * DashboardImportProperties
 * UI component that allows the admin to import properties from a CSV (comma‑separated) or Excel file.
 * It shows a button that opens a modal, lets the user select a file, displays a preview table,
 * and sends the file to the backend endpoint `/api/propiedades/import`.
 */
const DashboardImportProperties = () => {
  const [show, setShow] = useState(false);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState([]); // array of objects (header -> value)
  const [headers, setHeaders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleClose = () => {
    setShow(false);
    setFile(null);
    setPreview([]);
    setHeaders([]);
    setResult(null);
    setLoading(false);
  };
  const handleShow = () => setShow(true);

  // Simple CSV preview parser (comma delimiter)
  const parseCSV = (text) => {
    const lines = text.trim().split(/\r?\n/);
    if (lines.length === 0) return;
    const hdr = lines[0].split(',').map(h => h.trim());
    const rows = lines.slice(1).map(l => {
      const values = l.split(',').map(v => v.trim());
      const obj = {};
      hdr.forEach((h, i) => {
        obj[h] = values[i] ?? '';
      });
      return obj;
    });
    setHeaders(hdr);
    setPreview(rows);
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;
    setFile(selected);
    // Only preview CSV client‑side; for Excel we rely on backend preview (not implemented)
    if (selected.name.endsWith('.csv')) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        parseCSV(ev.target.result);
      };
      reader.readAsText(selected);
    } else {
      // For .xlsx we will just show file name; preview will be empty
      setHeaders([]);
      setPreview([]);
    }
  };

  const handleImport = async () => {
    if (!file) return;
    setLoading(true);
    setResult(null);
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await fetch('/api/propiedades/import', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        setResult({ type: 'success', text: data.message });
      } else {
        setResult({ type: 'error', text: data.error || 'Error al importar' });
      }
    } catch (err) {
      setResult({ type: 'error', text: err.message });
    }
    setLoading(false);
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>Importar propiedades</Button>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Importar propiedades (CSV o Excel)</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {result && (
            <Alert variant={result.type === 'success' ? 'success' : 'danger'}>{result.text}</Alert>
          )}
          <div className="mb-3">
            <label className="form-label">Selecciona un archivo (CSV con coma o .xlsx)</label>
            <input type="file" className="form-control" accept=".csv,.xlsx" onChange={handleFileChange} />
          </div>
          {preview.length > 0 && headers.length > 0 && (
            <div className="mb-3" style={{ maxHeight: '300px', overflowY: 'auto' }}>
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    {headers.map((h, i) => (<th key={i}>{h}</th>))}
                  </tr>
                </thead>
                <tbody>
                  {preview.slice(0, 10).map((row, idx) => (
                    <tr key={idx}>
                      {headers.map((h, i) => (<td key={i}>{row[h]}</td>))}
                    </tr>
                  ))}
                </tbody>
              </Table>
              <small className="text-muted">Mostrando las primeras 10 filas.</small>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} disabled={loading}>Cancelar</Button>
          <Button variant="primary" onClick={handleImport} disabled={!file || loading}>
            {loading ? (<><Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> Importando...</>) : 'Importar'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DashboardImportProperties;
