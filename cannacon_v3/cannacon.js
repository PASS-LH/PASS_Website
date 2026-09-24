/* CannaCon v3 client behavior. No secrets live here. */
(() => {
  'use strict';
  const C = window.CANNACON_CONFIG || {};
  const $ = (s,r=document)=>r.querySelector(s);
  const $$ = (s,r=document)=>[...r.querySelectorAll(s)];
  const DAY=86400000;
  const AGE_KEY='cc_age_ack_v3';
  const PRIVACY_KEY='cc_privacy_v3';
  const reduced=window.matchMedia?.('(prefers-reduced-motion: reduce)');
  const gate=$('#age-gate');
  const prefs=$('#privacy-dialog');
  let entered=false;

  function emit(event, detail={}){window.dispatchEvent(new CustomEvent('cannacon:interaction',{detail:{event,...detail}}));}
  $$('[data-track]').forEach(el=>el.addEventListener('click',()=>emit(el.dataset.track,{href:el.getAttribute('href')||'',show:el.dataset.show||''})));

  function read(key){try{const raw=localStorage.getItem(key);if(!raw)return null;const v=JSON.parse(raw);return v?.expiresAt>Date.now()?v:null;}catch{return null;}}
  function remember(key,payload,days){try{localStorage.setItem(key,JSON.stringify({...payload,expiresAt:Date.now()+days*DAY}));}catch{}}
  function closeMenu(){const nav=$('#primary-nav'),btn=$('[data-menu-toggle]');nav?.classList.remove('is-open');btn?.setAttribute('aria-expanded','false');}
  $('[data-menu-toggle]')?.addEventListener('click',e=>{const open=$('#primary-nav')?.classList.toggle('is-open');e.currentTarget.setAttribute('aria-expanded',String(Boolean(open)));});
  $$('#primary-nav a').forEach(a=>a.addEventListener('click',closeMenu));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeMenu();if(prefs?.open)prefs.close();}});

  const hero=$('[data-hero-video]');
  const heroToggle=$('[data-hero-toggle]');
  async function playHero(){if(!hero||!entered)return;if(!hero.src)hero.src=C.media?.heroVideo||'';try{await hero.play();hero.classList.add('is-playing');heroToggle?.setAttribute('aria-pressed','true');if(heroToggle)heroToggle.textContent='Pause show footage';}catch{}}
  heroToggle?.addEventListener('click',()=>{if(hero.paused)playHero();else{hero.pause();hero.classList.remove('is-playing');heroToggle.textContent='Play show footage';heroToggle.setAttribute('aria-pressed','false');}});

  function enter(){if(gate?.open)gate.close();document.documentElement.classList.remove('age-pending');entered=true;const banner=$('[data-privacy-banner]');if(banner)banner.hidden=Boolean(read(PRIVACY_KEY));}
  function askAge(){document.documentElement.classList.add('age-pending');gate?.showModal();$('[data-age-yes]')?.focus();}
  gate?.addEventListener('cancel',e=>e.preventDefault());
  $('[data-age-yes]')?.addEventListener('click',()=>{remember(AGE_KEY,{verified:true},C.ageRememberDays||180);enter();});
  $('[data-age-no]')?.addEventListener('click',()=>{$('[data-age-actions]').hidden=true;$('[data-age-restricted]').hidden=false;});
  $('[data-age-reconsider]')?.addEventListener('click',()=>{$('[data-age-actions]').hidden=false;$('[data-age-restricted]').hidden=true;$('[data-age-yes]')?.focus();});

  function applyPrivacy(external){remember(PRIVACY_KEY,{externalMedia:external},C.privacyRememberDays||180);const banner=$('[data-privacy-banner]');if(banner)banner.hidden=true;if(prefs?.open)prefs.close();}
  $('[data-privacy-essential]')?.addEventListener('click',()=>applyPrivacy(false));
  $$('[data-cookie-settings]').forEach(btn=>btn.addEventListener('click',()=>{const c=$('[data-external-preference]');if(c)c.checked=Boolean(read(PRIVACY_KEY)?.externalMedia);prefs?.showModal();}));
  $('[data-save-preferences]')?.addEventListener('click',()=>applyPrivacy(Boolean($('[data-external-preference]')?.checked)));

  $('[data-play-youtube]')?.addEventListener('click',e=>{
    const mount=e.currentTarget.closest('[data-video-mount]');
    if(!mount||mount.dataset.loaded)return;
    const frame=document.createElement('iframe');
    frame.src=(C.media?.youtubeEmbed||'')+'?rel=0&autoplay=1';frame.title='CannaCon experience video';frame.loading='lazy';frame.allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';frame.allowFullscreen=true;frame.referrerPolicy='strict-origin-when-cross-origin';
    mount.replaceChildren(frame);mount.dataset.loaded='1';
  });

  if(read(AGE_KEY))enter(); else askAge();
  if(reduced?.matches&&hero)hero.pause();

  function money(v){return new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(v);}
  function qs(name){return new URLSearchParams(location.search).get(name);}

  const shop=$('[data-ticket-shop]');
  if(shop){
    const showSel=$('[data-ticket-show]',shop);const catalog=$('[data-ticket-catalog]',shop);const lines=$('[data-cart-lines]',shop);const total=$('[data-cart-total]',shop);const checkout=$('[data-checkout]',shop);const status=$('[data-checkout-status]',shop);const promo=$('[data-promo-code]',shop);
    const initial=qs('show');if(initial&&[...showSel.options].some(o=>o.value===initial))showSel.value=initial;
    function products(){return (C.ticketProducts||[]).filter(p=>p.event===showSel.value);}
    function renderCatalog(){
      if(showSel.value==='LV27'){catalog.innerHTML='<div class="notice"><strong>Las Vegas ticket products are coming shortly.</strong><p>Show details can still be reviewed now.</p></div>';checkout.disabled=true;renderCart();return;}
      const groups=[['Show-floor admission','show_floor'],['Financial Education & Certification','education']];
      catalog.innerHTML=groups.map(([label,cat])=>`<fieldset class="ticket-fieldset"><legend>${label}</legend>${products().filter(p=>p.category===cat).map(p=>`<label class="ticket-row"><span><strong>${p.name}</strong><small>${cat==='education'?'Separately ticketed education':'Expo admission'}</small></span><span class="ticket-price">${money(p.price)}</span><input type="number" min="0" max="20" step="1" value="0" inputmode="numeric" aria-label="Quantity for ${p.name}" data-ticket-qty="${p.sku}"></label>`).join('')}</fieldset>`).join('');
      $$('[data-ticket-qty]',catalog).forEach(i=>i.addEventListener('input',renderCart));renderCart();
    }
    function cart(){return $$('[data-ticket-qty]',catalog).map(i=>({sku:i.dataset.ticketQty,qty:Math.max(0,Math.min(20,Number(i.value)||0)),p:(C.ticketProducts||[]).find(p=>p.sku===i.dataset.ticketQty)})).filter(x=>x.qty>0);}
    function renderCart(){const items=cart();const sum=items.reduce((a,x)=>a+x.qty*x.p.price,0);lines.innerHTML=items.length?items.map(x=>`<div class="cart-line"><span>${x.qty} × ${x.p.name}</span><strong>${money(x.qty*x.p.price)}</strong></div>`).join(''):'<p class="muted">Choose tickets to begin.</p>';total.textContent=money(sum);checkout.disabled=!items.length||showSel.value==='LV27';}
    showSel.addEventListener('change',renderCatalog);
    checkout.addEventListener('click',async()=>{
      const items=cart().map(x=>({sku:x.sku,qty:x.qty}));if(!items.length)return;checkout.disabled=true;status.textContent='Opening secure checkout…';
      try{const res=await fetch('/api/checkout',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({items,promoCode:promo.value.trim().toUpperCase(),source:'ticket-page'})});const data=await res.json();if(!res.ok)throw new Error(data.error||'Checkout could not be created.');location.href=data.url;}catch(err){status.textContent=err.message;checkout.disabled=false;}
    });
    renderCatalog();
  }

  const sponsorShow=$('[data-sponsor-show]');
  $$('[data-sponsor-buy]').forEach(btn=>btn.addEventListener('click',async()=>{
    const status=$('[data-sponsor-status]');const event=sponsorShow?.value||'VA27';if(event==='LV27')return;btn.disabled=true;if(status)status.textContent='Opening secure checkout…';
    try{const res=await fetch('/api/checkout',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({items:[{sku:`SPONSOR:${event}:${btn.dataset.sponsorBuy}`,qty:1}],source:'sponsorship-page'})});const data=await res.json();if(!res.ok)throw new Error(data.error||'Checkout could not be created.');location.href=data.url;}catch(err){if(status)status.textContent=err.message;btn.disabled=false;}
  }));

  const order=$('[data-order-status]');
  if(order){
    const sid=qs('session_id');const title=$('[data-order-title]',order),details=$('[data-order-details]',order),actions=$('[data-order-actions]',order);let ref='';
    async function load(){if(!sid){title.textContent='Order reference missing';details.innerHTML='<p>Use the receipt or contact CannaCon if you need help locating the order.</p>';return;}try{const res=await fetch('/api/order?session_id='+encodeURIComponent(sid));const d=await res.json();if(!res.ok)throw new Error(d.error||'Unable to verify order.');ref=d.orderRef||'';title.textContent=d.paid?'Payment confirmed':'Payment processing';details.innerHTML=`<dl class="order-dl"><div><dt>Order ID</dt><dd>${escapeHtml(ref)}</dd></div><div><dt>Status</dt><dd>${escapeHtml(d.paymentStatus||'processing')}</dd></div><div><dt>Items</dt><dd>${(d.items||[]).map(x=>`${x.quantity} × ${escapeHtml(x.description)}`).join('<br>')}</dd></div></dl>`;actions.hidden=false;}catch(err){title.textContent='We could not verify this order yet';details.innerHTML=`<p>${escapeHtml(err.message)}</p>`;}}
    $('[data-copy-order]',order)?.addEventListener('click',async()=>{if(ref)await navigator.clipboard.writeText(ref);});load();
  }
  function escapeHtml(v){return String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
})();
