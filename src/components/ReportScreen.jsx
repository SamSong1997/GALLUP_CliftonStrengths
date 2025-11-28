import { saveAs } from 'file-saver';
import React from 'react';
import { Download, RefreshCw } from 'lucide-react';

const THEME_DOMAINS = {
    "成就": "Executing", "统筹": "Executing", "信仰": "Executing", "公平": "Executing", "审慎": "Executing", "纪律": "Executing", "专注": "Executing", "责任": "Executing", "排难": "Executing",
    "行动": "Influencing", "统率": "Influencing", "沟通": "Influencing", "竞争": "Influencing", "完美": "Influencing", "自信": "Influencing", "追求": "Influencing", "取悦": "Influencing",
    "适应": "Relationship Building", "关联": "Relationship Building", "伯乐": "Relationship Building", "体谅": "Relationship Building", "和谐": "Relationship Building", "包容": "Relationship Building", "个别": "Relationship Building", "积极": "Relationship Building", "交往": "Relationship Building",
    "分析": "Strategic Thinking", "回顾": "Strategic Thinking", "前瞻": "Strategic Thinking", "理念": "Strategic Thinking", "搜集": "Strategic Thinking", "思维": "Strategic Thinking", "学习": "Strategic Thinking", "战略": "Strategic Thinking"
};

const DOMAIN_COLORS = {
    "Executing": "#7b549b", // Purple
    "Influencing": "#f2a900", // Orange
    "Relationship Building": "#0077c8", // Blue
    "Strategic Thinking": "#4c9f45" // Green
};

const DOMAIN_NAMES_CN = {
    "Executing": "执行力",
    "Influencing": "影响力",
    "Relationship Building": "关系建立",
    "Strategic Thinking": "战略思维"
};

const ReportScreen = ({ data, onRestart }) => {
    console.log('ReportScreen rendered with data:', data);

    // Validate data
    if (!data || !data.top5Analysis) {
        // ... (Error handling remains same)
        console.error('Invalid report data:', data);
        return (
            <div className="report-screen fade-in">
                <div className="report-header">
                    <h2>⚠️ 报告数据错误</h2>
                    <p>无法加载报告数据，请重新测试。</p>
                    <button className="btn-primary" onClick={onRestart}>
                        重新测试
                    </button>
                </div>
            </div>
        );
    }

    // Helper to generate HTML string (moved out of downloadHTML to be reusable)
    const generateHTMLString = () => {
        const getThemeColor = (themeName) => {
            const domain = THEME_DOMAINS[themeName] || "Executing";
            return DOMAIN_COLORS[domain];
        };

        const getDomainName = (themeName) => {
            const domain = THEME_DOMAINS[themeName] || "Executing";
            return DOMAIN_NAMES_CN[domain];
        };

        // Generate DNA Barcode HTML
        const dnaBars = data.allThemes.map(theme => {
            const color = getThemeColor(theme.name);
            return `<div style="flex: 1; height: 100%; background-color: ${color}; margin: 0 1px;" title="${theme.name}"></div>`;
        }).join('');

        // Split themes for the 2-column layout (1-17, 18-34)
        const midPoint = Math.ceil(data.allThemes.length / 2);
        const leftColumnThemes = data.allThemes.slice(0, midPoint);
        const rightColumnThemes = data.allThemes.slice(midPoint);

        const renderThemeListItem = (theme, index, startIndex) => {
            const color = getThemeColor(theme.name);
            return `
                <div class="list-item">
                    <div class="list-rank">${startIndex + index + 1}</div>
                    <div class="list-marker" style="background-color: ${color};"></div>
                    <div class="list-name">${theme.name}</div>
                    <div class="list-score">${theme.score}</div>
                </div>
            `;
        };

        return `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>CliftonStrengths 优势报告 - ${data.userName}</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Noto+Serif+SC:wght@400;500;700&display=swap');
        
        :root {
            --color-executing: #7b549b;
            --color-influencing: #f2a900;
            --color-relationship: #0077c8;
            --color-strategic: #4c9f45;
            --text-primary: #333;
            --text-secondary: #666;
            --bg-light: #f9f9f9;
        }

        body { 
            font-family: 'Lora', 'Noto Serif SC', serif; 
            line-height: 1.6; 
            color: var(--text-primary); 
            max-width: 900px; 
            margin: 0 auto; 
            padding: 0;
            background: #fff;
        }

        /* Cover Page */
        .cover-page {
            height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 40px;
            box-sizing: border-box;
            text-align: center;
            page-break-after: always;
        }
        
        .logo {
            font-family: 'Lora', 'Noto Serif SC', serif;
            font-size: 24px;
            font-weight: bold;
            letter-spacing: 2px;
            margin-bottom: 60px;
            color: #000;
        }

        .report-title {
            font-family: 'Lora', 'Noto Serif SC', serif;
            font-size: 48px;
            font-weight: 700;
            margin-bottom: 20px;
            color: #000;
            line-height: 1.2;
        }

        .report-subtitle {
            font-size: 24px;
            color: var(--text-secondary);
            margin-bottom: 60px;
            font-weight: 400;
        }

        .dna-visualization {
            width: 100%;
            height: 60px;
            display: flex;
            margin: 40px 0;
            border-radius: 4px;
            overflow: hidden;
            max-width: 800px; /* Limit width for aesthetics */
        }

        .user-info {
            margin-top: 40px; /* Fixed margin instead of auto */
            font-size: 18px;
            color: var(--text-secondary);
        }

        /* Section Styles */
        .section {
            padding: 60px 40px;
            page-break-after: always;
        }

        .section-header {
            margin-bottom: 40px;
            border-bottom: 2px solid #eee;
            padding-bottom: 20px;
        }

        .section-title {
            font-family: 'Lora', 'Noto Serif SC', serif;
            font-size: 32px;
            color: #000;
            margin: 0;
        }

        /* Theme Cards */
        .theme-card {
            margin-bottom: 40px;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0,0,0,0.05);
            page-break-inside: avoid;
            background: #fff;
        }

        .theme-header {
            padding: 20px 30px;
            color: white;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .theme-rank {
            font-size: 48px;
            font-weight: bold;
            opacity: 0.9;
            line-height: 1;
        }

        .theme-names {
            text-align: right;
        }

        .theme-name-cn {
            font-size: 24px;
            font-weight: bold;
            display: block;
        }

        .theme-name-en {
            font-size: 14px;
            opacity: 0.9;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .theme-content {
            padding: 30px;
            border: 1px solid #eee;
            border-top: none;
            border-radius: 0 0 8px 8px;
        }

        .theme-definition {
            font-size: 16px;
            color: #444;
            margin-bottom: 25px;
            font-style: italic;
            line-height: 1.8;
        }

        .subsection-title {
            font-size: 14px;
            font-weight: bold;
            text-transform: uppercase;
            color: #888;
            margin-bottom: 15px;
            letter-spacing: 1px;
            border-bottom: 1px solid #eee;
            padding-bottom: 5px;
        }

        .insight-list, .action-list {
            list-style: none;
            padding: 0;
            margin: 0 0 25px 0;
        }

        .insight-list li, .action-list li {
            margin-bottom: 12px;
            padding-left: 20px;
            position: relative;
        }

        .insight-list li::before {
            content: "•";
            color: var(--text-secondary);
            position: absolute;
            left: 0;
        }
        
        .action-list li::before {
            content: "→";
            color: var(--text-secondary);
            position: absolute;
            left: 0;
        }

        /* Full List - 2 Columns */
        .full-list-container {
            display: flex;
            gap: 60px;
        }

        .full-list-column {
            flex: 1;
        }

        .list-item {
            display: flex;
            align-items: center;
            padding: 12px 0;
            border-bottom: 1px solid #eee;
        }

        .list-rank {
            width: 30px;
            font-weight: bold;
            color: #888;
            font-family: 'Lora', serif;
        }

        .list-marker {
            width: 4px;
            height: 24px;
            margin-right: 15px;
            border-radius: 2px;
        }

        .list-name {
            font-weight: 500;
            font-size: 16px;
        }
        
        .list-score {
            margin-left: auto;
            color: #888;
            font-size: 14px;
        }

        /* Footer */
        .footer {
            text-align: center;
            padding: 40px;
            color: #888;
            font-size: 12px;
            border-top: 1px solid #eee;
        }

        @media print {
            body { 
                max-width: 100%; 
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
            }
            .cover-page { height: 100vh; }
            .no-print { display: none; }
        }
    </style>
</head>
<body>
    <!-- Cover Page -->
    <div class="cover-page">
        <div class="logo">GALLUP | CliftonStrengths</div>
        
        <div class="report-title">您的 CliftonStrengths 34<br>优势识别报告</div>
        <div class="report-subtitle">释放您的无限潜能</div>

        <div class="dna-visualization">
            ${dnaBars}
        </div>

        <div class="user-info">
            <p><strong>${data.userName}</strong></p>
            <p>测试日期：${data.testDate}</p>
        </div>
    </div>

    <!-- Top 5 Section -->
    <div class="section">
        <div class="section-header">
            <h2 class="section-title">您的 Top 5 核心优势</h2>
            <p style="color: #666; margin-top: 10px;">这些是您最突出的天赋，是您实现卓越生活的起点。</p>
        </div>

        ${data.top5Analysis.map((theme, index) => {
            const color = getThemeColor(theme.name);
            const domain = getDomainName(theme.name);

            return `
            <div class="theme-card">
                <div class="theme-header" style="background-color: ${color};">
                    <div class="theme-rank">${index + 1}</div>
                    <div class="theme-names">
                        <span class="theme-name-cn">${theme.name}</span>
                        <span class="theme-name-en">${theme.nameEN}</span>
                    </div>
                </div>
                <div class="theme-content">
                    <div class="theme-definition">
                        "${theme.definition}"
                    </div>
                    
                    <div class="subsection-title">个性化洞察</div>
                    <ul class="insight-list">
                        ${theme.personalInsights.map(insight => `<li>${insight}</li>`).join('')}
                    </ul>
                    
                    <div class="subsection-title">行动指南</div>
                    <ul class="action-list">
                        ${theme.actionSteps.map(step => `<li>${step}</li>`).join('')}
                    </ul>
                </div>
            </div>
            `;
        }).join('')}
    </div>

    <!-- Action Plan Section -->
    <div class="section">
        <div class="section-header">
            <h2 class="section-title">行动计划</h2>
        </div>
        
        <div class="theme-card" style="border: 1px solid #eee; box-shadow: none;">
            <div class="theme-content" style="border: none;">
                <div class="subsection-title">场景应用</div>
                <ul class="insight-list">
                    ${data.actionPlan.scenarios.map(s => `<li>${s}</li>`).join('')}
                </ul>

                <div class="subsection-title" style="margin-top: 30px;">沟通建议</div>
                <p style="color: #444; line-height: 1.8;">${data.actionPlan.communication}</p>

                <div class="subsection-title" style="margin-top: 30px;">发展路径</div>
                <p style="color: #444; line-height: 1.8;">${data.actionPlan.developmentPlan}</p>
            </div>
        </div>
    </div>

    <!-- Full List Section -->
    <div class="section">
        <div class="section-header">
            <h2 class="section-title">完整 34 项才干排序</h2>
            <p style="color: #666; margin-top: 10px;">了解您的完整才干基因，最大程度发挥无限潜能。</p>
        </div>

        <div class="full-list-container">
            <div class="full-list-column">
                ${leftColumnThemes.map((theme, index) => renderThemeListItem(theme, index, 0)).join('')}
            </div>
            <div class="full-list-column">
                ${rightColumnThemes.map((theme, index) => renderThemeListItem(theme, index, midPoint)).join('')}
            </div>
        </div>
    </div>

    <div class="footer no-print" style="margin-top: 40px; padding-bottom: 20px;">
        <button onclick="window.print()" style="
            background-color: #141413;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 50px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            font-family: 'Noto Sans SC', sans-serif;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        ">
            🖨️ 打印 / 另存为 PDF
        </button>
    </div>

    <div class="footer">
        © 2025 Gallup, Inc. All rights reserved. CliftonStrengths® is a trademark of Gallup, Inc.
    </div>
</body>
</html>`;
    };

    // Solution 3: Open in New Tab
    const handleOpenInNewTab = () => {
        const newWindow = window.open('', '_blank');
        if (newWindow) {
            newWindow.document.write(generateHTMLString());
            newWindow.document.close();
        } else {
            alert('请允许弹出窗口以查看报告');
        }
    };

    return (
        <div className="report-screen fade-in">
            <div className="report-header no-print">
                <h2>🎉 您的优势报告已生成！</h2>
                <div className="report-actions">
                    <button className="btn-primary" onClick={handleOpenInNewTab}>
                        🌐 查看完整报告
                    </button>
                    <button className="btn-secondary" onClick={onRestart}>
                        <RefreshCw size={20} /> 重新测试
                    </button>
                </div>
                <div style={{ marginTop: '10px', fontSize: '0.8rem', color: '#666' }}>
                    提示：点击上方按钮在新窗口查看报告，可按 Ctrl+S (或 Cmd+S) 保存为 HTML 文件。
                </div>
            </div>

            <div className="report-preview">
                <h3>Top 5 预览</h3>
                <div className="preview-grid">
                    {data.top5Analysis.map((theme, index) => (
                        <div key={index} className="preview-card">
                            <span className="rank">#{index + 1}</span>
                            <h4>{theme.name}</h4>
                            <span className="en-name">{theme.nameEN}</span>
                        </div>
                    ))}
                </div>
                <p className="preview-hint">点击“查看完整报告”获取深度解读与行动指南</p>
            </div>
        </div>
    );
};

export default ReportScreen;
