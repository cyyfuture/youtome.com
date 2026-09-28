import fs from 'node:fs';
import path from 'node:path';
import {locales} from './locales/registry.mjs';
const root=path.resolve('dist');
const errors=[];
const htmlFiles=[];
function walk(dir){for(const item of fs.readdirSync(dir,{withFileTypes:true})){const file=path.join(dir,item.name);if(item.isDirectory())walk(file);else if(file.endsWith('.html'))htmlFiles.push(file)}}
walk(root);
function resolveUrl(url){const pathname=new URL(url,'https://example.test').pathname;return path.join(root,pathname,pathname.endsWith('/')?'index.html':'')}
for(const file of htmlFiles){
  const relative=path.relative(root,file).replaceAll('\\','/');
  const pathname=relative==='index.html'?'/':`/${relative.slice(0,-10)}`;
  const matchedLocale=locales.find(locale=>locale.prefix && pathname.startsWith(`${locale.prefix}/`)) || locales[0];
  const expectedLang=matchedLocale.htmlLang;
  const html=fs.readFileSync(file,'utf8');
  const expectedHtmlTag=`<html lang="${expectedLang}"${matchedLocale.dir?` dir="${matchedLocale.dir}"`:''}>`;
  if(!html.includes(expectedHtmlTag))errors.push(`${pathname}: wrong language or direction tag`);
  const canonical=html.match(/<link rel="canonical" href="([^"]+)"/);
  if(!canonical||new URL(canonical[1]).pathname!==pathname)errors.push(`${pathname}: wrong canonical`);
  const openGraphUrl=html.match(/<meta property="og:url" content="([^"]+)"/);
  if(!openGraphUrl||new URL(openGraphUrl[1]).pathname!==pathname)errors.push(`${pathname}: wrong social URL`);
  if(!/<meta property="og:title" content="[^"]+"/.test(html)||!/<meta property="og:description" content="[^"]+"/.test(html))errors.push(`${pathname}: missing social metadata`);
  const socialImage=html.match(/<meta property="og:image" content="([^"]+)"/);
  if(!socialImage||!fs.existsSync(resolveUrl(socialImage[1])))errors.push(`${pathname}: missing social image`);
  for(const alternate of locales.map(locale=>locale.hreflang))if(!html.includes(`hreflang="${alternate}"`))errors.push(`${pathname}: missing ${alternate} alternate`);
  if(!/<title>[^<]+<\/title>/.test(html)||!/<meta name="description" content="[^"]+"/.test(html))errors.push(`${pathname}: missing metadata`);
  for(const m of html.matchAll(/(?:href|src)="(\/[^"]+)"/g)){
    const url=m[1];
    if(url.startsWith('//')||url.startsWith('/#'))continue;
    const target=resolveUrl(url);
    if(!fs.existsSync(target))errors.push(`${pathname}: broken local link ${url}`);
  }
}
const sitemap=fs.readFileSync(path.join(root,'sitemap.xml'),'utf8');
const locs=[...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]);
if(locs.length!==htmlFiles.length)errors.push(`sitemap has ${locs.length} URLs for ${htmlFiles.length} pages`);
for(const url of locs)if(!fs.existsSync(resolveUrl(url)))errors.push(`sitemap missing page ${url}`);
if(errors.length){console.error(errors.join('\n'));process.exit(1)}
console.log(`Verified ${htmlFiles.length} pages, ${locs.length} sitemap URLs, metadata, language alternates and local links.`);
