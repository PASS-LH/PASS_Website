/*
  PLAY AT SCALE - CHANGEABLE SITE CONTENT
  ---------------------------------------
  This file is the canonical source for public education-program facts used by
  the Play At Scale static site. Keep course names, pricing, duration labels,
  certificate requirements, registration URLs, and resource status here.

  Safe rule for non-developers:
  - Edit text between quotation marks only.
  - Keep commas and braces in place.
  - Set enabled: true only after the referenced file or link is live.
  - Replace the CannaCon staging URL with the final cannacon.org production URL
    before public launch.
*/

window.PASS_SITE = {
  links: {
    home: "https://www.playatscale.com/",
    email: "mailto:lucashobbs@playatscale.com",
    scheduling: "https://meetings-na2.hubspot.com/lucas-hobbs",

    // CURRENT KNOWN DEDICATED PROGRAM PAGE FROM THE PROJECT BRIEF.
    // OWNER VERIFICATION REQUIRED: replace with final cannacon.org production URL.
    cannaconProgram: "https://cannacon.cannacon-org-s-account.workers.dev/education/business-finance-strategy/",

    linkedIn: "https://www.linkedin.com/in/lucashobbs",
    newsletterSignup: "",
    generalPaymentPage: ""
  },

  program: {
    name: "Business Finance & Strategy for Cannabis Operators",
    descriptor: "Applied financial decision training from Play At Scale",
    audience: "Owners, operators, managers, advisors, and decision-makers who need finance to help run the business rather than simply report on it.",
    delivery: "Live instructor-led education currently offered through CannaCon, with team and online formats available by inquiry.",
    positioning: "Practical finance education for people who run businesses.",
    certificateName: "Play At Scale Professional Certificate",
    certificateType: "Private professional certificate",
    certificateDisclaimer: "The Play At Scale professional certificate is a private professional certificate. It is not an academic degree, accredited academic credential, professional license, governmental certification, or independent personnel certification.",
    fullPathwayRequirement: "Complete the required competency areas, complete the integrated applied capstone, disclose substantive AI use and prompts, and defend the work in a 15-minute review presentation.",
    capstone: {
      effort: "Approximately 6-8 hours of independent applied work",
      review: "15-minute review presentation",
      aiPolicy: "AI use is encouraged as an analytical partner. Participants remain responsible for assumptions, calculations, validation, recommendations, and explaining the work. Substantive prompts used must be included with the submission.",
      ownBusiness: "Participants may use a supplied cannabis case, their own business data, or a hybrid where needed. Own-business data may be anonymized or consistently scaled."
    },

    offers: {
      lecture: {
        key: "lecture",
        type: "Get the overview",
        name: "Finance & Strategy Overview",
        price: "$50",
        duration: "Approximately 1 hour",
        format: "Open lecture",
        bestFor: "People who want the core decision framework before choosing deeper applied training.",
        outcome: "Understand the financial questions behind cash, operating economics, and capital decisions."
      },
      applied: {
        key: "applied",
        type: "Solve a specific management problem",
        name: "Individual Applied Level",
        price: "$250",
        duration: "4-hour live applied session",
        format: "Choose Level 1, Level 2, or Level 3",
        bestFor: "Operators who already know which financial capability they need or want to build the pathway one level at a time.",
        outcome: "Choose the level that matches the decision in front of you, with a participant workbook and applicable financial tools."
      },
      level1: {
        key: "level1",
        type: "Level 1",
        name: "Business Finance Foundations",
        price: "$250",
        duration: "4-hour live applied session",
        sequence: ["READ", "DIAGNOSE", "CASH", "DECIDE"],
        bestFor: "Operators who need a practical financial foundation without an accounting lecture.",
        decisions: "Read results, understand unit economics, connect profit to cash, and build a usable forward view.",
        topics: ["Financial statements", "Unit economics", "Cost behavior", "Inventory & sell-through", "Cash forecasting", "Pricing decisions"],
        capability: "Leave able to explain what happened financially, what drove it, what happened to cash, and what management should look at next."
      },
      level2: {
        key: "level2",
        type: "Level 2",
        name: "Financial Management & Analytics",
        price: "$250",
        duration: "4-hour live applied session",
        readiness: "Short readiness work may be assigned for participants entering directly at Level 2.",
        sequence: ["PRIORITIZE", "ALLOCATE", "CONTROL", "ADAPT"],
        bestFor: "Owners and managers deciding where scarce cash, inventory, labor, or capacity should go.",
        decisions: "Prioritize constrained resources, build an executable mix, design control signals, and adapt when assumptions move.",
        topics: ["Contribution economics", "Constraints", "Demand headroom", "Resource allocation", "KPI control boards", "Variance & scenarios"],
        capability: "Leave able to turn product and operating data into explicit allocation rules, thresholds, and prepared management actions."
      },
      level3: {
        key: "level3",
        type: "Level 3",
        name: "Strategic Finance & Capital Allocation",
        price: "$250",
        duration: "4-hour live applied session",
        readiness: "Short readiness work may be assigned for participants entering directly at Level 3.",
        sequence: ["FRAME", "MEASURE", "STRESS", "COMMIT"],
        bestFor: "Decision-makers evaluating equipment, expansion, automation, and other multi-year capital commitments.",
        decisions: "Build relevant project cash flows, measure value, stress the assumptions, test liquidity, and decide whether capital should be committed.",
        topics: ["Relevant cash flow", "Payback & ROI", "NPV & IRR", "Break-even", "Liquidity", "Capital rationing"],
        capability: "Leave able to separate an attractive spreadsheet return from a fundable, resilient, governable investment decision."
      },
      bundle: {
        key: "bundle",
        type: "Build the complete toolkit",
        name: "Lecture + All Three Applied Levels",
        price: "$500",
        duration: "1-hour lecture + three 4-hour live applied levels",
        format: "Multi-session pathway",
        bestFor: "Owners and managers who want the complete operating-finance framework and may pursue the professional certificate.",
        includes: ["Finance & Strategy Overview", "Level 1", "Level 2", "Level 3"],
        note: "All three applied levels are $250 each at standalone pricing ($750 total); the $500 live-course bundle also includes the overview lecture. The full live pathway is not a one-day course. Sessions are completed according to published course dates. The professional certificate additionally requires the integrated applied capstone and 15-minute review presentation."
      }
    },

    cases: {
      grower: {
        name: "Cedar Ridge Cultivation",
        label: "Grower / Producer",
        questions: [
          "Which products create the most contribution per constrained unit?",
          "Does sell-through support additional production?",
          "Where should limited flower or production capacity go?",
          "Does automation justify the capital commitment?"
        ]
      },
      retail: {
        name: "Harbor Street Cannabis",
        label: "Retail",
        questions: [
          "Which categories create the strongest contribution per inventory dollar?",
          "Where is there real demand headroom?",
          "Which KPI should trigger action?",
          "Can expansion be funded while maintaining a cash reserve?"
        ]
      }
    }
  },

  commerce: {
    // Paste a direct hosted checkout URL into paymentUrl when available.
    // Otherwise paste the event/course selection URL into registrationUrl.
    // Buttons fall back to links.cannaconProgram.
    lecture: { paymentUrl: "", registrationUrl: "", enabled: true },
    level1: { paymentUrl: "", registrationUrl: "", enabled: true },
    level2: { paymentUrl: "", registrationUrl: "", enabled: true },
    level3: { paymentUrl: "", registrationUrl: "", enabled: true },
    bundle: { paymentUrl: "", registrationUrl: "", enabled: true }
  },

  /*
    DOWNLOADABLE MATERIALS
    Only enabled items are rendered on resources.html by the existing site JS.
    Leave participant-only or unreleased tools disabled so the public site never
    shows a broken Download button.
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
      title: "Cash-Flow Forecasting Model",
      description: "Take-home model for projecting cash movement and testing operating assumptions.",
      type: "Participant Resource",
      href: "assets/frameworks/cash-flow-forecasting-model.xlsx",
      enabled: false
    },
    {
      title: "Unit Economics & Pricing Calculator",
      description: "Model for testing margin, pricing, contribution economics, and sensitivity.",
      type: "Participant Resource",
      href: "assets/frameworks/unit-economics-pricing-calculator.xlsx",
      enabled: false
    },
    {
      title: "Constraint & Allocation Planner",
      description: "Model for ranking scarce-resource economics, demand headroom, and executable allocation.",
      type: "Participant Resource",
      href: "assets/frameworks/constraint-allocation-planner.xlsx",
      enabled: false
    },
    {
      title: "KPI & Variance Control Board",
      description: "Template for connecting operating measures to owners, thresholds, and prepared actions.",
      type: "Participant Resource",
      href: "assets/frameworks/kpi-variance-control-board.xlsx",
      enabled: false
    },
    {
      title: "Operating Scenario Lab",
      description: "Structured model for comparing base, downside, and alternative operating paths.",
      type: "Participant Resource",
      href: "assets/frameworks/operating-scenario-lab.xlsx",
      enabled: false
    },
    {
      title: "Capital Allocation & Investment Model",
      description: "Framework for project cash flow, NPV, IRR, break-even, liquidity, and capital-rationing decisions.",
      type: "Participant Resource",
      href: "assets/frameworks/capital-allocation-investment-model.xlsx",
      enabled: false
    },
    {
      title: "Applied Capstone Model",
      description: "Integrated workbook used to demonstrate Level 1-3 competencies in a supplied case or the participant's own business.",
      type: "Certificate Pathway",
      href: "assets/frameworks/applied-capstone-model.xlsx",
      enabled: false
    }
  ],

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

  testimonials: [
    { quote: "", name: "", role: "", company: "", photo: "assets/testimonials/testimonial-01.jpg", enabled: false },
    { quote: "", name: "", role: "", company: "", photo: "assets/testimonials/testimonial-02.jpg", enabled: false }
  ],

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
      description: "Live online session focused on resource allocation, KPI control, variance, and scenarios.",
      registrationUrl: "",
      paymentUrl: "",
      price: "",
      enabled: false
    },
    {
      title: "Strategic Finance & Capital Allocation - Live Webcast",
      dateLabel: "Date to be announced",
      platform: "Zoom or Google Meet",
      description: "Live online session focused on capital projects, investment evaluation, liquidity, and capital allocation.",
      registrationUrl: "",
      paymentUrl: "",
      price: "",
      enabled: false
    }
  ],

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
      description: "On-demand session covering constrained-resource economics, allocation, KPI control, and scenarios.",
      vimeoId: "",
      vimeoHash: "",
      duration: "",
      enabled: false
    },
    {
      title: "Strategic Finance & Capital Allocation",
      description: "On-demand session covering capital decisions, project returns, downside analysis, liquidity, and investment governance.",
      vimeoId: "",
      vimeoHash: "",
      duration: "",
      enabled: false
    }
  ]
};
