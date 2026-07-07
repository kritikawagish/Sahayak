import { useState } from 'react';

const MOCK_CITIZENS = ['Ramesh Devi', 'Suresh Kumar', 'Geeta Yadav', 'Mohan Lal', 'Sita Devi'];

export default function SahayakMitra({ pushToast }) {
  const [sessions, setSessions] = useState([
    { id: 1, citizen: 'Ramesh Devi', task: 'Widow Pension Application', rating: 5, operator: 'Vikas General Store (CSC)' },
    { id: 2, citizen: 'Mohan Lal', task: 'PM-KISAN Status Check', rating: 4, operator: 'Vikas General Store (CSC)' },
  ]);
  const [pendingRating, setPendingRating] = useState(null);

  function addSession() {
    const citizen = MOCK_CITIZENS[Math.floor(Math.random() * MOCK_CITIZENS.length)];
    const task = ['Ration Card Update', 'Birth Certificate', 'Water Complaint Filing'][Math.floor(Math.random() * 3)];
    const newSession = { id: Date.now(), citizen, task, rating: null, operator: 'Vikas General Store (CSC)' };
    setSessions((prev) => [newSession, ...prev]);
    setPendingRating(newSession.id);
    pushToast(`🧑‍💼 Assisted session logged for ${citizen}`);
  }

  function rate(id, stars) {
    setSessions((prev) => prev.map((s) => (s.id === id ? { ...s, rating: stars } : s)));
    setPendingRating(null);
    pushToast(`⭐ Rating captured — "Kaisa laga?" logged`);
  }

  return (
    <div className="view fade-in">
      <section className="card">
        <h2>🏪 Sahayak Mitra — Verified Proxy Mode</h2>
        <p className="note">
          Local shopkeepers/CSC operators register as "Verified Sahayaks" to assist citizens who can't use a
          smartphone directly. Every assisted action is logged separately for accountability.
        </p>
        <button className="btn btn-primary" onClick={addSession}>+ Log New Assisted Session</button>
      </section>

      <section className="card">
        <h3>Session Log</h3>
        <div className="mitra-list">
          {sessions.map((s) => (
            <div key={s.id} className="mitra-item">
              <div>
                <strong>{s.citizen}</strong> — {s.task}
                <div className="tag tag-proxy">Proxy-assisted · {s.operator}</div>
              </div>
              {s.rating ? (
                <div className="stars">{'⭐'.repeat(s.rating)}</div>
              ) : pendingRating === s.id ? (
                <div className="rate-prompt">
                  <span>"Kaisa laga?"</span>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button key={n} className="star-btn" onClick={() => rate(s.id, n)}>⭐</button>
                  ))}
                </div>
              ) : (
                <span className="tag">Unrated</span>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
