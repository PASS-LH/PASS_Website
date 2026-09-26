(function () {
  "use strict";

  var SITE = window.PASS_SITE || {};
  var PROGRAM = SITE.program || {};

  function qs(selector, root) { return (root || document).querySelector(selector); }
  function qsa(selector, root) { return Array.prototype.slice.call((root || document).querySelectorAll(selector)); }
  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function commerceUrl(key) {
    var item = SITE.commerce && SITE.commerce[key];
    var fallback = SITE.links && SITE.links.cannaconProgram;
    if (!item || item.enabled === false) return fallback || "contact.html";
    return item.paymentUrl || item.registrationUrl || fallback || "contact.html";
  }

  function appendAttribution(url, content) {
    try {
      var resolved = new URL(url, window.location.href);
      if (resolved.origin === window.location.origin && resolved.pathname.indexOf(".html") !== -1) return resolved.href;

      var current = new URL(window.location.href);
      ["utm_source", "utm_medium", "utm_campaign", "utm_term"].forEach(function (key) {
        var value = current.searchParams.get(key);
        if (value && !resolved.searchParams.get(key)) resolved.searchParams.set(key, value);
      });
      if (!resolved.searchParams.get("utm_source")) resolved.searchParams.set("utm_source", "playatscale");
      if (!resolved.searchParams.get("utm_medium")) resolved.searchParams.set("utm_medium", "referral");
      if (!resolved.searchParams.get("utm_campaign")) resolved.searchParams.set("utm_campaign", "business_finance_strategy");
      if (content && !resolved.searchParams.get("utm_content")) resolved.searchParams.set("utm_content", content);
      return resolved.href;
    } catch (e) {
      return url;
    }
  }

  function renderOffers() {
    var host = qs("[data-education-offers]");
    if (!host || !PROGRAM.offers) return;
    var keys = ["lecture", "applied", "bundle"];
    host.innerHTML = keys.map(function (key) {
      var item = PROGRAM.offers[key];
      if (!item) return "";
      var isBundle = key === "bundle";
      var href = appendAttribution(commerceUrl(key), key);
      var priceContext = key === "applied" ? "per applied level" : (key === "bundle" ? "live course bundle" : "overview lecture");
      return [
        '<article class="education-offer' + (isBundle ? ' featured' : '') + '">',
        '<span class="offer-type">' + esc(item.type) + '</span>',
        '<h3>' + esc(item.name) + '</h3>',
        '<div class="offer-price-line"><strong>' + esc(item.price) + '</strong><span>' + esc(priceContext) + '</span></div>',
        '<p><strong>' + esc(item.duration) + '</strong>' + (item.format ? ' · ' + esc(item.format) : '') + '</p>',
        '<p>' + esc(item.bestFor) + '</p>',
        '<p class="offer-outcome">' + esc(item.outcome || item.note || '') + '</p>',
        '<a class="btn ' + (isBundle ? 'primary' : 'outline') + '" href="' + esc(href) + '" data-track="offer_' + esc(key) + '" data-product="' + esc(key) + '">' + (key === "lecture" ? 'See lecture options' : (key === "bundle" ? 'See full program options' : 'Choose an applied level')) + '</a>',
        '</article>'
      ].join("");
    }).join("");
  }

  function renderLevels() {
    var host = qs("[data-education-levels]");
    if (!host || !PROGRAM.offers) return;
    var keys = ["level1", "level2", "level3"];
    host.innerHTML = keys.map(function (key) {
      var item = PROGRAM.offers[key];
      if (!item) return "";
      var href = appendAttribution(commerceUrl(key), key);
      return [
        '<article class="education-level">',
          '<div class="level-top">',
            '<span class="level-label">' + esc(item.type) + '</span>',
            '<h3>' + esc(item.name) + '</h3>',
            '<div class="level-sequence">' + (item.sequence || []).map(function (step) { return '<span>' + esc(step) + '</span>'; }).join('') + '</div>',
          '</div>',
          '<div class="level-body">',
            '<div class="level-meta"><span>' + esc(item.duration) + '</span><strong>' + esc(item.price) + '</strong></div>',
            '<h4>Best for</h4><p>' + esc(item.bestFor) + '</p>',
            '<h4>Decisions addressed</h4><p>' + esc(item.decisions) + '</p>',
            '<h4>Core topics</h4><div class="topic-list">' + (item.topics || []).map(function (topic) { return '<span>' + esc(topic) + '</span>'; }).join('') + '</div>',
            '<div class="level-capability">' + esc(item.capability) + '</div>',
            '<a class="btn text" href="' + esc(href) + '" data-track="level_' + esc(key) + '" data-product="' + esc(key) + '">View current course options</a>',
          '</div>',
        '</article>'
      ].join("");
    }).join("");
  }

  function wireProgramLinks() {
    var raw = SITE.links && SITE.links.cannaconProgram;
    if (!raw) return;
    qsa("[data-cannacon-program]").forEach(function (link, index) {
      link.href = appendAttribution(raw, link.getAttribute("data-track") || ("program_link_" + index));
    });
  }

  function track(eventName, payload) {
    var detail = Object.assign({ event: eventName, page: "education" }, payload || {});
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(detail);
    try { window.dispatchEvent(new CustomEvent("pass:track", { detail: detail })); } catch (e) {}
  }

  function wireTracking() {
    document.addEventListener("click", function (event) {
      var target = event.target.closest("[data-track]");
      if (!target) return;
      track("education_interaction", {
        action: target.getAttribute("data-track") || "click",
        product: target.getAttribute("data-product") || "",
        href: target.href || ""
      });
    });

    qsa(".faq-list details").forEach(function (detail, index) {
      detail.addEventListener("toggle", function () {
        if (detail.open) track("education_faq_open", { index: index + 1, question: (qs("summary", detail) || {}).textContent || "" });
      });
    });
  }

  function stickyCta() {
    var sticky = qs("[data-education-sticky]");
    var hero = qs(".education-hero");
    var footer = qs(".site-footer");
    if (!sticky || !hero) return;

    function update() {
      var pastHero = window.scrollY > Math.max(420, hero.offsetHeight * 0.72);
      var nearFooter = footer && footer.getBoundingClientRect().top < window.innerHeight + 120;
      sticky.classList.toggle("visible", pastHero && !nearFooter);
    }
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
  }

  function init() {
    renderOffers();
    renderLevels();
    wireProgramLinks();
    wireTracking();
    stickyCta();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
