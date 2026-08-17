import { siteConfig } from '../../config/site.config.js';

const { legal, contactEmail, whatsapp, name } = siteConfig;

/**
 * English rendering of the privacy notice.
 *
 * The obligations described are those of Colombian Law 1581 of 2012, which
 * is what binds KiboCode as the data controller — that does not change with
 * the reader's language, so the legal references stay as they are.
 */
export const privacyContent = {
  eyebrow: 'Legal',
  title: 'Privacy Notice',
  subtitle: 'Notice on the processing of personal data',
  intro: `In accordance with Law 1581 of 2012 and Decree 1377 of 2013 on the protection of personal data in Colombia, ${name} informs users of this website of the following:`,
  lastUpdated: `Last updated: ${legal.lastUpdated}`,
  backLabel: 'Back to home',
  blocks: [
    {
      heading: 'Data controller',
      paragraphs: [
        `${legal.ownerName}, trading as ${name}, domiciled in ${legal.country}. You can reach us at ${contactEmail} or on WhatsApp at ${whatsapp.display}.`,
      ],
    },
    {
      heading: 'What we collect',
      paragraphs: [
        'Through the contact form on this site we collect your name, your company name and the description of the project or need you share with us.',
        'In addition, as you browse the site, technical and usage data is collected through measurement tools: IP address, device and browser type, pages visited and which ad or link brought you here. This data does not identify you by name and is used in aggregate.',
      ],
    },
    {
      heading: 'Measurement and advertising tools',
      paragraphs: [
        'We use the TikTok pixel to see how many people reach this site from our ads and how many go on to contact us. This means TikTok, acting as an independent controller, receives data about your browsing and may use it under its own privacy policy, including to show you advertising.',
        'You can prevent this by blocking third-party cookies in your browser, using private browsing or a blocking extension. The site works normally if you do.',
      ],
    },
    {
      heading: 'Purpose of processing',
      paragraphs: [
        'The data you provide in the form is used solely to contact you, understand your need and offer you an assessment or proposal related to our software development services. We do not sell it to third parties.',
        'Browsing data is used only to measure how our advertising performs and to improve the site.',
      ],
    },
    {
      heading: 'How your information is sent',
      paragraphs: [
        `When you complete the form, your message opens directly in WhatsApp so that you send it yourself from your own number. This means that, besides being processed by ${name}, your information passes through the WhatsApp platform (Meta), subject to its own privacy policy.`,
      ],
    },
    {
      heading: 'How long we keep it',
      paragraphs: [
        'We keep your data only for as long as the commercial relationship or the evaluation of your project lasts, and for as long as necessary for legal, accounting or liability purposes arising from our relationship with you.',
      ],
    },
    {
      heading: 'Your rights as the data subject',
      paragraphs: ['Under Colombian law, you have the right to:'],
      list: [
        'Know, update and rectify your personal data.',
        'Request proof of the authorisation you granted.',
        'Be informed about how your data has been used.',
        'File complaints with the Superintendency of Industry and Commerce (SIC) for breaches of the law.',
        'Withdraw your authorisation or request deletion of your data where no legal or contractual duty prevents it.',
        'Access your data free of charge.',
      ],
    },
    {
      heading: 'How to exercise your rights',
      paragraphs: [
        `Write to us at ${contactEmail} setting out your request, and we will respond within the timeframes set by law (a maximum of 10 business days for enquiries, 15 business days for complaints).`,
      ],
    },
    {
      heading: 'Authorisation',
      paragraphs: [
        `By completing and submitting the contact form on this site, you authorise ${name} to process your personal data as described in this notice.`,
      ],
    },
  ],
};
