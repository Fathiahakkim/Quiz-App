import { motion } from 'framer-motion';
import '../App.css';

/**
 * WelcomeScreen Component
 * First screen users see when they open the app
 * Provides introduction and starts the quiz experience
 */
function WelcomeScreen({ onStart }) {
  return (
    <motion.div
      className="welcome-screen"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="welcome-content"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h1 className="welcome-title">🎓 TechQuest</h1>
        <p className="welcome-subtitle">Smart Technical Quiz Platform</p>
        <p className="welcome-description">
          Test your knowledge across multiple programming languages and technologies.
          Challenge yourself with 10 random questions each session!
        </p>
        <motion.button
          className="start-button"
          onClick={onStart}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Get Started
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

export default WelcomeScreen;

