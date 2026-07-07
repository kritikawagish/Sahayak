const metrics = [
  { label: 'Citizens onboarded (Yr 1)', value: '50,000' },
  { label: 'Applications via voice-only', value: '70%+' },
  { label: 'Avg. time-to-complete', value: '<5 min' },
  { label: 'Complaint resolution rate', value: '60%+' },
  { label: 'Reduction in agent bribery', value: '30%+' },
  { label: 'Official time saved / query', value: '50%+' },
];

const risks = [
  ['AI hallucinates eligibility info', 'RAG grounded strictly in verified scheme DB + confidence scoring'],
  ['Voice misrecognition in dialects', 'Community Proxy Mode + confirmation loop before submission'],
  ['Elderly user trust resistance', 'Proxy Mode + CSC network partnership'],
  ['Voice data privacy', 'No raw audio stored — only structured extracted data'],
  ['Officials fear surveillance', 'Positioned as assistant; load alerts framed as support requests'],
];

export default function Impact() {
  return (
    <div className="view fade-in">
      <section className="card">
        <h2>📈 Impact at Scale</h2>
        <div className="grid-3">
          {metrics.map((m) => (
            <div key={m.label} className="metric-card">
              <div className="metric-value">{m.value}</div>
              <div className="metric-label">{m.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="card">
        <h3>⚠️ Risks & Mitigation</h3>
        <table className="risk-table">
          <tbody>
            {risks.map(([risk, mitigation]) => (
              <tr key={risk}><td>{risk}</td><td>{mitigation}</td></tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="card">
        <h3>🌍 Why This Wins</h3>
        <ul className="why-list">
          <li><strong>Innovation:</strong> First voice-only, literacy-agnostic + dual-sided civic AI</li>
          <li><strong>Technical Complexity:</strong> Multi-turn state mgmt + multilingual ASR/TTS + function-calling extraction</li>
          <li><strong>Social Impact:</strong> Targets 287M+ excluded citizens; kills the agent/bribery economy</li>
          <li><strong>Feasibility:</strong> Fully working Phase 1 demo + credible Phase 2 architecture</li>
          <li><strong>Business Viability:</strong> B2G SaaS for state govts, CSR angle, scalable via DPI to other nations</li>
        </ul>
      </section>
    </div>
  );
}
