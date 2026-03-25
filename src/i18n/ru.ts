import type { Translations } from './types';

export const ru: Translations = {
  // Navbar
  nav_dashboard: 'Главная',
  nav_topics: 'Темы',
  nav_quizzes: 'Тесты',
  nav_flashcards: 'Карточки',
  nav_sandbox: 'Песочница',

  // Sidebar
  sidebar_categories: 'Категории',
  sidebar_all: 'Все',

  // Dashboard
  dashboard_title: 'Главная',
  dashboard_topics_studied: 'Темы изучены',
  dashboard_quiz_score: 'Баллы тестов',
  dashboard_cards_mastered: 'Карточки освоены',
  dashboard_exercises_done: 'Упражнения',
  dashboard_continue_studying: 'Продолжить изучение',
  dashboard_welcome: 'Добро пожаловать в SystemPrep!',
  dashboard_welcome_text: 'Начните с изучения темы для подготовки к собеседованию по проектированию систем.',
  dashboard_browse_topics: 'Обзор тем',

  // Topics page
  topics_title: 'Темы проектирования систем',

  // Topic detail
  topic_not_found: 'Тема не найдена',
  topic_back: 'Назад к темам',
  topic_explanation: 'Объяснение',
  topic_key_points: 'Ключевые моменты',
  topic_real_world: 'Примеры из практики',
  topic_interview_tips: 'Советы для собеседования',
  topic_related: 'Связанные темы',

  // Quizzes page
  quizzes_title: 'Тесты',
  quizzes_subtitle: 'Проверьте свои знания по проектированию систем',
  quizzes_all: 'Все',
  quizzes_question: 'вопрос',
  quizzes_questions: 'вопросов',
  quizzes_no_match: 'Нет вопросов, соответствующих фильтрам.',

  // Quiz engine
  quiz_ready: 'Готовы проверить свои знания?',
  quiz_question_count: 'в этом тесте',
  quiz_start: 'Начать тест',
  quiz_question_of: 'из',
  quiz_explanation: 'Объяснение',
  quiz_next: 'Далее',
  quiz_true: 'Верно',
  quiz_false: 'Неверно',
  quiz_select_match: 'Выберите соответствие...',
  quiz_submit_matches: 'Проверить',
  quiz_correct_label: 'правильно',

  // Score board
  score_correct: 'правильно',
  score_passed: 'Отличная работа! Тест пройден!',
  score_failed: 'Продолжайте практиковаться — нужно набрать 70% для прохождения.',
  score_results: 'Результаты ответов',
  score_retry: 'Повторить ошибки',
  score_back: 'Назад к тестам',

  // Flashcards page
  flashcards_title: 'Карточки',
  flashcards_no_match: 'Нет карточек, соответствующих фильтрам. Попробуйте расширить выбор.',

  // Flashcard deck
  fc_difficulty: 'Сложность:',
  fc_all: 'Все',
  fc_beginner: 'Начальный',
  fc_intermediate: 'Средний',
  fc_advanced: 'Продвинутый',
  fc_show: 'Показать:',
  fc_all_cards: 'Все карточки',
  fc_unmastered: 'Неосвоенные',
  fc_card_of: 'из',
  fc_prev: 'Предыдущая карточка',
  fc_next: 'Следующая карточка',
  fc_keyboard_hint: 'Стрелки — навигация, пробел — перевернуть',
  fc_question: 'Вопрос',
  fc_answer: 'Ответ',

  // Mastery controls
  mastery_new: 'Новая',
  mastery_learning: 'Изучаю',
  mastery_mastered: 'Освоена',

  // Sandbox
  sandbox_guided_exercises: 'Упражнения с подсказками',
  sandbox_components: 'Компоненты',
  sandbox_compute: 'Вычисления',
  sandbox_storage: 'Хранилище',
  sandbox_network: 'Сеть',
  sandbox_messaging: 'Сообщения',
  sandbox_connect: 'Соединить',
  sandbox_connecting: 'Соединение...',
  sandbox_clear: 'Очистить',
  sandbox_save: 'Сохранить',
  sandbox_load: 'Загрузить',
  sandbox_no_saved: 'Нет сохранённых',
  sandbox_design_name: 'Название дизайна:',
  sandbox_connection_label: 'Метка соединения (напр. HTTP, TCP, gRPC):',
  sandbox_drag_hint: 'Перетащите компоненты из палитры на холст',
  sandbox_connect_hint: 'Нажмите на источник, затем на цель для соединения',

  // Guided exercise
  exercise_not_found: 'Упражнение не найдено',
  exercise_not_found_text: 'Упражнение, которое вы ищете, не существует.',
  exercise_back: 'Назад к песочнице',
  exercise_complete: 'Упражнение завершено',
  exercise_correct_answers: 'правильных ответов',
  exercise_review: 'Обзор',
  exercise_step: 'Шаг',
  exercise_your_answer: 'Ваш ответ:',
  exercise_correct_answer: 'Правильный ответ:',
  exercise_show_hint: 'Показать подсказку',
  exercise_hide_hint: 'Скрыть подсказку',
  exercise_correct: 'Правильно!',
  exercise_incorrect: 'Неправильно',
  exercise_next_step: 'Следующий шаг',
  exercise_see_results: 'Результаты',
  exercise_step_of: 'из',

  // Category labels
  cat_networking: 'Сети',
  cat_storage: 'Хранение и базы данных',
  cat_caching: 'Кэширование',
  cat_scaling: 'Масштабирование',
  cat_reliability: 'Надёжность',
  cat_messaging: 'Обмен сообщениями',
  cat_security: 'Безопасность',
  cat_patterns: 'Паттерны проектирования',

  // Difficulty labels
  diff_beginner: 'Начальный',
  diff_intermediate: 'Средний',
  diff_advanced: 'Продвинутый',
};
