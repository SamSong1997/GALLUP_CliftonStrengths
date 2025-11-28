import React, { useEffect, useState } from 'react';
import { aiAnalyzer } from '../utils/ai';
import { Brain, Loader2 } from 'lucide-react';

const ProcessingScreen = ({ results, onComplete }) => {
    const [status, setStatus] = useState('正在分析您的测评数据...');
    const [error, setError] = useState(null);

    if (!results) {
        return (
            <div className="processing-container error">
                <p>数据传输错误，请重新测试。</p>
                <button className="btn-primary" onClick={() => window.location.reload()}>重试</button>
            </div>
        );
    }

    useEffect(() => {
        let mounted = true;

        const analyze = async () => {
            try {
                console.log('Starting AI analysis...', results);
                if (mounted) setStatus('正在生成个性化优势报告...');

                const reportData = await aiAnalyzer.analyzeResults(results.top5, results.allThemes);

                if (mounted) {
                    console.log('AI analysis complete:', reportData);
                    // Add user info
                    reportData.userName = '用户';
                    reportData.testDate = new Date().toLocaleDateString('zh-CN');
                    onComplete(reportData);
                }
            } catch (err) {
                console.error('AI Analysis Error:', err);
                if (mounted) setError(`AI分析失败: ${err.message || '未知错误'}`);
            }
        };

        analyze();

        return () => {
            mounted = false;
        };
    }, [results, onComplete]);

    if (error) {
        return (
            <div className="processing-container error">
                <div className="error-content">
                    <h3>⚠️ 分析过程中发生错误</h3>
                    <p>{error}</p>
                    <button className="btn-primary" onClick={() => window.location.reload()}>重新加载</button>
                </div>
            </div>
        );
    }

    return (
        <div className="processing-container fade-in">
            <div className="processing-content">
                <div className="spinner-container">
                    <Loader2 className="spinner" size={64} color="#d97757" />
                    <Brain className="brain-icon" size={32} color="#141413" />
                </div>
                <h2>AI 正在深度分析</h2>
                <p>{status}</p>
                <p className="sub-text">这可能需要 30-60 秒，请勿关闭页面</p>
            </div>
        </div>
    );
};

export default ProcessingScreen;
