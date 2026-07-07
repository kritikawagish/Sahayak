import { useEffect, useRef, useState } from 'react';
import { generateRTIDraft } from '../data/content';

const DEMO_SLA_SECONDS = 15; // simulates "10 days" for demo purposes

export default function Complaints({ pushToast }) {
  const [complaints, setComplaints] = useState([
    { id: 'CMP-2291', citizen: 'Geeta Yadav', issue: 'No water supply for 4 days', status: 'Pending', secondsLeft: DEMO_SLA_SECONDS, escalated: false },
  ]);
  const [issueText, setIssueText] = useState('');
  const [citizenName, setCitizenName] = useState('');

  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setComplaints((prev) =>
        prev.map((c) => {
          if (c.status === 'Resolved' || c.escalated) return c;
          if (c.secondsLeft <= 0) {
            pushToast(`⚠️ SLA breached for ${c.id} — auto-escalating`);
            return { ...c, escalated: true, status: 'Escalated to BDO' };
          }
          return { ...c, secondsLeft: c.secondsLeft - 1 };
        })
      );
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [pushToast]);

  function fileComplaint(e) {
    e.preventDefault();
    if (!issueText.trim() || !citizenName.trim()) return;
    const id = `CMP-${Math.floor(1000 + Math.random() * 9000)}`;
    setComplaints((prev) => [
      { id, citizen: citizenName, issue: issueText, status: 'Pending', secondsLeft: DEMO_SLA_SECONDS, escalated: false },
      ...prev,
    ]);
    setIssueText('');
    setCitizenName('');
    pushToast(`📮 Complaint ${id} filed — SLA clock started`);
  }

  function resolve(id) {
    setComplaints((prev) => prev.map((c) => (c.id === id ? { ...c, status: 'Resolved' } : c)));
  }

  return (
    <div className="view fade-in">
      <section className="card">
        <h2>📢 File a Complaint</h2>
        <form className="complaint-form" onSubmit={fileComplaint}>
          <input placeholder="Your name" value={citizenName} onChange={(e) => setCitizenName(e.target.value)} />
          <input placeholder="Describe the issue (e.g. pothole, ration shop closed)" value={issueText} onChange={(e) => setIssueText(e.target.value)} />
          <button className="btn btn-primary" type="submit">Submit</button>
        </form>
        <p className="note">SLA is compressed to {DEMO_SLA_SECONDS}s for demo purposes (represents 10 real days).</p>
      </section>

      <section className="card">
        <h3>📋 Complaint Tracker</h3>
        <div className="complaint-list">
          {complaints.map((c) => (
            <div key={c.id} className="complaint-item">
              <div className="row-between">
                <strong>{c.id}</strong>
                <span className={`tag ${c.status === 'Resolved' ? 'tag-ok' : c.escalated ? 'tag-danger' : 'tag-warn'}`}>
                  {c.status}
                </span>
              </div>
              <p>{c.citizen}: {c.issue}</p>
              {c.status === 'Pending' && (
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${(c.secondsLeft / DEMO_SLA_SECONDS) * 100}%` }}
                  />
                  <span className="progress-label">SLA: {c.secondsLeft}s left</span>
                </div>
              )}
              {c.status !== 'Resolved' && (
                <button className="btn btn-ghost btn-sm" onClick={() => resolve(c.id)}>Mark Resolved</button>
              )}
              {c.escalated && (
                <details className="rti-box">
                  <summary>📄 View Auto-Generated RTI Draft</summary>
                  <pre>{generateRTIDraft({ name: c.citizen, complaintId: c.id, issue: c.issue, daysPending: 10 })}</pre>
                </details>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
