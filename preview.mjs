import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.dirname(fileURLToPath(import.meta.url));
const mime = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.svg':'image/svg+xml','.jpg':'image/jpeg','.pdf':'application/pdf','.ttf':'font/ttf','.csv':'text/csv; charset=utf-8'};
const server = http.createServer(async (req,res) => {
  try {
    const requestPath = decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    const target = path.resolve(root, '.' + (requestPath === '/' ? '/index.html' : requestPath));
    if (!target.startsWith(root + path.sep)) { res.writeHead(403); res.end(); return; }
    const content = await fs.readFile(target);
    res.writeHead(200, {'Content-Type':mime[path.extname(target)] || 'application/octet-stream','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});
    res.end(content);
  } catch {res.writeHead(404); res.end('Not found');}
});
server.listen(4173,'127.0.0.1',()=>console.log('Portfolio preview: http://127.0.0.1:4173'));
