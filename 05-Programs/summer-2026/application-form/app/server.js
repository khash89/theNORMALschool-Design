// Minimal static server for previewing the summer application form.
// Root is hardcoded to avoid process.cwd() (blocked in the preview sandbox).
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = '/Users/khash/Documents/Claude/Projects/theNORMALschool Design/05-Programs/summer-2026/application-form/app';
const PORT = 8123;

const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json' };

http.createServer((req, res) => {
  let urlPath = decodeURIComponent(req.url.split('?')[0]);
  if (urlPath === '/') urlPath = '/index.html';
  const filePath = path.join(ROOT, urlPath);
  if (!filePath.startsWith(ROOT)) { res.writeHead(403); res.end('Forbidden'); return; }
  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found'); return; }
    res.writeHead(200, { 'Content-Type': TYPES[path.extname(filePath)] || 'application/octet-stream' });
    res.end(data);
  });
}).listen(PORT, () => console.log('Serving on http://localhost:' + PORT));
