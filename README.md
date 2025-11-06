# 🎓 TechQuest - Smart Technical Quiz App

A modern, interactive quiz web application for technical learning covering multiple programming languages and technologies.

## ✨ Features

- **Multiple Subjects**: Python, C, Java, HTML, CSS, JavaScript, DBMS
- **Smart Question Selection**: 10 random, non-repeating questions per session
- **Progress Tracking**: Uses localStorage to remember which questions you've answered
- **Beautiful UI**: Modern, responsive design with smooth animations
- **Result Review**: See your score and review all answers with correct solutions
- **Session Management**: Tracks progress per subject independently

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to the URL shown in the terminal (usually `http://localhost:5173`)

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 📁 Project Structure

```
techquest/
├── src/
│   ├── components/
│   │   ├── WelcomeScreen.jsx    # Welcome/intro screen
│   │   ├── SubjectSelect.jsx    # Subject selection screen
│   │   ├── QuizPage.jsx         # Quiz interface
│   │   └── ResultPage.jsx       # Results and review screen
│   ├── data/
│   │   └── questions.json       # All quiz questions (20 per subject)
│   ├── App.jsx                  # Main app component with routing
│   ├── App.css                  # Global styles
│   └── index.js                 # Entry point
├── index.html
├── package.json
└── vite.config.js
```

## 🎮 How It Works

1. **Welcome Screen**: Introduction to the app
2. **Subject Selection**: Choose from 7 different technical subjects
3. **Quiz Session**: Answer 10 random questions (one at a time)
4. **Results**: View your score and review all answers

### Question Tracking

- Each subject has 20 questions
- The app tracks which questions you've answered using localStorage
- Questions are selected randomly from the pool of unanswered questions
- When all questions for a subject are completed, you'll be notified

### Resetting Progress

To reset progress for a subject, you can:
1. Open browser DevTools (F12)
2. Go to Application/Storage → Local Storage
3. Delete the key: `{subject}_played` (e.g., `python_played`)

Or add this to your browser console:
```javascript
localStorage.removeItem('python_played'); // Replace 'python' with desired subject
```

## 🛠️ Tech Stack

- **React 18** - UI framework
- **Framer Motion** - Smooth animations and transitions
- **Vite** - Fast build tool and dev server
- **CSS3** - Modern styling (no frameworks)
- **localStorage** - Client-side data persistence

## 📝 Customization

### Adding More Questions

Edit `src/data/questions.json` and add more questions to any subject:

```json
{
  "python": [
    {
      "id": 21,
      "question": "Your new question?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "answer": "Option A"
    }
  ]
}
```

### Adding New Subjects

1. Add a new key in `src/data/questions.json` with 20 questions
2. The subject will automatically appear in the subject selection screen

### Styling

All styles are in `src/App.css`. Customize colors, fonts, and layouts as needed.

## 🎯 Future Enhancements

- Timer for each question
- Difficulty levels (Easy/Medium/Hard)
- Leaderboard (local or cloud-based)
- User accounts and progress sync
- More subjects and questions
- Dark mode toggle

## 📄 License

This project is open source and available for educational purposes.

## 🤝 Contributing

Feel free to submit issues, fork the repository, and create pull requests for any improvements.

---

**Happy Learning! 🚀**

