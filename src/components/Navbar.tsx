import { NavLink } from 'react-router-dom';
import { useLanguage } from '../i18n';

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();

  const links = [
    { to: '/', label: t.nav_dashboard, end: true },
    { to: '/topics', label: t.nav_topics, end: false },
    { to: '/quizzes', label: t.nav_quizzes, end: false },
    { to: '/flashcards', label: t.nav_flashcards, end: false },
    { to: '/sandbox', label: t.nav_sandbox, end: false },
  ];

  return (
    <nav className="sticky top-0 z-50 flex items-center gap-6 border-b border-[#2a2a4a] bg-[#1a1a2e] px-6 py-3">
      <NavLink to="/" className="mr-4 text-xl font-bold text-purple-400">
        SystemPrep
      </NavLink>

      {links.map(({ to, label, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            `text-sm font-medium transition-colors ${
              isActive
                ? 'text-purple-400 border-b-2 border-purple-500 pb-0.5'
                : 'text-gray-400 hover:text-gray-200'
            }`
          }
        >
          {label}
        </NavLink>
      ))}

      <div className="ml-auto flex items-center gap-1">
        <button
          onClick={() => setLanguage('en')}
          className={`rounded px-2 py-1 text-xs font-medium transition-colors ${
            language === 'en'
              ? 'bg-purple-500/20 text-purple-300'
              : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          EN
        </button>
        <button
          onClick={() => setLanguage('ru')}
          className={`rounded px-2 py-1 text-xs font-medium transition-colors ${
            language === 'ru'
              ? 'bg-purple-500/20 text-purple-300'
              : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          RU
        </button>
      </div>
    </nav>
  );
}
