import type { Translations } from './types';

export const en: Translations = {
  // Navbar
  nav_dashboard: 'Dashboard',
  nav_topics: 'Topics',
  nav_quizzes: 'Quizzes',
  nav_flashcards: 'Flashcards',
  nav_sandbox: 'Sandbox',

  // Sidebar
  sidebar_categories: 'Categories',
  sidebar_all: 'All',

  // Dashboard
  dashboard_title: 'Dashboard',
  dashboard_topics_studied: 'Topics Studied',
  dashboard_quiz_score: 'Quiz Score',
  dashboard_cards_mastered: 'Cards Mastered',
  dashboard_exercises_done: 'Exercises Done',
  dashboard_continue_studying: 'Continue Studying',
  dashboard_welcome: 'Welcome to SystemPrep!',
  dashboard_welcome_text: 'Start by exploring a topic to begin your system design interview prep.',
  dashboard_browse_topics: 'Browse Topics',

  // Topics page
  topics_title: 'System Design Topics',

  // Topic detail
  topic_not_found: 'Topic not found',
  topic_back: 'Back to Topics',
  topic_explanation: 'Explanation',
  topic_key_points: 'Key Points',
  topic_real_world: 'Real-World Examples',
  topic_interview_tips: 'Interview Tips',
  topic_related: 'Related Topics',

  // Quizzes page
  quizzes_title: 'Quizzes',
  quizzes_subtitle: 'Test your system design knowledge',
  quizzes_all: 'All',
  quizzes_question: 'question',
  quizzes_questions: 'questions',
  quizzes_no_match: 'No questions match your filters.',

  // Quiz engine
  quiz_ready: 'Ready to test your knowledge?',
  quiz_question_count: 'in this quiz',
  quiz_start: 'Start Quiz',
  quiz_question_of: 'of',
  quiz_explanation: 'Explanation',
  quiz_next: 'Next',
  quiz_true: 'True',
  quiz_false: 'False',
  quiz_select_match: 'Select a match...',
  quiz_submit_matches: 'Submit Matches',
  quiz_correct_label: 'correct',

  // Score board
  score_correct: 'correct',
  score_passed: 'Great job! You passed!',
  score_failed: 'Keep practicing -- you need 70% to pass.',
  score_results: 'Question Results',
  score_retry: 'Retry Wrong Answers',
  score_back: 'Back to Quizzes',

  // Flashcards page
  flashcards_title: 'Flashcards',
  flashcards_no_match: 'No cards match your filters. Try broadening your selection.',

  // Flashcard deck
  fc_difficulty: 'Difficulty:',
  fc_all: 'All',
  fc_beginner: 'Beginner',
  fc_intermediate: 'Intermediate',
  fc_advanced: 'Advanced',
  fc_show: 'Show:',
  fc_all_cards: 'All Cards',
  fc_unmastered: 'Unmastered Only',
  fc_card_of: 'of',
  fc_prev: 'Previous card',
  fc_next: 'Next card',
  fc_keyboard_hint: 'Use arrow keys to navigate, space to flip',
  fc_question: 'Question',
  fc_answer: 'Answer',

  // Mastery controls
  mastery_new: 'New',
  mastery_learning: 'Learning',
  mastery_mastered: 'Mastered',

  // Sandbox
  sandbox_guided_exercises: 'Guided Exercises',
  sandbox_components: 'Components',
  sandbox_compute: 'Compute',
  sandbox_storage: 'Storage',
  sandbox_network: 'Network',
  sandbox_messaging: 'Messaging',
  sandbox_connect: 'Connect',
  sandbox_connecting: 'Connecting...',
  sandbox_clear: 'Clear Canvas',
  sandbox_save: 'Save Design',
  sandbox_load: 'Load Design',
  sandbox_no_saved: 'No saved designs',
  sandbox_design_name: 'Design name:',
  sandbox_connection_label: 'Connection label (e.g. HTTP, TCP, gRPC):',
  sandbox_drag_hint: 'Drag components from the palette to start designing',
  sandbox_connect_hint: 'Click source, then target to connect',

  // Guided exercise
  exercise_not_found: 'Exercise not found',
  exercise_not_found_text: 'The exercise you are looking for does not exist.',
  exercise_back: 'Back to Sandbox',
  exercise_complete: 'Exercise Complete',
  exercise_correct_answers: 'correct answers',
  exercise_review: 'Review',
  exercise_step: 'Step',
  exercise_your_answer: 'Your answer:',
  exercise_correct_answer: 'Correct answer:',
  exercise_show_hint: 'Show Hint',
  exercise_hide_hint: 'Hide Hint',
  exercise_correct: 'Correct!',
  exercise_incorrect: 'Incorrect',
  exercise_next_step: 'Next Step',
  exercise_see_results: 'See Results',
  exercise_step_of: 'of',

  // Category labels
  cat_networking: 'Networking',
  cat_storage: 'Storage & Databases',
  cat_caching: 'Caching',
  cat_scaling: 'Scaling',
  cat_reliability: 'Reliability',
  cat_messaging: 'Messaging',
  cat_security: 'Security',
  cat_patterns: 'Design Patterns',

  // Difficulty labels
  diff_beginner: 'Beginner',
  diff_intermediate: 'Intermediate',
  diff_advanced: 'Advanced',
};
