import { useRef, useState } from 'react';
import useSpeech from '../hooks/useSpeech';
import { SCRIPTS, SCHEMES, classifyIntent, extractNumber, extractYesNo, generateRTIDraft } from '../data/content';

export default function CitizenVoice({ language, setLanguage, onNavigate, pushToast }) {
  const { listen, speak, isListening, isSpeaking, interim, supported } = useSpeech(language);
  const [inputMode, setInputMode] = useState('voice'); // 'voice' | 'type'
  const [typedValue, setTypedValue] = useState('');
  const inputResolverRef = useRef(null);

  const [running, setRunning] = useState(false);
  const [transcript, setTranscript] = useState([]);
  const [formData, setFormData] = useState(null);
  const [missingDocs, setMissingDocs] = useState([]);
  const [refNumber, setRefNumber] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [escalated, setEscalated] = useState(false);
  const [rtiDraft, setRtiDraft] = useState(null);

  // --- Document Gap Predictor standalone tool state (F6) ---
  const [checkScheme, setCheckScheme] = useState(SCHEMES[0].id);
  const [ownedDocs, setOwnedDocs] = useState({});

  const S = SCRIPTS[language];

  function waitForTypedInput() {
    return new Promise((resolve) => {
      inputResolverRef.current = resolve;
    });
  }

  function handleTypedSubmit(e) {
    e.preventDefault();
    if (inputResolverRef.current) {
      inputResolverRef.current(typedValue);
      inputResolverRef.current = null;
      setTypedValue('');
    }
  }

  async function getUserInput() {
    if (inputMode === 'voice' && supported) return await listen();
    return await waitForTypedInput();
  }

  async function say(text) {
    setTranscript((t) => [...t, { speaker: 'ai', text }]);
    await speak(text);
  }
  function addUser(text) {
    setTranscript((t) => [...t, { speaker: 'user', text: text || '(no speech detected)' }]);
  }

  function resetAll() {
    setTranscript([]);
    setFormData(null);
    setMissingDocs([]);
    setRefNumber(null);
    setSubmitted(false);
    setEscalated(false);
    setRtiDraft(null);
  }

  async function startConversation() {
    if (running) return;
    setRunning(true);
    resetAll();

    await say(S.greeting);
    const introRaw = await getUserInput();
    addUser(introRaw);
    const intent = classifyIntent(introRaw || '');

    if (intent === 'complaint') {
      await say(S.redirectComplaint);
      setRunning(false);
      onNavigate('complaints');
      return;
    }
    if (intent === 'status') {
      await say(S.statusMock);
      setRunning(false);
      return;
    }

    // Flagship flow: Widow Pension (§10)
    await say(S.askAge);
    const ageRaw = await getUserInput();
    addUser(ageRaw);
    const age = extractNumber(ageRaw);

    await say(S.askVillage);
    const villageRaw = await getUserInput();
    addUser(villageRaw);

    await say(S.askDeathCert);
    const certRaw = await getUserInput();
    addUser(certRaw);
    const hasCert = extractYesNo(certRaw);
    if (!hasCert) await say(S.explainCert);

    await say(S.askBank);
    const bankRaw = await getUserInput();
    addUser(bankRaw);
    const hasBank = extractYesNo(bankRaw);

    const data = {
      age,
      village: villageRaw || '—',
      deathCert: hasCert ? 'Available ✅' : 'Missing — CSC visit needed ⚠️',
      bank: hasBank ? 'Available ✅' : 'Missing ⚠️',
    };
    setFormData(data);

    const missing = [];
    if (!hasCert) missing.push("Husband's Death Certificate");
    if (!hasBank) missing.push('Bank Passbook');
    setMissingDocs(missing);

    await say(S.confirmSummary(data));
    const confirmRaw = await getUserInput();
    addUser(confirmRaw);
    const confirmed = extractYesNo(confirmRaw);

    if (!confirmed) {
      await say(S.retry);
      setRunning(false);
      return;
    }

    const ref = `SBY-${Date.now().toString().slice(-6)}`;
    setRefNumber(ref);
    await say(S.submitted(ref));
    setSubmitted(true);
    pushToast('📩 Voice-note SMS sent to registered number (simulated)');
    setRunning(false);
  }

  async function handleEscalate() {
    await say(S.escalation);
    const draft = generateRTIDraft({
      name: 'Ramesh Devi',
      complaintId: refNumber,
      issue: 'Widow Pension application pending beyond SLA',
      daysPending: 10,
    });
    setRtiDraft(draft);
    setEscalated(true);
    pushToast('⚠️ Escalated to Block Development Officer + citizen notified via call/SMS');
  }

  // --- Document checklist tool ---
  const scheme = SCHEMES.find((s) => s.id === checkScheme);
  const owned = ownedDocs[checkScheme] || [];
  const missingForScheme = scheme.requiredDocs.filter((d) => !owned.includes(d));

  function toggleDoc(doc) {
    setOwnedDocs((prev) => {
      const list = prev[checkScheme] || [];
      const next = list.includes(doc) ? list.filter((d) => d !== doc) : [...list, doc];
      return { ...prev, [checkScheme]: next };
    });
  }

  async function readMissingAloud() {
    const text =
      missingForScheme.length === 0
        ? 'Bahut badhiya, aapke paas sabhi zaroori dastavez hain.'
        : `Aapko yeh ${missingForScheme.length} cheezein chahiye: ${missingForScheme.join(', ')}.`;
    await speak(text);
  }

  return (
    <div className="view fade-in">
      <section className="card apply-card">
        <div className="row-between">
          <h2>🎙️ Speak-to-Scheme</h2>
          <div className="lang-toggle">
            {['hi', 'bho', 'en'].map((l) => (
              <button
                key={l}
                className={`chip ${language === l ? 'chip-active' : ''}`}
                onClick={() => setLanguage(l)}
              >
                {l === 'hi' ? 'हिंदी' : l === 'bho' ? 'भोजपुरी' : 'English'}
              </button>
            ))}
          </div>
        </div>

        <p className="note">
          Try saying: <em>"Mera pati mar gaye, mujhe pension chahiye"</em> — zero reading/typing required.
        </p>

        <div className="mic-zone">
          <button
            className={`mic-btn ${isListening ? 'listening' : ''} ${isSpeaking ? 'speaking' : ''}`}
            onClick={startConversation}
            disabled={running && inputMode === 'voice'}
          >
            {isListening ? '👂' : isSpeaking ? '🔊' : '🎙️'}
          </button>
          <p className="mic-label">
            {isListening ? 'Listening…' : isSpeaking ? 'Speaking…' : running ? 'Waiting for input…' : 'Tap to speak'}
          </p>
          {interim && <p className="interim">"{interim}"</p>}

          <div className="mode-switch">
            <button className="btn btn-ghost btn-sm" onClick={() => setInputMode(inputMode === 'voice' ? 'type' : 'voice')}>
              {inputMode === 'voice' ? '⌨️ Type instead (accessibility fallback)' : '🎙️ Switch to voice'}
            </button>
            {!supported && <span className="tag tag-warn">Browser ASR unsupported — using type fallback</span>}
          </div>

          {inputMode === 'type' && running && (
            <form className="type-form" onSubmit={handleTypedSubmit}>
              <input
                autoFocus
                value={typedValue}
                onChange={(e) => setTypedValue(e.target.value)}
                placeholder="Type your reply here…"
              />
              <button className="btn btn-primary btn-sm" type="submit">Send</button>
            </form>
          )}
        </div>

        {transcript.length > 0 && (
          <div className="transcript">
            {transcript.map((m, i) => (
              <div key={i} className={`bubble ${m.speaker}`}>
                <span>{m.text}</span>
                {m.speaker === 'ai' && <span className="conf-badge">AI · verify at official source · 92%</span>}
              </div>
            ))}
          </div>
        )}

        {formData && (
          <div className="extracted-panel">
            <h4>🗂️ Structured Data Extracted (backend form — not required reading for citizen)</h4>
            <ul>
              <li>Age: {formData.age}</li>
              <li>Village: {formData.village}</li>
              <li>Death Certificate: {formData.deathCert}</li>
              <li>Bank Passbook: {formData.bank}</li>
            </ul>
          </div>
        )}

        {submitted && (
          <div className="trust-layer">
            <div className="check-anim">✅</div>
            <h4>Application Submitted</h4>
            <p>Reference No: <strong>{refNumber}</strong></p>
            <p className="note">
              Trust Layer: animated checkmark + spoken confirmation + simulated voice-note SMS delivered.
            </p>
            {!escalated && (
              <button className="btn btn-ghost btn-sm" onClick={handleEscalate}>
                ⏱ Simulate 10 days later (SLA check)
              </button>
            )}
          </div>
        )}

        {escalated && rtiDraft && (
          <div className="rti-box">
            <h4>📄 Auto-Generated RTI Draft (F5 — Escalation Ladder)</h4>
            <pre>{rtiDraft}</pre>
          </div>
        )}
      </section>

      <section className="card">
        <h3>📋 Document Gap Predictor (F6)</h3>
        <p className="note">Select a scheme, tick documents you already have — Sahayak tells you (by voice) what's missing.</p>
        <div className="doc-tool">
          <select value={checkScheme} onChange={(e) => setCheckScheme(e.target.value)}>
            {SCHEMES.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
          <div className="doc-list">
            {scheme.requiredDocs.map((doc) => (
              <label key={doc} className="doc-item">
                <input
                  type="checkbox"
                  checked={owned.includes(doc)}
                  onChange={() => toggleDoc(doc)}
                />
                {doc}
              </label>
            ))}
          </div>
          <div className="row-between">
            <div>
              {missingForScheme.length === 0 ? (
                <span className="tag tag-ok">All documents available ✅</span>
              ) : (
                <span className="tag tag-warn">Missing: {missingForScheme.join(', ')}</span>
              )}
            </div>
            <button className="btn btn-primary btn-sm" onClick={readMissingAloud}>🔊 Read Aloud</button>
          </div>
        </div>
      </section>
    </div>
  );
}
