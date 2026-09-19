(function () {
  "use strict";

  var SITE = window.PASS_SITE || {};

  function qs(selector, root) {
    return (root || document).querySelector(selector);
  }

  function qsa(selector, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(selector));
  }

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function setGlobalLinks() {
    var links = SITE.links || {};
    qsa("[data-site-link]").forEach(function (el) {
      var key = el.getAttribute("data-site-link");
      var value = links[key];
      if (!value) return;
      el.setAttribute("href", value);
      if (/^https?:\/\//i.test(value) && value.indexOf("https://www.playatscale.com") !== 0) {
        el.setAttribute("rel", "noopener");
      }
    });
  }

  function setActiveNavigation() {
    var page = document.body.getAttribute("data-page");
    if (!page) return;
    qsa("[data-nav]").forEach(function (link) {
      if (link.getAttribute("data-nav") === page) {
        link.setAttribute("aria-current", "page");
      }
    });
  }

  function setupMobileNavigation() {
    var toggle = qs("[data-nav-toggle]");
    var nav = qs("[data-nav-main]");
    if (!toggle || !nav) return;

    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      document.body.classList.toggle("nav-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.textContent = open ? "Close" : "Menu";
    });

    qsa("a", nav).forEach(function (link) {
      link.addEventListener("click", function () {
        if (nav.classList.contains("open")) {
          nav.classList.remove("open");
          document.body.classList.remove("nav-open");
          toggle.setAttribute("aria-expanded", "false");
          toggle.textContent = "Menu";
        }
      });
    });
  }

  function configureCommerce() {
    var commerce = SITE.commerce || {};
    var fallback = (SITE.links && SITE.links.cannaconProgram) || "education.html";

    qsa("[data-commerce]").forEach(function (button) {
      var key = button.getAttribute("data-commerce");
      var item = commerce[key];
      if (!item || item.enabled === false) {
        button.setAttribute("data-content-hidden", "true");
        return;
      }

      var href = item.paymentUrl || item.registrationUrl || fallback;
      button.setAttribute("href", href);

      if (item.paymentUrl) {
        button.textContent = "Pay & Register";
        button.setAttribute("data-commerce-status", "live");
      } else if (item.registrationUrl) {
        button.textContent = "Register";
        button.setAttribute("data-commerce-status", "live");
      } else {
        button.textContent = "Program / Registration Info";
        button.setAttribute("data-commerce-status", "info");
      }
    });
  }

  function renderDownloads() {
    var host = qs("[data-downloads]");
    if (!host) return;

    var items = (SITE.downloads || []).filter(function (item) { return item.enabled; });
    var empty = qs("[data-downloads-empty]");

    if (!items.length) {
      if (empty) empty.removeAttribute("data-content-hidden");
      return;
    }

    if (empty) empty.setAttribute("data-content-hidden", "true");
    host.innerHTML = items.map(function (item) {
      return [
        '<article class="resource-card">',
        '<span class="resource-type">' + escapeHtml(item.type) + '</span>',
        '<h3>' + escapeHtml(item.title) + '</h3>',
        '<p>' + escapeHtml(item.description) + '</p>',
        '<a class="btn text" href="' + escapeHtml(item.href) + '" download>Download</a>',
        '</article>'
      ].join("");
    }).join("");
  }

  function renderGallery() {
    var section = qs("[data-event-gallery-section]");
    var host = qs("[data-event-gallery]");
    if (!host) return;
    var items = (SITE.eventGallery || []).filter(function (item) { return item.enabled; });
    if (!items.length) return;

    host.innerHTML = items.map(function (item) {
      return [
        '<figure class="gallery-item">',
        '<img loading="lazy" src="' + escapeHtml(item.src) + '" alt="' + escapeHtml(item.alt) + '">',
        item.caption ? '<figcaption>' + escapeHtml(item.caption) + '</figcaption>' : '',
        '</figure>'
      ].join("");
    }).join("");
    host.classList.add("has-items");
    if (section) section.classList.add("has-items");
  }

  function renderTestimonials() {
    var section = qs("[data-testimonials-section]");
    var host = qs("[data-testimonials]");
    if (!section || !host) return;

    var items = (SITE.testimonials || []).filter(function (item) { return item.enabled && item.quote; });
    if (!items.length) return;

    host.innerHTML = items.map(function (item) {
      var photo = item.photo ? '<img loading="lazy" src="' + escapeHtml(item.photo) + '" alt="' + escapeHtml(item.name) + '">' : '';
      var subtitle = [item.role, item.company].filter(Boolean).join(", ");
      return [
        '<article class="testimonial">',
        '<blockquote>&ldquo;' + escapeHtml(item.quote) + '&rdquo;</blockquote>',
        '<div class="testimonial-person">',
        photo,
        '<div><strong>' + escapeHtml(item.name) + '</strong><span>' + escapeHtml(subtitle) + '</span></div>',
        '</div>',
        '</article>'
      ].join("");
    }).join("");
    section.classList.add("has-items");
  }

  function renderWebcasts() {
    var host = qs("[data-webcasts]");
    if (!host) return;
    var items = (SITE.webcasts || []).filter(function (item) { return item.enabled; });
    var empty = qs("[data-webcasts-empty]");

    if (!items.length) {
      if (empty) empty.removeAttribute("data-content-hidden");
      return;
    }

    if (empty) empty.setAttribute("data-content-hidden", "true");
    host.innerHTML = items.map(function (item) {
      var primary = item.paymentUrl || item.registrationUrl || ((SITE.links || {}).scheduling || "contact.html");
      var label = item.paymentUrl ? "Pay & Register" : (item.registrationUrl ? "Register" : "Ask About This Session");
      var price = item.price ? " | " + item.price : "";
      return [
        '<article class="webcast-card">',
        '<span class="meta">' + escapeHtml(item.platform) + price + '</span>',
        '<h3>' + escapeHtml(item.title) + '</h3>',
        '<p><strong>' + escapeHtml(item.dateLabel) + '</strong></p>',
        '<p>' + escapeHtml(item.description) + '</p>',
        '<div class="btn-row"><a class="btn primary" href="' + escapeHtml(primary) + '">' + escapeHtml(label) + '</a></div>',
        '</article>'
      ].join("");
    }).join("");
  }

  function renderVideos() {
    var host = qs("[data-videos]");
    if (!host) return;
    var items = (SITE.onDemandVideos || []).filter(function (item) { return item.enabled && item.vimeoId; });
    var empty = qs("[data-videos-empty]");

    if (!items.length) {
      if (empty) empty.removeAttribute("data-content-hidden");
      return;
    }

    if (empty) empty.setAttribute("data-content-hidden", "true");
    host.innerHTML = items.map(function (item) {
      var hash = item.vimeoHash ? "&h=" + encodeURIComponent(item.vimeoHash) : "";
      var src = "https://player.vimeo.com/video/" + encodeURIComponent(item.vimeoId) + "?dnt=1&title=0&byline=0&portrait=0" + hash;
      var duration = item.duration ? '<span class="small">' + escapeHtml(item.duration) + '</span>' : '';
      return [
        '<article class="video-card">',
        '<div class="video-embed"><iframe loading="lazy" src="' + src + '" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen title="' + escapeHtml(item.title) + '"></iframe></div>',
        '<div class="video-body"><h3>' + escapeHtml(item.title) + '</h3>' + duration + '<p>' + escapeHtml(item.description) + '</p></div>',
        '</article>'
      ].join("");
    }).join("");
  }

  function applyFrameworkDownloads() {
    var downloads = SITE.downloads || [];
    qsa("[data-framework-key]").forEach(function (item) {
      var key = item.getAttribute("data-framework-key");
      var match = downloads.find(function (d) { return d.title === key && d.enabled; });
      if (!match) return;
      var link = qs(".download-link", item);
      if (!link) return;
      link.setAttribute("href", match.href);
      item.classList.add("has-download");
    });
  }

  function setCurrentYear() {
    qsa("[data-year]").forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  }

  function init() {
    setGlobalLinks();
    setActiveNavigation();
    setupMobileNavigation();
    configureCommerce();
    renderDownloads();
    renderGallery();
    renderTestimonials();
    renderWebcasts();
    renderVideos();
    applyFrameworkDownloads();
    setCurrentYear();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
