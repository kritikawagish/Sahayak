export const LANGUAGES = [
  { code: 'hi', label: 'हिंदी' },
  { code: 'bho', label: 'भोजपुरी' },
  { code: 'en', label: 'English' },
];

export const SCHEMES = [
  {
    id: 'widow-pension',
    name: 'Widow Pension Scheme',
    requiredDocs: ["Aadhaar Card", "Husband's Death Certificate", 'Bank Passbook', 'Age Proof'],
  },
  {
    id: 'pm-kisan',
    name: 'PM-KISAN Samman Nidhi',
    requiredDocs: ['Aadhaar Card', 'Land Records (Khatauni)', 'Bank Passbook'],
  },
  {
    id: 'ration-card',
    name: 'Ration Card',
    requiredDocs: ['Aadhaar Card', 'Address Proof', 'Family Photograph'],
  },
];

export const SCRIPTS = {
  hi: {
    greeting: 'नमस्ते! मैं सहायक हूं। आप किस सेवा के लिए यहां आए हैं? बोल कर बताइए।',
    redirectComplaint: 'समझ गया, यह एक शिकायत लगती है। मैं आपको शिकायत दर्ज करने वाले पेज पर ले जा रहा हूं।',
    statusMock: 'आपका पिछला आवेदन अभी समीक्षा में है। अनुमानित समय पांच दिन है।',
    askAge: 'ठीक है, मैं आपकी मदद करता हूं। आपकी उम्र क्या है?',
    askVillage: 'आप किस गांव से हैं?',
    askDeathCert: 'क्या आपके पास पति का मृत्यु प्रमाण पत्र है? हां या नहीं बोलिए।',
    explainCert:
      'कोई बात नहीं। आप अपने नजदीकी कॉमन सर्विस सेंटर यानी सीएससी जाकर यह प्रमाण पत्र बनवा सकती हैं। साथ में ग्राम पंचायत का दस्तावेज़ और आधार कार्ड ले जाएं।',
    askBank: 'क्या आपका बैंक खाता है और क्या आपके पास पासबुक है? हां या नहीं बोलिए।',
    confirmSummary: (d) =>
      `आपने बताया: उम्र ${d.age} साल, गांव ${d.village}। मृत्यु प्रमाण पत्र: ${d.deathCert}। बैंक पासबुक: ${d.bank}। क्या यह सही है? हां या नहीं बोलिए।`,
    retry: 'ठीक है, चलिए दोबारा शुरू करते हैं। कृपया माइक दबाएं।',
    submitted: (ref) =>
      `बहुत बढ़िया! आपका आवेदन जमा हो गया है। आपका संदर्भ नंबर है ${ref}। यह जानकारी आपके फोन पर एसएमएस और आवाज़ संदेश के रूप में भी भेजी जा रही है।`,
    escalation:
      'आपका आवेदन अभी भी लंबित है। मैं इसे अगले अधिकारी के पास भेज रहा हूं और एक आरटीआई ड्राफ्ट तैयार कर रहा हूं।',
  },
  bho: {
    greeting: 'प्रणाम! हम सहायक बानी। रउआ काहे खातिर आइल बानी? बोलके बताईं।',
    redirectComplaint: 'ठीक बा, ई त शिकायत लागता। हम रउआ के शिकायत वाला पन्ना पर ले जात बानी।',
    statusMock: 'रउआ के पिछला आवेदन अबहिन समीक्षा में बा। लगभग पांच दिन लागी।',
    askAge: 'ठीक बा, हम रउआ के मदद करब। रउआ के उमर केतना बा?',
    askVillage: 'रउआ केवना गांव से बानी?',
    askDeathCert: 'का रउआ लगे पति के मृत्यु प्रमाण पत्र बा? हां कि नाहीं बोलीं।',
    explainCert: 'कवनो बात नइखे। रउआ लगे के सीएससी जाके ई प्रमाण पत्र बनवा सकीलें, आधार कार्ड साथे लेके जाईं।',
    askBank: 'का रउआ के बैंक खाता बा आ पासबुक बा? हां कि नाहीं बोलीं।',
    confirmSummary: (d) =>
      `रउआ बताइल: उमर ${d.age} साल, गांव ${d.village}। मृत्यु प्रमाण पत्र: ${d.deathCert}। बैंक पासबुक: ${d.bank}। का ई सही बा? हां कि नाहीं बोलीं।`,
    retry: 'ठीक बा, फेर से शुरू करत बानी। कृपया माइक दबाईं।',
    submitted: (ref) =>
      `बढ़िया! रउआ के आवेदन जमा हो गइल। संदर्भ नंबर बा ${ref}। ई जानकारी मोबाइल पर एसएमएस आ आवाज़ संदेश से भी भेजल जा रहल बा।`,
    escalation: 'रउआ के आवेदन अबहिन लंबित बा। हम एकरा अगिला अधिकारी लगे भेजत बानी आ आरटीआई ड्राफ्ट बनावत बानी।',
  },
  en: {
    greeting: "Hello! I am Sahayak. Which service do you need help with today? Please tell me aloud.",
    redirectComplaint: "Got it, that sounds like a complaint. Taking you to the complaint filing page.",
    statusMock: "Your previous application is still under review. Estimated time: 5 days.",
    askAge: "Alright, I'll help you. What is your age?",
    askVillage: "Which village are you from?",
    askDeathCert: "Do you have your husband's death certificate? Please say yes or no.",
    explainCert:
      "No problem. You can get this certificate made at your nearest Common Service Centre (CSC). Carry your Aadhaar card and gram panchayat documents.",
    askBank: "Do you have a bank account and passbook? Please say yes or no.",
    confirmSummary: (d) =>
      `You said: age ${d.age}, village ${d.village}. Death certificate: ${d.deathCert}. Bank passbook: ${d.bank}. Is this correct? Say yes or no.`,
    retry: "Okay, let's start again. Please tap the mic.",
    submitted: (ref) =>
      `Great! Your application has been submitted. Your reference number is ${ref}. This is also being sent to your phone as an SMS with a voice-note.`,
    escalation:
      "Your application is still pending. I am escalating it to the next authority and preparing an RTI draft.",
  },
};

export function classifyIntent(text = '') {
  const t = text.toLowerCase();
  if (/pension|vidhwa|widow|पेंशन|विधवा/.test(t)) return 'pension';
  if (/shikayat|complaint|paani|water|road|sadak|bijli|शिकायत|पानी|सड़क/.test(t)) return 'complaint';
  if (/status|kahan|track|स्थिति/.test(t)) return 'status';
  return 'pension'; // default to flagship demo flow
}

export function extractNumber(text = '') {
  const m = text.match(/\d+/);
  return m ? m[0] : '—';
}

export function extractYesNo(text = '') {
  const t = text.toLowerCase();
  const neg = ['nahi', 'nahin', 'no', 'nope', 'na', 'नहीं'];
  return !neg.some((w) => t.includes(w));
}

export function generateRTIDraft({ name, complaintId, issue, daysPending }) {
  return `To,
The Public Information Officer,
Gram Panchayat Office

Subject: Application under the Right to Information Act, 2005 — Complaint No. ${complaintId}

Sir/Madam,

I, ${name}, filed a complaint (Ref: ${complaintId}) regarding "${issue}". It has been ${daysPending} day(s)
without resolution or update, exceeding the prescribed Service Level Agreement (SLA).

I request the following information under Section 6(1) of the RTI Act, 2005:
1. Current status of the above complaint.
2. Name and designation of the officer responsible for action.
3. Expected date of resolution.

This is an auto-generated draft by Sahayak AI on behalf of the citizen, submitted as a formal follow-up.

Yours sincerely,
${name}
(Generated via Sahayak Voice Assistant)`;
}

export const INITIAL_QUEUE = [
  { id: 'Q-1001', citizen: 'Ramesh Devi', type: 'Widow Pension', urgency: 92, slaBreach: true, status: 'Pending' },
  { id: 'Q-1002', citizen: 'Suresh Kumar', type: 'Ration Card Update', urgency: 61, slaBreach: false, status: 'Pending' },
  { id: 'Q-1003', citizen: 'Geeta Yadav', type: 'Water Complaint', urgency: 78, slaBreach: true, status: 'In Progress' },
  { id: 'Q-1004', citizen: 'Mohan Lal', type: 'PM-KISAN Query', urgency: 45, slaBreach: false, status: 'Pending' },
  { id: 'Q-1005', citizen: 'Sita Devi', type: 'Birth Certificate', urgency: 38, slaBreach: false, status: 'Pending' },
];
