import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';
const root=path.dirname(fileURLToPath(import.meta.url));
for(const page of ['index.html','projects/financial-rag.html']){
 const html=await fs.readFile(path.join(root,page),'utf8');
 const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(x=>x[1]);
 assert.equal(new Set(ids).size,ids.length,`Duplicate ids: ${page}`);
 for(const [,link] of html.matchAll(/\b(?:src|href)="([^"]+)"/g)){
  if(/^(https?:|mailto:|data:)/.test(link))continue;
  const [url,fragment]=link.split('#');
  const target=path.resolve(root,path.dirname(page),url.split('?')[0]||path.basename(page));
  await fs.access(target);
  if(fragment&&path.extname(target)==='.html'){
   const body=await fs.readFile(target,'utf8');
   assert(body.includes(`id="${fragment}"`),`Missing anchor: ${page} ${link}`);
  }
 }
}
const html=await fs.readFile(path.join(root,'index.html'),'utf8');
const es=JSON.parse((await fs.readFile(path.join(root,'assets/es.json'),'utf8')).replace(/^\uFEFF/,''));
for(const [,key] of html.matchAll(/data-i="([^"]+)"/g))assert(es[key],`Missing translation: ${key}`);
for(const name of ['es','evidence']){
 const embedded=html.match(new RegExp(`<script id="embedded-${name}" type="application/json">([\\s\\S]*?)</script>`))[1];
 const source=JSON.parse((await fs.readFile(path.join(root,`assets/${name}.json`),'utf8')).replace(/^\uFEFF/,''));
 assert.deepEqual(JSON.parse(embedded),source,`Stale embedded ${name}`);
}
const questions=JSON.parse((await fs.readFile(path.join(root,'assets/rag-evaluation.json'),'utf8')).replace(/^\uFEFF/,''));
assert.equal(questions.length,36);
assert.equal(questions.filter(q=>q.gold?.length).length,32);
console.log('PASS: both pages, local resources, anchors, unique ids, all Spanish translations, embedded data, 36/32 annotated questions.');
