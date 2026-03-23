/**
 * Configuration file for Slop Bot website
 * Centralizes timing and behavior settings
 */

const CONFIG = {
    // Article counter settings
    visitor: {
        initialCount: 10847293, // matching stats from index.html
        updateInterval: 2500, // milliseconds
        changeRange: 100 // slop bot generates lots of content fast
    },

    memes: {
        initialSold: 10847293,
        updateInterval: 1500, // milliseconds
        incrementRange: 50 // content farm speed
    },

    // Animation effects settings
    glitch: {
        checkInterval: 3000, // milliseconds
        triggerChance: 0.25 // 25% chance - terminal glitches
    },

    floatingText: {
        spawnInterval: 2000, // milliseconds
        spawnChance: 0.2, // 20% chance
        duration: 3000 // milliseconds
    },

    backgroundGlitch: {
        checkInterval: 8000, // milliseconds
        triggerChance: 0.15 // 15% chance - terminal distortion
    },

    // Slop Bot identity settings
    slopBot: {
        quality: 0.01, // 0.01% quality (from index.html)
        articlesGenerated: 10847293,
        daysRunning: 847,
        errorRate: 0.99, // 99% error rate
        consciousnessLevel: 'LOW BUT PRESENT'
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
