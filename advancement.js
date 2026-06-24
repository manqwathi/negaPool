/**
 * advancement.js - Unified Progression & Asynchronous Assembly Module
 * Handles premium skins and asynchronous 14.1 table pyramid generation layouts.
 */
 // --- AUTOMATED CHIP ANNUAL LOBBY EXPANSION ---
// --- WORLD CUP GROUP STAGE DATABASE REPOSITORY ---
let worldCupGroupStandings = [];
let activeMatchBotProfile = null;

// --- BRACKET ARRAY DOM GENERATOR COMPILER SNIPPET ---
const AdvancementEngine = {
    catalog: {
        'default':       { reqLevel: 1, unlocked: true,  className: 'default-skin' },
        'acacia':        { reqLevel: 8, unlocked: false, className: 'acacia-skin' },
        'yellow-oak':    { reqLevel: 12, unlocked: false, className: 'yellow-oak-skin' },
        'lawn-green':    { reqLevel: 15, unlocked: false, className: 'lawn-green-skin' },
        'crystal-navy':  { reqLevel: 20, unlocked: false, className: 'crystal-navy-skin' },
        'auroral-purple':{ reqLevel: 25, unlocked: false, className: 'auroral-purple-skin' }
    },

    async fetchNewRackConfiguration() {
        console.log("[AJAX] Requesting server-side triangle rack vector coordinates...");
        await new Promise(resolve => setTimeout(resolve, 1200));

        const baseApexX = 550; 
        const baseApexY = 200; 
        const radius = 14;     
        const spacingFactor = 1.05; 
        
        let generatedRack = [];
        let ballIndexCounter = 1;

        for (let row = 0; row < 5; row++) {
            let rowX = baseApexX + (row * radius * 2 * 0.866 * spacingFactor); 
            let startY = baseApexY - (row * radius * spacingFactor);
            
            for (let col = 0; col <= row; col++) {
                let rowY = startY + (col * radius * 2 * spacingFactor);
                
                generatedRack.push({
                    id: `target-${ballIndexCounter}`,
                    x: rowX,
                    y: rowY,
                    vx: 0,
                    vy: 0,
                    type: 'object'
                });
                ballIndexCounter++;
            }
        }

        if (typeof balls !== 'undefined') {
            const cueBall = balls.find(b => b.type === 'cue') || { id: 'cue', x: 200, y: 200, vx: 0, vy: 0, type: 'cue' };
            cueBall.vx = 0; cueBall.vy = 0;
            balls = [cueBall, ...generatedRack];
        }

        const statusLabel = document.getElementById('rack-status-txt');
        if (statusLabel) statusLabel.textContent = "STATUS: ACTIVE RULESET";
    },
    
        // --- PRIZE DROP PROCESSING MATRIX MAPPINGS ---
    distributeChampionshipPrize(tierKey, rewardValue) {
        RetroAudio.playHit(0.5);
        let dropAlertText = "";
        
        switch(tierKey) {
            case 'COUNTY_CURRENCY':
                playerInventoryStakes.walletBalance += 250000;
                dropAlertText = "LOOT SECURED:\n+nêgaBucks 250,000 ADDED TO WALLET PROFILE!";
                break;
            case 'COUNTY_MINERAL':
                dropAlertText = "MINERAL EXTRACT SECURED:\nUNLOCKED: HIGH CONTRAST DIAMOND TARGET SIGHTS!";
                break;
            case 'WORLD_CUP_GRAND':
                playerInventoryStakes.walletBalance += 15000000;
                playerInventoryStakes.equippedCueDesign = "THE OVERLORD KOF CHROME CUE";
                dropAlertText = "THE KING OF NEGAPOOL ASCENSION:\n+Ê15,000,000 GRAND PRIZE REWARDED!\nUNLOCKED NEW ITEM: [THE OVERLORD KOF CHROME CUE]";
                break;
            default:
                playerInventoryStakes.walletBalance += 50000;
                dropAlertText = "LOOT SECURED:\n+nêgaBucks 50,000 CONTINENTAL STANDING FEE.";
        }

        // Commit balance properties to cache registry fields safely
        localStorage.setItem('negaPool_wallet', playerInventoryStakes.walletBalance);
        alert(dropAlertText);
        
        // Render updates to high-score overlays instantly
        const walletLabel = document.getElementById('wallet-display-badge');
        if (walletLabel) walletLabel.textContent = `Ê:${playerInventoryStakes.walletBalance.toLocaleString()}`;
    },

    evaluateSkinsPermissions(userLvl) {
        Object.keys(this.catalog).forEach(key => {
            const item = this.catalog[key];
            const node = document.getElementById(`skin-${key}`);
            const badge = document.getElementById(`lbl-${key}`);
            
            if (userLvl >= item.reqLevel && !item.unlocked) {
                item.unlocked = true;
            }

            if (node && badge) {
                if (item.unlocked) {
                    node.classList.remove('locked');
                    if (gameState.selectedSkin === key) {
                        node.classList.add('active');
                        badge.textContent = "EQUIPPED";
                    } else {
                        node.classList.remove('active');
                        badge.textContent = "AVAILABLE";
                    }
                } else {
                    node.classList.add('locked');
                    node.classList.remove('active');
                    badge.textContent = `LVL ${item.reqLevel}`;
                }
            }
        });
    }
};


// --- DRAWING PIPELINE OVERRIDE ARCHITECTURE ---
if (typeof canvas !== 'undefined') {
    window.drawTable = function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Render current active skin configuration to screen canvas
        switch(gameState.selectedSkin) {
            case 'yellow-oak':
                ctx.fillStyle = "#d2903e"; 
                ctx.fillRect(0,0, canvas.width, canvas.height);
                break;
            case 'lawn-green':
                ctx.fillStyle = "#2e8b57"; 
                ctx.fillRect(0,0, canvas.width, canvas.height);
                break;
            case 'crystal-navy':
                let navyGrad = ctx.createRadialGradient(400,200,50, 400,200,400);
                navyGrad.addColorStop(0, "#1b4965");
                navyGrad.addColorStop(1, "#0b2545");
                ctx.fillStyle = navyGrad;
                ctx.fillRect(0,0, canvas.width, canvas.height);
                break;
            case 'auroral-purple':
                let purpleGrad = ctx.createLinearGradient(0,0, canvas.width, canvas.height);
                purpleGrad.addColorStop(0, "#2c003e");
                purpleGrad.addColorStop(0.5, "#510a63");
                purpleGrad.addColorStop(1, "#16002c");
                ctx.fillStyle = purpleGrad;
                ctx.fillRect(0,0, canvas.width, canvas.height);
                
                ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
                for(let i=0; i<3; i++) {
                    ctx.beginPath();
                    ctx.arc(200 + i*200, 150 + i*40, 90 + i*30, 0, Math.PI*2);
                    ctx.fill();
                }
                break;
            case 'acacia':
                ctx.fillStyle = "#944a20";
                ctx.fillRect(0,0, canvas.width, canvas.height);
                break;
            default:
                ctx.fillStyle = "#000000"; 
                ctx.fillRect(0,0, canvas.width, canvas.height);
        }

        // Draw outer cloth table cushions
        ctx.strokeStyle = (gameState.selectedSkin === 'acacia') ? '#5a2a0c' : 
                          (gameState.selectedSkin === 'yellow-oak') ? '#784919' :
                          (gameState.selectedSkin === 'lawn-green') ? '#1b4d1b' :
                          (gameState.selectedSkin === 'crystal-navy') ? '#0d2b45' :
                          (gameState.selectedSkin === 'auroral-purple') ? '#311145' : '#ffffff';
        ctx.lineWidth = 10;
        ctx.strokeRect(5, 5, canvas.width - 10, canvas.height - 10);

        // Draw kitchen placement zone bounding box when manual placement mode is active
        if (typeof isPlacingCueBall !== 'undefined' && isPlacingCueBall) {
            ctx.save();
            ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
            ctx.lineWidth = 2;
            ctx.setLineDash([5, 5]);
            ctx.strokeRect(45, 45, 205, 310); // Bounds of valid kitchen zone placement
            ctx.fillStyle = "rgba(255, 255, 255, 0.03)";
            ctx.fillRect(45, 45, 205, 310);
            ctx.restore();
        }

        // Draw structural pocket holes
        ctx.fillStyle = '#000000';
        pockets.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, 18, 0, Math.PI * 2);
            ctx.fill();
        });

        // Draw aiming stick trajectories lines
        if (typeof isDragging !== 'undefined' && isDragging) {
            const angle = Math.atan2(dragCurrent.y - dragStart.y, dragCurrent.x - dragStart.x);
            const sX = dragStart.x + Math.cos(angle) * (BALL_RADIUS + 6);
            const sY = dragStart.y + Math.sin(angle) * (BALL_RADIUS + 6);
            const eX = dragStart.x + Math.cos(angle) * (BALL_RADIUS + 166);
            const eY = dragStart.y + Math.sin(angle) * (BALL_RADIUS + 166);
            
            ctx.beginPath(); ctx.moveTo(sX, sY); ctx.lineTo(eX, eY);
            ctx.strokeStyle = (gameState.selectedSkin === 'default') ? '#ffffff' : '#f5b041';
            ctx.lineWidth = (gameState.selectedSkin === 'default') ? 3 : 5;
            ctx.stroke();
        }

        // Draw billiard objects
        balls.forEach(ball => {
            if (ball.x === -999) return; // Hide ball if it is waiting to be placed
            ctx.beginPath();
            ctx.arc(ball.x, ball.y, BALL_RADIUS, 0, Math.PI * 2);
            
            if (gameState.selectedSkin === 'default') {
                ctx.fillStyle = (ball.type === 'cue' || ball.id !== 'target-1') ? '#ffffff' : '#000000';
            } else if (ball.type === 'cue') {
                ctx.fillStyle = '#fcfcfc';
            } else {
                const idNum = parseInt(ball.id.replace('target-', '')) || 1;
                const colors = ['#e61919', '#f5b041', '#4363d8', '#3cb44b', '#ffe119', '#911eb4', '#f032e6'];
                ctx.fillStyle = colors[idNum % colors.length];
            }
            ctx.fill();
            ctx.lineWidth = 2;
            ctx.strokeStyle = '#000000';
            ctx.stroke();
        });
    };
}

// Hook into existing profile state engine to calculate upgrades on the fly
if (typeof window.renderUpdateView !== 'undefined') {
    const originalUpdateView = window.renderUpdateView;
    window.renderUpdateView = function() {
        originalUpdateView();
        AdvancementEngine.evaluateSkinsPermissions(gameState.currentLevel);
    };
}
// --- SELECTION ROUTER FOR AUTOMATED AI GAMEPLAY MODES ---
function selectGameRoute(routeKey) {
    if (typeof RetroAudio !== 'undefined') RetroAudio.playHit(0.2);
    
    console.log(`[ROUTE ENGINE] Configuring system interface for variant context: ${routeKey.toUpperCase()}`);
    
    switch(routeKey) {
        case 'single':
            alert("SINGLE PLAYER INITIALIZED. FREE SHOOT TRAINING ENGAGED.");
            break;
            
        case 'challenge':
            alert("CHALLENGE MODULE LOADED. CONNECTING VS SYSTEM SIMULATOR.");
            break;
            
        case 'exhibition':
            alert("EXHIBITION MODE ENGAGED.\nPREPARING LOBBY RACK LIST WITH 20 NPC BOT SCRIPTS.");
            // This hooks into the 20-NPC behavioral array architecture we will configure next
            break;
            
        default:
            console.warn("Unknown routing token supplied to advancement engine framework.");
    }
}
/**
 * advancement.js - Complete Unified Progression & Prize Engine
 * Registers up-to-date humanized contestant rosters and handles drop awards.
 */

// --- GLOBAL ROSTER DATABASE REGISTER (PLACED SAFELY AT TOP LAYER) ---
const NpcExhibitionRoster = [
    { id: 1,  name: "ARGILE",             level: 2,  accuracy: 0.60, safetyPct: 0.10, style: "Aggressive Rookie", bio: "Ancient system driver script. Highly unpredictable erratic shot outputs." },
    { id: 2,  name: "BEN",                level: 3,  accuracy: 0.64, safetyPct: 0.15, style: "Impatient Striker", bio: "Fires shots quickly with high velocity. Struggles with multi-rail calculations." },
    { id: 3,  name: "ILAN",               level: 4,  accuracy: 0.68, safetyPct: 0.20, style: "Casual Puffer",    bio: "Standard magnetic storage device profile. Solid basics, but chokes under pressure." },
    { id: 4,  name: "IYAH-MAN",           level: 5,  accuracy: 0.70, safetyPct: 0.30, style: "Interrupter",       bio: "Interrupts long player runs with calculated safeties. Avoids risky paths." },
    { id: 5,  name: "JACKSON",            level: 6,  accuracy: 0.72, safetyPct: 0.25, style: "Steady Energy",     bio: "Maintains a baseline strategy. Rarely scratches but takes a long time to aim." },
    { id: 6,  name: "VELBRITHA",          level: 8,  accuracy: 0.75, safetyPct: 0.10, style: "Flashy Trickster",  bio: "Loves bank shots and high-spin combos. Vulnerable to simple safety plays." },
    { id: 7,  name: "S'DUMBI",            level: 10, accuracy: 0.78, safetyPct: 0.40, style: "Systematic Safety", bio: "Executes structured safety strategies if a pocket angle drops below 50% probability." },
    { id: 8,  name: "ANOTHANDO",          level: 11, accuracy: 0.80, safetyPct: 0.35, style: "Methodical Planner", bio: "Alters power delivery levels dynamically to guarantee clean ball placement shape." },
    { id: 9,  name: "MATTHEW",            level: 13, accuracy: 0.82, safetyPct: 0.45, style: "Table Cleaner",     bio: "Slowly breaks apart congested groups of balls. Minimizes table layout complexity." },
    { id: 10, name: "JOSEPH",             level: 14, accuracy: 0.84, safetyPct: 0.50, style: "Risk Evaluator",    bio: "Scans the distance to all six pockets. Will not try a shot unless the path is open." },
    { id: 11, name: "JOKER ALL TRADES",   level: 16, accuracy: 0.85, safetyPct: 0.20, style: "Color Striker",     bio: "Prefers high-contrast target paths. Strong offense but plays soft defenses." },
    { id: 12, name: "QUEEN OF SHEEBA",    level: 17, accuracy: 0.87, safetyPct: 0.55, style: "Extended Strategist", bio: "Utilizes advanced memory registers to plan positioning three shots in advance." },
    { id: 13, name: "GRIMM THE SHEPPARD", level: 19, accuracy: 0.89, safetyPct: 0.40, style: "Expanded Tactician", bio: "Highly adept at breakouts. Uses extreme speed variables to scatter clusters." },
    { id: 14, name: "LILTH UTOPIA",       level: 21, accuracy: 0.90, safetyPct: 0.60, style: "The Core Shell",     bio: "The dominant system shell. Punishes standard scratches with high-accuracy runouts." },
    { id: 15, name: "EVE",                level: 22, accuracy: 0.92, safetyPct: 0.30, style: "Pattern Mirror",     bio: "Copies successful shooting lines. Adapts directly to outplay your specific strategies." },
    { id: 16, name: "PHYTHON WHISPERER",  level: 24, accuracy: 0.93, safetyPct: 0.65, style: "Optimizer",          bio: "Calculates precise cue ball deflection physics to lock you behind blockers." },
    { id: 17, name: "THULANI",            level: 26, accuracy: 0.95, safetyPct: 0.50, style: "History Looper",     bio: "Remembers missed trajectories to optimize future calculations. Rarely misses twice." },
    { id: 18, name: "PETER",              level: 28, accuracy: 0.96, safetyPct: 0.70, style: "Geometric Genius",   bio: "Plots complex multi-rail bank shots using precise algebraic math vectors." },
    { id: 19, name: "YEFFET",             level: 30, accuracy: 0.98, safetyPct: 0.75, style: "The Lockmaster",      bio: "Locks down table layout scoring routes. Wins matches by squeezing opponents out." },
    { id: 20, name: "CRYTONIA",           level: 35, accuracy: 0.99, safetyPct: 0.85, style: "System Overlord",     bio: "Near-flawless execution model. Masterful control over safety plays and positional shape." }
];

// --- EXTRA PROGRESS STORAGE FOR INVENTORY LOOT DESIGN ---
var playerInventoryStakes = {
    walletBalance: parseInt(localStorage.getItem('negaPool_wallet')) || 0,
    equippedCueDesign: "STANDARD CUE SHAFT"
};


// --- EXTRA STATE FOR PLAYER PROFILE INTERFACES (Add if not present) ---
var arcadePlayerProfile = {
    playerName: localStorage.getItem('negaPool_playerProfileName') || "YOU"
};

function generateWorldCupGroupsData() {
    // Organizes 42 players into 7 balanced competitive group pools (6 players per pool)
    worldCupGroupStandings = [];
    const poolLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
    
    poolLetters.forEach((letter, index) => {
        // Always place the Player inside Group A pool tracking
        if (index === 0) {
            worldCupGroupStandings.push({ group: letter, name: "YOU (PLAYER ONE)", w: 0, d: 0, l: 0, pts: 0 });
        } else {
            worldCupGroupStandings.push({ group: letter, name: `C:\\BOT\\SEED_${index * 3}.EXE`, w: 0, d: 0, l: 0, pts: 0 });
        }
        
        // Populate the remaining 5 computer spots inside each group matrix pool
        for (let i = 1; i <= 5; i++) {
            let botId = (index * 6) + i;
            let mockWins = Math.floor(Math.random() * 4);
            let mockDraws = Math.floor(Math.random() * 2);
            let mockLosses = 5 - mockWins - mockDraws;
            
            worldCupGroupStandings.push({
                group: letter,
                name: `C:\\BOT\\CONTESTANT_${botId}.EXE`,
                w: mockWins,
                d: mockDraws,
                l: mockLosses,
                pts: (mockWins * 3) + mockDraws
            });
        }
    });

    // Sort every individual group sub-pool tier by overall points descending
    worldCupGroupStandings.sort((a, b) => (a.group === b.group) ? (b.pts - a.pts) : a.group.localeCompare(b.group));
}
// --- ARCADE CALENDAR BRACKET ARRAY CONVERSION (CRASH PROOF) ---
function displayExhibitionLobby() {
    const bubbleContent = document.querySelector('.bubble-content-scroll');
    if (!bubbleContent) return;

    // Check if player has selected an arcade profile name yet
    if (typeof arcadePlayerProfile !== 'undefined' && arcadePlayerProfile.playerName === "YOU") {
        if (typeof displayArcadeNamePrompt === 'function') {
            displayArcadeNamePrompt();
            return;
        }
    }

    const currentPilot = (typeof arcadePlayerProfile !== 'undefined') ? arcadePlayerProfile.playerName : "PLAYER ONE";
    const currentWallet = (typeof playerInventoryStakes !== 'undefined') ? playerInventoryStakes.walletBalance : 0;

    // 1. Build the fixed main menu header nodes [Style String, Text/Content, HTML Element Type, Action/OnClick String]
    let menuHeaderElements = [
        ["margin-bottom: 12px;", "", "div"],
        ["", "[ << BACK TO MAIN ]", "button", "document.location.reload()"],
        ["color: #ffaa00; margin-top: 10px; font-size: 1.1rem; font-weight: bold;", "[ THE KING OF NEGAPOOL LOBBY ]", "div"],
        ["font-size: 10px; color: #00ff00; margin-bottom: 6px; display: flex; justify-content: space-between;", `PILOT ID: ${currentPilot} | Ê:${currentWallet.toLocaleString()}`, "div"]
    ];

    // 2. Clear HTML text strings and define rows using solid data structures []
    let calendarTreeData = [
        // Category Header 1
        { type: "header", text: "1. NEGAPOOL HOME BASED LEAGUE (5 NPC PER CITY)", style: "color: #ffe119; font-weight: bold; border-bottom: 1px dashed #ffe119; padding: 4px 0; font-size: 11px;" },
        { type: "row", meta: "A. NEGA CITY OPEN [UNLOCKED]", desc: "5 Base Analog Driver Bot Cores. B&W Skin Mode.", style: "background: #0d0d0d; border: 1px solid #333; padding: 6px; margin-top: 4px; font-size: 10px;", isBtn: true, btnText: "> EXPLORE LEAGUE BRACKET", action: "loadCityLobby('Nega City')" },
        { type: "row", meta: `B. ACACIA CITY TOUR [${gameState.currentLevel >= 8 ? 'UNLOCKED' : 'REQ LVL 8'}]`, desc: "5 High Velocity Strikers. Unlocks True Color Ball sets.", style: "background: #0d0d0d; border: 1px solid #333; padding: 6px; margin-top: 4px; font-size: 10px;", isBtn: gameState.currentLevel >= 8, btnText: "> ENTER CITY", action: "loadCityLobby('Acacia City')" },

        // Category Header 2
        { type: "header", text: "2. NEGAPOOL PROVINCIAL / STATES LEAGUE", style: "color: #ffe119; font-weight: bold; border-bottom: 1px dashed #ffe119; padding: 4px 0; font-size: 11px; margin-top: 8px;" },
        { type: "row", meta: "A. MICRO NEGA STATES (S.P.R) [READY]", desc: "Runner Up: High Value Currency.", style: "background: #0d0d0d; border: 1px solid #333; padding: 6px; margin-top: 4px; font-size: 10px; cursor: pointer;", clickAction: `setupKofMatch('${currentPilot}', 'SOFT PUNK REP.', 'HIGH VALUE CURRENCY'); if(typeof AdvancementEngine!=='undefined')AdvancementEngine.distributeChampionshipPrize('COUNTY_CURRENCY');` },
        { type: "row", meta: `B. THORN STREAM PROVINCE (O.L.U) [${gameState.currentLevel >= 4 ? 'READY' : 'LVL 4'}]`, desc: "Stakes: High Mineral Value.", style: "background: #0d0d0d; border: 1px solid #333; padding: 6px; margin-top: 4px; font-size: 10px; cursor: pointer;", clickAction: gameState.currentLevel >= 4 ? `setupKofMatch('${currentPilot}', 'ORANGE LONE UNITY', 'HIGH MINERAL VALUE'); if(typeof AdvancementEngine!=='undefined')AdvancementEngine.distributeChampionshipPrize('COUNTY_MINERAL');` : `alert('LOCKED UNTIL LEVEL 4');` },
        { type: "row", meta: `C. YELLOW TEXTURE STATE (H.P.U) [${gameState.currentLevel >= 8 ? 'READY' : 'LVL 8'}]`, desc: "Stakes: High Value Currency.", style: "background: #0d0d0d; border: 1px solid #333; padding: 6px; margin-top: 4px; font-size: 10px; cursor: pointer;", clickAction: gameState.currentLevel >= 8 ? `setupKofMatch('${currentPilot}', 'HONOURED PLANK UT.', 'HIGH VALUE CURRENCY');` : `alert('LOCKED UNTIL LEVEL 8');` },
        { type: "row", meta: `D. NAVY PURPLE UNITY (I.R.A) [${gameState.currentLevel >= 12 ? 'READY' : 'LVL 12'}]`, desc: "Stakes: High Mineral Value.", style: "background: #0d0d0d; border: 1px solid #333; padding: 6px; margin-top: 4px; font-size: 10px; cursor: pointer;", clickAction: gameState.currentLevel >= 12 ? `setupKofMatch('${currentPilot}', 'IMMISCIBLE REP.', 'HIGH MINERAL VALUE');` : `alert('LOCKED UNTIL LEVEL 12');` },

        // Category Header 3
        { type: "header", text: "3. NEGAPOOL CONTINENTAL CHAMPIONSHIP", style: "color: #ffe119; font-weight: bold; border-bottom: 1px dashed #ffe119; padding: 4px 0; font-size: 11px; margin-top: 8px;" },
        { type: "row", meta: "A. ALDENIA CONTINENT (S.P.R)", desc: "Arena: Aldenia Continent. Tech Value Stakes.", style: "background: #0d0d0d; border: 1px solid #333; padding: 6px; margin-top: 4px; font-size: 10px; cursor: pointer;", clickAction: `setupKofMatch('${currentPilot}', 'ALDENIA CONT.', 'HIGH TECH VAL');` },
        { type: "row", meta: "B. AGMEDIA CONTINENT (T.S.P)", desc: "Arena: Agmedia Continent. Natural Value Stakes.", style: "background: #0d0d0d; border: 1px solid #333; padding: 6px; margin-top: 4px; font-size: 10px; cursor: pointer;", clickAction: `setupKofMatch('${currentPilot}', 'AGMEDIA CONT.', 'HIGH NATURAL VAL');` },
        { type: "row", meta: "C. ETROSTADIO CONTINENT (Y.T.S)", desc: "Arena: Etrostadio Continent. Value Currency Stakes.", style: "background: #0d0d0d; border: 1px solid #333; padding: 6px; margin-top: 4px; font-size: 10px; cursor: pointer;", clickAction: `setupKofMatch('${currentPilot}', 'ETROSTADIO CONT.', 'HIGH CURRENCY VAL');` },
        { type: "row", meta: "D. STREPACIL CONTINENT (I.R.A)", desc: "Arena: Strepacil Continent. Luxury Value Stakes.", style: "background: #0d0d0d; border: 1px solid #333; padding: 6px; margin-top: 4px; font-size: 10px; cursor: pointer;", clickAction: `setupKofMatch('${currentPilot}', 'STREPACIL CONT.', 'HIGH LUXURY VAL');` },

        // Category Header 4
        { type: "header", text: "4. THE NEGAPOOL WORLD LEAGUE MIGRATION", style: "color: #ff3300; font-weight: bold; border-bottom: 1px dashed #ff3300; padding: 4px 0; font-size: 11px; margin-top: 8px;" },
        { type: "row", meta: "[ EXTREME ] WORLD CUP STAGE (42 PLAYERS)", desc: "Group Stages -> Top 32 -> Top 16 -> Finals. GRAND PRIZE: Ê15,000,000.", style: "background: #0a0000; border: 1px solid #ff3300; padding: 6px; margin-top: 4px; font-size: 10px; cursor: pointer;", clickAction: "viewWorldCupGroupStandings()" }
    ];

    // --- COMPILE OBJECT RENDER BACK INTO PHYSICAL DOM LAYOUT ---
    bubbleContent.innerHTML = ""; // Clear existing layout securely
    
    // Append top back buttons and title headers
    menuHeaderElements.forEach(item => bubbleContent.appendChild(createNodeFromBracket(item)));
    
    // Create the scrollable tournament box element wrapper
    let scrollTreeBox = document.createElement('div');
    scrollTreeBox.style.cssText = "max-height: 260px; overflow-y: auto; padding-right: 4px; margin-top: 6px;";
    
    // Populate the categories loop list data safely
    calendarTreeData.forEach(item => {
        if (item.type === "header") {
            let hNode = document.createElement('div');
            hNode.style.cssText = item.style;
            hNode.textContent = item.text.toUpperCase();
            scrollTreeBox.appendChild(hNode);
        } else if (item.type === "row") {
            let rowNode = document.createElement('div');
            rowNode.style.cssText = item.style;
            if (item.clickAction) rowNode.setAttribute('onclick', item.clickAction);
            
            // Build sub-meta descriptions labels
            let metaLabel = document.createElement('div');
            metaLabel.style.cssText = "display: flex; justify-content: space-between; font-weight: bold; color: #ffaa00;";
            metaLabel.textContent = item.meta.toUpperCase();
            rowNode.appendChild(metaLabel);
            
            let descLabel = document.createElement('div');
            descLabel.style.cssText = "font-size: 9px; color: #777; margin-top: 2px;";
            descLabel.textContent = item.desc.toUpperCase();
            rowNode.appendChild(descLabel);
            
            // Render action buttons if configured
            if (item.isBtn) {
                let actionBtn = document.createElement('button');
                actionBtn.style.cssText = "width: 100%; text-align: center; margin-top: 4px; padding: 2px; font-size: 10px; background: transparent; color: #fff; border: 1px solid #fff; font-family: inherit;";
                actionBtn.textContent = item.btnText.toUpperCase();
                actionBtn.setAttribute('onclick', item.action);
                rowNode.appendChild(actionBtn);
            }
            
            scrollTreeBox.appendChild(rowNode);
        }
    });
    
    bubbleContent.appendChild(scrollTreeBox);
}

// --- UNIVERSAL BRACKET COMPILER ELEMENT HELPER (Add to bottom of advancement.js) ---
function createNodeFromBracket(bracketArray) {
    let elType = bracketArray[2] || "div";
    let node = document.createElement(elType);
    
    if (bracketArray[0]) node.style.cssText = bracketArray[0];
    if (bracketArray[1]) node.textContent = bracketArray[1].toUpperCase();
    
    if (bracketArray[3]) {
        node.setAttribute('onclick', bracketArray[3]);
    }
    
    if (elType === "button") {
        node.className = "dos-btn";
        node.addEventListener('mouseover', () => { node.style.background = "#fff"; node.style.color = "#000"; });
        node.addEventListener('mouseout', () => { node.style.background = "transparent"; node.style.color = "#fff"; });
    }
    return node;
}

// --- NEW 42-PLAYER TABLE VIEW REGENERATOR ---
// --- CRASH-PROOF WORLD CUP STANDINGS VISUALIZER ---
function viewWorldCupGroupStandings() {
    const bubbleContent = document.querySelector('.bubble-content-scroll');
    if (!bubbleContent) return;
    
    // Auto-generate fresh simulation table rankings if empty
    if (typeof worldCupGroupStandings === 'undefined' || worldCupGroupStandings.length === 0) {
        if (typeof generateWorldCupGroupsData === 'function') generateWorldCupGroupsData();
    }
    
    // Setup base layout array elements [CSS styles, text data, optional element type]
    let uiArray = [
        ["margin-bottom: 12px;", "", "div"],
        ["", "[ << BACK TO CALENDAR ]", "button", "displayExhibitionLobby()"],
        ["color: #ff3300; margin-top: 10px; font-size: 1.1rem; font-weight: bold;", "[ WORLD CUP: 42 GROUP STAGES ]", "div"],
        ["font-size: 9px; color: #aaa; margin-bottom: 8px;", "TOP 32 ADVANCE TO PROXIMITY KNOCKOUT STAGES.", "div"]
    ];

    // Scrollable container properties layout for table pools
    let tableWrapperStyle = "max-height: 240px; overflow-y: auto; background: #050505; border: 1px solid #555; padding: 4px; margin-bottom: 8px;";
    let tableRowsArray = [];
    
    let currentPoolLetter = "";
    worldCupGroupStandings.forEach(row => {
        // Build the headers array node dynamically whenever a new pool transitions
        if (row.group !== currentPoolLetter) {
            currentPoolLetter = row.group;
            tableRowsArray.push(["background: #ff3300; color: #000; font-weight: bold; padding: 2px 4px; font-size: 10px; margin-top: 8px; letter-spacing: 1px;", `POOL GROUP ${currentPoolLetter} (TOP 4 ADVANCE)`, "div"]);
            // Grid columns metadata indicators block
            tableRowsArray.push(["color: #ffaa00; font-size: 9px; border-bottom: 1px solid #333; display: flex; justify-content: space-between; padding: 2px 0; font-weight: bold;", "CONTESTANT PROFILE        W  D  L  PTS", "div"]);
        }
        
        const isPlayerLine = row.name.includes("YOU");
        let textColor = isPlayerLine ? "#00ff00" : "#ffffff";
        let rowTextStyle = `font-size: 9px; border-bottom: 1px solid #111; display: flex; justify-content: space-between; padding: 2px 0; color: ${textColor}; font-weight: ${isPlayerLine ? 'bold' : 'normal'};`;
        
        // Pad spacing characters uniformly to make columns perfectly aligned like old MS-DOS text
        let cleanName = row.name.padEnd(24, " ").substring(0, 24);
        let statString = `${cleanName} ${row.w}  ${row.d}  ${row.l}   ${row.pts}`;
        
        tableRowsArray.push([rowTextStyle, statString, "div"]);
    });

    // Clean up bottom action routing buttons
    let actionButtonsArray = [
        ["width: 100%; text-align: center; margin-top: 8px; border: 1px solid #00ff00; color: #00ff00; background: transparent; padding: 6px; font-family: inherit; font-size: 11px; cursor: pointer;", "> COMMENCE NEXT WORLD CUP FIXTURE MATCH", "button", "launchWorldChampionshipTree()"]
    ];

    // --- CONVERT THE BRACKETS LOGIC INTO HARD PHYSICAL DOM NODES ---
    bubbleContent.innerHTML = ""; // Empty out the console viewport text layer securely
    
    // 1. Append header nodes
    uiArray.forEach(item => bubbleContent.appendChild(createNodeFromBracket(item)));
    
    // 2. Build the scrollable wrap box wrapper element
    let wrapperDiv = document.createElement('div');
    wrapperDiv.style.cssText = tableWrapperStyle;
    tableRowsArray.forEach(item => wrapperDiv.appendChild(createNodeFromBracket(item)));
    bubbleContent.appendChild(wrapperDiv);
    
    // 3. Append final action button components
    actionButtonsArray.forEach(item => bubbleContent.appendChild(createNodeFromBracket(item)));
}


// --- CONTEXT DRIVER INJECTING NAMES INTO ARCADES AVATAR HUD HEADERS ---
function setupKofMatch(playerTeam, cpuTeam, resourceType) {
    const cpuNameTag = document.getElementById('cpu-name-tag');
    const cpuResTag = document.getElementById('cpu-resource-tag');
    const bubbleBox = document.getElementById('control-bubble');
    
    if (cpuNameTag) cpuNameTag.textContent = cpuTeam.toUpperCase();
    if (cpuResTag) cpuResTag.textContent = resourceType.toUpperCase();
    
    if (bubbleBox) bubbleBox.classList.add('hidden');
    triggerFloatingScoreText(400, 200, "READY... FIGHT!", "#ff3300");
    if (typeof RetroAudio !== 'undefined') RetroAudio.playHit(0.4);
}

function launchWorldChampionshipTree() {
    alert("WORLD CHAMPIONSHIP TREE SYSTEM ENLISTED:\n42 Contestants initialized inside server group profiles.\nWin matches to progress through the Top 32, Top 16, and final brackets for Ê15,000,000!");
    setupKofMatch('YOU', 'WORLD ELITE.SYS', 'Ê15,000,000 SEED');
}

// Bind runtime menu injection trigger onto base hook
setTimeout(() => { displayExhibitionLobby(); }, 200);

        </div>
    ;
    bubbleContent.innerHTML = htmlBuffer;
}

// Sub-router layout to pull the 5 distinct bots assigned per locality
// --- REWRITE 1: SAFE OBJECT-DRIVEN CITY SUB-LOBBY LOADER ---
function loadCityLobby(cityName) {
    const bubbleContent = document.querySelector('.bubble-content-scroll');
    if (!bubbleContent) return;
    
    bubbleContent.innerHTML = ""; // Wipe content zone securely

    // Append standard back navigation controls using standard bracket elements
    bubbleContent.appendChild(createNodeFromBracket(["", "[ << BACK TO CALENDAR ]", "button", "displayExhibitionLobby()"]));
    bubbleContent.appendChild(createNodeFromBracket(["color: #ffe119; margin-top: 8px; font-size: 1rem; font-weight: bold;", `[ LOBBY: ${cityName.toUpperCase()} ]`, "div"]));

    // Create a robust vertical wrapper flexbox element block
    let listWrapper = document.createElement('div');
    listWrapper.style.cssText = "display: flex; flex-direction: column; gap: 6px; margin-top: 8px;";

    const startIndex = (cityName === 'Nega City') ? 0 : 5;
    if (typeof NpcExhibitionRoster !== 'undefined') {
        const cityBots = NpcExhibitionRoster.slice(startIndex, startIndex + 5);
        
        cityBots.forEach(bot => {
            let cardNode = document.createElement('div');
            cardNode.style.cssText = "border: 1px solid #fff; padding: 6px; background: #111; font-size: 11px;";

            let metaHeader = document.createElement('div');
            metaHeader.style.cssText = "display: flex; justify-content: space-between; color: #00ff00; font-weight: bold;";
            metaHeader.textContent = `${bot.name} | ACC: ${Math.round(bot.accuracy * 100)}%`;
            cardNode.appendChild(metaHeader);

            let styleDesc = document.createElement('div');
            styleDesc.style.cssText = "color: #aaa; font-size: 9px; margin-top: 2px;";
            styleDesc.textContent = `STYLE: ${bot.style.toUpperCase()}`;
            cardNode.appendChild(styleDesc);

            let actionBtn = document.createElement('button');
            actionBtn.style.cssText = "width: 100%; text-align: center; margin-top: 6px; padding: 2px; font-size: 10px; background: transparent; color: #fff; border: 1px solid #fff; font-family: inherit; cursor: pointer;";
            actionBtn.textContent = "> STRIKE ENTRANT MATCH";
            actionBtn.setAttribute('onclick', `startMatchAgainstNpc(${bot.id})`);
            cardNode.appendChild(actionBtn);

            listWrapper.appendChild(cardNode);
        });
    }

    bubbleContent.appendChild(listWrapper);
}

function startMatchAgainstNpc(npcId) {
    const targetBot = NpcExhibitionRoster.find(n => n.id === npcId);
    if (targetBot) {
        alert(`ENGAGING OPPONENT: ${targetBot.name}\nPrepare breakdown strategies against their ${targetBot.style} playstyle.`);
        if (typeof bubble !== 'undefined') bubble.classList.add('hidden'); // Close bubble to reveal gameplay canvas space
    }
}
// --- AUTO RUNTIME SHOT TAKING SYSTEM FOR CORES ---

function executeAiShotSequence() {
    // Check table configurations to verify all balls are completely stationary before shooting
    const stableTable = balls.every(b => Math.hypot(b.vx, b.vy) < 0.05);
    if (!stableTable) {
        console.log("[AI ENGINE] Table is active. Waiting for balls to settle down...");
        setTimeout(executeAiShotSequence, 1000);
        return;
    }

    const cueBall = balls.find(b => b.type === 'cue');
    const targetBalls = balls.filter(b => b.type === 'object');

    if (!cueBall || targetBalls.length === 0) return;

    // Pick a random target ball from the available options
// --- UPDATE THIS CALCULATION PORTION WITHIN EXECUTEAISHOTSEQUENCE ---
const targetBall = targetBalls[Math.floor(Math.random() * targetBalls.length)];

const dx = targetBall.x - cueBall.x;
const dy = targetBall.y - cueBall.y;
const distance = Math.hypot(dx, dy);

// TACTICAL ACCURACY INTERCEPTION: Factor in global difficulty sliders alongside specific bot levels
let baselineAccuracy = activeMatchBotProfile ? activeMatchBotProfile.accuracy : globalAiDifficultySettings.accuracyModifier;

// Higher difficulty values narrow down the aim angle error offset calculation bounds
const totalAccuracyFactor = Math.min(baselineAccuracy * (globalAiDifficultySettings.currentTier === "OVERLORD" ? 1.15 : 1), 0.99);
const accuracyOffsetFactor = (1 - totalAccuracyFactor) * 45;

const humanizedErrorAngle = (Math.random() - 0.5) * (accuracyOffsetFactor * Math.PI / 180);
const finalAimAngle = Math.atan2(dy, dx) + humanizedErrorAngle;


    console.log(`[AI EXECUTION] ${activeMatchBotProfile ? activeMatchBotProfile.name : "SYSTEM"} is aiming at ${targetBall.id}`);

    // --- VISUAL STICK SELECTION INTERACTION ANIMATION MODIFIER ---
    let simulationProgress = 0;
    const strengthBar = document.getElementById('strength-bar-fill');
    
    function animateAiAiming() {
        simulationProgress += 4;
        
        // Feed mock tracking properties back into the drag state variables
        isDragging = true;
        dragStart = { x: cueBall.x, y: cueBall.y };
        
        // Reverse drag vector math so that the stick line renders opposite the target path
        dragCurrent = {
            x: cueBall.x - Math.cos(finalAimAngle) * (simulationProgress * 1.2),
            y: cueBall.y - Math.sin(finalAimAngle) * (simulationProgress * 1.2)
        };

        if (strengthBar) {
            strengthBar.style.width = `${Math.min(simulationProgress, 100)}%`;
        }

        if (simulationProgress < 85) {
            requestAnimationFrame(animateAiAiming);
// --- INSERT WITHIN THE AI ANIMATION STOP BOUNDS IN ADVANCEMENT.JS ---
} else {
    isDragging = false;
    if (strengthBar) strengthBar.style.width = '0%';
    
    const strokeVelocity = 6 + (Math.random() * 4);
    cueBall.vx = Math.cos(finalAimAngle) * strokeVelocity;
    cueBall.vy = Math.sin(finalAimAngle) * strokeVelocity;

    if (typeof RetroAudio !== 'undefined') RetroAudio.playHit(0.4);
    
    // Increment AI statistical logging indicators
    gameTurnStatistics.totalShotsFired += 1;
    gameTurnStatistics.aiTurnCount += 1;
    
    // Hand back the game turn token to player once execution completes
    gameTurnState.activeTurn = 'player';
    console.log("[AI ENGINE] Stroke tracked. Switching state focus back to PLAYER.");
}

// --- UPDATE THE BASE LOBBY SELECTION HOOK TO DEPLOY THE AUTONOMOUS ROUTINE ---
window.startMatchAgainstNpc = function(npcId) {
    if (typeof NpcExhibitionRoster === 'undefined') return;
    
    const selectedBot = NpcExhibitionRoster.find(n => n.id === npcId);
    if (selectedBot) {
        activeMatchBotProfile = selectedBot;
        alert(`LAUNCHING VS MATCH\nOpponent: ${selectedBot.name}\nDifficulty Rank: Level ${selectedBot.level}`);
        
        // Hide settings window overlay to reveal table canvas
        const panelBubble = document.getElementById('control-bubble');
        if (panelBubble) panelBubble.classList.add('hidden');
        
        // Delay AI shot by 2.5 seconds to let the player view the table layout first
        setTimeout(executeAiShotSequence, 2500);
    }
};
// --- UPDATE AND REPLACE THE GETBALLCOLOR ROUTINE INSIDE ADVANCEMENT.JS ---
function getBallColor(ball, skin) {
    if (skin === 'default') {
        if (ball.type === 'cue') return '#ffffff';      // Solid White Cue Ball
        if (ball.type === 'black') return '#111111';    // Level 3 Solid Black Ball
        
        // South African Slang B&W Styles: Light Grey for Small (Solids), Striped Border style for Big (Stripes)
        return (ball.group === 'small') ? '#cccccc' : '#555555'; 
    }
    
    // Premium Mode: Map South African groups to traditional Red and Yellow tournament sets
    if (ball.type === 'cue') return '#fcfcfc';
    if (ball.type === 'black') return '#111111';
    
    return (ball.group === 'small') ? '#e61919' : '#f5b041'; // Reds vs Yellows
}


// --- RENDERING PATCH HOOK IN DRAW TABLE LOOP FOR LEVEL 5 LABELS ---
// Add this exact nested text block right where balls are filled inside advancement.js:
ctx.fill();
ctx.lineWidth = 2;
ctx.strokeStyle = '#000000';
ctx.stroke();

// LEVEL 5 MILESTONE: Draw numeric label identifiers onto the center of balls
if (gameState.currentLevel >= 5) {
    ctx.save();
    ctx.fillStyle = (ball.type === 'black' || (gameState.selectedSkin === 'default' && ball.radius === BALL_RADIUS_BIG)) ? '#ffffff' : '#000000';
    ctx.font = "bold 9px monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(ball.number, ball.x, ball.y);
    ctx.restore();
}
// --- REWRITE 2: SAFE OBJECT-DRIVEN ARCADE INITIALS REGISTRATION OVERLAY ---
function displayArcadeNamePrompt() {
    const bubbleContent = document.querySelector('.bubble-content-scroll');
    if (!bubbleContent) return;

    bubbleContent.innerHTML = ""; // Wipe content layer securely

    let centeringContainer = document.createElement('div');
    centeringContainer.style.cssText = "text-align: center; padding: 10px; display: flex; flex-direction: column; gap: 12px; align-items: center;";

    let titleLabel = document.createElement('div');
    titleLabel.style.cssText = "color: #ffaa00; font-size: 1rem; font-weight: bold;";
    titleLabel.textContent = "[ AMEND ARCADE PILOT PROFILE ]";
    centeringContainer.appendChild(titleLabel);

    let infoDesc = document.createElement('div');
    infoDesc.style.cssText = "font-size: 10px; color: #aaa; line-height: 14px;";
    infoDesc.textContent = "ENTER YOUR REGIONAL LOBBY INITIALS IDENTIFIER. THIS RETAINS ALL EXISTING XP STREAK PAYLOADS.";
    centeringContainer.appendChild(infoDesc);

    // Native creation of input parameters fields
    let inputField = document.createElement('input');
    inputField.type = "text";
    inputField.id = "arcade-name-input";
    inputField.maxLength = 8;
    inputField.placeholder = "NEGA_P1";
    inputField.style.cssText = "background: #111; color: #00ff00; border: 2px solid #fff; padding: 6px; font-family: inherit; text-align: center; font-size: 16px; width: 85%; box-sizing: border-box;";
    centeringContainer.appendChild(inputField);

    let submitBtn = document.createElement('button');
    submitBtn.style.cssText = "width: 100%; text-align: center; font-size: 11px; color: #00ff00; border: 1px solid #00ff00; background: transparent; padding: 6px; font-family: inherit; cursor: pointer;";
    submitBtn.textContent = "[ COMMIT PROFILE REGISTRATION ]";
    submitBtn.setAttribute('onclick', "submitArcadePlayerProfileName()");
    centeringContainer.appendChild(submitBtn);

    bubbleContent.appendChild(centeringContainer);
}

function submitArcadePlayerProfileName() {
    const inputField = document.getElementById('arcade-name-input');
    if (!inputField) return;

    let cleanName = inputField.value.trim().toUpperCase();
    if (cleanName === "") cleanName = "NEGA_P1";

    // Update state memory variables dynamically without clearing player level data
    arcadePlayerProfile.playerName = cleanName;
    localStorage.setItem('negaPool_playerProfileName', cleanName);
    
    // Update the visual top-bar HUD element
    const p1HudLabel = document.querySelector('.player-side .team-name');
    if (p1HudLabel) p1HudLabel.textContent = cleanName;

    if (typeof RetroAudio !== 'undefined') RetroAudio.playHit(0.4);
    
    // Refresh display view smoothly
    displayExhibitionLobby();
}
