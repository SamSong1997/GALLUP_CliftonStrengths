import { GALLUP_DATA } from './gallupData';

class GallupData {
    constructor() {
        this.themes = GALLUP_DATA.themes;
        this.questions = GALLUP_DATA.questions;
        this.mappings = GALLUP_DATA.question_theme_mapping || GALLUP_DATA.mappings; // Handle potential naming diff

        // Ensure mappings exist (legacy data might have different structure name)
        if (!this.mappings && GALLUP_DATA.meta) {
            // If mappings are missing in root but implied, we might need to check structure.
            // Based on legacy code: window.GALLUP_DATA.question_theme_mapping
            // Let's assume the copied file has this structure.
        }
    }

    getQuestion(id) {
        return this.questions.find(q => q.id === id);
    }

    getThemesForQuestion(questionId) {
        if (!this.mappings) return [];
        return this.mappings.filter(m => m.question_id === questionId);
    }

    getTheme(themeId) {
        return this.themes.find(t => t.id === themeId);
    }

    getAllThemes() {
        return this.themes;
    }
}

export const gallupData = new GallupData();
