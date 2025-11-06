import { motion } from 'framer-motion';
import '../App.css';

/**
 * SubjectSelect Component
 * Home screen where users choose a subject to quiz on
 * Displays all available subjects as cards
 */
function SubjectSelect({ subjects, onSelectSubject, onBack }) {
  // Safety check: if no subjects, show message
  if (!subjects || !Array.isArray(subjects) || subjects.length === 0) {
    return (
      <motion.div
        className="subject-select"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="subject-error">
          <h2>No subjects available</h2>
          <p>Please check the questions data file.</p>
          <button className="back-button" onClick={onBack}>
            ← Back
          </button>
        </div>
      </motion.div>
    );
  }

  // Subject icons/colors mapping for visual appeal - Updated vibrant colors
  const subjectStyles = {
    python: { color: '#00d4ff', icon: '🐍' },
    c: { color: '#6c5ce7', icon: '⚙️' },
    java: { color: '#ff6b6b', icon: '☕' },
    html: { color: '#ffd93d', icon: '🌐' },
    css: { color: '#00d9a5', icon: '🎨' },
    javascript: { color: '#74b9ff', icon: '📜' },
    dbms: { color: '#a29bfe', icon: '🗄️' }
  };

  return (
    <motion.div
      className="subject-select"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="subject-header">
        <button className="back-button" onClick={onBack}>
          ← Back
        </button>
        <h1>Choose a Subject</h1>
        <p>Select a topic to start your quiz</p>
      </div>

      <div className="subjects-grid">
        {subjects.map((subject, index) => {
          const style = subjectStyles[subject] || { color: '#666', icon: '📚' };
          return (
            <motion.div
              key={subject}
              className="subject-card"
              onClick={() => onSelectSubject(subject)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              style={{ borderColor: style.color }}
            >
              <div className="subject-icon" style={{ color: style.color }}>
                {style.icon}
              </div>
              <h3 className="subject-name">{subject.toUpperCase()}</h3>
              <p className="subject-info">20 Questions Available</p>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

export default SubjectSelect;

