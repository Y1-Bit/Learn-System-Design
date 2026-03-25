import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Dashboard', end: true },
  { to: '/topics', label: 'Topics', end: false },
  { to: '/quizzes', label: 'Quizzes', end: false },
  { to: '/flashcards', label: 'Flashcards', end: false },
  { to: '/sandbox', label: 'Sandbox', end: false },
];

export default function Navbar() {
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
    </nav>
  );
}
