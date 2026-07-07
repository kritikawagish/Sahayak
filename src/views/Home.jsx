export default function Home({ onNavigate }) {
  return (
    <div className="view fade-in">
      <section className="hero card">
        <span className="badge badge-saffron">Smart Bharat Hackathon · MVP</span>
        <h1>287 million Indians can't read.<br />Every govt app assumes they can.</h1>
        <p className="lead">
          Meet <strong>Ramesh Devi</strong>, 58 — a farmer's widow who paid a local "agent" ₹500 twice, just to
          apply for a pension she already qualifies for. <strong>Sahayak</strong> replaces the agent with an
          AI that speaks her language — and won't drown the official on the other end.
        </p>
        <div className="hero-actions">
          <button className="btn btn-primary" onClick={() => onNavigate('apply')}>
            🎙️ Try the Voice Demo
          </button>
          <button className="btn btn-ghost" onClick={() => onNavigate('copilot')}>
            See the Systems-Level Fix →
          </button>
        </div>
      </section>

      <section className="grid-3">
        <div className="card persona-card">
          <h3>👵 Ramesh Devi, 58</h3>
          <p>Can't read Hindi/English. Eligible for widow pension, doesn't know it exists.</p>
          <span className="tag">Citizen Layer</span>
        </div>
        <div className="card persona-card">
          <h3>👩‍💼 Anjali Kumari, 27</h3>
          <p>Panchayat Secretary handling 150+ queries/week manually for 8,000 villagers.</p>
          <span className="tag">Official Layer</span>
        </div>
        <div className="card persona-card">
          <h3>👷 Suresh, 34</h3>
          <p>Migrant worker, semi-literate, loses his document trail every 6 months.</p>
          <span className="tag">Citizen Layer</span>
        </div>
      </section>

      <section className="card">
        <h2>The Dual-Sided Problem</h2>
        <div className="grid-2">
          <div>
            <h4>🔴 Demand Side (Citizens)</h4>
            <p>400M+ low digital literacy citizens structurally excluded from UMANG/CSC/state portals.</p>
          </div>
          <div>
            <h4>🔴 Supply Side (Officials)</h4>
            <p>~2.5 lakh gram panchayats run by 1–2 overworked staff — every new tool = more inbound load.</p>
          </div>
        </div>
        <p className="note">
          Every competitor builds a chatbot for citizens. Sahayak solves <strong>both ends</strong> of the transaction.
        </p>
      </section>
    </div>
  );
}
