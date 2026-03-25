import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Topics from './pages/Topics';
import TopicDetail from './pages/TopicDetail';
import Quizzes from './pages/Quizzes';
import Flashcards from './pages/Flashcards';
import Sandbox from './pages/Sandbox';
import GuidedExercisePage from './pages/GuidedExercisePage';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#0f0f1a] text-gray-200">
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/topics" element={<Topics />} />
          <Route path="/topics/:topicId" element={<TopicDetail />} />
          <Route path="/quizzes" element={<Quizzes />} />
          <Route path="/flashcards" element={<Flashcards />} />
          <Route path="/sandbox" element={<Sandbox />} />
          <Route path="/exercises/:exerciseId" element={<GuidedExercisePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
