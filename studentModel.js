const fs = require('fs');
const path = require('path');
const { randomUUID } = require('crypto');

const FILE = path.join(__dirname, '../data/students.json');

function readAll() {
  return JSON.parse(fs.readFileSync(FILE, 'utf8'));
}

function writeAll(students) {
  fs.writeFileSync(FILE, JSON.stringify(students, null, 2));
}

function getAll() {
  return readAll();
}

function getById(id) {
  return readAll().find(s => s.id === id) || null;
}

function create(data) {
  const students = readAll();
  const student = {
    id: randomUUID(),
    name: data.name,
    email: data.email,
    course: data.course,
    year: Number(data.year),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  students.push(student);
  writeAll(students);
  return student;
}

function update(id, data) {
  const students = readAll();
  const idx = students.findIndex(s => s.id === id);
  if (idx === -1) return null;
  students[idx] = {
    ...students[idx],
    name: data.name,
    email: data.email,
    course: data.course,
    year: Number(data.year),
    updatedAt: new Date().toISOString(),
  };
  writeAll(students);
  return students[idx];
}

function remove(id) {
  const students = readAll();
  const idx = students.findIndex(s => s.id === id);
  if (idx === -1) return false;
  students.splice(idx, 1);
  writeAll(students);
  return true;
}

module.exports = { getAll, getById, create, update, remove };
