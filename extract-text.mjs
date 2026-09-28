import fs from 'node:fs';
import path from 'node:path';
import {locales} from './locales/registry.mjs';
const list=[];
const folder=locales.find(locale=>locale.code===process.argv[2])?.prefix.slice(1)||'';
const root=folder?`dist/${folder}`:'dist';
const exclude=new Set(locales.map(locale=>locale.prefix.slice(1)).filter(Boolean));
function walk(dir){for(const item of fs.readdirSync(dir,{withFileTypes:true})){if(dir===root&&root==='dist'&&exclude.has(item.name))continue;const file=path.join(dir,item.name);if(item.isDirectory())walk(file);else if(file.endsWith('.html'))list.push(file)}}
walk(root);
const texts=new Set();
const attributes=new Set();
for(const file of list){
  const html=fs.readFileSync(file,'utf8');
  for(const m of html.matchAll(/>([^<>]+)</g)){const t=m[1].trim();if(t&&/[A-Za-z]/.test(t))texts.add(t)}
  for(const m of html.matchAll(/(?:alt|placeholder|aria-label|content)="([^"]+)"/g)){const t=m[1].trim();if(t&&/[A-Za-z]/.test(t))attributes.add(t)}
}
console.log('TEXT NODES',texts.size);
console.log([...texts].sort().join('\n'));
console.log('\nATTRIBUTES',attributes.size);
console.log([...attributes].sort().join('\n'));
