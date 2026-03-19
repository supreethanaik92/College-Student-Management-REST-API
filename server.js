const http = require('http');
const router = require('./routes/studentRoutes');

const PORT = process.env.PORT || 4000;

const server = http.createServer((req, res) => {
  router(req, res);
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
