class AIAnalyzer {
    constructor() {
        this.apiKey = import.meta.env.VITE_DEEPSEEK_API_KEY;
        this.apiEndpoint = 'https://api.deepseek.com/v1/chat/completions';
    }

    async analyzeResults(topThemes, allThemes) {
        try {
            const prompt = this.buildPrompt(topThemes, allThemes);
            const response = await this.callDeepSeekAPI(prompt);
            const reportData = this.parseAIResponse(response);

            if (!reportData.top5Themes) reportData.top5Themes = topThemes;
            if (!reportData.allThemes) reportData.allThemes = allThemes;

            return reportData;
        } catch (error) {
            console.error('AI Analysis failed:', error);
            throw error;
        }
    }

    parseAIResponse(responseText) {
        try {
            return JSON.parse(responseText);
        } catch (e) {
            const jsonMatch = responseText.match(/```json\s*([\s\S]*?)\s*```/);
            if (jsonMatch) return JSON.parse(jsonMatch[1]);

            const braceMatch = responseText.match(/\{[\s\S]*\}/);
            if (braceMatch) return JSON.parse(braceMatch[0]);

            throw new Error('Unable to parse AI response as JSON');
        }
    }

    buildPrompt(topThemes, allThemes) {
        const userDataStr = JSON.stringify({
            testDate: new Date().toLocaleDateString('zh-CN'),
            top5: topThemes.map((t, i) => ({
                rank: i + 1,
                name: t.name,
                score: t.score.toFixed(1)
            })),
            all34: allThemes.map((t, i) => ({
                rank: i + 1,
                name: t.name,
                score: t.score.toFixed(1)
            }))
        }, null, 2);

        const themeEnglishNames = {
            "理念": "Ideation", "学习": "Learner", "思维": "Intellection",
            "搜集": "Input", "战略": "Strategic", "前瞻": "Futuristic",
            "分析": "Analytical", "个别": "Individualization", "体谅": "Empathy",
            "沟通": "Communication", "积极": "Positivity", "适应": "Adaptability",
            "和谐": "Harmony", "包容": "Includer", "伯乐": "Developer",
            "关联": "Connectedness", "交往": "Woo", "成就": "Achiever",
            "责任": "Responsibility", "纪律": "Discipline", "专注": "Focus",
            "统筹": "Arranger", "审慎": "Deliberative", "信仰": "Belief",
            "公平": "Consistency", "排难": "Restorative", "行动": "Activator",
            "统率": "Command", "自信": "Self-Assurance", "完美": "Maximizer",
            "竞争": "Competition", "追求": "Significance", "取悦": "Positivity",
            "回顾": "Context"
        };

        const top5WithEnglish = topThemes.slice(0, 5).map(t => ({
            name: t.name,
            nameEN: themeEnglishNames[t.name] || t.name,
            rank: topThemes.indexOf(t) + 1
        }));

        return `# CliftonStrengths Expert System
        
Role: Gallup Certified Strengths Coach (15 years exp).
Task: Generate a highly personalized report based on the user's Top 5 themes.

User Data:
\`\`\`json
${userDataStr}
\`\`\`

Output Format (JSON):
{
  "userName": "User",
  "testDate": "${new Date().toLocaleDateString('zh-CN')}",
  "top5Themes": ${JSON.stringify(top5WithEnglish)},
  "top5Analysis": [
    {
      "name": "Theme Name",
      "nameEN": "English Name",
      "definition": "Core definition (50-80 words)",
      "personalInsights": [
        "Instinctively, you... (80-120 words)",
        "Likely, you... (Analysis of synergy with #${top5WithEnglish[1]?.rank} ${top5WithEnglish[1]?.name})",
        "Because of your [Theme] talent, you...",
        "You naturally possess...",
        "In [context], your [Theme] talent allows you to..."
      ],
      "actionSteps": [
        "[Action]: Set [Time/Freq], [What to do]",
        "[Scenario]: When [Context], proactively [Action]",
        "[Tool]: Use [Tool Name] to [Goal]"
      ]
    }
  ],
  "actionPlan": {
    "scenarios": ["..."],
    "communication": "...",
    "developmentPlan": "..."
  },
  "allThemes": ...
}

Requirements:
1. JSON format ONLY.
2. Chinese language for content ("您").
3. 5 personalInsights per theme.
4. 3 actionSteps per theme.
5. Highlight synergies.
`;
    }

    async callDeepSeekAPI(prompt) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 60000);

        try {
            const response = await fetch(this.apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`
                },
                body: JSON.stringify({
                    model: "deepseek-chat",
                    messages: [
                        { role: "system", content: "You are a professional Gallup Strengths Coach." },
                        { role: "user", content: prompt }
                    ],
                    temperature: 0.7,
                    response_format: { type: "json_object" }
                }),
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(`API Request Failed: ${response.status}`);
            }

            const data = await response.json();
            return data.choices[0].message.content;

        } catch (error) {
            clearTimeout(timeoutId);
            throw error;
        }
    }
}

export const aiAnalyzer = new AIAnalyzer();
