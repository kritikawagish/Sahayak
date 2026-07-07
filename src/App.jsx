import { useCallback, useState } from 'react';
import GooeyNav from './components/GooeyNav';
import Home from './views/Home';
import CitizenVoice from './views/CitizenVoice';
import Complaints from './views/Complaints';
import SahayakMitra from './views/SahayakMitra';
import PanchayatCopilot from './views/PanchayatCopilot';
import Impact from './views/Impact';

const NAV_ITEMS = [
  { label: 'Home' },
  { label: 'Apply (Voice)' },
  { label: 'Complaints' },
  { label: 'Sahayak Mitra' },
  { label: 'Panchayat Copilot' },
  { label: 'Impact' },
];
const VIEW_KEYS = ['home', 'apply', 'complaints', 'mitra', 'copilot', 'impact'];

export default function App() {
  const [activeView, setActiveView] = useState('home');
  const [language, setLanguage] = useState('hi');
  const [toasts, setToasts] = useState([]);

  const pushToast = useCallback((msg) => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, msg }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4000);
  }, []);

  const navigate = (key) => {
    const idx = VIEW_KEYS.indexOf(key);
    if (idx >= 0) setActiveView(key);
  };

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="brand">🙏 <span>Sahayak</span></div>
        <div className="nav-shell">
          <GooeyNav
            items={NAV_ITEMS}
            particleCount={15}
            particleDistances={[90, 10]}
            particleR={100}
            initialActiveIndex={0}
            animationTime={600}
            timeVariance={300}
            colors={[1, 2, 3, 1, 2, 3, 1, 4]}
            onSelect={(i) => setActiveView(VIEW_KEYS[i])}
          />
        </div>
      </header>

      <main className="app-main">
        {activeView === 'home' && <Home onNavigate={navigate} />}
        {activeView === 'apply' && (
          <CitizenVoice language={language} setLanguage={setLanguage} onNavigate={navigate} pushToast={pushToast} />
        )}
        {activeView === 'complaints' && <Complaints pushToast={pushToast} />}
        {activeView === 'mitra' && <SahayakMitra pushToast={pushToast} />}
        {activeView === 'copilot' && <PanchayatCopilot pushToast={pushToast} />}
        {activeView === 'impact' && <Impact />}
      </main>

      <footer className="disclaimer-bar">
        ⚠️ Sahayak AI provides guidance based on available scheme data. Please verify critical details at your
        nearest CSC / Panchayat office.
      </footer>

      <div className="toast-stack">
        {toasts.map((t) => (
          <div key={t.id} className="toast">{t.msg}</div>
        ))}
      </div>
    </div>
  );
}
