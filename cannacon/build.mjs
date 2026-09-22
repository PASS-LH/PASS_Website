/** CannaCon static-site builder. Node.js 20+; no dependencies, secrets, or network calls.
 * Edit content/site.json, then run: node build.mjs
 * Only this cannacon directory is written. Play At Scale files are untouched.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const D = JSON.parse(fs.readFileSync(path.join(ROOT, 'content/site.json'), 'utf8'));
const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const money = v => new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(v);
const date = v => v ? new Date(v+'T12:00:00Z').toLocaleDateString('en-US',{month:'long',day:'numeric',timeZone:'UTC'}) : 'To be announced';
const external = u => /^https?:\/\//.test(u);
const arrow = '<span aria-hidden="true">&#8599;</span>';
let B = '';
const url = p => external(p) || p.startsWith('mailto:') || p.startsWith('#') ? p : B+p;
const link = (p,t,cls='text-link',extras='') => `<a href="${esc(url(p))}" class="${cls}" ${external(p)?'target="_blank" rel="noopener noreferrer"':''} ${extras}>${t}</a>`;
const img = (src,alt,cls='',priority=false) => `<img class="${cls}" src="${esc(url(src))}" alt="${esc(alt)}" width="1200" height="800" ${priority?'fetchpriority="high"':'loading="lazy"'} decoding="async">`;
const logo = () => `<img src="${B}assets/brand/cannacon-wordmark.png" alt="CannaCon" width="1632" height="378">`;
const sectionHead = (eye,title,copy='',action='') => `<div class="section-heading"><div><p class="eyebrow">${eye}</p><h2>${title}</h2>${copy?`<p class="section-intro">${copy}</p>`:''}</div>${action}</div>`;
const pageHead = (eye,title,copy,buttons='') => `<section class="page-hero"><div class="wrap"><p class="eyebrow">${eye}</p><h1>${title}</h1><p class="lead">${copy}</p>${buttons?`<div class="button-row">${buttons}</div>`:''}</div><div class="hero-hand" aria-hidden="true"></div></section>`;

function eventCards(){
  return `<div class="event-grid">${D.events.map(e=>`<article class="event-card">
    <div class="media-frame">${img(D.media[e.image],`CannaCon ${e.city} event experience`)}<span class="image-label">2027 / ${esc(e.region)}</span></div>
    <div class="event-card-content"><p class="eyebrow">CannaCon presents</p><h3>${esc(e.city)}<span>${esc(e.state)}</span></h3><p class="event-date">${esc(e.datesLabel)}</p><p class="muted">${esc(e.venue)}</p>
    ${e.preDate?`<p class="event-extra">${esc(e.preLabel)}: financial education + pre-show networking</p>`:''}
    <div class="button-row">${link(e.code+'/','View '+esc(e.city),'button button-dark',`data-track="show_view" data-show="${esc(e.code)}"`)}${link('exhibit.html?show='+e.code+'#inquire','Exhibit '+arrow,'button button-orange',`data-track="exhibit_cta" data-show="${esc(e.code)}"`)}</div>
    <div class="utility-links">${link(e.floorPlan,'Floor plan '+arrow,'text-link',`data-track="floorplan_click" data-show="${esc(e.code)}"`)}${link(e.code+'/#passes','Passes','text-link',`data-track="pass_view" data-show="${esc(e.code)}"`)}</div></div>
  </article>`).join('')}</div>`;
}

function pavilions(){
  return `<div class="pavilion-grid">${D.pavilions.map((p,i)=>`<article class="pavilion-card"><div class="pavilion-photo">${img(D.media[p.image],'CannaCon show-floor experience')}</div><div class="pavilion-copy"><span class="index-no">0${i+1}</span><p class="eyebrow">${esc(p.eyebrow)}</p><h3>${esc(p.title)}</h3><p>${esc(p.description)}</p><p class="small">${esc(p.detail)}</p>${link('exhibit.html#inquire','Talk with exhibit sales '+arrow,'text-link light','data-track="exhibit_cta"')}</div></article>`).join('')}</div>`;
}

function articles(all=false){
  return `<div class="article-grid ${all?'all-articles':''}">${D.articles.slice(0,all?4:3).map(a=>`<article class="article-card"><a href="${esc(a.url)}" target="_blank" rel="noopener noreferrer" class="article-photo" tabindex="-1" aria-hidden="true">${img(a.image,'')}</a><div class="article-copy"><div class="meta"><span>${esc(a.category)}</span><time datetime="${esc(a.date)}">${esc(new Date(a.date+'T12:00:00Z').toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric',timeZone:'UTC'}))}</time></div><h3>${link(a.url,esc(a.title),'article-title','data-track="article_click"')}</h3><p>${esc(a.excerpt)}</p>${link(a.url,'Read article '+arrow,'text-link','data-track="article_click"')}</div></article>`).join('')}</div>`;
}

function decks(which=[0,1]){
  return `<div class="deck-grid">${which.map(i=>D.decks[i]).map(d=>`<article class="deck-card"><div class="deck-cover">${img(d.cover,d.label+' cover')}</div><div><p class="eyebrow">Sales material / PDF</p><h3>${esc(d.title)}</h3><p>${esc(d.note)}</p>${link(d.file,'Open '+esc(d.label)+' '+arrow,'button button-dark','target="_blank" rel="noopener" type="application/pdf" data-track="sales_deck_open"')}</div></article>`).join('')}</div>`;
}

function nativeField(key,spec){
  const {name,label,type='text',options=[],required=false,help=''} = spec;
  const id = `${key}-${name}`;
  const hint = help ? `<small id="${id}-help">${esc(help)}</small>` : '';
  const common = `name="${name}" id="${id}" data-label="${esc(label)}" ${required?'required':''} ${help?`aria-describedby="${id}-help"`:''}`;
  let control;
  if(type==='textarea') control = `<textarea ${common} rows="4" maxlength="1800"></textarea>`;
  else if(type==='select') control = `<select ${common}><option value="">Please select</option>${options.map(o=>typeof o==='string'?`<option value="${esc(o)}">${esc(o)}</option>`:`<option value="${esc(o.value)}">${esc(o.label)}</option>`).join('')}</select>`;
  else control = `<input ${common} type="${type}" maxlength="${type==='url'?600:180}" ${type==='email'?'autocomplete="email"':name==='fullName'?'autocomplete="name"':name==='company'?'autocomplete="organization"':type==='tel'?'autocomplete="tel"':''}>`;
  return `<div class="native-field ${type==='textarea'?'full':''}"><label for="${id}">${esc(label)}${required?' <span class="required-mark">Required</span>':' <span class="optional-mark">Optional</span>'}</label>${control}${hint}</div>`;
}

const showOptions = () => D.events.map(e=>({value:e.code,label:`${e.city}, ${e.state} - ${e.datesLabel}`})).concat([{value:'MULTI',label:'Multiple shows / not sure yet'}]);

function formBlock(key){
  const f = D.forms[key];
  let fields=[];
  if(key==='exhibitor') fields=[
    {name:'fullName',label:'Full name',required:true},
    {name:'email',label:'Business email',type:'email',required:true},
    {name:'company',label:'Company',required:true},
    {name:'show',label:'Show(s) of interest',type:'select',options:showOptions(),required:true},
    {name:'phone',label:'Phone',type:'tel'},
    {name:'message',label:'Anything specific you want us to know about your inquiry?',type:'textarea'}
  ];
  if(key==='sponsor') fields=[
    {name:'fullName',label:'Full name',required:true},
    {name:'email',label:'Business email',type:'email',required:true},
    {name:'company',label:'Company',required:true},
    {name:'show',label:'Show(s) of interest',type:'select',options:showOptions(),required:true},
    {name:'phone',label:'Phone',type:'tel'},
    {name:'message',label:'Anything specific you want us to know about your partnership goals?',type:'textarea'}
  ];
  if(key==='speaker') fields=[
    {name:'fullName',label:'Full name',required:true},
    {name:'email',label:'Email',type:'email',required:true},
    {name:'company',label:'Organization',required:true},
    {name:'show',label:'Show(s) of interest',type:'select',options:showOptions(),required:true},
    {name:'title',label:'Proposed topic or session title',required:true},
    {name:'message',label:'Tell us about the session you want to present',type:'textarea',required:true},
    {name:'website',label:'Website, LinkedIn, or past presentation URL',type:'url'}
  ];
  if(key==='buyer') fields=[
    {name:'fullName',label:'Full name',required:true},
    {name:'email',label:'Business email',type:'email',required:true},
    {name:'company',label:'Company',required:true},
    {name:'role',label:'Job title',required:true},
    {name:'show',label:'Show',type:'select',options:showOptions(),required:true},
    {name:'businessType',label:'Buyer / business type',type:'select',required:true,options:['Retail / Dispensary','Distributor / Wholesaler','Convenience / Specialty retail','MSO / Multi-location team','Beverage / Category manager','Purchasing / Procurement','Other']},
    {name:'categories',label:'Products / categories you are looking to source',required:true},
    {name:'phone',label:'Phone',type:'tel'},
    {name:'message',label:'Anything else we should know about what you are sourcing?',type:'textarea'}
  ];
  if(key==='contact') fields=[
    {name:'fullName',label:'Full name',required:true},
    {name:'email',label:'Email',type:'email',required:true},
    {name:'inquiryType',label:'What can we help with?',type:'select',required:true,options:['Exhibiting','Sponsorship','Attending','Speaker / Programming','Hosted Buyer','Media','General','Other']},
    {name:'company',label:'Company'},
    {name:'show',label:'Show',type:'select',options:showOptions()},
    {name:'message',label:'Anything specific you want to tell us?',type:'textarea'}
  ];
  const descriptions={
    exhibitor:'Tell us where you want to exhibit. Our sales team can handle the details from there.',
    sponsor:'Tell us which show interests you and we will follow up on the right opportunities.',
    speaker:'Give us the core idea. We can collect the full program details after initial review.',
    buyer:'Tell us who you buy for and what you are sourcing so we can review fit for the Hosted Buyer program.',
    contact:'Send the basics and we will route your inquiry to the right conversation.'
  };
  return `<section class="section" id="inquire"><div class="wrap form-layout"><div><p class="eyebrow">Start the conversation</p><h2>${esc(f.title)}</h2><p>${esc(descriptions[key])}</p><p class="direct-contact">Prefer email? ${link('mailto:'+D.brand.contactEmail+'?subject='+encodeURIComponent(f.subject),esc(D.brand.contactEmail)+' '+arrow,'text-link','data-track="contact_cta"')}</p></div><div class="form-mount"><form data-email-form="${key}" class="native-inquiry" autocomplete="on"><div class="native-field-grid">${fields.map(field=>nativeField(key,field)).join('')}</div><button class="button button-orange form-submit" type="submit" data-track="form_submit">Email CannaCon ${arrow}</button><p class="form-status" data-form-status role="status"></p><div class="email-preview" data-email-preview hidden tabindex="-1"><h3>Need another way to send it?</h3><p>If your email app did not open, copy the message below and send it to <strong>${esc(D.brand.contactEmail)}</strong>.</p><textarea data-email-text readonly rows="8" aria-label="Prepared inquiry message"></textarea><div class="button-row"><button class="button button-dark" type="button" data-copy-email>Copy message</button><button class="button button-quiet" type="button" data-save-email>Save as text</button></div></div></form></div></div></section>`;
}

function cta(){
  return `<section class="closing"><div class="wrap"><p class="eyebrow">Be part of what comes next</p><h2>${esc(D.brand.rallyingLine)}</h2><div class="button-row">${link('exhibit.html#inquire','Exhibit at CannaCon '+arrow,'button button-orange','data-track="exhibit_cta"')}${link('events.html','See 2027 shows','button button-outline','data-track="show_view"')}${link('contact.html','Talk to the team','text-link light','data-track="contact_cta"')}</div></div></section>`;
}

function story(){
  return `<div class="story-grid"><div><p class="eyebrow">Built on experience</p><h2>${esc(D.history.heading)}</h2><p>${esc(D.history.text)}</p>${link('about.html','About CannaCon '+arrow)}</div><div class="experience-stats">${D.history.metrics.map(m=>`<div><strong>${esc(m.value)}</strong><span>${esc(m.label)}</span></div>`).join('')}</div></div>`;
}

function videoBlock(){
  return `<section class="section dark"><div class="wrap">${sectionHead('Experience CannaCon','Real people. Real conversations.','See the energy, products and connections that happen when the industry comes together.')}<div class="video-poster" data-video-mount>${img(D.media.conversations,'CannaCon attendees talking on the show floor')}<div class="video-shade"></div><button type="button" class="play-button" data-play-youtube data-track="video_play" aria-label="Play the CannaCon experience video"><span aria-hidden="true">&#9654;</span><span>Watch CannaCon</span></button></div><p class="small">${link(D.socials.youtube,'More on YouTube '+arrow,'text-link light')}</p></div></section>`;
}

function program(e,anchor='program'){
  const vegas = !e.days.length;
  return `<section class="section soft" id="${esc(anchor)}"><div class="wrap">${sectionHead('Plan your time','The show. And everything around it.',vegas?'Las Vegas programming will be published as the schedule is confirmed.':'Pre-show learning and networking lead into two full expo days.')}<div class="program-grid">${e.preDate?`<article class="program-card"><p class="eyebrow">Pre-show / ${esc(e.preLabel)}</p><h3>Learn. Meet. Get ready.</h3><p>Financial course Session 1, plus pre-show and exhibitor networking events.</p></article>`:''}${e.days.map((d,i)=>`<article class="program-card"><p class="eyebrow">Expo day ${i+1} / ${esc(d.label)}</p><h3>${esc(d.hours)}</h3><p>Pavilions, show-floor discovery, general seminars and culture programming.</p><p class="small">Financial course Session ${i+2} is separately ticketed.</p></article>`).join('')}${vegas?`<article class="program-card"><p class="eyebrow">Las Vegas / May 2027</p><h3>National gathering.</h3><p>The CannaCon ecosystem comes together at the Las Vegas Convention Center. Full dates and program details will be published here.</p></article>`:''}</div></div></section>`;
}

function passes(e){
  const standard=e.preDate?D.tickets:D.tickets.filter(t=>t.id!=='all');
  return `<section class="section" id="passes"><span id="tickets" class="anchor-alias" aria-hidden="true"></span><div class="wrap">${sectionHead('Pass options','Choose how you want to experience CannaCon.','General seminars are included with expo admission. Financial education is separately priced.')}
  <div class="pass-grid">${standard.map(t=>`<article class="pass-card"><p class="eyebrow">Expo admission</p><h3>${esc(t.name)}</h3><strong>${money(t.price)}</strong><p>${esc(t.description)}</p><small>${esc(t.includes)}</small></article>`).join('')}</div>
  ${e.courseDates.length?`<div class="education-price-block"><div><p class="eyebrow">Financial education</p><h3>Three focused 3-hour sessions.</h3><p>Choose a single session or the complete three-session pathway.</p></div><div class="course-price-list">${D.courses.map(c=>`<div><span>${esc(c.name)} <small>${date(e.courseDates[c.dayIndex])}</small></span><strong>${money(c.price)}</strong></div>`).join('')}<div class="bundle-price"><span>All three sessions <small>9 hours total</small></span><strong>${money(D.courseBundlePrice)}</strong></div></div></div>`:''}
  <div class="pass-actions"><p>Questions about passes or group attendance?</p>${link('contact.html?show='+e.code+'#inquire','Contact CannaCon '+arrow,'button button-dark','data-track="contact_cta" data-show="'+esc(e.code)+'"')}</div></div></section>`;
}

function privacyUi(){
  return `<dialog id="age-gate" class="age-dialog" aria-labelledby="age-title" aria-describedby="age-description"><div class="age-art" aria-hidden="true"><img src="${B}assets/brand/cannacon-hand.png" alt="" width="300" height="615"></div><div class="age-content"><img src="${B}assets/brand/cannacon-wordmark.png" alt="CannaCon" width="1632" height="378"><p class="eyebrow">Culture. Commerce. Community.</p><h2 id="age-title">Are you 21 or older?</h2><p id="age-description">CannaCon events and content are intended for adults 21 and older.</p><div data-age-actions><button class="button button-orange" type="button" data-age-yes>Yes, enter CannaCon</button><button class="button button-quiet" type="button" data-age-no>No, I am under 21</button></div><div data-age-restricted hidden><p>You must be 21 or older to enter this site.</p><button type="button" class="plain-button" data-age-reconsider>I selected the wrong option</button></div><p class="small">We remember your answer on this browser.</p></div></dialog>
<section class="privacy-banner" data-privacy-banner aria-labelledby="privacy-banner-title" hidden><div><strong id="privacy-banner-title">Privacy choices</strong><p>We use essential browser storage to remember your age acknowledgement and privacy choices. External video may use third-party cookies when you choose to view it.</p></div><div class="privacy-actions"><button type="button" class="button button-dark" data-privacy-essential>Essential only</button><button type="button" class="button button-quiet" data-cookie-settings>Preferences</button></div></section>
<dialog class="preferences-dialog" id="privacy-dialog" aria-labelledby="preferences-title"><form method="dialog"><div class="dialog-header"><h2 id="preferences-title">Privacy preferences</h2><button class="icon-button" value="cancel" aria-label="Close privacy preferences">&times;</button></div><p>Essential browser storage remembers your age acknowledgement and privacy choices.</p><label class="preference-line"><span><strong>Essential storage</strong><small>Age acknowledgement and privacy preferences.</small></span><input type="checkbox" checked disabled aria-label="Essential storage enabled"></label><label class="preference-line"><span><strong>External video</strong><small>Allow YouTube content to load when you choose to view it.</small></span><input type="checkbox" data-external-preference></label><button type="button" class="button button-dark" data-save-preferences>Save preferences</button></form></dialog>
<noscript><style>.age-pending .site-shell{visibility:hidden}#age-gate{display:none}</style><div class="noscript"><p class="noscript-title">CannaCon / 21+</p><p>Please enable JavaScript to complete the 21+ acknowledgement.</p></div></noscript>`;
}

function shell(title,active,body){
  const nav=[['events.html','Shows','events'],['index.html#experience','Experience','experience'],['attend.html','Attend','attend'],['news.html','Stories','news'],['about.html','About','about'],['contact.html','Contact','contact']];
  return `<!doctype html>
<html lang="en" class="age-pending"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)} | CannaCon</title><meta name="description" content="${esc(title)}. ${esc(D.brand.tagline)}."><meta name="robots" content="noindex,nofollow,noarchive"><meta name="theme-color" content="#092e24"><meta name="referrer" content="strict-origin-when-cross-origin"><link rel="icon" href="${B}assets/brand/cannacon-hand.png" type="image/png"><link rel="stylesheet" href="${B}cannacon.css?v=${esc(D.previewVersion)}"><script src="${B}runtime-data.js?v=${esc(D.previewVersion)}" defer></script><script src="${B}cannacon.js?v=${esc(D.previewVersion)}" defer></script></head>
<body data-page="${esc(active)}"><a class="skip-link" href="#main">Skip to content</a><div class="site-shell" id="site-shell"><header class="site-header"><div class="wrap nav-shell"><a href="${B}index.html" class="brand" aria-label="CannaCon home">${logo()}</a><button class="menu-toggle" type="button" aria-expanded="false" aria-controls="primary-nav" data-menu-toggle>Menu <span aria-hidden="true">&#9776;</span></button><nav id="primary-nav" class="primary-nav" aria-label="Primary navigation">${nav.map(([p,t,id])=>link(p,t,'nav-link',id===active?'aria-current="page"':'')).join('')}${link('exhibit.html','Exhibit '+arrow,'button button-orange',(active==='exhibit'?'aria-current="page" ':'')+'data-track="exhibit_cta"')}</nav></div></header><main id="main" tabindex="-1">${body}</main>
<footer class="site-footer"><div class="wrap"><div class="footer-top"><div class="footer-brand">${link('index.html',logo(),'brand')}<p>${esc(D.brand.tagline)}</p><div class="socials">${link(D.socials.linkedin,'LinkedIn '+arrow,'text-link light')}${link(D.socials.youtube,'YouTube '+arrow,'text-link light')}</div></div><nav aria-label="Event links"><h2>Shows</h2>${D.events.map(e=>link(e.code+'/',esc(e.city))).join('')}${link('events.html','All 2027 shows')}${link('attend.html','Passes')}</nav><nav aria-label="Participate"><h2>Get involved</h2>${link('exhibit.html','Exhibit')}${link('sponsor.html','Sponsor')}${link('speak.html','Speak')}${link('hosted-buyers.html','Hosted buyers')}${link('contact.html','Contact')}</nav><nav aria-label="Resources"><h2>Explore</h2>${link('news.html','Stories')}${link('education.html','Financial education')}${link('decks.html','Sales materials')}${link('about.html','About CannaCon')}${link('privacy.html','Privacy')}</nav></div><div class="footer-bottom"><p>&copy; 2026 CannaCon&trade;. For adults 21+.</p><button type="button" class="plain-button" data-cookie-settings>Privacy choices</button></div></div></footer>
<nav class="mobile-quick-actions" aria-label="Quick actions">${link('events.html','Shows','quick-link','data-track="show_view"')}${link('exhibit.html#inquire','Exhibit','quick-link quick-link-primary','data-track="exhibit_cta"')}</nav></div>${privacyUi()}</body></html>`;
}

function home(){
  return `<section class="hero"><div class="hero-media media-frame">${img(D.media.heroImage,'CannaCon attendees and exhibitors on the show floor','hero-photo',true)}<video class="hero-video" data-hero-video muted loop playsinline preload="none" aria-hidden="true"></video></div><div class="hero-overlay"></div><div class="wrap hero-inner"><p class="eyebrow">Cannabis. Hemp. Everything around them.</p><h1><span class="hero-preline">Where Cannabis</span>Culture, Commerce,<br>and Community<br><span class="hero-lastline">Come Together</span></h1><p class="hero-subtitle">The people. The products. The ideas. One gathering for the whole cannabis and hemp ecosystem.</p><div class="button-row">${link('exhibit.html#inquire','Exhibit at CannaCon '+arrow,'button button-orange','data-track="exhibit_cta"')}${link('#events','See 2027 shows','button button-outline','data-track="show_view"')}${link('contact.html','Talk to the team','hero-text-link','data-track="contact_cta"')}</div><div class="hero-bottom"><p>CannaCon presents <span>Infused Product Expo / Culture / Cannabis Commerce</span></p><button type="button" class="motion-toggle" data-hero-toggle data-track="video_play" aria-pressed="false">Play show footage <span aria-hidden="true">&#9654;</span></button></div></div><div class="wave-edge" aria-hidden="true"></div></section>
<section class="intro section"><div class="wrap intro-grid"><p class="eyebrow">More than a trade show</p><div><h2>The industry in one place.<br><span class="serif-accent">A community that moves it forward.</span></h2><p>CannaCon connects the people building cannabis and hemp with the products, buyers, knowledge and culture moving the industry forward.</p></div></div></section>
<section class="section event-section" id="events"><div class="wrap">${sectionHead('CannaCon 2027','Meet us on the floor.','Find the show that fits your market, then get directly to the floor plan, passes or exhibit team.',link('events.html','All 2027 shows '+arrow,'text-link','data-track="show_view"'))}${eventCards()}</div></section>
<section class="section soft proof-section"><div class="wrap">${story()}</div></section>
<section class="section dark" id="experience"><div class="wrap">${sectionHead('Culture. Commerce. Community.','The whole ecosystem belongs here.','Product discovery, business connections, education and culture are designed to feed one stronger show floor.')}${pavilions()}<div class="section-end"><p>Want to see the exhibitor opportunity in detail?</p>${link(D.decks[0].file,'View exhibitor overview '+arrow,'button button-outline','target="_blank" rel="noopener" type="application/pdf" data-track="sales_deck_open"')}</div></div></section>
<section class="section"><div class="wrap">${sectionHead('Pick your path','Start where you are.','The fastest route to the conversation or experience you need.')}<div class="path-grid"><a class="path-card" href="exhibit.html#inquire" data-track="exhibit_cta"><p class="eyebrow">01</p><h3>Exhibit ${arrow}</h3><p>Talk to sales about floor space, product showcases and where your business fits.</p></a><a class="path-card" href="attend.html"><p class="eyebrow">02</p><h3>Attend ${arrow}</h3><p>Find passes, show dates, education and what to expect on the floor.</p></a><a class="path-card" href="sponsor.html#inquire"><p class="eyebrow">03</p><h3>Sponsor ${arrow}</h3><p>Build visibility around the parts of CannaCon that matter to your audience.</p></a><a class="path-card" href="speak.html#inquire"><p class="eyebrow">04</p><h3>Speak ${arrow}</h3><p>Bring useful expertise, culture and practical ideas to the program.</p></a></div></div></section>
${videoBlock()}
<section class="section"><div class="wrap">${sectionHead('From CannaCon','Stories from across cannabis culture and commerce.','Ideas, guides and industry context from the CannaCon library.',link('news.html','View all stories '+arrow,'text-link'))}${articles()}</div></section>
${cta()}`;
}

function eventPage(e){
  const actions = link('exhibit.html?show='+e.code+'#inquire','Exhibit '+arrow,'button button-orange',`data-track="exhibit_cta" data-show="${esc(e.code)}"`)+link('#passes','View passes','button button-outline',`data-track="pass_view" data-show="${esc(e.code)}"`)+link(e.floorPlan,'Floor plan '+arrow,'hero-text-link',`data-track="floorplan_click" data-show="${esc(e.code)}"`)+link('contact.html?show='+e.code+'#inquire','Contact','hero-text-link',`data-track="contact_cta" data-show="${esc(e.code)}"`);
  const dayFacts=e.days.length?e.days.map(d=>`<div><span>${esc(d.label)}</span><strong>${esc(d.hours)}</strong></div>`).join(''):`<div><span>Event timing</span><strong>${esc(e.datesLabel)}</strong></div>`;
  return pageHead('CannaCon presents / '+esc(e.region),esc(e.city)+', '+esc(e.state),esc(e.intro),actions)+`<section class="event-facts"><div class="wrap facts-grid"><div><span>Dates</span><strong>${esc(e.datesLabel)}</strong>${e.preDate?`<small>${esc(e.preLabel)}: financial education + pre-show networking</small>`:''}</div><div><span>Venue</span><strong>${esc(e.venue)}</strong>${e.address?`<small>${esc(e.address)}</small>`:''}</div>${dayFacts}<div class="facts-actions">${link(e.floorPlan,'View floor plan '+arrow,'button button-dark',`data-track="floorplan_click" data-show="${esc(e.code)}"`)}</div></div></section><section class="section dark"><div class="wrap">${sectionHead('CannaCon presents','Everything cannabis. One connected floor.','Explore product discovery, culture and the full business ecosystem in one gathering.')} ${pavilions()}</div></section>${program(e)}${passes(e)}${formBlock('exhibitor')}${cta()}`;
}

const pages=[
 ['index.html','Where culture, commerce and community come together','home',home],
 ['events.html','2027 shows','events',()=>pageHead('CannaCon 2027','Find your next show.','Three destinations. One CannaCon community. Get directly to show details, the floor plan or exhibit sales.',link('exhibit.html#inquire','Talk to exhibit sales '+arrow,'button button-orange','data-track="exhibit_cta"'))+`<section class="section"><div class="wrap">${eventCards()}</div></section>`+cta()],
 ['attend.html','Attend CannaCon','attend',()=>pageHead('For the cannabis community','Come curious.<br>Leave connected.','Explore products, conversations, culture and education across the CannaCon floor.',link('events.html','Choose a show '+arrow,'button button-orange','data-track="show_view"'))+`<section class="section"><div class="wrap">${sectionHead('2027 shows','Pick your destination.','Each show page gives you passes, floor plans, hours and the program in one place.')}${eventCards()}</div></section><section class="section dark"><div class="wrap">${sectionHead('One floor. More reasons to be there.','Culture meets commerce.')} ${pavilions()}</div></section>`+cta()],
 ['exhibit.html','Exhibit with CannaCon','exhibit',()=>pageHead('For the people building the industry','Bring your business.<br>Meet your market.','CannaCon puts products, equipment, services, brands and ideas in front of the cannabis and hemp ecosystem.',link('#inquire','Talk to exhibit sales '+arrow,'button button-orange','data-track="exhibit_cta"')+link('events.html','See 2027 shows','button button-outline','data-track="show_view"'))+`<section class="section"><div class="wrap">${story()}</div></section><section class="section dark"><div class="wrap">${sectionHead('CannaCon presents','Find your place on the floor.','Pavilions and programming are designed to create more reasons for people to move, discover and have useful conversations.')} ${pavilions()}</div></section><section class="section" id="sales-decks"><div class="wrap">${sectionHead('Sales materials','See the opportunity before we talk.','Review the current exhibitor materials in your browser.')} ${decks()}</div></section>`+formBlock('exhibitor')+cta()],
 ['sponsor.html','Sponsorship & partnerships','sponsor',()=>pageHead('Beyond the booth','Build a presence<br>people remember.','Put your brand alongside the audiences, experiences and programming that matter to your business.',link('#inquire','Talk sponsorship '+arrow,'button button-orange','data-track="sponsor_inquiry"'))+`<section class="section"><div class="wrap"><div class="path-grid">${[['Pavilions','Own a relevant part of the show-floor experience.'],['Experiences','Build product discovery, culture and on-floor activations.'],['Education','Support practical knowledge and business conversations.'],['Content','Extend the conversation through interviews and media.']].map(([t,c])=>`<article class="path-card"><h3>${t}</h3><p>${c}</p></article>`).join('')}</div></div></section>`+formBlock('sponsor')+cta()],
 ['speakers.html','Programming','speakers',()=>pageHead('Programming that moves the industry','Practical expertise.<br>Broader perspectives.','CannaCon programming connects useful business knowledge with the people, products and culture shaping cannabis.',link('speak.html#inquire','Propose a session '+arrow,'button button-orange','data-track="speaker_inquiry"')+link('education.html','Financial education','button button-outline'))+`<section class="section"><div class="wrap">${sectionHead('2027 program areas','Built for useful conversations.','Programming spans the business, plant, product and cultural sides of the industry.')}<div class="info-grid program-areas">${[['Business & operations','Finance, compliance, retail, manufacturing and running a stronger business.'],['Culture & community','Creators, glass, art, products and the communities shaping cannabis.'],['Product & retail','Product innovation, merchandising, buyer needs and routes to market.'],['Cultivation & genetics','Plant science, cultivation performance, genetics and grower education.'],['Finance & strategy','Capital, financial management, negotiation, growth and decision-making.'],['Technology & analytics','Software, data, automation and tools for modern operations.']].map(([t,c])=>`<article><h3>${t}</h3><p>${c}</p></article>`).join('')}</div></div></section>`+cta()],
 ['speak.html','Speaker inquiries','speakers',()=>pageHead('Bring something useful to the room','Share what you know.','Tell us the core idea you want to bring to CannaCon. We can collect the full program details after initial review.',link('#inquire','Propose a session '+arrow,'button button-orange','data-track="speaker_inquiry"'))+formBlock('speaker')],
 ['schedule.html','Program & schedule','events',()=>pageHead('CannaCon 2027','Plan your time.','See the confirmed regional show hours and the structure around each event.')+D.events.map(e=>`<div class="wrap program-city"><h2>${esc(e.name)}</h2>${link(e.code+'/','Show details '+arrow)}</div>`+program(e,'program-'+e.code)).join('')],
 ['news.html','Stories','news',()=>pageHead('From CannaCon','Stories from across<br>culture and commerce.','Ideas, guides and industry context from the CannaCon library.')+`<section class="section"><div class="wrap">${articles(true)}</div></section>`+cta()],
 ['about.html','About CannaCon','about',()=>pageHead('Culture. Commerce. Community.','If you\'re in Cannabis,<br>you\'re at CannaCon.','CannaCon brings together the people who create cannabis culture, the businesses that build the industry, and the communities that move it forward.')+`<section class="section"><div class="wrap">${story()}</div></section><section class="section dark" id="experience"><div class="wrap">${sectionHead('More than a B2B floor','CannaCon presents the whole ecosystem.','Infused products, culture, commerce, education and community share one connected experience.')} ${pavilions()}</div></section>`+cta()],
 ['contact.html','Contact CannaCon','contact',()=>pageHead('Talk to the team','Start a conversation.','Exhibiting, attending, sponsoring, speaking or something else - send the basics and we will take it from there.',link('#inquire','Contact CannaCon '+arrow,'button button-orange','data-track="contact_cta"'))+formBlock('contact')],
 ['hosted-buyers.html','Hosted buyers & one-to-one meetings','buyer',()=>pageHead('CannaCon presents / Infused Product Expo','Qualified meetings.<br>Less wasted time.','Tell us who you buy for and what you are sourcing. The Hosted Buyer program is built around useful buyer-supplier conversations.',link('#inquire','Apply as a Hosted Buyer '+arrow,'button button-orange','data-track="hosted_buyer_inquiry"')+link(D.decks[2].file,'Open buyer guide '+arrow,'button button-outline','target="_blank" rel="noopener" type="application/pdf" data-track="sales_deck_open"'))+`<section class="section"><div class="wrap">${sectionHead('How it works','A schedule that respects your time.','The program starts with your sourcing priorities, then focuses on relevant introductions.')}<div class="path-grid">${[['Build your profile','Tell us what you source, buy, distribute or want to add.'],['Share priorities','Identify categories, products and business needs.'],['Get matched','The CannaCon team reviews fit and relevant supplier connections.'],['Meet one-to-one','Use each conversation to evaluate fit and define next steps.']].map(([t,p],i)=>`<article class="path-card"><p class="eyebrow">0${i+1}</p><h3>${t}</h3><p>${p}</p></article>`).join('')}</div><div class="buyer-types"><h3>Built for buyers with purchasing responsibility</h3><p>Retail and dispensary buyers, distributors and wholesalers, convenience and specialty retail, multi-location teams, beverage and category managers, and purchasing executives.</p></div></div></section>`+formBlock('buyer')],
 ['education.html','Financial education','education',()=>pageHead('Applied business education','Turn information<br>into better decisions.','Three focused three-hour sessions across the regional CannaCon schedule, built around practical finance, operations and strategy.',link('events.html','Choose a show '+arrow,'button button-orange'))+`<section class="section"><div class="wrap">${sectionHead('The financial course','Take one session. Or complete all three.','Regional sessions are offered across the pre-show day and two expo days in Virginia Beach and St. Paul.')}<div class="course-summary-grid">${D.courses.map(c=>`<article class="program-card"><p class="eyebrow">3-hour session</p><h2>${esc(c.name)}</h2><strong class="course-price">${money(c.price)}</strong></article>`).join('')}<article class="program-card course-bundle-summary"><p class="eyebrow">Complete pathway</p><h2>All three</h2><strong class="course-price">${money(D.courseBundlePrice)}</strong><p>9 hours total.</p></article></div><div class="notice"><strong>General seminars are included with expo admission.</strong><p>The financial course is separately priced.</p></div><div class="button-row">${link('VA27/#passes','Virginia Beach options '+arrow,'button button-dark')}${link('MN27/#passes','St. Paul options '+arrow,'button button-quiet')}</div></div></section>`],
 ['decks.html','Sales materials','exhibit',()=>pageHead('Sales materials','See the opportunity.','Open the current CannaCon exhibitor materials and Hosted Buyer guide in your browser.')+`<section class="section"><div class="wrap">${decks([0,1,2])}<p class="small deck-current-note">For current public show dates and venue information, use the event pages on this site.</p></div></section>`],
 ['privacy.html','Privacy','privacy',()=>pageHead('Privacy','Your visit. Your choices.','CannaCon uses essential browser storage for age acknowledgement and privacy preferences. External media may use third-party cookies when you choose to view it.')+`<section class="section"><div class="wrap prose"><h2>Age acknowledgement</h2><p>We remember your 21+ acknowledgement for up to ${D.ageRememberDays} days on the browser you use. Clearing browser storage or using a different browser may cause the question to appear again.</p><h2>Privacy preferences</h2><p>Essential storage remembers your age acknowledgement and privacy choices. When you choose to view external media such as YouTube, that provider may set its own cookies or process information under its own privacy terms.</p><h2>Inquiries</h2><p>When you use an inquiry form, your browser opens your email application with the information you entered so you can send it to CannaCon. Your email provider handles that message.</p><h2>Contact</h2><p>${link('mailto:'+D.brand.contactEmail,esc(D.brand.contactEmail))}</p><button type="button" class="button button-dark" data-cookie-settings>Privacy choices</button></div></section>`]
];

function write(file,title,active,render){
  B=file.includes('/')?'../':'';
  const target=path.join(ROOT,file);
  fs.mkdirSync(path.dirname(target),{recursive:true});
  fs.writeFileSync(target,shell(title,active,render()));
}
for(const [file,title,active,render] of pages) write(file,title,active,render);
for(const e of D.events) write(e.code+'/index.html',e.name,'events',()=>eventPage(e));

const runtime={
  ageRememberDays:D.ageRememberDays,
  privacyRememberDays:D.privacyRememberDays,
  media:D.media,
  forms:Object.fromEntries(Object.entries(D.forms).map(([key,f])=>[key,{title:f.title,subject:f.subject,recipient:D.brand.contactEmail,mode:f.mode||'email-draft',endpoint:f.endpoint||null}])),
  events:D.events.map(({code})=>({code}))
};
fs.writeFileSync(path.join(ROOT,'runtime-data.js'),'// Generated by build.mjs from content/site.json.\nwindow.CANNACON_CONFIG = '+JSON.stringify(runtime,null,2)+';\n');
console.log(`Built ${pages.length+D.events.length} pages inside ${ROOT}`);
