/**
 * enviro.js - Environmental Terminal Dialog & AI Commentary Script Engine
 * Intercepts active table milestones to generate personality-driven retro dialogue boxes.
 */

const EnvironmentDialogEngine = {
    // Database dictionary of situational response packages mapped by bot archetype names
    phrases: {
        "DEFAULT": {
            scratch: ["SYSTEM: WATCH THE WHITE CUE PATH.", "SYSTEM: SCRATCH FOUL RECORDED. ATTEMPT RE-ENTRY."],
            sink:    ["SYSTEM: TARGET ACQUIRED.", "SYSTEM: CLEAN POCKET EXECUTION."],
            combo:   ["SYSTEM: DOUBLE BREAK DETECTED.", "SYSTEM: EXCELLENT SHAPE ALIGNMENT."],
            streak:  ["SYSTEM: POWER OVERLOAD! EXCELLENT MULTI-RUN."]
        },
        "C:\\BOT\\ANALOG.EXE": {
            scratch: ["ANALOG: HAHA! SYSTEM INTERFERENCE DETECTED.", "ANALOG: ACCURACY DEGRADATION CONFIRMED."],
            sink:    ["ANALOG: IMPOSSIBLE! LUCK SECTOR OVER 9000.", "ANALOG: MY RELAYS ARE FAILING TO COMPREHEND THAT SHOT."],
            combo:   ["ANALOG: MULTIPLE REGISTER CRASH! GREAT SHOT.", "ANALOG: ARE YOU USING CHITTY CODES?"],
            streak:  ["ANALOG: TOTAL BOARD MATRIX DESTRUCTED."]
        },
        "C:\\BOT\\BAUD_BOY.EXE": {
            scratch: ["BAUD_BOY: TOO SLOW! CHOKED ON THE DIAL-UP CORNER.", "BAUD_BOY: YOU DISCONNECTED THERE MATE."],
            sink:    ["BAUD_BOY: NORMALLY I'M FASTER, BUT THAT SPARK WAS DECENT.", "BAUD_BOY: DOWN THE PIPE AT 56K SPEEDS!"],
            combo:   ["BAUD_BOY: DUAL CHANNELS ENGAGED! NICE SPEED.", "BAUD_BOY: BANDWIDTH LIMIT EXCEEDED!"],
            streak:  ["BAUD_BOY: BROADBAND OVERDRIVE DOWNLOAD COMPLETE!"]
        },
        "C:\\BOT\\KERN32.SYS": {
            scratch: ["KERN32: FATAL EXCEPTION! USER CONTROL FAULT.", "KERN32: REBOOT REQUIRED AFTER THAT MISCALCULATION."],
            sink:    ["KERN32: OPTIMAL GEOMETRY PARSED.", "KERN32: VECTOR THREAD COMPLETED WITHOUT ERROR TRAPS."],
            combo:   ["KERN32: MULTI-THREAD PIPELINE OPTIMIZATION LOADED.", "KERN32: HARDWARE ACCELERATION ENGAGED."],
            streak:  ["KERN32: TOTAL ROOT TERMINAL TAKEOVER COMPLETED!"]
        }
    },

    // Renders the dialogue text box directly on the game screen
    postCommentary(eventType) {
        // Fall back to the default system notifications text if an exhibition bot profile isn't active
        const activeBotName = (typeof activeMatchBotProfile !== 'undefined' && activeMatchBotProfile) ? activeMatchBotProfile.name : "DEFAULT";
        const characterPack = this.phrases[activeBotName] || this.phrases["DEFAULT"];
        const dialogueOptions = characterPack[eventType] || this.phrases["DEFAULT"][eventType];
        
        // Pick a random line from the selected pool of dialogue choices
        const selectedLine = dialogueOptions[Math.floor(Math.random() * dialogueOptions.length)];
        
        this.renderTextBoxOnTable(selectedLine);
    },

    renderTextBoxOnTable(messageText) {
        // Look for an existing terminal text box or create a new one dynamically
        let logContainer = document.getElementById('retro-terminal-log');
        if (!logContainer) {
            logContainer = document.createElement('div');
            logContainer.id = 'retro-terminal-log';
            logContainer.style.position = 'absolute';
            logContainer.style.bottom = '12px';
            logContainer.style.left = '50%';
            logContainer.style.transform = 'translateX(-50%)';
            logContainer.style.background = 'rgba(0, 0, 0, 0.85)';
            logContainer.style.color = '#00ff00'; // Pure bright MS-DOS green text
            logContainer.style.border = '2px solid #ffffff';
            logContainer.style.padding = '6px 12px';
            logContainer.style.fontFamily = "'Courier New', Courier, monospace";
            logContainer.style.fontSize = '11px';
            logContainer.style.zIndex = '10';
            logContainer.style.pointerEvents = 'none';
            logContainer.style.letterSpacing = '1px';
            logContainer.style.boxShadow = '3px 3px 0px #333';
            
            const tableContainer = document.getElementById('table-container');
            if (tableContainer) tableContainer.appendChild(logContainer);
        }
        
        // Update the log box with the new text and set an expiration timer to clear it
        logContainer.textContent = messageText.toUpperCase();
        logContainer.style.display = 'block';
        
        if (this.clearTimer) clearTimeout(this.clearTimer);
        this.clearTimer = setTimeout(() => {
            logContainer.style.display = 'none';
        }, 3000);
    }
};
// --- EXPAND CORES DICTIONARIES INSIDE ENVIRO.JS TO ACCOUNT FOR ILLEGAL CONTACTS ---
EnvironmentDialogEngine.phrases["DEFAULT"].wrong_ball = [
    "SYSTEM: ILLEGAL STRUCK ACTION. YOU HIT THE WRONG SLANG GROUP BALL FIRST.",
    "SYSTEM: FOUL CHECKER FAILURE. SOLIDS AND STRIPES CONTEXT MISMATCH."
];
EnvironmentDialogEngine.phrases["DEFAULT"].early_black = [
    "SYSTEM: ILLEGAL CONTACT. THE BLACK 8-BALL IS RE-BOUNDED UNTIL FIELD IS CLEARED.",
    "SYSTEM: CRITICAL TRAFFIC ERROR! STRUCK BLACK BALL EARLY."
];

// Synchronize extra phrase definitions onto individual system core files
if (EnvironmentDialogEngine.phrases["C:\\BOT\\ANALOG.EXE"]) {
    EnvironmentDialogEngine.phrases["C:\\BOT\\ANALOG.EXE"].wrong_ball = [
        "ANALOG: HAH! TARGET COMPILATION ERROR. THAT BALL IS NOT IN YOUR ASSIGNED REGISTER!"
    ];
}
/**
 * enviro.js - Environmental Terminal Dialog & AI Commentary Script Engine
 * Registers an alphabetical list of 40 additional competitors and tracks dialogue logs.
 */

// --- 40 ADDITIONAL ALPHABETICAL COMPETITORS DATABASE MATRIX ---
const AlphabeticalNpcProfiles = [
    { id: 21, name: "ALEXANDER",  level: 3,  style: "Balanced Rookie", accuracy: 0.62 },
    { id: 22, name: "BLAKE",      level: 4,  style: "Speed Striker",    accuracy: 0.65 },
    { id: 23, name: "CHLOE",      level: 5,  style: "Cushion Master",   accuracy: 0.69 },
    { id: 24, name: "DAMIAN",     level: 6,  style: "Safety Blocker",   accuracy: 0.71 },
    { id: 25, name: "ETHAN",      level: 7,  style: "Breakout Expert",  accuracy: 0.73 },
    { id: 26, name: "FAITH",      level: 8,  style: "Spin Specialist",  accuracy: 0.76 },
    { id: 27, name: "GAVIN",      level: 9,  style: "Aggressive Rookie", accuracy: 0.64 },
    { id: 28, name: "HOPE",       level: 11, style: "Tactical Safety",  accuracy: 0.81 },
    { id: 29, name: "ISAAC",      level: 12, style: "Methodical Planner", accuracy: 0.83 },
    { id: 30, name: "JULIA",      level: 13, style: "Table Cleaner",     accuracy: 0.84 },
    { id: 31, name: "KAI",        level: 14, style: "Risk Evaluator",    accuracy: 0.86 },
    { id: 32, name: "LOGAN",      level: 15, style: "Combo Striker",     accuracy: 0.85 },
    { id: 33, name: "MAYA",       level: 16, style: "Extended Planner",  accuracy: 0.88 },
    { id: 34, name: "NOAH",       level: 18, style: "Core Tactician",    accuracy: 0.89 },
    { id: 35, name: "OLIVIA",     level: 20, style: "Pattern Mirror",    accuracy: 0.91 },
    { id: 36, name: "PARKER",     level: 22, style: "Optimizer",          accuracy: 0.93 },
    { id: 37, name: "QUINN",      level: 23, style: "History Looper",     accuracy: 0.94 },
    { id: 38, name: "RYAN",       level: 25, style: "Geometric Genius",   accuracy: 0.95 },
    { id: 39, name: "SOPHIA",     level: 27, style: "The Lockmaster",      accuracy: 0.97 },
    { id: 40, name: "TRISTAN",    level: 29, style: "System Overlord",     accuracy: 0.99 },
    // Index expansion lines continuing alphabetical distribution sequences
    { id: 41, name: "UMA",        level: 4,  style: "Casual Puffer",    accuracy: 0.63 },
    { id: 42, name: "VALERIE",    level: 6,  style: "Impatient Striker", accuracy: 0.70 },
    { id: 43, name: "WYATT",      level: 9,  style: "Safety Interrupter", accuracy: 0.75 },
    { id: 44, name: "XAVIER",     level: 12, style: "Steady Energy",     accuracy: 0.80 },
    { id: 45, name: "YASMINE",    level: 15, style: "Flashy Trickster",  accuracy: 0.85 },
    { id: 46, name: "ZACHARY",    level: 18, style: "Systematic Safety", accuracy: 0.88 },
    { id: 47, name: "AMARA",      level: 20, style: "Table Cleaner",     accuracy: 0.91 },
    { id: 48, name: "BRYCE",      level: 22, style: "Breakout Specialist", accuracy: 0.92 },
    { id: 49, name: "CORA",       level: 24, style: "Extended Planner",  accuracy: 0.94 },
    { id: 50, name: "DEXTER",     level: 26, style: "Geometric Master",   accuracy: 0.96 },
    { id: 51, name: "ELENA",      level: 5,  style: "Aggressive Rookie", accuracy: 0.66 },
    { id: 52, name: "FELIX",      level: 8,  style: "Steady Puffer",    accuracy: 0.74 },
    { id: 53, name: "GIANNA",     level: 11, style: "Risk Evaluator",    accuracy: 0.82 },
    { id: 54, name: "HUNTER",     level: 14, style: "Combo Striker",     accuracy: 0.86 },
    { id: 55, name: "IRIS",       level: 17, style: "Tactical Blocker",  accuracy: 0.89 },
    { id: 56, name: "JONAH",      level: 19, style: "Pattern Mirror",    accuracy: 0.91 },
    { id: 57, name: "KENDRICK",   level: 23, style: "Deflection Genius", accuracy: 0.93 },
    { id: 58, name: "LANA",       level: 25, style: "History Looper",     accuracy: 0.95 },
    { id: 59, name: "MILO",       level: 28, style: "The Lockmaster",      accuracy: 0.97 },
    { id: 60, name: "NOVA",       level: 32, style: "System Overlord",     accuracy: 0.99 }
];

const EnvironmentDialogEngine = {
    phrases: {
        "DEFAULT": {
            scratch: ["SYSTEM: CRITICAL CUE BALL SCRATCH ENCOUNTERED.", "SYSTEM: FOUL CHARGED TO PROFILE."],
            sink:    ["SYSTEM: TARGET BALL TRAPPED SUCCESSFULLY.", "SYSTEM: ENTRY POINT VERIFIED."],
            wrong_ball: ["SYSTEM: FOUL! STRUCK WRONG SLANG COLOR SET BALL FIRST."],
            early_black: ["SYSTEM: ILLEGAL CONTACT. BLACK BALL STUCK OUT OF TURN SEQUENCE."]
        }
    },

    postCommentary(eventType) {
        const activeBotName = (typeof activeMatchBotProfile !== 'undefined' && activeMatchBotProfile) ? activeMatchBotProfile.name : "DEFAULT";
        const characterPack = this.phrases[activeBotName] || this.phrases["DEFAULT"];
        const dialogueOptions = characterPack[eventType] || this.phrases["DEFAULT"][eventType];
        const selectedLine = dialogueOptions[Math.floor(Math.random() * dialogueOptions.length)];
        this.renderTextBoxOnTable(selectedLine);
    },

    renderTextBoxOnTable(messageText) {
        let logContainer = document.getElementById('retro-terminal-log');
        if (!logContainer) {
            logContainer = document.createElement('div');
            logContainer.id = 'retro-terminal-log';
            logContainer.style.position = 'absolute';
            logContainer.style.bottom = '12px';
            logContainer.style.left = '50%';
            logContainer.style.transform = 'translateX(-50%)';
            logContainer.style.background = 'rgba(0, 0, 0, 0.9)';
            logContainer.style.color = '#00ff00';
            logContainer.style.border = '2px solid #ffffff';
            logContainer.style.padding = '5px 10px';
            logContainer.style.fontFamily = "monospace";
            logContainer.style.fontSize = '10px';
            logContainer.style.zIndex = '10';
            logContainer.style.pointerEvents = 'none';
            
            const tableContainer = document.getElementById('table-container');
            if (tableContainer) tableContainer.appendChild(logContainer);
        }
        logContainer.textContent = messageText.toUpperCase();
        logContainer.style.display = 'block';
        
        if (this.clearTimer) clearTimeout(this.clearTimer);
        this.clearTimer = setTimeout(() => { logContainer.style.display = 'none'; }, 2500);
    }
};
