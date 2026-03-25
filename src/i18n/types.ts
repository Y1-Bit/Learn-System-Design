export type Language = 'en' | 'ru';

export interface Translations {
  // Navbar
  nav_dashboard: string;
  nav_topics: string;
  nav_quizzes: string;
  nav_flashcards: string;
  nav_sandbox: string;

  // Sidebar
  sidebar_categories: string;
  sidebar_all: string;

  // Dashboard
  dashboard_title: string;
  dashboard_topics_studied: string;
  dashboard_quiz_score: string;
  dashboard_cards_mastered: string;
  dashboard_exercises_done: string;
  dashboard_continue_studying: string;
  dashboard_welcome: string;
  dashboard_welcome_text: string;
  dashboard_browse_topics: string;

  // Topics page
  topics_title: string;

  // Topic detail
  topic_not_found: string;
  topic_back: string;
  topic_explanation: string;
  topic_key_points: string;
  topic_real_world: string;
  topic_interview_tips: string;
  topic_related: string;

  // Quizzes page
  quizzes_title: string;
  quizzes_subtitle: string;
  quizzes_all: string;
  quizzes_question: string;
  quizzes_questions: string;
  quizzes_no_match: string;

  // Quiz engine
  quiz_ready: string;
  quiz_question_count: string;
  quiz_start: string;
  quiz_question_of: string;
  quiz_explanation: string;
  quiz_next: string;
  quiz_true: string;
  quiz_false: string;
  quiz_select_match: string;
  quiz_submit_matches: string;
  quiz_correct_label: string;

  // Score board
  score_correct: string;
  score_passed: string;
  score_failed: string;
  score_results: string;
  score_retry: string;
  score_back: string;

  // Flashcards page
  flashcards_title: string;
  flashcards_no_match: string;

  // Flashcard deck
  fc_difficulty: string;
  fc_all: string;
  fc_beginner: string;
  fc_intermediate: string;
  fc_advanced: string;
  fc_show: string;
  fc_all_cards: string;
  fc_unmastered: string;
  fc_card_of: string;
  fc_prev: string;
  fc_next: string;
  fc_keyboard_hint: string;
  fc_question: string;
  fc_answer: string;

  // Mastery controls
  mastery_new: string;
  mastery_learning: string;
  mastery_mastered: string;

  // Sandbox
  sandbox_guided_exercises: string;
  sandbox_components: string;
  sandbox_compute: string;
  sandbox_storage: string;
  sandbox_network: string;
  sandbox_messaging: string;
  sandbox_connect: string;
  sandbox_connecting: string;
  sandbox_clear: string;
  sandbox_save: string;
  sandbox_load: string;
  sandbox_no_saved: string;
  sandbox_design_name: string;
  sandbox_connection_label: string;
  sandbox_drag_hint: string;
  sandbox_connect_hint: string;

  // Guided exercise
  exercise_not_found: string;
  exercise_not_found_text: string;
  exercise_back: string;
  exercise_complete: string;
  exercise_correct_answers: string;
  exercise_review: string;
  exercise_step: string;
  exercise_your_answer: string;
  exercise_correct_answer: string;
  exercise_show_hint: string;
  exercise_hide_hint: string;
  exercise_correct: string;
  exercise_incorrect: string;
  exercise_next_step: string;
  exercise_see_results: string;
  exercise_step_of: string;

  // Category labels
  cat_networking: string;
  cat_storage: string;
  cat_caching: string;
  cat_scaling: string;
  cat_reliability: string;
  cat_messaging: string;
  cat_security: string;
  cat_patterns: string;

  // Difficulty labels
  diff_beginner: string;
  diff_intermediate: string;
  diff_advanced: string;
}
