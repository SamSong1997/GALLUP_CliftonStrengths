import React, { useState } from 'react';
import { ArrowRight, BookOpen, Brain, Target, Compass } from 'lucide-react';

const WelcomeScreen = ({ onStart }) => {
    const [showSample, setShowSample] = useState(false);

    const sampleThemes = [
        { rank: 1, name: '战略', enName: 'Strategic', desc: '您足智多谋。针对不同的方案，能迅速找出相关的模式和结果。', domain: 'strategic' },
        { rank: 2, name: '体谅', enName: 'Empathy', desc: '您能够设身处地地体会他人的情感。', domain: 'relationship' },
        { rank: 3, name: '成就', enName: 'Achiever', desc: '您工作努力，具有极强的耐力。您对忙碌和高效率感到极大的满足感。', domain: 'executing' },
        { rank: 4, name: '沟通', enName: 'Communication', desc: '您善于将想法付诸言辞。您是极佳的交谈者和生动的讲解者。', domain: 'influencing' },
        { rank: 5, name: '学习', enName: 'Learner', desc: '您有旺盛的求知欲，渴望不断提高自我。尤其令您激动的，是求知的过程而非结果。', domain: 'strategic' }
    ];

    return (
        <div className="welcome-container fade-in">
            <header className="hero-section">
                <div className="logo-area">
                    <div className="logo-icon">
                        <Brain size={40} color="#d97757" />
                    </div>
                    <h1>CliftonStrengths</h1>
                    <span className="subtitle">优势识别器</span>
                </div>

                <div className="hero-content">
                    <h2>发现你的核心优势</h2>
                    <p className="hero-desc">
                        基于盖洛普优势心理学，通过180道深度测评，
                        精准定位您的天赋才干，解锁潜能。
                    </p>

                    <button className="btn-primary start-btn" onClick={onStart}>
                        开始测评 <ArrowRight size={20} />
                    </button>

                    <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                        <button
                            className="btn-secondary"
                            onClick={() => setShowSample(!showSample)}
                        >
                            {showSample ? '收起示例' : '📋 查看示例报告'}
                        </button>
                    </div>
                </div>
            </header>

            {showSample && (
                <div className="sample-report-section" style={{ marginTop: '3rem', paddingTop: '3rem', borderTop: '1px solid #e8e6dc' }}>
                    <div className="sample-report-header" style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>📋 示例报告预览</h3>
                        <p style={{ color: '#666' }}>以下是您完成测评后将获得的报告样式</p>
                    </div>

                    <div className="sample-themes-cards" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {sampleThemes.map(theme => (
                            <div key={theme.rank} className="theme-card-new">
                                <div className={`theme-color-strip domain-${theme.domain}`}></div>
                                <div className="theme-content-new">
                                    <div className="theme-header-new">
                                        <span className="theme-rank-new">{theme.rank}.</span>
                                        <span className="theme-name-new">{theme.name}</span>
                                        <span className="theme-en-name">({theme.enName})</span>
                                    </div>
                                    <div className="theme-desc-new">
                                        {theme.desc}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="features-grid">
                <div className="feature-card">
                    <Target className="feature-icon" size={32} color="#2563eb" />
                    <h3>精准定位</h3>
                    <p>34项才干主题，识别您的Top 5核心优势</p>
                </div>
                <div className="feature-card">
                    <BookOpen className="feature-icon" size={32} color="#059669" />
                    <h3>深度解读</h3>
                    <p>AI驱动的个性化分析报告，提供行动指南</p>
                </div>
                <div className="feature-card">
                    <Brain className="feature-icon" size={32} color="#d97757" />
                    <h3>科学权威</h3>
                    <p>基于数十年积极心理学研究成果</p>
                </div>
                <div className="feature-card">
                    <Compass className="feature-icon" size={32} color="#7c3aed" />
                    <h3>成长指引</h3>
                    <p>助力个人发展与团队协作的实用建议</p>
                </div>
            </div>
        </div>
    );
};

export default WelcomeScreen;
