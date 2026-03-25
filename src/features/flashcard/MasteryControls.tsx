import { useLanguage } from '../../i18n';

type MasteryStatus = 'new' | 'learning' | 'mastered';

interface MasteryControlsProps {
  status: MasteryStatus;
  onChange: (status: MasteryStatus) => void;
}

export default function MasteryControls({ status, onChange }: MasteryControlsProps) {
  const { t } = useLanguage();

  const BUTTONS: { value: MasteryStatus; label: string; active: string; inactive: string }[] = [
    {
      value: 'new',
      label: t.mastery_new,
      active: 'bg-gray-500/30 text-gray-200 ring-1 ring-gray-400',
      inactive: 'bg-gray-500/10 text-gray-500 hover:bg-gray-500/20 hover:text-gray-300',
    },
    {
      value: 'learning',
      label: t.mastery_learning,
      active: 'bg-yellow-500/30 text-yellow-200 ring-1 ring-yellow-400',
      inactive: 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 hover:text-yellow-300',
    },
    {
      value: 'mastered',
      label: t.mastery_mastered,
      active: 'bg-green-500/30 text-green-200 ring-1 ring-green-400',
      inactive: 'bg-green-500/10 text-green-500 hover:bg-green-500/20 hover:text-green-300',
    },
  ];

  return (
    <div className="flex items-center justify-center gap-3">
      {BUTTONS.map((btn) => (
        <button
          key={btn.value}
          onClick={() => onChange(btn.value)}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
            status === btn.value ? btn.active : btn.inactive
          }`}
        >
          {btn.label}
        </button>
      ))}
    </div>
  );
}
