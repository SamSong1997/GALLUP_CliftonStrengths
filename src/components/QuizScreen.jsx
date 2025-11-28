import React, { useState, useEffect } from 'react';
import { gallupData } from '../utils/data';
import { scoringEngine } from '../utils/scoring';
import QuestionCard from './QuestionCard';

const QuizScreen = ({ onComplete }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        const allQuestions = gallupData.questions;
        setQuestions(allQuestions);
    }, []);

    const handleAnswer = (value, side) => {
        const question = questions[currentQuestionIndex];

        const newAnswers = {
            ...answers,
            [question.id]: { value, side }
        };
        setAnswers(newAnswers);

        if (currentQuestionIndex < questions.length - 1) {
            setTimeout(() => {
                setCurrentQuestionIndex(prev => prev + 1);
            }, 300);
        } else {
            finishQuiz(newAnswers);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
        }
    };

    const finishQuiz = (finalAnswers) => {
        const top5 = scoringEngine.calculateResults(finalAnswers);
        const allThemes = scoringEngine.calculateAllScores(finalAnswers);

        onComplete({
            top5,
            allThemes,
            answers: finalAnswers
        });
    };

    if (questions.length === 0) return <div>Loading questions...</div>;

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className="quiz-container fade-in">
            <QuestionCard
                question={currentQuestion}
                onAnswer={handleAnswer}
                questionNumber={currentQuestionIndex + 1}
                totalQuestions={questions.length}
            />

            <div className="quiz-controls">
                <div style={{ width: '120px', textAlign: 'left' }}>
                    {currentQuestionIndex > 0 && (
                        <button
                            className="btn-previous"
                            onClick={handlePrevious}
                        >
                            上一题
                        </button>
                    )}
                </div>

                <div className="auto-skip-hint">选择后自动跳转</div>

                <div style={{ width: '120px', textAlign: 'right' }}>
                    {/* Debug Button - Only for testing convenience */}
                    <button
                        onClick={() => {
                            const remainingAnswers = {};
                            for (let i = currentQuestionIndex; i < questions.length; i++) {
                                const qId = questions[i].id;
                                const randomValue = Math.floor(Math.random() * 4);
                                const randomSide = Math.random() > 0.5 ? 'A' : 'B';
                                remainingAnswers[qId] = {
                                    value: randomValue === 0 ? 0 : randomValue,
                                    side: randomValue === 0 ? 'N' : randomSide
                                };
                            }
                            finishQuiz({ ...answers, ...remainingAnswers });
                        }}
                        style={{
                            fontSize: '12px',
                            padding: '4px 8px',
                            background: 'transparent',
                            border: '1px solid #e5e7eb',
                            borderRadius: '4px',
                            color: '#9ca3af',
                            cursor: 'pointer',
                            opacity: 0.6
                        }}
                        title="测试专用：随机填充剩余答案"
                    >
                        ⚡️ 速通
                    </button>
                </div>
            </div>
        </div>
    );
};

export default QuizScreen;
