// --- RETRO SOUND GENERATOR CORE ENGINE ---
const RetroAudio = {
    ctx: null,
    init() { if (!this.ctx) this.ctx = new (window.AudioContext || window.webkitAudioContext)(); },
    playHit(vol = 0.3) {
        this.init();
        let osc = this.ctx.createOscillator(), gain = this.ctx.createGain();
        osc.connect(gain); gain.connect(this.ctx.destination);
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(150, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(30, this.ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(Math.min(vol, 0.4), this.ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.1);
        osc.start(); osc.stop(this.ctx.currentTime + 0.1);
    },
    playPocket() {
        this.init();
        let osc = this.ctx.createOscillator(), gain = this.ctx.createGain();
        osc.connect(gain); gain.connect(this.ctx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(80, this.ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(20, this.ctx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.2);
        osc.start(); osc.stop(this.ctx.currentTime + 0.2);
    },
    playFoul() {
        this.init();
        let osc = this.ctx.createOscillator(), gain = this.ctx.createGain();
        osc.connect(gain); gain.connect(this.ctx.destination);
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(110, this.ctx.currentTime);
        gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.2);
        osc.start(); osc.stop(this.ctx.currentTime + 0.2);
    }
};


// Locate the block inside updatePhysics() where object balls are pocketed, and increment our counter:

// --- GAME VARIANT DATA MODULE STATE ---
let gameState = {
    currentLevel: 6, currentXP: 50, gameScore: 0,
    acaciaUnlocked: false, snookerUnlocked: false,
    selectedSkin: 'default', selectedRuleset: '14.1'
};

// Canvas Layer Layout Elements
const canvas = document.getElementById('poolCanvas');
const ctx = canvas.getContext('2d');
const tableContainer = document.getElementById('table-container');

// --- VECTOR PHYSICS CONSTANTS AND STATE ---

// --- STATE VARIABLE EXTENSIONS (Place near the top of script.js) ---
let gameTurnState = {
    activeTurn: 'player', // Options: 'player' or 'ai'
    matchModeActive: false
};
// Initialize progress loading on system boot sequence
loadGameProgressFromStorage();
// --- NEW STATE VARS FOR SHOT AND TURN COUNTING (Add near top of script.js) ---
let gameTurnStatistics = {
    totalShotsFired: 0,
    playerTurnCount: 1,
    aiTurnCount: 0
};

const BALL_RADIUS_SMALL = 11; // Light Grey Target Group
const BALL_RADIUS_BIG = 15;   // Dark Grey Target Group
const CUE_BALL_RADIUS = 13;   // Standard Size White Ball
const FRICTION = 0.985;
const BALL_RADIUS = 14;
let balls = [];
let isDragging = false;
let dragStart = { x: 0, y: 0 };
let dragCurrent = { x: 0, y: 0 };
var ballsSunkThisShotCount = 0;
var isPlacingCueBall = false;

// Pocket Coordinate Blueprint Maps
const pockets = [
    { x: 15, y: 15 }, { x: 400, y: 12 }, { x: 785, y: 15 },
    { x: 15, y: 385 }, { x: 400, y: 388 }, { x: 785, y: 385 }
];
// --- UNIFY BALL PHYSICAL SIZES (South African Slang Standards) ---
const STANDARD_POOL_RADIUS = 13; // All balls share the same physical size to keep collisions fair

function initBalls() {
    balls = [
        { id: 'cue', x: 200, y: 200, vx: 0, vy: 0, type: 'cue', radius: STANDARD_POOL_RADIUS, number: 'CUE', group: 'cue' },
        
        // "Small" Balls (South African Slang for Red / Solid Group)
        { id: 'target-1', x: 550, y: 190, vx: 0, vy: 0, type: 'object', radius: STANDARD_POOL_RADIUS, number: '1', group: 'small' },
        { id: 'target-3', x: 580, y: 175, vx: 0, vy: 0, type: 'object', radius: STANDARD_POOL_RADIUS, number: '3', group: 'small' },
        
        // "Big" Balls (South African Slang for Yellow / Striped Group)
        { id: 'target-2', x: 550, y: 210, vx: 0, vy: 0, type: 'object', radius: STANDARD_POOL_RADIUS, number: '2', group: 'big' },
        { id: 'target-4', x: 580, y: 225, vx: 0, vy: 0, type: 'object', radius: STANDARD_POOL_RADIUS, number: '4', group: 'big' }
    ];

    if (gameState.currentLevel >= 3) {
        balls.push({ id: 'target-black', x: 610, y: 200, vx: 0, vy: 0, type: 'black', radius: STANDARD_POOL_RADIUS, number: '8', group: 'black' });
    }
}

// --- CONTROLS INPUT TRANSLATION SYSTEM (MOUSE/TOUCH) ---
function getCanvasMousePos(e) {
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    // Maps screen scaling constraints back to native 800x400 engine pixels
    return {
        x: (clientX - rect.left) * (canvas.width / rect.width),
        y: (clientY - rect.top) * (canvas.height / rect.height)
    };
}

// --- INSERT THIS TURN EVALUATION HOOK AT THE BOTTOM OF UPDATEPHYSICS() ---

// --- FILTER OUT INPUT GESTURES WHILE IT IS THE AI'S TURN ---
function handleStart(e) {
    if (gameTurnState.activeTurn === 'ai' && gameTurnState.matchModeActive) return; // Inputs locked out
    if (isPlacingCueBall) return;
    
    const pos = getCanvasMousePos(e);
    const cueBall = balls.find(b => b.type === 'cue');
    const dist = Math.hypot(pos.x - cueBall.x, pos.y - cueBall.y);
    
    if (dist < cueBall.radius * 2 && Math.hypot(cueBall.vx, cueBall.vy) < 0.1) {
        isDragging = true;
        dragStart = { x: cueBall.x, y: cueBall.y };
        dragCurrent = pos;
    }
}

// Add this helper reference near your other DOM element queries at the top of script.js
const strengthBarFill = document.getElementById('strength-bar-fill');

// --- UPDATE HANDLEMOVE GESTURE TO MONITOR POWER STRENGTH ---
function handleMove(e) {
    if (!isDragging) return;
    e.preventDefault();
    dragCurrent = getCanvasMousePos(e);
    
    // Calculate the raw distance between the touch drag and cue ball center
    const dragDistance = Math.hypot(dragStart.x - dragCurrent.x, dragStart.y - dragCurrent.y);
    
    // Cap the visual power visualization reading at a realistic limit of 150px
    const powerPercentage = Math.min((dragDistance / 150) * 100, 100);
    
    // Update the visual gauge display component
    strengthBarFill.style.width = `${powerPercentage}%`;
}

// --- INCREMENT COUNTERS UPON USER RELEASE SHOT STROKE ---
function handleEnd() {
    if (!isDragging) return;
    isDragging = false;
    const cueBall = balls.find(b => b.type === 'cue');
    
    cueBall.vx = (dragStart.x - dragCurrent.x) * 0.12;
    cueBall.vy = (dragStart.y - dragCurrent.y) * 0.12;
    
    if (Math.hypot(cueBall.vx, cueBall.vy) > 0.2) {
        RetroAudio.playHit(0.3);
        
        // Accumulate statistics profile markers
        gameTurnStatistics.totalShotsFired += 1;
        gameTurnStatistics.playerTurnCount += 1;
    }
    
    const strengthBar = document.getElementById('strength-bar-fill');
    if (strengthBar) strengthBar.style.width = '0%';
}

canvas.addEventListener('mousedown', handleStart);
canvas.addEventListener('mousemove', handleMove);
window.addEventListener('mouseup', handleEnd);
canvas.addEventListener('touchstart', handleStart, { passive: false });
canvas.addEventListener('touchmove', handleMove, { passive: false });
window.addEventListener('touchend', handleEnd);

// --- CRITICAL ERROR CORRECTION: DECLARE VARIABLE AT GLOBAL LAYER (Top of script.js) ---
var matchRuleContext = {
    playerAssignedGroup: null, 
    firstBallStruckThisShot: null,
    sunkBallsCollection: []
};
// --- 2D ELASTIC PHYSICS ENGINE LOOP (TOTALLY BALANCED & FIXED) ---
function updatePhysics() {
    // 1. Position Tracking Step
    balls.forEach(ball => {
        ball.x += ball.vx;
        ball.y += ball.vy;
        ball.vx *= FRICTION;
        ball.vy *= FRICTION;
        if (Math.hypot(ball.vx, ball.vy) < 0.05) { ball.vx = 0; ball.vy = 0; }
    });

    // 2. Wall Bounce Collisions
    balls.forEach(ball => {
        const r = ball.radius || 13;
        let wallHitDetected = false;
        if (ball.x < r + 10) { ball.x = r + 10; ball.vx *= -1; wallHitDetected = true; }
        if (ball.x > canvas.width - r - 10) { ball.x = canvas.width - r - 10; ball.vx *= -1; wallHitDetected = true; }
        if (ball.y < r + 10) { ball.y = r + 10; ball.vy *= -1; wallHitDetected = true; }
        if (ball.y > canvas.height - r - 10) { ball.y = canvas.height - r - 10; ball.vy *= -1; wallHitDetected = true; }
        if (wallHitDetected) RetroAudio.playHit(0.08);
    });

    // 3. Ball-to-Ball Momentum Exchange Calculations
    for (let i = 0; i < balls.length; i++) {
        for (let j = i + 1; j < balls.length; j++) {
            let b1 = balls[i], b2 = balls[j];
            let r1 = b1.radius || 13, r2 = b2.radius || 13;
            let dx = b2.x - b1.x, dy = b2.y - b1.y;
            let dist = Math.hypot(dx, dy);
            
            if (dist < (r1 + r2)) {
                let overlap = (r1 + r2) - dist;
                let nx = dx / dist, ny = dy / dist;
                b1.x -= nx * overlap * 0.5; b1.y -= ny * overlap * 0.5;
                b2.x += nx * overlap * 0.5; b2.y += ny * overlap * 0.5;

                let kx = b1.vx - b2.vx, ky = b1.vy - b2.vy;
                let p = nx * kx + ny * ky;
                if (p > 0) {
                    b1.vx -= nx * p; b1.vy -= ny * p;
                    b2.vx += nx * p; b2.vy += ny * p;
                    
                    let contactForce = Math.hypot(b1.vx, b1.vy);
                    RetroAudio.playHit(contactForce * 0.1);

                    // FOUL ENGINE LOGGING STEP
                    if (b1.type === 'cue' && !matchRuleContext.firstBallStruckThisShot) matchRuleContext.firstBallStruckThisShot = b2.group;
                    if (b2.type === 'cue' && !matchRuleContext.firstBallStruckThisShot) matchRuleContext.firstBallStruckThisShot = b1.group;

                    // --- HOOK 1: EVALUATE ARCADE HIGH-FORCE TRICK SHOTS ---
                    if (contactForce > 6) {
                        if (typeof ArcadeChallengeEngine !== 'undefined') {
                            ArcadeChallengeEngine.evaluateChallengeSuccess("strike", contactForce);
                        }
                        // Visual screen shake link
                        const containerNode = document.getElementById('table-container');
                        if (containerNode) {
                            containerNode.classList.add('shake-active');
                            setTimeout(() => containerNode.classList.remove('shake-active'), 350);
                        }
                    }
                }
            }
        }
    }

    // 4. Scoped Pocket Verification Loops
    for (let idx = balls.length - 1; idx >= 0; idx--) {
        let ball = balls[idx];
        for (let pIdx = 0; pIdx < pockets.length; pIdx++) {
            let pocket = pockets[pIdx];
            if (Math.hypot(ball.x - pocket.x, ball.y - pocket.y) < 22) {
                if (ball.type === 'cue') {
                    gameState.gameScore -= 1;
                    triggerFloatingScoreText(pocket.x, pocket.y, "-1 FOUL", "#ff5555");
                    RetroAudio.playFoul();
                    isPlacingCueBall = true;
                    ball.x = -999; ball.y = -999; ball.vx = 0; ball.vy = 0;
                    if (typeof EnvironmentDialogEngine !== 'undefined') EnvironmentDialogEngine.postCommentary('scratch');
                    renderUpdateView();
                } else {
                    gameState.gameScore += 1;
                    ballsSunkThisShotCount += 1;
                    
                    // --- HOOK 2: EVALUATE SINK TRACKERS FOR TRICK SHOT MODES ---
                    if (typeof ArcadeChallengeEngine !== 'undefined') {
                        ArcadeChallengeEngine.evaluateChallengeSuccess("sink");
                    }

                    if (!matchRuleContext.playerAssignedGroup && ball.group !== 'black') {
                        matchRuleContext.playerAssignedGroup = ball.group;
                    }
                    matchRuleContext.sunkBallsCollection.push({ number: ball.number, group: ball.group });
                    updateVisualSunkRackSlot();
                    triggerFloatingScoreText(pocket.x, pocket.y, "+1 POINT", "#00ff00");
                    RetroAudio.playPocket();
                    balls.splice(idx, 1);
                    renderUpdateView();
                    
                    if (balls.length === 1 && gameState.selectedRuleset === '14.1') {
                        if (typeof AdvancementEngine !== 'undefined') AdvancementEngine.fetchNewRackConfiguration();
                    }
                }
                break;
            }
        }
    }

    // --- 5. SHOT FRICTION SETTLEMENT VERIFICATIONS (FIXED PLACEMENT) ---
    const elementsAreSettled = balls.every(b => Math.hypot(b.vx, b.vy) < 0.05);

    if (elementsAreSettled) {
        // --- HOOK 3: EVALUATE SETTLEMENT FOR TRICK SHOT CHALLENGES ---
        if (typeof ArcadeChallengeEngine !== 'undefined') {
            ArcadeChallengeEngine.evaluateChallengeSuccess("settled");
        }

        // South African slang foul checker
        if (matchRuleContext.firstBallStruckThisShot) {
            if (matchRuleContext.playerAssignedGroup && matchRuleContext.firstBallStruckThisShot !== matchRuleContext.playerAssignedGroup) {
                gameState.gameScore -= 1;
                triggerFloatingScoreText(400, 150, "ILLEGAL CONTACT FOUL! -1", "#ff5555");
                if (typeof EnvironmentDialogEngine !== 'undefined') EnvironmentDialogEngine.postCommentary('wrong_ball');
                renderUpdateView();
            }
            matchRuleContext.firstBallStruckThisShot = null;
        }
        
        // Handle standard XP distribution rules and turn swaps safely
        if (ballsSunkThisShotCount > 0) {
            let xpGained = (ballsSunkThisShotCount === 2) ? 25 : (ballsSunkThisShotCount > 2) ? 50 : 10;
            gameState.currentXP += xpGained;
            if (gameState.currentXP >= 80) {
                gameState.currentXP %= 80;
                gameState.currentLevel += 1;
                setTimeout(() => triggerFloatingScoreText(400, 180, "LEVEL UP!", "#ffe119"), 300);
            }
            renderUpdateView();
            ballsSunkThisShotCount = 0;
            
            // AUTOMATIC SAVE CARRIER TRACKER TRIGGER
            autoSaveTournamentProgress();
        }

        // AI Multi-Turn Switchboard Route
        if (gameTurnState.matchModeActive && gameTurnState.activeTurn === 'player' && !isDragging && Math.hypot(balls.find(b=>b.type==='cue').vx, balls.find(b=>b.type==='cue').vy) === 0) {
            if (typeof executeAiShotSequence === 'function' && activeMatchBotProfile) {
                gameTurnState.activeTurn = 'ai';
                triggerFloatingScoreText(400, 100, "COMPUTER TURN", "#ff5555");
                setTimeout(executeAiShotSequence, 2000);
            }
        }
    }
}

// --- FLOATING POPUP GENERATION INTERACTION HOOK (Moved cleanly outside loop) ---
function triggerFloatingScoreText(canvasX, canvasY, text, color) {
    const popupLayer = document.getElementById('score-popup-layer');
    if (!popupLayer) return;
    
    const percentX = (canvasX / 800) * 100;
    const percentY = (canvasY / 400) * 100;
    
    const textNode = document.createElement('div');
    textNode.className = 'floating-points-text';
    textNode.style.left = `${percentX}%`;
    textNode.style.top = `${percentY}%`;
    textNode.style.color = color;
    textNode.textContent = text;
    
    popupLayer.appendChild(textNode);
    setTimeout(() => textNode.remove(), 1200);
}

// --- NEW CUE BALL MANUAL INTERACTIVE PLACEMENT CLICK LISTENERS ---
canvas.addEventListener('click', (e) => {
    if (!isPlacingCueBall) return;
    
    const pos = getCanvasMousePos(e);
    
    // 14.1 Rules: Cue ball must be placed behind the kitchen line (left 25% of the table)
    if (pos.x > 45 && pos.x < 250 && pos.y > 45 && pos.y < 355) {
        const cueBall = balls.find(b => b.type === 'cue');
        if (cueBall) {
            cueBall.x = pos.x;
            cueBall.y = pos.y;
            cueBall.vx = 0;
            cueBall.vy = 0;
            isPlacingCueBall = false;
            RetroAudio.playHit(0.2);
        }
    }
});

// --- LOCAL STORAGE HIGH SCORE PERSISTENCE ENGINE ---
function saveGameProgressToStorage() {
    const storagePayload = {
        savedLevel: gameState.currentLevel,
        savedXP: gameState.currentXP,
        savedHighScore: Math.max(gameState.gameScore, localStorage.getItem('negaPool_highScore') || 0)
    };
    
    // Commit payload to local storage strings database
    localStorage.setItem('negaPool_saveData', JSON.stringify(storagePayload));
    localStorage.setItem('negaPool_highScore', storagePayload.savedHighScore);
    
    // Update the high score badge element if it exists in the DOM window view
    const highscoreDisplay = document.getElementById('high-score-badge');
    if (highscoreDisplay) highscoreDisplay.textContent = storagePayload.savedHighScore;
}

function loadGameProgressFromStorage() {
    const storedData = localStorage.getItem('negaPool_saveData');
    if (storedData) {
        const parsed = JSON.parse(storedData);
        gameState.currentLevel = parsed.savedLevel || 1;
        gameState.currentXP = parsed.savedXP || 0;
    }
}

// --- EXTEND THE CORE RENDER VIEW FUNCTION FOR AUTOMATIC LEVEL 2 UI POPUPS ---
const originalViewUpdate = window.renderUpdateView;

// --- FIX AND ENHANCE THE FULL DRAW TABLE ENGINE ---
function drawTable() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 1. Draw outer rail cushion borders based on global status mappings
    ctx.strokeStyle = (gameState.selectedSkin === 'acacia') ? '#5a2a0c' : 
                      (gameState.selectedSkin === 'yellow-oak') ? '#784919' :
                      (gameState.selectedSkin === 'lawn-green') ? '#1b4d1b' :
                      (gameState.selectedSkin === 'crystal-navy') ? '#0d2b45' :
                      (gameState.selectedSkin === 'auroral-purple') ? '#311145' : '#ffffff';
    ctx.lineWidth = 10;
    ctx.strokeRect(5, 5, canvas.width - 10, canvas.height - 10);

    // 2. Render Retro MS-DOS Turn Counter Tracker HUD Overlay directly on the felt
    ctx.save();
    ctx.fillStyle = (gameState.selectedSkin === 'default') ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.25)';
    ctx.font = "12px 'Courier New', monospace";
    ctx.textAlign = "left";
    
    // Draw real-time match progression metrics in the upper left corner zone
    ctx.fillText(`MODE: ${gameState.selectedRuleset.toUpperCase()}`, 25, 30);
    ctx.fillText(`ACTIVE TURN: ${gameTurnState.activeTurn.toUpperCase()}`, 25, 48);
    ctx.fillText(`PLAYER SHOTS: ${gameTurnStatistics.playerTurnCount}`, 25, 66);
    if (gameTurnState.matchModeActive) {
        ctx.fillText(`BOT SHOTS: ${gameTurnStatistics.aiTurnCount}`, 25, 84);
    }
    ctx.restore();

    // 3. Draw table pocket configurations
    pockets.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 18, 0, Math.PI * 2);
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = ctx.strokeStyle; 
        ctx.stroke();
    });

    // 4. Draw kitchen placement zone bounding box when manual placement mode is active
    if (typeof isPlacingCueBall !== 'undefined' && isPlacingCueBall) {
        ctx.save();
        ctx.strokeStyle = (gameState.selectedSkin === 'default') ? "rgba(255, 255, 255, 0.3)" : "rgba(245, 176, 65, 0.3)";
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 4]);
        ctx.strokeRect(45, 45, 205, 310); // Standard Kitchen head string line bounding limits
        ctx.fillStyle = "rgba(255, 255, 255, 0.02)";
        ctx.fillRect(45, 45, 205, 310);
        
        // Print placement instructional string indicators
        ctx.fillStyle = "#ffffff";
        ctx.font = "10px 'Courier New', monospace";
        ctx.textAlign = "center";
        ctx.fillText("[ TAP INSIDE KITCHEN LINE TO PLACE CUE BALL ]", 150, 205);
        ctx.restore();
    }

    // 5. Render active player shot guidance vectors
    if (isDragging) {
        const angle = Math.atan2(dragCurrent.y - dragStart.y, dragCurrent.x - dragStart.x);
        const aimAngle = angle + Math.PI; 
        
        const stickGap = 20; // Space offset outside cue ball perimeter circumference
        const stickLength = 160; 
        const stickStartX = dragStart.x + Math.cos(angle) * stickGap;
        const stickStartY = dragStart.y + Math.sin(angle) * stickGap;
        const stickEndX = dragStart.x + Math.cos(angle) * (stickGap + stickLength);
        const stickEndY = dragStart.y + Math.sin(angle) * (stickGap + stickLength);

        // --- TRAJECTORY AIM LINE SUB-RENDERER ---
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(dragStart.x, dragStart.y);
        const maxProjectLength = 700; 
        const targetX = dragStart.x + Math.cos(aimAngle) * maxProjectLength;
        const targetY = dragStart.y + Math.sin(aimAngle) * maxProjectLength;
        ctx.lineTo(targetX, targetY);
        
        ctx.strokeStyle = (gameState.selectedSkin === 'default') ? 'rgba(255, 255, 255, 0.35)' : 'rgba(245, 176, 65, 0.35)';
        ctx.lineWidth = 2;
        ctx.setLineDash([6, 6]); 
        ctx.stroke();
        ctx.restore();

        // --- MULTI-SKIN POOL CUE STICK STROKER SUB-RENDERER ---
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(stickStartX, stickStartY);
        ctx.lineTo(stickEndX, stickEndY);
        
        if (gameState.selectedSkin === 'acacia') {
            ctx.strokeStyle = '#f5b041'; 
            ctx.lineWidth = 5;
            ctx.stroke();
            
            ctx.beginPath();
            ctx.moveTo(stickStartX, stickStartY);
            ctx.lineTo(stickEndX, stickEndY);
            ctx.strokeStyle = '#5a2a0c';
            ctx.lineWidth = 1.5;
            ctx.stroke();
        } else {
            ctx.strokeStyle = '#ffffff'; 
            ctx.lineWidth = 4;
            ctx.stroke();
        }
        ctx.restore();
    }

    // 6. Render active table balls WITH SCOPED BALL NUMBER INTEGRATION FIX
    balls.forEach(ball => {
        if (ball.x === -999) return; // Hide scratched cue balls awaiting user kitchen deployment
        
        ctx.beginPath();
        // Dynamically extract matching radius profiles mapping to current index structures
        const dynamicRadius = ball.radius || 13;
        ctx.arc(ball.x, ball.y, dynamicRadius, 0, Math.PI * 2);
        
        if (typeof getBallColor === 'function') {
            ctx.fillStyle = getBallColor(ball, gameState.selectedSkin);
        } else {
            ctx.fillStyle = (ball.type === 'cue') ? '#ffffff' : '#aaaaaa';
        }
        
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#000000';
        ctx.stroke();

        // --- LEVEL 5 MILESTONE NUMBER DRAWING: SAFELY INSIDE LOOP SCOPE ---
        if (gameState.currentLevel >= 5 && ball.number) {
            ctx.save();
            // Invert text contrast hex code shades based on specific backing weight
            const isDarkBackground = ball.type === 'black' || (gameState.selectedSkin === 'default' && ball.radius === 15);
            ctx.fillStyle = isDarkBackground ? '#ffffff' : '#000000';
            ctx.font = "bold 9px 'Courier New', monospace";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(ball.number, ball.x, ball.y);
            ctx.restore();
        }
    });
}

function loop() {
    updatePhysics();
    drawTable();
    requestAnimationFrame(loop);
}

// --- CRASH-PROOF DOM INTERACTION INITIALIZATION LAYER ---
const levelEl = document.getElementById('user-level');
const xpEl = document.getElementById('user-xp');
const scoreEl = document.getElementById('game-score');
const winBtn = document.getElementById('win-match-btn');
const foulBtn = document.getElementById('foul-btn');
const acaciaCard = document.getElementById('skin-acacia');
const snookerCard = document.getElementById('mode-snooker');

if (winBtn) {
    winBtn.addEventListener('click', () => {
        RetroAudio.playHit();
        if (gameState.currentLevel < 8 || gameState.currentXP < 70) {
            gameState.currentXP += 10;
            if (gameState.currentXP % 10 === 0) gameState.currentLevel = 1 + (gameState.currentXP / 10);
            gameState.gameScore += 1;
            renderUpdateView();
        }
    });
}

if (foulBtn) {
    foulBtn.addEventListener('click', () => {
        RetroAudio.playFoul();
        gameState.gameScore -= 1;
        renderUpdateView();
    });
}

function renderUpdateView() {
    // Standard profile stats validation layers
    const levelEl = document.getElementById('user-level');
    const xpEl = document.getElementById('user-xp');
    const scoreEl = document.getElementById('game-score');
    
    if (levelEl) levelEl.textContent = gameState.currentLevel;
    if (xpEl) xpEl.textContent = gameState.currentXP;
    if (scoreEl) scoreEl.textContent = gameState.gameScore;

    // --- KOF HUD SKINS THEME ADAPTATION INTERCEPTION ---
    const kofHud = document.getElementById('kof-versus-hud');
    if (kofHud) {
        // Dynamically style the arcade header colors to match your premium skins on screen
        switch(gameState.selectedSkin) {
            case 'acacia':        kofHud.style.borderColor = '#5a2a0c'; kofHud.style.background = '#944a20'; break;
            case 'yellow-oak':    kofHud.style.borderColor = '#784919'; kofHud.style.background = '#d2903e'; break;
            case 'lawn-green':    kofHud.style.borderColor = '#1b4d1b'; kofHud.style.background = '#2e8b57'; break;
            case 'crystal-navy':  kofHud.style.borderColor = '#00ff00'; kofHud.style.background = '#0b2545'; break;
            case 'auroral-purple':kofHud.style.borderColor = '#ffe119'; kofHud.style.background = '#2c003e'; break;
            default:              kofHud.style.borderColor = '#ffaa00'; kofHud.style.background = '#111111';
        }
    }

    // Sync profile initials label tags onto the header card
    const pilotLabel = localStorage.getItem('negaPool_playerProfileName') || "PLAYER ONE";
    const p1HudName = document.querySelector('.player-side .team-name');
    if (p1HudName && p1HudName.textContent !== pilotLabel) p1HudName.textContent = pilotLabel;
}

function selectSkin(skinName) {
    if (skinName === 'acacia' && !gameState.acaciaUnlocked) {
        RetroAudio.playFoul();
        alert("ACCESS DENIED.");
        return; 
    }
    RetroAudio.playHit();
    gameState.selectedSkin = skinName;
    const defCard = document.getElementById('skin-default');
    const tableContainer = document.getElementById('table-container');
    if (tableContainer) {
        if (skinName === 'acacia') {
            if (acaciaCard) acaciaCard.classList.add('active');
            if (defCard) defCard.classList.remove('active');
            tableContainer.className = 'table-outer-frame acacia-skin';
        } else {
            if (defCard) defCard.classList.add('active');
            if (acaciaCard) acaciaCard.classList.remove('active');
            tableContainer.className = 'table-outer-frame default-skin';
        }
    }
}

function switchRules(modeName) {
    RetroAudio.playHit();
    gameState.selectedRuleset = modeName;
    const m141 = document.getElementById('mode-141');
    if (m141 && snookerCard) {
        if (modeName === 'snooker') {
            snookerCard.classList.add('variant-active');
            m141.classList.remove('variant-active');
        } else {
            m141.classList.add('variant-active');
            snookerCard.classList.remove('variant-active'); 
        }
    }
}

// --- POP-UP MODAL WINDOW DRAG INFRASTRUCTURE WITH NULL SAFETY CHECK ---
const bubble = document.getElementById('control-bubble');
const toggleBtn = document.getElementById('bubble-toggle-btn');
const closeBtn = document.getElementById('bubble-close');

if (toggleBtn && bubble) {
    toggleBtn.addEventListener('click', () => {
        RetroAudio.playHit();
        bubble.classList.toggle('hidden');
    });
}

if (closeBtn && bubble) {
    closeBtn.addEventListener('click', () => {
        RetroAudio.playFoul();
        bubble.classList.add('hidden');
    });
}

if (bubble) dragElement(bubble);

function dragElement(elmnt) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    const header = document.getElementById('bubble-header');
    if (header) header.onmousedown = dragMouseDown;
    
    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }
    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }
    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}
// --- CRASH PREVENTER: ADD THIS FUNCTION TO THE BOTTOM OF SCRIPT.JS ---
function updateVisualSunkRackSlot() {
    const tray = document.getElementById('sunk-balls-tray');
    if (!tray) return;
    
    tray.innerHTML = ""; // Clear out the old container slot safely
    
    if (matchRuleContext && matchRuleContext.sunkBallsCollection) {
        matchRuleContext.sunkBallsCollection.forEach(item => {
            const badge = document.createElement('div');
            // Check item group properties to style with the new contrast rules
            badge.className = `sunk-ball-badge sunk-badge-${item.group}`;
            badge.textContent = item.number;
            
            // Inline fallback styles in case the canvas layout CSS isn't loaded yet
            badge.style.cssText = "width: 15px; height: 15px; border-radius: 50%; border: 1px solid #fff; display: inline-flex; align-items: center; justify-content: center; font-size: 8px; font-weight: bold; margin-right: 3px; font-family: monospace;";
            if (item.group === 'small') { badge.style.backgroundColor = '#cccccc'; badge.style.color = '#000'; }
            else if (item.group === 'big') { badge.style.backgroundColor = '#555555'; badge.style.color = '#fff'; }
            else if (item.group === 'black') { badge.style.backgroundColor = '#111111'; badge.style.color = '#fff'; badge.style.borderColor = '#ffaa00'; }
            
            tray.appendChild(badge);
        });
    }
}

// --- SAFELY BOOT SYSTEM AND CONSTRUCT UI ELEMENTS ONCE SCRIPTS LOAD ---
function runMasterConsoleBootSequence() {
    console.log("[SYSTEM] Initializing safe code execution paths...");
    
    // 1. Initialize physical ball properties tracking layouts
    if (typeof initBalls === 'function') initBalls();
    
    // 2. Clear out any broken variable states and run baseline interface display text loops
    if (typeof renderUpdateView === 'function') renderUpdateView();
    
    // 3. RUN INTERFACE BUILDER: Mount the annual tournament data arrays cleanly into the DOM window
    if (typeof displayExhibitionLobby === 'function') {
        displayExhibitionLobby();
        console.log("[SYSTEM] Calendar matrix built using safe array layouts successfully.");
    } else {
        console.warn("[SYSTEM WARNING] displayExhibitionLobby function was not located in global scope.");
    }

    // 4. Start the main game processing rendering frame
    if (typeof loop === 'function') loop();
}

// Replace your old raw boot commands at the bottom of script.js with this safe wrapper call:
runMasterConsoleBootSequence();

// Boot System safely
initBalls();
renderUpdateView();
loop();
