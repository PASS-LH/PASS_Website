/* CannaCon preview behavior. No analytics, payment collection, or client-side secrets. */
(() => {
  'use strict';
  const script = document.currentScript;
  const BASE = new URL('.', script.src);
  const C = window.CANNACON_CONFIG;
  if (!C) { console.error('CannaCon public configuration did not load.'); return; }
  const $ = (s, root=document) => root.querySelector(s);
  const $$ = (s, root=document) => [...root.querySelectorAll(s)];
  const AGE_KEY='cc_age_ack_v2';
  const PRIVACY_KEY='cc_privacy_v2';
  const DAY=86400000;
  const gate=$('#age-gate');
  const prefs=$('#privacy-dialog');
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  let entered=false;
  function readStorage(key) {
    let value;
    try { value=localStorage.getItem(key); } catch (_) {}
    if (!value) {
      let cookie; try {cookie=document.cookie.split('; ').find(x=>x.startsWith(key+'='));} catch (_) {}
      if(cookie) { try {value=decodeURIComponent(cookie.slice(key.length+1));}catch(_){} }
    }
    try { const data=JSON.parse(value); return data && Number.isFinite(data.expiresAt) && data.expiresAt>Date.now()?data:null; } catch (_) {return null;}
  }
  function remember(key,data,days) {
    const value=JSON.stringify({...data,expiresAt:Date.now()+days*DAY});
    try { localStorage.setItem(key,value); } catch (_) {}
    try { document.cookie=`${key}=${encodeURIComponent(value)}; Max-Age=${Math.round(days*86400)}; Path=${BASE.pathname}; SameSite=Lax${location.protocol==='https:'?'; Secure':''}`; } catch (_) {}
  }
  function forget(key) {
    try {localStorage.removeItem(key);}catch(_){}
    try { document.cookie=`${key}=; Max-Age=0; Path=${BASE.pathname}; SameSite=Lax${location.protocol==='https:'?'; Secure':''}`; } catch (_) {}
  }
  function closeMenu(){ const n=$('#primary-nav'),b=$('[data-menu-toggle]');n?.classList.remove('is-open');b?.setAttribute('aria-expanded','false'); }
  $('[data-menu-toggle]')?.addEventListener('click',e=>{const open=$('#primary-nav').classList.toggle('is-open');e.currentTarget.setAttribute('aria-expanded',String(open));});
  $$('#primary-nav a').forEach(a=>a.addEventListener('click',closeMenu));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&$('#primary-nav')?.classList.contains('is-open')){closeMenu();$('[data-menu-toggle]').focus();}});
  function enter(){
    if(gate.open)gate.close();document.documentElement.classList.remove('age-pending');entered=true;
    $('[data-privacy-banner]').hidden=Boolean(readStorage(PRIVACY_KEY));
    if(C.media.heroVideoAutoplay&&!reduced.matches&&!navigator.connection?.saveData)startHero(false);
    setupVideoObserver();
  }
  function askAge(){entered=false;$('[data-age-actions]').hidden=false;$('[data-age-restricted]').hidden=true;$('#age-title').textContent='Are you 21 or older?';if(hero&&!hero.paused)hero.pause();document.documentElement.classList.add('age-pending');$('[data-privacy-banner]').hidden=true;if(prefs.open)prefs.close();if(!gate.open)gate.showModal();$('[data-age-yes]').focus();}
  gate.addEventListener('cancel',e=>e.preventDefault());
  $('[data-age-yes]').addEventListener('click',()=>{remember(AGE_KEY,{verified:true,acknowledgedAt:Date.now()},C.ageRememberDays);enter();});
  $('[data-age-no]').addEventListener('click',()=>{$('[data-age-actions]').hidden=true;$('[data-age-restricted]').hidden=false;$('#age-title').textContent='Thanks for checking.';$('[data-age-reconsider]').focus();});
  $('[data-age-reconsider]').addEventListener('click',()=>{$('[data-age-actions]').hidden=false;$('[data-age-restricted]').hidden=true;$('#age-title').textContent='Are you 21 or older?';$('[data-age-yes]').focus();});
  $('[data-reset-age]')?.addEventListener('click',()=>{forget(AGE_KEY);askAge();});
  function applyPreferences(allowExternal){remember(PRIVACY_KEY,{externalMedia:allowExternal},C.privacyRememberDays);$('[data-privacy-banner]').hidden=true;if(prefs.open)prefs.close();if(!allowExternal){const m=$('[data-video-mount]');if(m?.dataset.original){m.innerHTML=m.dataset.original;bindVideoButton(m);delete m.dataset.loaded;}}else{setupVideoObserver();}}
  $('[data-privacy-essential]').addEventListener('click',()=>applyPreferences(false));
  $$('[data-cookie-settings]').forEach(b=>b.addEventListener('click',()=>{if(!entered)return;$('[data-external-preference]').checked=Boolean(readStorage(PRIVACY_KEY)?.externalMedia);prefs.showModal();}));
  $('[data-save-preferences]').addEventListener('click',()=>applyPreferences($('[data-external-preference]').checked));
  // Broken remote images leave the branded background intact; no broken-image icons.
  $$('img').forEach(i=>{i.addEventListener('error',()=>i.classList.add('remote-image-failed'));if(i.complete&&i.naturalWidth===0)i.classList.add('remote-image-failed');});
  const hero=$('[data-hero-video]');const heroToggle=$('[data-hero-toggle]');
  async function startHero(explicit=true){
    if(!hero||!entered)return;
    if(!explicit&&(reduced.matches||navigator.connection?.saveData))return;
    if(!hero.src)hero.src=C.media.heroVideo;
    try{await hero.play();hero.classList.add('is-playing');heroToggle.textContent='Pause show footage';heroToggle.setAttribute('aria-pressed','true');}
    catch(_){heroToggle.textContent='Footage unavailable - try again';heroToggle.setAttribute('aria-pressed','false');hero.classList.remove('is-playing');}
  }
  heroToggle?.addEventListener('click',()=>{if(!hero.paused){hero.pause();hero.classList.remove('is-playing');heroToggle.textContent='Play show footage';heroToggle.setAttribute('aria-pressed','false');}else startHero(true);});
  document.addEventListener('visibilitychange',()=>{if(document.hidden&&hero&&!hero.paused){hero.pause();heroToggle.textContent='Play show footage';heroToggle.setAttribute('aria-pressed','false');}});
  reduced.addEventListener?.('change',e=>{if(e.matches&&hero){hero.pause();hero.classList.remove('is-playing');heroToggle.textContent='Play show footage';heroToggle.setAttribute('aria-pressed','false');}});
  if(hero&&'IntersectionObserver' in window){new IntersectionObserver(entries=>{if(!entries[0].isIntersecting&&!hero.paused){hero.pause();hero.classList.remove('is-playing');heroToggle.textContent='Play show footage';heroToggle.setAttribute('aria-pressed','false');}}).observe(hero);}
  function loadYouTube(mount,autoplay){
    if(!entered||mount.dataset.loaded)return;
    mount.dataset.original=mount.innerHTML;
    const frame=document.createElement('iframe');
    const u=new URL(C.media.youtubeEmbed);u.searchParams.set('autoplay',autoplay?'1':'0');u.searchParams.set('rel','0');
    frame.src=u.href;frame.title='CannaCon experience video';frame.allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';frame.allowFullscreen=true;frame.referrerPolicy='strict-origin-when-cross-origin';mount.replaceChildren(frame);mount.dataset.loaded='true';
  }
  function bindVideoButton(root=document){$('[data-play-youtube]',root)?.addEventListener('click',e=>loadYouTube(e.currentTarget.closest('[data-video-mount]'),true));}
  bindVideoButton();
  function setupVideoObserver(){const mount=$('[data-video-mount]');if(!mount||!entered||!readStorage(PRIVACY_KEY)?.externalMedia)return;const observer=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){loadYouTube(mount,false);observer.disconnect();}},{rootMargin:'100px'});observer.observe(mount);}
  // Inquiry data stays in memory. This is an email composer, not a submission endpoint.
  // Do not replace this with client-side SMTP credentials or claim an email was sent.
  $$('[data-email-form]').forEach(form=>{
    const key=form.dataset.emailForm;
    const def=C.forms[key];
    const preview=$('[data-email-preview]',form);
    const output=$('[data-email-text]',form);
    const emailLink=$('[data-open-email]',form);
    const status=$('[data-email-status]',form);
    let draft='';
    function updateConditions(){
      $$('[data-show-when]',form).forEach(group=>{
        const [name,expected]=group.dataset.showWhen.split('=');
        const control=form.elements.namedItem(name);
        const visible=control?.value===expected;
        group.hidden=!visible;
        $$('input,select,textarea',group).forEach(input=>{input.disabled=!visible;});
      });
    }
    updateConditions();
    // Event buttons can preselect a show without duplicating the form.
    const chosen=new URLSearchParams(location.search).get('show');
    const eventIndex=C.events.findIndex(e=>e.code===chosen);
    const showSelect=form.elements.namedItem('show');
    if(showSelect&&eventIndex>=0)showSelect.selectedIndex=eventIndex+1;
    form.addEventListener('change',()=>{updateConditions();preview.hidden=true;draft='';});
    form.addEventListener('input',()=>{preview.hidden=true;draft='';});
    form.addEventListener('submit',e=>{
      e.preventDefault();updateConditions();if(!form.reportValidity())return;
      const data=new FormData(form);
      const names=[...new Set([...data.keys()])];
      const lines=names.map(name=>{
        const field=$$('input,select,textarea',form).find(x=>x.name===name);
        return `${field?.dataset.label||name}: ${data.getAll(name).map(String).join('; ')}`;
      });
      draft=`${def.title}\n\n${lines.join('\n\n')}`;
      output.value=draft;
      const base=`mailto:${def.recipient}?subject=${encodeURIComponent(def.subject)}`;
      const full=`${base}&body=${encodeURIComponent(draft)}`;
      // Mail client URL limits differ. Keep the full message intact in the copy/save path.
      if(full.length>1800){
        emailLink.href=base;
        emailLink.textContent='Open email app (paste message)';
        status.textContent='This is a longer inquiry. Copy the message first, then paste it into the email draft. Nothing has been sent.';
      }else{
        emailLink.href=full;
        emailLink.textContent='Open email draft';
        status.textContent='Review the message below, then send it from your email app. Nothing has been sent.';
      }
      preview.hidden=false;preview.focus();
    });
    $('[data-copy-email]',form).addEventListener('click',async()=>{
      if(!draft)return;
      const text=`To: ${def.recipient}\nSubject: ${def.subject}\n\n${draft}`;
      try{
        await navigator.clipboard.writeText(text);
        status.textContent='Copied. Paste into your email app and send it to the address above. No email has been sent by this page.';
      }catch(_){
        output.focus();output.select();
        status.textContent='Select and copy the message above (Ctrl+C / Command+C), then paste it into your email app.';
      }
    });
    $('[data-save-email]',form).addEventListener('click',()=>{
      if(!draft)return;
      const blob=new Blob([`To: ${def.recipient}\nSubject: ${def.subject}\n\n${draft}`],{type:'text/plain;charset=utf-8'});
      const objectURL=URL.createObjectURL(blob);const a=document.createElement('a');
      a.href=objectURL;a.download=`cannacon-${key}-inquiry.txt`;document.body.append(a);a.click();a.remove();
      setTimeout(()=>URL.revokeObjectURL(objectURL),1000);
      status.textContent='Message prepared as a text file. Send it using your email app; it has not been submitted.';
    });
  });

  $$('[data-newsletter]').forEach(form=>form.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;$('[data-newsletter-status]',form).textContent='Preview complete. You have not been subscribed and no address has been stored or sent. Constant Contact will be connected before launch.';form.reset();}));
  const money=n=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(n);
  $$('[data-ticket-builder]').forEach(root=>{
    const event=C.events.find(e=>e.code===root.dataset.ticketBuilder);if(!event)return;
    const bundle=$('[data-course-bundle]',root);const courses=$$('input[name="course"]',root);const radios=$$('input[name="expo-pass"]',root);const dayPicker=$('[data-day-picker]',root);const visitDay=$('#visit-day',root);
    function update(changed){
      if(changed===bundle&&bundle.checked)courses.forEach(x=>x.checked=false);
      if(courses.includes(changed)&&changed.checked&&bundle)bundle.checked=false;
      const selected=$('input[name="expo-pass"]:checked',root)?.value||'none';const pass=C.tickets.find(x=>x.id===selected);const lines=[];let total=0;
      dayPicker.hidden=selected!=='day1';visitDay.required=selected==='day1';
      if(pass){total+=pass.price;const day=selected==='day1'?(visitDay.selectedOptions[0]?.textContent||'Choose day'):'';lines.push(`${pass.name}${day?' - '+day:''}: ${money(pass.price)}`);}
      if(bundle?.checked){total+=C.courseBundlePrice;lines.push(`Financial course - all three sessions: ${money(C.courseBundlePrice)}`);}else courses.filter(x=>x.checked).forEach(input=>{const course=C.courses.find(c=>c.id===input.value);if(course){total+=course.price;lines.push(`Financial course ${course.name}: ${money(course.price)}`);}});
      const list=$('[data-selection-lines]',root);list.replaceChildren();(lines.length?lines:['Choose a pass or course to see the estimate.']).forEach(t=>{const li=document.createElement('li');li.textContent=t;list.append(li);});
      $('[data-ticket-total]',root).textContent=money(total);
      $('[data-ticket-message]',root).textContent=selected==='day1'&&!visitDay.value?'Choose the expo day for your one-day pass.':lines.length?'Selection preview only. No ticket has been issued and no payment has been taken.':'Select an option to review.';
    }
    [...radios,...courses,...(bundle?[bundle]:[]),visitDay].forEach(x=>x.addEventListener('change',()=>update(x)));update();
  });
  if(readStorage(AGE_KEY)?.verified===true)enter();else askAge();
})();
