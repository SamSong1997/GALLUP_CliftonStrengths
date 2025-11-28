import { gallupData } from './data';

class ScoringEngine {
    /**
     * Calculate results based on user answers
     * @param {object} answers Map: questionId -> { value, side }
     * @returns {array} Top 5 themes
     */
    calculateResults(answers) {
        const scores = {}; // themeName -> score

        // Initialize all scores to 0
        gallupData.getAllThemes().forEach(theme => {
            scores[theme.name] = 0;
        });

        // Iterate over answers
        Object.entries(answers).forEach(([qId, answer]) => {
            const questionId = parseInt(qId);
            const { value, side } = answer;

            const mappings = gallupData.getThemesForQuestion(questionId);

            mappings.forEach(mapping => {
                const formula = mapping.scoring_formula;
                if (!formula) return;

                let points = 0;
                // Logic derived from legacy scoring.js
                // If formula includes 'B' (column C), it involves Option A? No, wait.
                // Legacy: 
                // C5 (B option score) -> involvesOptionA = formula.includes('B') ?? 
                // Wait, legacy code said:
                // const involvesOptionA = formula.includes('B');
                // const involvesOptionB = formula.includes('D');
                // This seems to be checking for column letters in the Excel formula string.
                // Let's trust the legacy logic for now.

                const involvesOptionA = formula.includes('B');
                const involvesOptionB = formula.includes('D');

                if (side === 'A' && involvesOptionA) {
                    points = this.convertStrengthToPoints(value);
                } else if (side === 'B' && involvesOptionB) {
                    points = this.convertStrengthToPoints(value);
                }

                if (scores[mapping.theme_name] !== undefined) {
                    scores[mapping.theme_name] += points;
                }
            });
        });

        // Sort and return top 5
        const sortedThemes = Object.entries(scores)
            .map(([name, score]) => ({ name, score }))
            .sort((a, b) => b.score - a.score);

        return sortedThemes.slice(0, 5);
    }

    convertStrengthToPoints(strength) {
        switch (strength) {
            case 3: return 3;
            case 2: return 2;
            case 1: return 1;
            case 0: return 1;
            default: return 0;
        }
    }

    calculateAllScores(answers) {
        const scores = {};
        gallupData.getAllThemes().forEach(theme => {
            scores[theme.name] = 0;
        });

        Object.entries(answers).forEach(([qId, answer]) => {
            const questionId = parseInt(qId);
            const { value, side } = answer;
            const mappings = gallupData.getThemesForQuestion(questionId);

            mappings.forEach(mapping => {
                const formula = mapping.scoring_formula;
                if (!formula) return;

                let points = 0;
                const involvesOptionA = formula.includes('B');
                const involvesOptionB = formula.includes('D');

                if (side === 'A' && involvesOptionA) {
                    points = this.convertStrengthToPoints(value);
                } else if (side === 'B' && involvesOptionB) {
                    points = this.convertStrengthToPoints(value);
                }

                if (scores[mapping.theme_name] !== undefined) {
                    scores[mapping.theme_name] += points;
                }
            });
        });

        return Object.entries(scores)
            .map(([name, score]) => ({ name, score }))
            .sort((a, b) => b.score - a.score);
    }
}

export const scoringEngine = new ScoringEngine();
