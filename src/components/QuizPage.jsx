import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../App.css';

/**
 * QuizPage Component
 * Displays one question at a time with multiple choice options
 * Tracks user answers and navigates through questions
 */
function QuizPage({ questions, onComplete, onBack }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);

  // Safety check: if no questions, show error message
  if (!questions || !Array.isArray(questions) || questions.length === 0) {
    return (
      <motion.div
        className="quiz-page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="quiz-error">
          <h2>No questions available</h2>
          <p>Please go back and select a different subject.</p>
          <button className="back-button" onClick={onBack}>
            ← Back to Subjects
          </button>
        </div>
      </motion.div>
    );
  }

  // Safety check: ensure current question exists
  if (currentIndex < 0 || currentIndex >= questions.length) {
    return (
      <motion.div
        className="quiz-page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="quiz-error">
          <h2>Invalid question index</h2>
          <button className="back-button" onClick={onBack}>
            ← Back to Subjects
          </button>
        </div>
      </motion.div>
    );
  }

  const currentQuestion = questions[currentIndex];
  
  // Safety check: ensure current question is valid
  if (!currentQuestion || !currentQuestion.question || !currentQuestion.options) {
    return (
      <motion.div
        className="quiz-page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="quiz-error">
          <h2>Invalid question data</h2>
          <button className="back-button" onClick={onBack}>
            ← Back to Subjects
          </button>
        </div>
      </motion.div>
    );
  }

  const progress = questions.length > 0 ? ((currentIndex + 1) / questions.length) * 100 : 0;

  // Handle answer selection
  const handleSelectAnswer = (answer) => {
    if (answer) {
      setSelectedAnswer(answer);
    }
  };

  // Move to next question
  const handleNext = () => {
    if (selectedAnswer === null || !currentQuestion) return;

    // Save the answer
    const newAnswers = [...answers];
    newAnswers[currentIndex] = {
      question: currentQuestion.question || 'Question not available',
      selected: selectedAnswer,
      correct: currentQuestion.answer || '',
      options: currentQuestion.options || []
    };
    setAnswers(newAnswers);

    // Check if this is the last question
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      // Quiz completed
      setShowResult(true);
      setTimeout(() => {
        onComplete(newAnswers);
      }, 500);
    }
  };

  // Reset when questions change
  useEffect(() => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setAnswers([]);
    setShowResult(false);
  }, [questions]);

  if (showResult) {
    return (
      <motion.div
        className="quiz-complete"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h2>Quiz Complete! 🎉</h2>
        <p>Calculating your results...</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="quiz-page"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="quiz-header">
        <button className="back-button" onClick={onBack}>
          ← Back
        </button>
        <div className="quiz-progress">
          <div className="progress-bar">
            <motion.div
              className="progress-fill"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <p className="progress-text">
            Question {currentIndex + 1} of {questions.length}
          </p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className="question-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="question-text">{currentQuestion.question}</h2>

          <div className="options-container">
            {currentQuestion.options && Array.isArray(currentQuestion.options) && currentQuestion.options.length > 0 ? (
              currentQuestion.options.map((option, index) => (
                <motion.button
                  key={index}
                  className={`option-button ${selectedAnswer === option ? 'selected' : ''}`}
                  onClick={() => handleSelectAnswer(option)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="option-label">{String.fromCharCode(65 + index)}</span>
                  <span className="option-text">{option || 'Option not available'}</span>
                </motion.button>
              ))
            ) : (
              <p>No options available for this question.</p>
            )}
          </div>

          <motion.button
            className="next-button"
            onClick={handleNext}
            disabled={selectedAnswer === null}
            whileHover={selectedAnswer !== null ? { scale: 1.05 } : {}}
            whileTap={selectedAnswer !== null ? { scale: 0.95 } : {}}
          >
            {currentIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
          </motion.button>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

export default QuizPage;

