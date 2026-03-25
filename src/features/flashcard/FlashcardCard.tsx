import { useLanguage } from '../../i18n';

interface FlashcardCardProps {
  front: string;
  back: string;
  flipped: boolean;
  onFlip: () => void;
}

export default function FlashcardCard({ front, back, flipped, onFlip }: FlashcardCardProps) {
  const { t } = useLanguage();

  return (
    <div
      className="mx-auto w-full max-w-[400px] cursor-pointer"
      style={{ perspective: '1000px' }}
      onClick={onFlip}
    >
      <div
        className="relative min-h-[250px] w-full transition-transform duration-[600ms]"
        style={{
          transformStyle: 'preserve-3d',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center rounded-xl border border-[#2a2a4a] bg-[#1a1a2e] p-6 shadow-lg"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <span className="mb-2 text-xs font-semibold uppercase tracking-wider text-purple-400">
            {t.fc_question}
          </span>
          <p className="text-center text-lg leading-relaxed text-gray-200">{front}</p>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center rounded-xl border border-[#2a2a4a] bg-[#1a1a2e] p-6 shadow-lg"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <span className="mb-2 text-xs font-semibold uppercase tracking-wider text-green-400">
            {t.fc_answer}
          </span>
          <p className="text-center text-base leading-relaxed text-gray-300">{back}</p>
        </div>
      </div>
    </div>
  );
}
