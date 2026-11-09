import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.dirname(fileURLToPath(import.meta.url));
const file = path.join(root,'index.html');
let html = await fs.readFile(file,'utf8');
html = html.replace(/\n?<!-- Embedded data start -->[\s\S]*?<!-- Embedded data end -->\n?/,'\n');
const entries = await Promise.all(['evidence','es'].map(async name => {
  const json = JSON.parse((await fs.readFile(path.join(root,`assets/${name}.json`),'utf8')).replace(/^\uFEFF/,''));
  return `<script id="embedded-${name}" type="application/json">${JSON.stringify(json).replace(/</g,'\\u003c')}</script>`;
}));
html = html.replace('</body>',`<!-- Embedded data start -->\n${entries.join('\n')}\n<!-- Embedded data end -->\n</body>`);
await fs.writeFile(file,html,'utf8');
console.log('Embedded evidence and translations updated.');
