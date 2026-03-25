interface ProgressBarProps {
  value: number;
  color?: string;
}

export default function ProgressBar({ value, color = '#a855f7' }: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, value));

  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-[#2a2a4a]">
      <div
        className="h-full rounded-full transition-all duration-300"
        style={{ width: `${clamped}%`, backgroundColor: color }}
      />
    </div>
  );
}
