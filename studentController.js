const model = require('../models/studentModel');
const { validateStudent } = require('../utils/validator');

function send(res, status, payload) {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(payload));
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => (body += chunk));
    req.on('end', () => {
      try { resolve(JSON.parse(body || '{}')); }
      catch { reject(new Error('Invalid JSON')); }
    });
  });
}

async function getAllStudents(req, res, query) {
  let students = model.getAll();

  // Filtering by year
  if (query.year) {
    const y = Number(query.year);
    students = students.filter(s => s.year === y);
  }

  send(res, 200, { success: true, data: students });
}

async function getStudent(req, res, id) {
  const student = model.getById(id);
  if (!student) return send(res, 404, { success: false, message: 'Student not found' });
  send(res, 200, { success: true, data: student });
}

async function createStudent(req, res) {
  let body;
  try { body = await parseBody(req); }
  catch { return send(res, 400, { success: false, message: 'Invalid JSON body' }); }

  const error = validateStudent(body);
  if (error) return send(res, 400, { success: false, message: error });

  const student = model.create(body);
  send(res, 201, { success: true, data: student });
}

async function updateStudent(req, res, id) {
  let body;
  try { body = await parseBody(req); }
  catch { return send(res, 400, { success: false, message: 'Invalid JSON body' }); }

  const error = validateStudent(body);
  if (error) return send(res, 400, { success: false, message: error });

  const student = model.update(id, body);
  if (!student) return send(res, 404, { success: false, message: 'Student not found' });
  send(res, 200, { success: true, data: student });
}

async function deleteStudent(req, res, id) {
  const deleted = model.remove(id);
  if (!deleted) return send(res, 404, { success: false, message: 'Student not found' });
  send(res, 200, { success: true, message: 'Student deleted successfully' });
}

module.exports = { getAllStudents, getStudent, createStudent, updateStudent, deleteStudent };
