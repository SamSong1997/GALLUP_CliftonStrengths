import React, { useState } from 'react';

const QuestionCard = ({ question, onAnswer, questionNumber, totalQuestions }) => {
    const [selected, setSelected] = useState(null);

    React.useEffect(() => {
        setSelected(null);
    }, [question]);

    const handleSelect = (value, side) => {
        setSelected({ value, side });
        onAnswer(value, side);
    };

    return (
        <div className="question-card">
            <div className="question-header">
                <div className="question-number">题目 {questionNumber} / {totalQuestions}</div>
            </div>

            <div className="options-row">
                {/* Option A */}
                <div className={`option-side side-a ${selected?.side === 'A' ? 'active' : ''}`}>
                    <div className="option-text">{question.option_a}</div>
                </div>

                {/* VS Separator */}
                <div className="vs-separator">VS</div>

                {/* Option B */}
                <div className={`option-side side-b ${selected?.side === 'B' ? 'active' : ''}`}>
                    <div className="option-text">{question.option_b}</div>
                </div>
            </div>

            {/* 5-Button Scale */}
            <div className="scale-row">
                <div className="scale-item">
                    <span className="scale-label">特别同意</span>
                    <button
                        className={`scale-btn size-large color-a ${selected?.side === 'A' && selected?.value === 3 ? 'selected' : ''}`}
                        onClick={() => handleSelect(3, 'A')}
                    />
                </div>
                <div className="scale-item">
                    <span className="scale-label">比较同意</span>
                    <button
                        className={`scale-btn size-medium color-a ${selected?.side === 'A' && selected?.value === 2 ? 'selected' : ''}`}
                        onClick={() => handleSelect(2, 'A')}
                    />
                </div>
                <div className="scale-item">
                    <span className="scale-label">中立</span>
                    <button
                        className={`scale-btn size-small color-neutral ${selected?.value === 0 ? 'selected' : ''}`}
                        onClick={() => handleSelect(0, 'N')}
                    />
                </div>
                <div className="scale-item">
                    <span className="scale-label">比较同意</span>
                    <button
                        className={`scale-btn size-medium color-b ${selected?.side === 'B' && selected?.value === 2 ? 'selected' : ''}`}
                        onClick={() => handleSelect(2, 'B')}
                    />
                </div>
                <div className="scale-item">
                    <span className="scale-label">特别同意</span>
                    <button
                        className={`scale-btn size-large color-b ${selected?.side === 'B' && selected?.value === 3 ? 'selected' : ''}`}
                        onClick={() => handleSelect(3, 'B')}
                    />
                </div>
            </div>
        </div>
    );
};

export default QuestionCard;
