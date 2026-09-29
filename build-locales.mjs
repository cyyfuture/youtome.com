import './build.mjs';
import fs from 'node:fs';
import path from 'node:path';
import {locales} from './locales/registry.mjs';
import {siteOrigin,siteOutputDir} from './site-config.mjs';

const dist=siteOutputDir;
const origin=siteOrigin;
const sourceDist=path.resolve('dist');
if(dist!==sourceDist){
  fs.mkdirSync(dist,{recursive:true});
  fs.cpSync(path.join(sourceDist,'assets'),path.join(dist,'assets'),{recursive:true});
  for(const asset of ['styles.css','app.js','favicon.svg'])fs.copyFileSync(path.join(sourceDist,asset),path.join(dist,asset));
}
const pages=[];
const missing=new Map(locales.filter(locale=>locale.dict).map(locale=>[locale.code,new Set()]));
const productNames=new Set(['Capsule One','Capsule Panorama','Capsule Grand','Apple Studio','Apple Living','Expandable One']);
function intentionallyUntranslated(value){return value==='YOUTOME'||value==='BFC CHINA · 百福中国'||productNames.has(value)||value==='you@example.com'||value==='width=device-width,initial-scale=1'||value==='website'||value==='summary_large_image'||/^https?:\/\//.test(value)||/^#[0-9a-f]{6}$/i.test(value)}
const localeFolders=new Set(locales.map(locale=>locale.prefix.slice(1)).filter(Boolean));
function collect(dir){
  for(const item of fs.readdirSync(dir,{withFileTypes:true})){
    if(dir===dist && localeFolders.has(item.name)) continue;
    const file=path.join(dir,item.name);
    if(item.isDirectory()) collect(file);
    else if(item.name==='index.html') pages.push(file);
  }
}
collect(dist);

function translationFor(value,locale){
  if(locale.dict[value]) return locale.dict[value];
  const names=[...productNames];
  if(value.startsWith('Concept visualization of ')) return locale.phrases.image(value.slice(25).replace(/ prefab home$/,''));
  if(value.startsWith('Explore ') && value.includes('YOUTOME prefab home concept')) return locale.phrases.concept(value.slice(8,value.indexOf(', a YOUTOME')));
  if(value.startsWith('Explore ') && names.some(name=>value===`Explore ${name}`)) return locale.phrases.view(value.slice(8));
  if(/[A-Za-z]/.test(value) && !intentionallyUntranslated(value)) missing.get(locale.code).add(value);
  return value;
}

function translateHtml(html,locale){
  html=html.replace(/>([^<>]+)</g,(whole,raw)=>{
    const lead=raw.match(/^\s*/)[0],tail=raw.match(/\s*$/)[0],value=raw.trim();
    return value?`>${lead}${translationFor(value,locale)}${tail}<`:whole;
  });
  return html.replace(/(alt|aria-label|placeholder|content)="([^"]+)"/g,(whole,name,value)=>`${name}="${translationFor(value,locale)}"`);
}

function languageMenu(current,pathname){
  const links=locales.map(locale=>`<a href="${locale.prefix}${pathname}" lang="${locale.htmlLang}" ${locale.code===current.code?'aria-current="page"':''}>${locale.label}</a>`).join('');
  const label={kk:'Тілді таңдау',ru:'Выбрать язык',en:'Choose language',zh:'选择语言',es:'Elegir idioma',ar:'اختر اللغة',fr:'Choisir la langue',tr:'Dil seçin',de:'Sprache wählen',pt:'Escolher idioma',uz:'Tilni tanlang',ko:'언어 선택',ja:'言語を選択'}[current.code];
  return `<details class="language-switch"><summary aria-label="${label}">${current.label}<span aria-hidden="true">⌄</span></summary><div class="language-options">${links}</div></details>`;
}

function finish(html,locale,pathname){
  if(locale.dict) html=translateHtml(html,locale);
  html=html.replace('<html lang="en">',`<html lang="${locale.htmlLang}"${locale.dir?` dir="${locale.dir}"`:''}>`);
  if(locale.code==='ar') html=html.replace('</head>','<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;500;600;700;800&display=swap" rel="stylesheet"></head>');
  if(locale.prefix) html=html.replace(/href="\/(?!assets\/|styles\.css|favicon\.svg|app\.js)([^"]*)"/g,(_,rest)=>`href="${locale.prefix}/${rest}"`);
  const alternates=locales.map(item=>`<link rel="alternate" hreflang="${item.hreflang}" href="${origin}${item.prefix}${pathname}">`).join('');
  html=html.replace(/<link rel="canonical" href="[^"]+">/,`<link rel="canonical" href="${origin}${locale.prefix}${pathname}">${alternates}<link rel="alternate" hreflang="x-default" href="${origin}${pathname}">`);
  html=html.replace('</head>',`<meta property="og:url" content="${origin}${locale.prefix}${pathname}"><meta property="og:locale" content="${locale.htmlLang.replace('-','_')}"></head>`);
  return html.replace('<a class="nav-cta"',`${languageMenu(locale,pathname)}<a class="nav-cta"`);
}

const paths=[];
for(const file of pages){
  const relative=path.relative(dist,file).replaceAll('\\','/');
  const pathname=relative==='index.html'?'/':`/${relative.slice(0,-10)}`;
  const english=fs.readFileSync(file,'utf8');
  paths.push(pathname);
  for(const locale of locales){
    const output=locale.prefix?path.join(dist,locale.prefix.slice(1),relative):file;
    fs.mkdirSync(path.dirname(output),{recursive:true});
    fs.writeFileSync(output,finish(english,locale,pathname));
  }
}

const sitemapEntries=paths.flatMap(pathname=>locales.map(locale=>{
  const alternates=locales.map(item=>`<xhtml:link rel="alternate" hreflang="${item.hreflang}" href="${origin}${item.prefix}${pathname}"/>`).join('');
  return `<url><loc>${origin}${locale.prefix}${pathname}</loc>${alternates}</url>`;
})).join('');
fs.writeFileSync(path.join(dist,'sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${sitemapEntries}</urlset>`);
const untranslated=[...missing].flatMap(([code,values])=>[...values].map(value=>`${code}: ${value}`));
if(untranslated.length) throw new Error(`Untranslated strings (${untranslated.length}):\n${untranslated.join('\n')}`);
console.log(`Built ${pages.length} pages in ${locales.length} languages`);
