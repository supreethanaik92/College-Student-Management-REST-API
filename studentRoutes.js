const url = require('url');
const ctrl = require('../controllers/studentController');

function send404(res) {
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ success: false, message: 'Route not found' }));
}

function router(req, res) {
  const parsed = url.parse(req.url, true);
  const pathname = parsed.pathname.replace(/\/$/, '') || '/';
  const query = parsed.query;
  const method = req.method;

  // GET /students  |  POST /students
  if (pathname === '/students') {
    if (method === 'GET') return ctrl.getAllStudents(req, res, query);
    if (method === 'POST') return ctrl.createStudent(req, res);
    return send404(res);
  }

  // GET /students/:id  |  PUT /students/:id  |  DELETE /students/:id
  const match = pathname.match(/^\/students\/([^/]+)$/);
  if (match) {
    const id = match[1];
    if (method === 'GET') return ctrl.getStudent(req, res, id);
    if (method === 'PUT') return ctrl.updateStudent(req, res, id);
    if (method === 'DELETE') return ctrl.deleteStudent(req, res, id);
    return send404(res);
  }

  send404(res);
}

module.exports = router;
