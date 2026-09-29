import path from 'node:path';

const defaultOrigin='https://youtome-living.codex-super-2800.chatgpt.site';
export const siteOrigin=(process.env.YOUTOME_SITE_ORIGIN || defaultOrigin).replace(/\/+$/,'');
export const siteOutputDir=path.resolve(process.env.YOUTOME_OUTPUT_DIR || 'dist');

const parsed=new URL(siteOrigin);
if(parsed.protocol!=='https:' || parsed.origin!==siteOrigin) {
  throw new Error('YOUTOME_SITE_ORIGIN must be an HTTPS origin without a path or query.');
}
