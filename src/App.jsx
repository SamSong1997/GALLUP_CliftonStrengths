import { useState } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import QuizScreen from './components/QuizScreen';
import ProcessingScreen from './components/ProcessingScreen';
import ReportScreen from './components/ReportScreen';
import './App.css';

function App() {
    const [currentScreen, setCurrentScreen] = useState('welcome'); // welcome, quiz, processing, report
    const [quizResults, setQuizResults] = useState(null);
    const [reportData, setReportData] = useState(null);

    const startQuiz = () => {
        setCurrentScreen('quiz');
    };

    const handleQuizComplete = (results) => {
        setQuizResults(results);
        setCurrentScreen('processing');
    };

    const handleReportGenerated = (data) => {
        setReportData(data);
        setCurrentScreen('report');
    };

    const restart = () => {
        setQuizResults(null);
        setReportData(null);
        setCurrentScreen('welcome');
    };

    return (
        <div className="app-container">
            {currentScreen === 'welcome' && <WelcomeScreen onStart={startQuiz} />}

            {currentScreen === 'quiz' && (
                <QuizScreen onComplete={handleQuizComplete} />
            )}

            {currentScreen === 'processing' && (
                <ProcessingScreen
                    results={quizResults}
                    onComplete={handleReportGenerated}
                />
            )}

            {currentScreen === 'report' && (
                <ReportScreen
                    data={reportData}
                    onRestart={restart}
                />
            )}
        </div>
    );
}

export default App;
