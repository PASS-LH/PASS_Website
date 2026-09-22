/* CannaCon site behavior. No client-side secrets. */
(() => {
  'use strict';
  const script=document.currentScript;
  const BASE=new URL('.',script.src);
  const C=window.CANNACON_CONFIG;
  if(!C){console.error('CannaCon public configuration did not load.');return;}
  const $=(s,root=document)=>root.querySelector(s);
  const $$=(s,root=document)=>[...root.querySelectorAll(s)];
  const AGE_KEY='cc_age_ack_v3';
  const PRIVACY_KEY='cc_privacy_v3';
  const DAY=86400000;
  const gate=$('#age-gate');
  const prefs=$('#privacy-dialog');
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  let entered=false;

  function emit(name,detail={}){
    window.dispatchEvent(new CustomEvent('cannacon:interaction',{detail:{event:name,...detail}}));
  }
  $$('[data-track]').forEach(el=>el.addEventListener('click',()=>emit(el.dataset.track,{show:el.dataset.show||'',href:el.getAttribute('href')||''})));

  function readStorage(key){
    let value;
    try{value=localStorage.getItem(key);}catch(_){}
    if(!value){
      let cookie;
      try{cookie=document.cookie.split('; ').find(x=>x.startsWith(key+'='));}catch(_){}
      if(cookie){try{value=decodeURIComponent(cookie.slice(key.length+1));}catch(_){} }
    }
    try{const data=JSON.parse(value);return data&&Number.isFinite(data.expiresAt)&&data.expiresAt>Date.now()?data:null;}catch(_){return null;}
  }
  function remember(key,data,days){
    const value=JSON.stringify({...data,expiresAt:Date.now()+days*DAY});
    try{localStorage.setItem(key,value);}catch(_){}
    try{document.cookie=`${key}=${encodeURIComponent(value)}; Max-Age=${Math.round(days*86400)}; Path=${BASE.pathname}; SameSite=Lax${location.protocol==='https:'?'; Secure':''}`;}catch(_){}
  }
  function closeMenu(){
    const nav=$('#primary-nav'),btn=$('[data-menu-toggle]');
    nav?.classList.remove('is-open');
    btn?.setAttribute('aria-expanded','false');
  }
  $('[data-menu-toggle]')?.addEventListener('click',e=>{
    const open=$('#primary-nav').classList.toggle('is-open');
    e.currentTarget.setAttribute('aria-expanded',String(open));
  });
  $$('#primary-nav a').forEach(a=>a.addEventListener('click',closeMenu));
  document.addEventListener('keydown',e=>{
    if(e.key==='Escape'&&$('#primary-nav')?.classList.contains('is-open')){closeMenu();$('[data-menu-toggle]')?.focus();}
  });

  function enter(){
    if(gate?.open)gate.close();
    document.documentElement.classList.remove('age-pending');
    entered=true;
    const banner=$('[data-privacy-banner]');
    if(banner)banner.hidden=Boolean(readStorage(PRIVACY_KEY));
    if(C.media.heroVideoAutoplay&&!reduced.matches&&!navigator.connection?.saveData)startHero(false);
    setupVideoObserver();
  }
  function askAge(){
    entered=false;
    $('[data-age-actions]').hidden=false;
    $('[data-age-restricted]').hidden=true;
    $('#age-title').textContent='Are you 21 or older?';
    if(hero&&!hero.paused)hero.pause();
    document.documentElement.classList.add('age-pending');
    const banner=$('[data-privacy-banner]');if(banner)banner.hidden=true;
    if(prefs?.open)prefs.close();
    if(!gate.open)gate.showModal();
    $('[data-age-yes]').focus();
  }
  gate?.addEventListener('cancel',e=>e.preventDefault());
  $('[data-age-yes]')?.addEventListener('click',()=>{remember(AGE_KEY,{verified:true,acknowledgedAt:Date.now()},C.ageRememberDays);enter();});
  $('[data-age-no]')?.addEventListener('click',()=>{$('[data-age-actions]').hidden=true;$('[data-age-restricted]').hidden=false;$('#age-title').textContent='Thanks for checking.';$('[data-age-reconsider]').focus();});
  $('[data-age-reconsider]')?.addEventListener('click',()=>{$('[data-age-actions]').hidden=false;$('[data-age-restricted]').hidden=true;$('#age-title').textContent='Are you 21 or older?';$('[data-age-yes]').focus();});

  function applyPreferences(allowExternal){
    remember(PRIVACY_KEY,{externalMedia:allowExternal},C.privacyRememberDays);
    const banner=$('[data-privacy-banner]');if(banner)banner.hidden=true;
    if(prefs?.open)prefs.close();
    if(!allowExternal){
      const mount=$('[data-video-mount]');
      if(mount?.dataset.original){mount.innerHTML=mount.dataset.original;bindVideoButton(mount);delete mount.dataset.loaded;}
    }else setupVideoObserver();
  }
  $('[data-privacy-essential]')?.addEventListener('click',()=>applyPreferences(false));
  $$('[data-cookie-settings]').forEach(b=>b.addEventListener('click',()=>{
    if(!entered)return;
    const control=$('[data-external-preference]');
    if(control)control.checked=Boolean(readStorage(PRIVACY_KEY)?.externalMedia);
    prefs?.showModal();
  }));
  $('[data-save-preferences]')?.addEventListener('click',()=>applyPreferences(Boolean($('[data-external-preference]')?.checked)));

  $$('img').forEach(i=>{i.addEventListener('error',()=>i.classList.add('remote-image-failed'));if(i.complete&&i.naturalWidth===0)i.classList.add('remote-image-failed');});

  const hero=$('[data-hero-video]');
  const heroToggle=$('[data-hero-toggle]');
  async function startHero(explicit=true){
    if(!hero||!entered)return;
    if(!explicit&&(reduced.matches||navigator.connection?.saveData))return;
    if(!hero.src)hero.src=C.media.heroVideo;
    try{
      await hero.play();hero.classList.add('is-playing');
      if(heroToggle){heroToggle.textContent='Pause show footage';heroToggle.setAttribute('aria-pressed','true');}
    }catch(_){
      if(heroToggle){heroToggle.textContent='Play show footage';heroToggle.setAttribute('aria-pressed','false');}
      hero.classList.remove('is-playing');
    }
  }
  heroToggle?.addEventListener('click',()=>{
    if(!hero.paused){hero.pause();hero.classList.remove('is-playing');heroToggle.textContent='Play show footage';heroToggle.setAttribute('aria-pressed','false');}
    else startHero(true);
  });
  document.addEventListener('visibilitychange',()=>{if(document.hidden&&hero&&!hero.paused){hero.pause();hero.classList.remove('is-playing');if(heroToggle){heroToggle.textContent='Play show footage';heroToggle.setAttribute('aria-pressed','false');}}});
  reduced.addEventListener?.('change',e=>{if(e.matches&&hero){hero.pause();hero.classList.remove('is-playing');if(heroToggle){heroToggle.textContent='Play show footage';heroToggle.setAttribute('aria-pressed','false');}}});
  if(hero&&'IntersectionObserver' in window){new IntersectionObserver(entries=>{if(!entries[0].isIntersecting&&!hero.paused){hero.pause();hero.classList.remove('is-playing');if(heroToggle){heroToggle.textContent='Play show footage';heroToggle.setAttribute('aria-pressed','false');}}}).observe(hero);}

  function loadYouTube(mount,autoplay){
    if(!entered||!mount||mount.dataset.loaded)return;
    mount.dataset.original=mount.innerHTML;
    const frame=document.createElement('iframe');
    const u=new URL(C.media.youtubeEmbed);u.searchParams.set('autoplay',autoplay?'1':'0');u.searchParams.set('rel','0');
    frame.src=u.href;frame.title='CannaCon experience video';frame.allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';frame.allowFullscreen=true;frame.referrerPolicy='strict-origin-when-cross-origin';
    mount.replaceChildren(frame);mount.dataset.loaded='true';
  }
  function bindVideoButton(root=document){$('[data-play-youtube]',root)?.addEventListener('click',e=>loadYouTube(e.currentTarget.closest('[data-video-mount]'),true));}
  bindVideoButton();
  function setupVideoObserver(){
    const mount=$('[data-video-mount]');
    if(!mount||!entered||!readStorage(PRIVACY_KEY)?.externalMedia)return;
    const observer=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){loadYouTube(mount,false);observer.disconnect();}},{rootMargin:'100px'});
    observer.observe(mount);
  }

  async function postForm(def,data){
    if(!def.endpoint)return false;
    const response=await fetch(def.endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(Object.fromEntries(data.entries()))});
    if(!response.ok)throw new Error('Form submission failed');
    return true;
  }

  $$('[data-email-form]').forEach(form=>{
    const key=form.dataset.emailForm;
    const def=C.forms[key];
    const preview=$('[data-email-preview]',form);
    const output=$('[data-email-text]',form);
    const status=$('[data-form-status]',form);
    let draft='';
    let started=false;
    function setShowFromUrl(){
      const chosen=new URLSearchParams(location.search).get('show');
      const showSelect=form.elements.namedItem('show');
      if(showSelect&&chosen&&[...showSelect.options].some(o=>o.value===chosen))showSelect.value=chosen;
    }
    setShowFromUrl();
    form.addEventListener('input',()=>{
      if(!started){started=true;emit('form_start',{form:key});}
      if(preview)preview.hidden=true;
    },{once:false});
    form.addEventListener('submit',async e=>{
      e.preventDefault();
      if(!form.reportValidity())return;
      const data=new FormData(form);
      const names=[...new Set([...data.keys()])];
      const lines=names.map(name=>{
        const field=$$('input,select,textarea',form).find(x=>x.name===name);
        let value=data.getAll(name).map(String).join('; ');
        if(name==='show'){
          const opt=form.elements.namedItem('show')?.selectedOptions?.[0];
          if(opt)value=opt.textContent;
        }
        return `${field?.dataset.label||name}: ${value}`;
      });
      draft=`${def.title}\n\n${lines.join('\n\n')}`;
      if(output)output.value=draft;
      status.textContent='';
      try{
        if(await postForm(def,data)){
          emit('form_submit',{form:key,method:'endpoint'});
          status.textContent='Thanks. Your inquiry has been sent to CannaCon.';
          form.reset();setShowFromUrl();if(preview)preview.hidden=true;return;
        }
      }catch(_){status.textContent='We could not send the form directly. Opening email instead.';}
      const base=`mailto:${def.recipient}?subject=${encodeURIComponent(def.subject)}`;
      const full=`${base}&body=${encodeURIComponent(draft)}`;
      emit('form_email_open',{form:key});
      if(preview){preview.hidden=false;preview.focus();}
      window.location.href=full.length<=1800?full:base;
      status.textContent='If your email app did not open, use the copy option below.';
    });
    $('[data-copy-email]',form)?.addEventListener('click',async()=>{
      if(!draft)return;
      const text=`To: ${def.recipient}\nSubject: ${def.subject}\n\n${draft}`;
      try{await navigator.clipboard.writeText(text);status.textContent='Copied. Paste it into your email and send it to CannaCon.';}
      catch(_){output.focus();output.select();status.textContent='Select and copy the message above.';}
    });
    $('[data-save-email]',form)?.addEventListener('click',()=>{
      if(!draft)return;
      const blob=new Blob([`To: ${def.recipient}\nSubject: ${def.subject}\n\n${draft}`],{type:'text/plain;charset=utf-8'});
      const objectURL=URL.createObjectURL(blob);const a=document.createElement('a');a.href=objectURL;a.download=`cannacon-${key}-inquiry.txt`;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(objectURL),1000);
      status.textContent='Saved. Attach or paste the message into your email.';
    });
  });

  if(readStorage(AGE_KEY)?.verified===true)enter();else askAge();
})();
