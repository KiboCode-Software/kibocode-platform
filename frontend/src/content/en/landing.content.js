/**
 * English copy for the landing page.
 *
 * Adapted, not translated word for word: the Spanish version leans on turns
 * of phrase that fall flat in English. What is kept identical is the
 * structure and every factual claim.
 */
export const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Method', href: '#method' },
  { label: 'Why KiboCode', href: '#why-us' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

export const footerContent = {
  tagline: 'Custom software engineering.',
  privacy: 'Privacy Notice',
};

export const heroContent = {
  eyebrow: 'KiboCode — Custom software',
  title: 'Custom software that turns hours of manual work into profit.',
  subtitle:
    "We don't sell templates or off-the-shelf licences. We study how your company actually operates and build the systems that remove bottlenecks, automate the repetitive work and give you real control of the business. We work fully remote, with clients in any country.",
  primaryCta: { label: 'Book a free assessment', href: '#contact' },
  secondaryCta: { label: 'See how we work', href: '#method' },
  terminal: {
    prompt: '$ kibo deploy --production',
    lines: [
      '✓ Inventory sync connected',
      '✓ 1,240 orders migrated without errors',
      '✓ Automated reports: enabled',
      '→ Manual data entry time: −70%',
      'System live. Operations under control.',
    ],
  },
  stats: [
    { value: '−70%', label: 'less time on repetitive tasks after automation' },
    { value: '< 24 h', label: 'response time to every message, always' },
    { value: '100%', label: 'of the code is yours — no locked-in licences' },
    { value: '0', label: 'middlemen between you and whoever builds it' },
  ],
};

export const problemsContent = {
  id: 'problems',
  eyebrow: 'Sound familiar?',
  title: 'These problems cost your company money every single day.',
  items: [
    {
      title: 'Your operation runs on spreadsheets',
      description:
        'Duplicate versions, broken formulas and nobody sure which file is the right one. The information exists, but it is useless for making decisions.',
    },
    {
      title: 'Your team enters the same data twice, or three times',
      description:
        'From email to spreadsheet, spreadsheet to system, system to report. Hours of valuable people doing copy-and-paste work.',
    },
    {
      title: 'Your systems do not talk to each other',
      description:
        'Invoicing on one side, inventory on another, sales in a chat app. Every island of information is a source of errors and rework.',
    },
    {
      title: 'You find out the numbers at month end',
      description:
        'Margin, real stock, receivables. By the time the figure arrives, the decision that depended on it was already made blind.',
    },
  ],
  closing:
    'Every one of these is solved with well-built software. And every day they go unsolved costs hours, errors and margin.',
};

export const servicesContent = {
  id: 'services',
  eyebrow: 'What we build',
  title: 'Three ways to attack the problem, one goal: stop your operation depending on manual effort.',
  items: [
    {
      title: 'Custom development',
      problem:
        'Off-the-shelf software forces you to bend your operation to the tool — and whatever does not fit gets handled by hand.',
      description:
        'Client portals, quoting tools, web platforms and PWAs built around your real process, not somebody else’s.',
      result: 'The system adapts to your business. Not the other way round.',
    },
    {
      title: 'Process automation',
      problem:
        'Manual data entry, copying between systems, reports assembled by hand every week.',
      description:
        'We connect your tools through their APIs, keep data in sync across systems and turn hours of reporting into reports that build themselves.',
      result: 'Hours recovered every week, data-entry errors down to zero.',
    },
    {
      title: 'Management systems (ERP / CRM)',
      problem:
        'Inventory, clients and operations scattered across files and inside the heads of two or three key people.',
      description:
        'One place for inventory, clients and operations, with real-time data and role-based access.',
      result: 'Decisions based on today’s numbers, not last month’s.',
    },
  ],
};

export const methodologyContent = {
  id: 'method',
  eyebrow: 'How we work',
  title: 'No black boxes: you know what is being built, when and why.',
  steps: [
    {
      number: '01',
      title: 'Discovery & architecture',
      description:
        'We sit down with your actual operation: where time is lost, where errors appear, which processes hurt most. The system design comes out of that.',
      deliverable: 'You get: a process map, a technical proposal and a fixed quote.',
    },
    {
      number: '02',
      title: 'Development & testing',
      description:
        'Modular build with working deliveries along the way. Continuous testing against your real data, not laboratory demos.',
      deliverable: 'You get: working progress every week, not promises.',
    },
    {
      number: '03',
      title: 'Deployment & scale',
      description:
        'Go-live on secure cloud infrastructure, training for your team and support afterwards. The system grows as your company does.',
      deliverable: 'You get: a live system, a trained team and direct support.',
    },
  ],
};

export const valuePropsContent = {
  id: 'why-us',
  eyebrow: 'Why KiboCode',
  title: 'What we sign with you, we honour in the code.',
  items: [
    {
      title: 'The code is yours',
      description:
        'We hand over complete, documented source code. If tomorrow you want to continue with another team, you can. We work to keep you for the results, not through dependency.',
    },
    {
      title: 'We talk business, not jargon',
      description:
        'You speak directly with whoever builds your system, with no account managers in between. Every decision is explained in terms of time and money, not acronyms.',
    },
    {
      title: 'If software is not the answer, we say so',
      description:
        'Every line of code should serve a profit or time-saving goal. If your problem is solved by changing a process rather than building software, we tell you at the assessment stage — at no cost.',
    },
  ],
};

export const faqContent = {
  id: 'faq',
  eyebrow: 'Frequently asked',
  title: 'What every client asks before starting.',
  items: [
    {
      question: 'How much does a project cost?',
      answer:
        'It depends on scope, which is why the assessment comes first: a fixed quote comes out of it, with no surprise costs. We work in phases so you see results running before committing the whole budget.',
    },
    {
      question: 'Who owns the code when it is finished?',
      answer:
        'You do, entirely. We hand over the full source code, the documentation and the access credentials. There are no monthly licences to use your own system and no forced dependency on us.',
    },
    {
      question: 'I already use other systems. Do I have to drop them?',
      answer:
        'No. A large part of our work is integration: making your invoicing, inventory and sales talk to each other. We only replace what is genuinely worth replacing.',
    },
    {
      question: 'How long does a project take?',
      answer:
        'A focused automation: weeks. A complete system: two to four months depending on scope. Either way we deliver in phases, so you see working progress from the first weeks.',
    },
    {
      question: 'What happens after launch?',
      answer:
        'We do not disappear. We provide support, monitor the system in production and evolve it as your operation needs. Deployment is where the operation starts, not where the project ends.',
    },
  ],
};

export const contactContent = {
  id: 'contact',
  eyebrow: 'Let’s start',
  title: 'Tell us what is costing you time or money.',
  subtitle:
    'That is enough for a first assessment. Fill in these three fields and the message opens straight in WhatsApp, ready to send.',
  assurances: [
    'Free initial assessment, no commitment',
    'Reply within 24 business hours',
    'If software is not the answer to your problem, we say so',
  ],
  fields: {
    name: { label: 'Name', placeholder: 'Your full name' },
    company: { label: 'Company', placeholder: 'Your company' },
    message: {
      label: 'Brief description of the project or need',
      placeholder: 'e.g. "We enter orders by hand and lose hours every week…"',
    },
  },
  consent: {
    label: 'I have read and accept the',
    linkLabel: 'Privacy Notice',
  },
  submitLabel: 'Send via WhatsApp',
  preferenceForm: 'Prefer to skip the form?',
  replyNote: 'We reply within 24 business hours.',
  whatsappLabel: 'Or message us directly on WhatsApp Business',
  successMessage: 'WhatsApp is open with your message ready — just hit send.',
};
