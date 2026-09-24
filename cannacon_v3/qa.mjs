import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const ROOT=path.dirname(fileURLToPath(import.meta.url));
const PUB=path.join(ROOT,'public');
const htmlFiles=[];
function walk(d){for(const n of fs.readdirSync(d)){const p=path.join(d,n);const st=fs.statSync(p);if(st.isDirectory())walk(p);else if(p.endsWith('.html'))htmlFiles.push(p);}}
walk(PUB);
let broken=[];let dupIds=[];let noCanon=[];let noRobots=[];let wp=[];let jforms=[];
for(const f of htmlFiles){const s=fs.readFileSync(f,'utf8');const rel=path.relative(PUB,f);
 const ids=[...s.matchAll(/\sid="([^"]+)"/g)].map(m=>m[1]);const seen=new Set();for(const id of ids){if(seen.has(id))dupIds.push(`${rel}#${id}`);seen.add(id);}
 if(!/rel="canonical"/.test(s))noCanon.push(rel);if(!/meta name="robots" content="index,follow/.test(s))noRobots.push(rel);
 for(const m of s.matchAll(/(?:href|src)="([^"]+)"/g)){const u=m[1];if(/^https?:|^mailto:|^#|^\/sales|^\/api/.test(u))continue;const clean=u.split('#')[0].split('?')[0];if(!clean)continue;let target=path.resolve(path.dirname(f),clean);if(clean.endsWith('/'))target=path.join(target,'index.html');if(!path.extname(target))target=path.join(target,'index.html');if(!fs.existsSync(target))broken.push(`${rel} -> ${u}`);}
 if(s.includes('wp-content'))wp.push(rel);if(s.includes('form.jotform.com'))jforms.push(rel);
}
const report={htmlPages:htmlFiles.length,brokenLocalRefs:broken,duplicateIds:dupIds,missingCanonical:noCanon,missingIndexRobots:noRobots,wordpressContingencyPages:wp,jotformLinkedPages:jforms,workerSyntax:'checked separately'};
fs.writeFileSync(path.join(ROOT,'docs/QA_RESULTS.json'),JSON.stringify(report,null,2));
fs.writeFileSync(path.join(ROOT,'docs/QA_RESULTS.md'),`# QA Results\n\n- HTML pages: ${htmlFiles.length}\n- Broken local references: ${broken.length}\n- Duplicate IDs: ${dupIds.length}\n- Missing canonical tags: ${noCanon.length}\n- Missing production robots meta: ${noRobots.length}\n- Pages retaining temporary WordPress media/editorial contingencies: ${wp.length}\n- Pages linked to Jotform: ${jforms.length}\n\n## Broken references\n${broken.length?broken.map(x=>`- ${x}`).join('\n'):'None.'}\n\n## Notes\nThis is static/source QA. A networked browser accessibility and checkout acceptance run is still required before production cutover.\n`);
if(broken.length||dupIds.length||noCanon.length||noRobots.length){console.error(JSON.stringify(report,null,2));process.exit(1);}console.log(JSON.stringify(report,null,2));
