import { useParams, Link } from 'react-router-dom';
import { useProgress } from '../hooks/useProgress';
import { exercises } from '../data/exercises';
import GuidedExercise from '../features/sandbox/GuidedExercise';
import DifficultyBadge from '../components/DifficultyBadge';

export default function GuidedExercisePage() {
  const { exerciseId } = useParams<{ exerciseId: string }>();
  const { markExerciseCompleted } = useProgress();

  const exercise = exercises.find((e) => e.id === exerciseId);

  if (!exercise) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 p-16">
        <h1 className="text-2xl font-bold text-gray-100">Exercise not found</h1>
        <p className="text-gray-400">
          The exercise you are looking for does not exist.
        </p>
        <Link
          to="/sandbox"
          className="rounded-lg bg-purple-600 px-5 py-2.5 font-medium text-white transition-colors hover:bg-purple-500"
        >
          Back to Sandbox
        </Link>
      </div>
    );
  }

  const handleComplete = () => {
    if (exerciseId) {
      markExerciseCompleted(exerciseId);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f1a] px-4 py-8">
      {/* Header */}
      <div className="mx-auto mb-8 max-w-3xl">
        <Link
          to="/sandbox"
          className="mb-4 inline-flex items-center gap-1 text-sm text-gray-400 transition-colors hover:text-purple-400"
        >
          &larr; Back to Sandbox
        </Link>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-gray-100">{exercise.title}</h1>
          <DifficultyBadge difficulty={exercise.difficulty} />
        </div>
        <p className="mt-2 text-gray-400">{exercise.description}</p>
      </div>

      {/* Exercise */}
      <GuidedExercise exercise={exercise} onComplete={handleComplete} />
    </div>
  );
}
