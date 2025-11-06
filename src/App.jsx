import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WelcomeScreen from './components/WelcomeScreen';
import SubjectSelect from './components/SubjectSelect';
import QuizPage from './components/QuizPage';
import ResultPage from './components/ResultPage';
import questionsData from './data/questions.json';
import './App.css';

/**
 * Main App Component
 * Manages application state and routing between screens
 * Handles localStorage for tracking played questions
 */
function App() {
  const [currentScreen, setCurrentScreen] = useState('welcome'); // welcome, subjects, quiz, results
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [quizResults, setQuizResults] = useState(null);
  const [score, setScore] = useState(0);

  // Safety check: ensure questionsData is valid
  if (!questionsData || typeof questionsData !== 'object') {
    return (
      <div className="app">
        <div style={{ 
          textAlign: 'center', 
          padding: '60px 20px', 
          color: 'white',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div>
            <h1>⚠️ Error Loading Questions</h1>
            <p>Unable to load quiz questions. Please refresh the page.</p>
            <button 
              onClick={() => window.location.reload()} 
              style={{
                marginTop: '20px',
                padding: '12px 24px',
                fontSize: '1rem',
                background: 'white',
                color: '#667eea',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600'
              }}
            >
              Refresh Page
            </button>
          </div>
        </div>
      </div>
    );
  }

  const subjects = Object.keys(questionsData).filter(key => 
    Array.isArray(questionsData[key]) && questionsData[key].length > 0
  );

  /**
   * Get random non-repeating questions for a subject
   * Uses localStorage to track which questions have been played
   */
  const getRandomQuestions = (subject) => {
    // Safety check: validate subject exists
    if (!subject || !questionsData[subject]) {
      console.error(`Subject "${subject}" not found in questions data`);
      return null;
    }

    try {
      // Check if localStorage is available
      if (typeof Storage === 'undefined' || !window.localStorage) {
        console.warn('localStorage is not available. Progress will not be saved.');
        // Return random questions without tracking
        const allQuestions = questionsData[subject];
        const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, Math.min(10, shuffled.length));
      }

      // Get list of already played question IDs from localStorage
      const playedKey = `${subject}_played`;
      let playedData;
      try {
        playedData = localStorage.getItem(playedKey);
      } catch (e) {
        console.warn('Error accessing localStorage:', e);
        playedData = null;
      }
      const played = playedData ? JSON.parse(playedData) : [];
      
      // Get all questions for this subject
      const allQuestions = questionsData[subject];
      
      // Safety check: ensure questions array exists and is valid
      if (!Array.isArray(allQuestions) || allQuestions.length === 0) {
        console.error(`No questions found for subject "${subject}"`);
        return null;
      }
      
      // Filter out already played questions
      const unseenQuestions = allQuestions.filter(q => q && q.id && !played.includes(q.id));
      
      // Check if all questions have been played
      if (unseenQuestions.length === 0) {
        return null; // All questions completed
      }
      
      // Shuffle and pick 10 questions (or all if less than 10 remain)
      const shuffled = [...unseenQuestions].sort(() => Math.random() - 0.5);
      const selectedQuestions = shuffled.slice(0, Math.min(10, shuffled.length));
      
      // Update localStorage with newly selected question IDs
      try {
        const newPlayed = [...played, ...selectedQuestions.map(q => q.id)];
        localStorage.setItem(playedKey, JSON.stringify(newPlayed));
      } catch (e) {
        console.warn('Error saving to localStorage:', e);
        // Continue even if localStorage fails
      }
      
      return selectedQuestions;
    } catch (error) {
      console.error('Error getting random questions:', error);
      return null;
    }
  };

  /**
   * Handle subject selection
   * Checks if subject has available questions and starts quiz
   */
  const handleSelectSubject = (subject) => {
    setSelectedSubject(subject);
    const questions = getRandomQuestions(subject);
    
    if (questions === null) {
      // All questions completed for this subject
      alert(`You've completed all questions for ${subject.toUpperCase()}! Would you like to restart?`);
      // Option to reset: localStorage.removeItem(`${subject}_played`);
      return;
    }
    
    if (questions.length === 0) {
      alert('No questions available for this subject.');
      return;
    }
    
    setQuizQuestions(questions);
    setCurrentScreen('quiz');
  };

  /**
   * Handle quiz completion
   * Calculates score and shows results
   */
  const handleQuizComplete = (answers) => {
    // Safety check: ensure answers is valid
    if (!answers || !Array.isArray(answers) || answers.length === 0) {
      console.error('Invalid answers data received');
      alert('Error: No answers to process. Please try again.');
      setCurrentScreen('subjects');
      return;
    }

    let correctCount = 0;
    answers.forEach(answer => {
      if (answer && answer.selected && answer.correct && answer.selected === answer.correct) {
        correctCount++;
      }
    });
    
    setScore(correctCount);
    setQuizResults(answers);
    setCurrentScreen('results');
  };

  /**
   * Handle retry - get new random questions
   */
  const handleRetry = () => {
    if (!selectedSubject) return;
    
    const questions = getRandomQuestions(selectedSubject);
    
    if (questions === null || questions.length === 0) {
      alert(`You've completed all questions for ${selectedSubject.toUpperCase()}! Please choose another subject or restart.`);
      setCurrentScreen('subjects');
      return;
    }
    
    setQuizQuestions(questions);
    setCurrentScreen('quiz');
  };

  /**
   * Reset a subject's progress (optional feature)
   */
  const resetSubjectProgress = (subject) => {
    try {
      if (typeof Storage !== 'undefined' && window.localStorage && subject) {
        localStorage.removeItem(`${subject}_played`);
      }
    } catch (e) {
      console.warn('Error resetting progress:', e);
    }
  };

  return (
    <div className="app">
      <AnimatePresence mode="wait">
        {currentScreen === 'welcome' && (
          <WelcomeScreen
            key="welcome"
            onStart={() => setCurrentScreen('subjects')}
          />
        )}

        {currentScreen === 'subjects' && (
          <SubjectSelect
            key="subjects"
            subjects={subjects}
            onSelectSubject={handleSelectSubject}
            onBack={() => setCurrentScreen('welcome')}
          />
        )}

        {currentScreen === 'quiz' && (
          <QuizPage
            key="quiz"
            questions={quizQuestions}
            onComplete={handleQuizComplete}
            onBack={() => setCurrentScreen('subjects')}
          />
        )}

        {currentScreen === 'results' && (
          <ResultPage
            key="results"
            answers={quizResults}
            questions={quizQuestions}
            score={score}
            subject={selectedSubject}
            onRetry={handleRetry}
            onBackToSubjects={() => {
              setSelectedSubject(null);
              setCurrentScreen('subjects');
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;

