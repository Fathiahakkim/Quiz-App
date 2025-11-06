import { motion } from 'framer-motion';
import '../App.css';

/**
 * ResultPage Component
 * Displays quiz results with score, correct answers, and review
 * Provides options to retry or go back to subject selection
 */
function ResultPage({ answers, questions, score, onRetry, onBackToSubjects, subject }) {
  // Safety checks
  if (!questions || !Array.isArray(questions) || questions.length === 0) {
    return (
      <motion.div
        className="result-page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="result-error">
          <h2>No results available</h2>
          <button className="action-button primary" onClick={onBackToSubjects}>
            Go Back to Subjects
          </button>
        </div>
      </motion.div>
    );
  }

  if (!answers || !Array.isArray(answers) || answers.length === 0) {
    return (
      <motion.div
        className="result-page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="result-error">
          <h2>No answers to display</h2>
          <button className="action-button primary" onClick={onBackToSubjects}>
            Go Back to Subjects
          </button>
        </div>
      </motion.div>
    );
  }

  const percentage = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;
  
  // Determine performance message
  const getPerformanceMessage = () => {
    if (percentage >= 90) return { message: "Outstanding! 🌟", color: "#4caf50" };
    if (percentage >= 70) return { message: "Great Job! 👍", color: "#8bc34a" };
    if (percentage >= 50) return { message: "Good Effort! 💪", color: "#ffc107" };
    return { message: "Keep Learning! 📚", color: "#ff9800" };
  };

  const performance = getPerformanceMessage();

  return (
    <motion.div
      className="result-page"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="result-header">
        <h1>Quiz Results</h1>
        <p className="result-subject">Subject: {subject ? subject.toUpperCase() : 'Unknown'}</p>
      </div>

      <motion.div
        className="score-card"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="score-circle" style={{ borderColor: performance.color }}>
          <h2 className="score-number">{score}</h2>
          <p className="score-total">/ {questions.length}</p>
        </div>
        <h3 className="score-percentage">{percentage}%</h3>
        <p className="performance-message" style={{ color: performance.color }}>
          {performance.message}
        </p>
      </motion.div>

      <div className="result-actions">
        <motion.button
          className="action-button primary"
          onClick={onRetry}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Retry New Quiz
        </motion.button>
        <motion.button
          className="action-button secondary"
          onClick={onBackToSubjects}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Choose Another Subject
        </motion.button>
      </div>

      <div className="answers-review">
        <h3>Review Your Answers</h3>
        <div className="answers-list">
          {answers.map((answer, index) => {
            if (!answer) return null;
            const isCorrect = answer.selected === answer.correct;
            return (
              <motion.div
                key={index}
                className={`answer-item ${isCorrect ? 'correct' : 'incorrect'}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <div className="answer-header">
                  <span className="answer-number">Q{index + 1}</span>
                  <span className={`answer-status ${isCorrect ? 'correct' : 'incorrect'}`}>
                    {isCorrect ? '✓ Correct' : '✗ Incorrect'}
                  </span>
                </div>
                <p className="answer-question">{answer.question || 'Question not available'}</p>
                <div className="answer-details">
                  <div className="answer-option">
                    <strong>Your Answer:</strong> 
                    <span className={isCorrect ? 'correct-text' : 'incorrect-text'}>
                      {answer.selected || 'No answer selected'}
                    </span>
                  </div>
                  {!isCorrect && (
                    <div className="answer-option">
                      <strong>Correct Answer:</strong> 
                      <span className="correct-text">{answer.correct || 'N/A'}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

export default ResultPage;

