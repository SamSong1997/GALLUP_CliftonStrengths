import React from 'react';

const ProgressBar = ({ progress, current, total }) => {
    return (
        <div className="progress-container">
            <div className="progress-info">
                <span>进度</span>
                <span>{current} / {total}</span>
            </div>
            <div className="progress-track">
                <div
                    className="progress-fill"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
        </div>
    );
};

export default ProgressBar;
