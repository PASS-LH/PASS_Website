/*
  PLAY AT SCALE - CHANGEABLE SITE CONTENT
  ---------------------------------------
  This file is intentionally the main place to update links, event registrations,
  payment links, downloadable files, testimonial photos, class/show photos,
  webcast listings, and Vimeo on-demand videos.

  Safe rule for non-developers:
  - Edit text between quotation marks only.
  - Keep commas and braces in place.
  - Set enabled: true only after the referenced file or link is live.

  GitHub Pages cannot securely process credit cards itself. For payments, use a
  hosted checkout URL from Stripe Payment Links, Square, Eventbrite, CannaCon,
  or another provider and paste that URL into paymentUrl below.
*/

window.PASS_SITE = {
  links: {
    home: "https://www.playatscale.com/",
    email: "mailto:lucashobbs@playatscale.com",
    scheduling: "https://meetings-na2.hubspot.com/lucas-hobbs",

    // Replace this one URL when CannaCon publishes the dedicated finance program page.
    cannaconProgram: "https://cannacon.org/",

    // Optional future links. Leave blank until they exist.
    linkedIn: "https://www.linkedin.com/in/lucashobbs",
    newsletterSignup: "",
    generalPaymentPage: ""
  },

  commerce: {
    /*
      Recommended static-site model:
      1. Keep the site on GitHub Pages.
      2. Use external hosted checkout pages.
      3. Paste the secure checkout link into paymentUrl.
      4. If a separate event registration page is required, use registrationUrl.

      Buttons automatically prefer paymentUrl, then registrationUrl, then the
      CannaCon program link.
    */
    lecture: {
      label: "Open Finance & Strategy Lecture",
      price: "$50",
      paymentUrl: "",
      registrationUrl: "",
      enabled: true
    },
    level1: {
      label: "Level 1 - Business Finance Foundations",
      price: "$250",
      paymentUrl: "",
      registrationUrl: "",
      enabled: true
    },
    level2: {
      label: "Level 2 - Financial Management & Analytics",
      price: "$250",
      paymentUrl: "",
      registrationUrl: "",
      enabled: true
    },
    level3: {
      label: "Level 3 - Capital & Strategic Finance",
      price: "$250",
      paymentUrl: "",
      registrationUrl: "",
      enabled: true
    },
    bundle: {
      label: "Full Program Bundle",
      price: "$500",
      paymentUrl: "",
      registrationUrl: "",
      enabled: true
    }
  },

  /*
    DOWNLOADABLE MATERIALS
    Put files in the referenced folder, then set enabled: true.
    These can be PDF slides, XLSX tools, DOCX worksheets, ZIP packages, etc.
  */
  downloads: [
    {
      title: "Business Finance & Strategy Program Overview",
      description: "Program overview, format, learning outcomes, and participation details.",
      type: "Program PDF",
      href: "assets/downloads/business-finance-strategy-program-overview.pdf",
      enabled: false
    },
    {
      title: "Business Finance Foundations Slides",
      description: "Participant slide deck for the Level 1 session.",
      type: "Slides PDF",
      href: "assets/slides/level-1-business-finance-foundations.pdf",
      enabled: false
    },
    {
      title: "Financial Management & Analytics Slides",
      description: "Participant slide deck for the Level 2 session.",
      type: "Slides PDF",
      href: "assets/slides/level-2-financial-management-analytics.pdf",
      enabled: false
    },
    {
      title: "Capital & Strategic Finance Slides",
      description: "Participant slide deck for the Level 3 session.",
      type: "Slides PDF",
      href: "assets/slides/level-3-capital-strategic-finance.pdf",
      enabled: false
    },
    {
      title: "Cash-Flow Forecasting Model",
      description: "Take-home model for projecting cash movement and testing operating assumptions.",
      type: "Framework",
      href: "assets/frameworks/cash-flow-forecasting-model.xlsx",
      enabled: false
    },
    {
      title: "Unit Economics & Pricing Calculator",
      description: "Model for testing margin, pricing, contribution economics, and sensitivity.",
      type: "Framework",
      href: "assets/frameworks/unit-economics-pricing-calculator.xlsx",
      enabled: false
    },
    {
      title: "KPI Dashboard Template",
      description: "Template for connecting operating metrics with business performance.",
      type: "Framework",
      href: "assets/frameworks/kpi-dashboard-template.xlsx",
      enabled: false
    },
    {
      title: "Scenario Planning Framework",
      description: "Structured approach for comparing alternative operating and financial paths.",
      type: "Framework",
      href: "assets/frameworks/scenario-planning-framework.xlsx",
      enabled: false
    },
    {
      title: "Lender & Investor Readiness Checklist",
      description: "Checklist for organizing the information external capital providers commonly expect.",
      type: "Checklist",
      href: "assets/frameworks/lender-investor-readiness-checklist.pdf",
      enabled: false
    },
    {
      title: "Investment Evaluation Toolkit",
      description: "Frameworks for business cases, return analysis, risk, and capital allocation.",
      type: "Framework",
      href: "assets/frameworks/investment-evaluation-toolkit.xlsx",
      enabled: false
    }
  ],

  /*
    SHOW / CLASS / EVENT PHOTOS
    Add photos to assets/events/. Use descriptive filenames and captions.
    The gallery stays invisible until at least one item is enabled.
  */
  eventGallery: [
    {
      src: "assets/events/cannacon-classroom-01.jpg",
      alt: "Play At Scale business finance session at CannaCon",
      caption: "Applied business finance session at CannaCon.",
      enabled: false
    },
    {
      src: "assets/events/cannacon-classroom-02.jpg",
      alt: "Attendees participating in a Play At Scale class",
      caption: "Instructor-led working session for business owners and operators.",
      enabled: false
    },
    {
      src: "assets/events/cannacon-lecture-01.jpg",
      alt: "Open lecture session at a CannaCon event",
      caption: "Open lecture format for broader finance and strategy education.",
      enabled: false
    }
  ],

  /*
    TESTIMONIALS
    Photos are optional. If photo is blank, the testimonial renders without it.
    Only use quotes you have permission to publish.
  */
  testimonials: [
    {
      quote: "",
      name: "",
      role: "",
      company: "",
      photo: "assets/testimonials/testimonial-01.jpg",
      enabled: false
    },
    {
      quote: "",
      name: "",
      role: "",
      company: "",
      photo: "assets/testimonials/testimonial-02.jpg",
      enabled: false
    }
  ],

  /*
    LIVE WEBCASTS
    registrationUrl can point to Zoom Webinar registration, a Google Calendar
    appointment/event page, Eventbrite, or another registration provider.
    paymentUrl can be a hosted Stripe/Square/etc checkout link.
  */
  webcasts: [
    {
      title: "Business Finance Foundations - Live Webcast",
      dateLabel: "Date to be announced",
      platform: "Zoom or Google Meet",
      description: "Live online version of the foundational business finance session.",
      registrationUrl: "",
      paymentUrl: "",
      price: "",
      enabled: false
    },
    {
      title: "Financial Management & Analytics - Live Webcast",
      dateLabel: "Date to be announced",
      platform: "Zoom or Google Meet",
      description: "Live online session focused on KPI design, analytics, and management systems.",
      registrationUrl: "",
      paymentUrl: "",
      price: "",
      enabled: false
    }
  ],

  /*
    ON-DEMAND VIDEO LIBRARY
    Vimeo is recommended because it embeds cleanly into a static GitHub Pages site.
    Paste the numeric Vimeo video ID into vimeoId, then set enabled: true.
    If Vimeo provides a privacy hash, paste it into vimeoHash.
  */
  onDemandVideos: [
    {
      title: "Business Finance Foundations",
      description: "On-demand session covering the financial fundamentals operators need to understand.",
      vimeoId: "",
      vimeoHash: "",
      duration: "",
      enabled: false
    },
    {
      title: "Financial Management & Analytics",
      description: "On-demand session covering KPIs, operating visibility, and turning information into action.",
      vimeoId: "",
      vimeoHash: "",
      duration: "",
      enabled: false
    },
    {
      title: "Capital & Strategic Finance",
      description: "On-demand session covering business cases, capital decisions, scenarios, and finance readiness.",
      vimeoId: "",
      vimeoHash: "",
      duration: "",
      enabled: false
    }
  ]
};
