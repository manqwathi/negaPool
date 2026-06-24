/**
 * career.js - Automated Tournament & League Progression Engine
 * Converted to safe JavaScript arrays [] to completely eliminate HTML syntax crashes.
 */

/**
 * career.js - Complete Visual Bracket Tree Layout System
 * Converted into safe array nodes to completely protect against code syntax crashes.
 */

const CareerSystem = {
    tournamentTreeData: {},

    // 1. Generate an interactive hierarchical network mapping out the full Top 32 tournament tree lines
    initializeTop32VisualTree() {
        console.log("[CAREER ENGINE] Assembling visual Top 32 bracket nodes...");
        if (typeof RetroAudio !== 'undefined') RetroAudio.playHit(0.3);

        const pilotName = (typeof arcadePlayerProfile !== 'undefined') ? arcadePlayerProfile.playerName : "YOU";

        // Structured single-elimination tournament nodes data profile
        this.tournamentTreeData = {
            title: "TOP 32 ARCADE KNOCKOUT BRACKET",
            rounds: [
                {
                    name: "ROUND OF 32",
                    matches: [
                        { id: 1, p1: pilotName, p2: "ARGILE", score: "0-0", live: true },
                        { id: 2, p1: "BEN", p2: "ILAN", score: "5-3", live: false },
                        { id: 3, p1: "IYAH-MAN", p2: "JACKSON", score: "1-5", live: false },
                        { id: 4, p1: "VELBRITHA", p2: "S'DUMBI", score: "5-2", live: false }
                    ]
                },
                {
                    name: "ROUND OF 16",
                    matches: [
                        { id: 5, p1: "TBD", p2: "BEN", score: "0-0", live: false },
                        { id: 6, p1: "JACKSON", p2: "VELBRITHA", score: "0-0", live: false }
                    ]
                },
                {
                    name: "QUARTERFINALS",
                    matches: [
                        { id: 7, p1: "TBD", p2: "TBD", score: "0-0", live: false }
                    ]
                },
                {
                    name: "CHAMPIONSHIP FINALS",
                    matches: [
                        { id: 8, p1: "TBD", p2: "TBD", score: "Ê15M STAKES", live: false }
                    ]
                }
            ]
        };

        this.renderVisualTreeUI();
    },

    // 2. Compiles a professional visual tree flowchart map using safe JavaScript grid wrappers
    renderVisualTreeUI() {
        const drawerContent = document.querySelector('.bubble-content-scroll');
        if (!drawerContent) return;

        drawerContent.innerHTML = ""; // Wipe container securely to clear past content
        
        // Add back buttons and main title text nodes safely
        drawerContent.appendChild(createNodeFromBracket(["", "[ << BACK TO MENU ]", "button", "displayExhibitionLobby()"]));
        drawerContent.appendChild(createNodeFromBracket(["color: #ffaa00; margin-top: 10px; font-weight: bold; font-size: 1rem;", `[ ${this.tournamentTreeData.title} ]`, "div"]));

        // Create a horizontal scrollable view box to present bracket rounds columns side-by-side
        let treeScrollBox = document.createElement('div');
        treeScrollBox.style.cssText = "display: flex; gap: 16px; overflow-x: auto; overflow-y: hidden; max-height: 250px; margin-top: 8px; background: #050505; border: 1px solid #333; padding: 6px; box-sizing: border-box;";

        this.tournamentTreeData.rounds.forEach(round => {
            // Build a vertical structural column for each matching tournament stage
            let columnNode = document.createElement('div');
            columnNode.style.cssText = "display: flex; flex-direction: column; justify-content: space-around; min-width: 150px; background: rgba(255,255,255,0.02); padding: 4px; border: 1px dashed #222;";

            let roundHeader = document.createElement('div');
            roundHeader.style.cssText = "color: #ffe119; font-size: 9px; font-weight: bold; text-align: center; border-bottom: 1px solid #333; padding-bottom: 2px; margin-bottom: 4px;";
            roundHeader.textContent = round.name;
            columnNode.appendChild(roundHeader);

            round.matches.forEach(match => {
                let matchBox = document.createElement('div');
                matchBox.style.cssText = `border: 1px solid ${match.live ? '#00ff00' : '#444'}; padding: 4px; background: #111; font-size: 9px; margin-bottom: 6px; display: flex; flex-direction: column; gap: 1px;`;

                let p1Node = document.createElement('div');
                p1Node.style.cssText = `color: ${match.p1.includes("YOU") ? '#00ff00' : '#fff'}; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;`;
                p1Node.textContent = match.p1;
                matchBox.appendChild(p1Node);

                let p2Node = document.createElement('div');
                p2Node.style.cssText = "color: #fff; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; border-bottom: 1px dashed #222; padding-bottom: 1px;";
                p2Node.textContent = match.p2;
                matchBox.appendChild(p2Node);

                let scoreLabel = document.createElement('div');
                scoreLabel.style.cssText = "display: flex; justify-content: space-between; font-weight: bold; color: #ffaa00; font-family: monospace; font-size: 8px; margin-top: 2px;";
                scoreLabel.textContent = `SCORE: ${match.score}`;
                matchBox.appendChild(scoreLabel);

                if (match.live) {
                    let playBtn = document.createElement('button');
                    playBtn.style.cssText = "width: 100%; text-align: center; margin-top: 4px; background: transparent; color: #00ff00; border: 1px solid #00ff00; font-family: inherit; font-size: 8px; cursor: pointer; padding: 1px 0;";
                    playBtn.textContent = "STRIKE MATCH";
                    playBtn.setAttribute('onclick', "CareerSystem.startTournamentMatch()");
                    matchBox.appendChild(playBtn);
                }

                columnNode.appendChild(matchBox);
            });

            treeScrollBox.appendChild(columnNode);
        });

        drawerContent.appendChild(treeScrollBox);
    },

    startTournamentMatch() {
        alert("CRITICAL CAREER MATCH LOADING...\nTurn management and KOF visual elements are active. Pocket all targets to advance.");
        if (typeof gameTurnState !== 'undefined') {
            gameTurnState.matchModeActive = true;
            gameTurnState.activeTurn = 'player';
        }
        const panelBox = document.getElementById('control-bubble');
        if (panelBox) panelBox.classList.add('hidden');
    }
};

    startLeagueMatch() {
        alert("LEAGUE FIXTURE ENLISTED.\nAccumulate pocket points to advance higher up the continuous world championship rankings.");
        if (typeof gameTurnState !== 'undefined') {
            gameTurnState.matchModeActive = true;
            gameTurnState.activeTurn = 'player';
        }
        const bubbleDrawer = document.getElementById('control-bubble');
        if (bubbleDrawer) bubbleDrawer.classList.add('hidden');
    }
};
// --- TRICK-SHOT mini-CHALLENGES MATRIX CONFIGURATION ---
var activeBilliardChallenge = null;

const ArcadeChallengeEngine = {
    challenges: [
        { id: "trick_1", title: "1. DOUBLE SINK QUICKSHOT", target: "Pocket all object balls in under 2 strokes.", rewardXp: 40 },
        { id: "trick_2", title: "2. BANK TRICK STRIKE", target: "Make a shot at high-power velocity force values (>6).", rewardXp: 50 },
        { id: "trick_3", title: "3. THE SKIN LOCK OVERRIDE CHIP", target: "Sink any ball to instantly bypass skin level constraints!", rewardXp: 80 }
    ],

    // Renders the mini-challenge selection menu cleanly inside the floating settings drawer
    displayChallengeDashboard() {
        const bubbleContent = document.querySelector('.bubble-content-scroll');
        if (!bubbleContent) return;

        bubbleContent.innerHTML = ""; // Wipe container securely
        bubbleContent.appendChild(createNodeFromBracket(["", "[ << BACK TO CONTROL PANELS ]", "button", "document.location.reload()"]));
        bubbleContent.appendChild(createNodeFromBracket(["color: #00ff00; margin-top: 10px; font-weight: bold; font-size: 1rem;", "[ ARCADE TRICK-SHOT TRAINING REWARDS ]", "div"]));

        let challengeListWrapper = document.createElement('div');
        challengeListWrapper.style.cssText = "display: flex; flex-direction: column; gap: 6px; margin-top: 8px;";

        this.challenges.forEach(task => {
            let taskRow = document.createElement('div');
            taskRow.style.cssText = "background: #0d0d0d; border: 1px solid #555; padding: 6px; font-size: 11px;";

            let titleMeta = document.createElement('div');
            titleMeta.style.cssText = "color: #ffe119; font-weight: bold;";
            titleMeta.textContent = task.title.toUpperCase();
            taskRow.appendChild(titleMeta);

            let descMeta = document.createElement('div');
            descMeta.style.cssText = "font-size: 9px; color: #aaa; margin: 2px 0;";
            descMeta.textContent = `GOAL: ${task.target.toUpperCase()}`;
            taskRow.appendChild(descMeta);

            let activateBtn = document.createElement('button');
            activateBtn.style.cssText = "width: 100%; text-align: center; margin-top: 4px; padding: 2px; font-size: 9px; border: 1px solid #fff; background: transparent; color: #fff; font-family: inherit; cursor: pointer;";
            activateBtn.textContent = `LAUNCH OBJECTIVE (+${task.rewardXp} XP)`;
            activateBtn.setAttribute('onclick', `ArcadeChallengeEngine.startChallenge('${task.id}')`);
            taskRow.appendChild(activateBtn);

            challengeListWrapper.appendChild(taskRow);
        });

        bubbleContent.appendChild(challengeListWrapper);
    },

    startChallenge(challengeId) {
        const selected = this.challenges.find(c => c.id === challengeId);
        if (!selected) return;

        activeBilliardChallenge = selected.id;
        
        // Setup table parameters automatically
        if (typeof initBalls === 'function') initBalls();
        if (typeof gameTurnStatistics !== 'undefined') gameTurnStatistics.playerTurnCount = 0;

        alert(`CHALLENGE ACTIVATED:\n${selected.title}\nGoal: ${selected.target}\nCompleting this rewards bonus XP strings and overrides skin-locks!`);
        
        // Hide configuration bubble to reveal table canvas space
        const drawerBubble = document.getElementById('control-bubble');
        if (drawerBubble) drawerBubble.classList.add('hidden');
    },

    // Evaluates targets inside our active processing update loop frame
    evaluateChallengeSuccess(triggerType, metaData = 0) {
        if (!activeBilliardChallenge) return;

        let challengeClear = false;
        let selectedTask = this.challenges.find(c => c.id === activeBilliardChallenge);

        if (activeBilliardChallenge === "trick_1" && triggerType === "settled") {
            // Check if player pocketed the balls in under 2 strokes
            if (balls.length === 1 && gameTurnStatistics.playerTurnCount <= 2) challengeClear = true;
        } 
        else if (activeBilliardChallenge === "trick_2" && triggerType === "strike" && metaData > 6) {
            challengeClear = true;
        } 
        else if (activeBilliardChallenge === "trick_3" && triggerType === "sink") {
            // Skin Bypass shortcut trick
            challengeClear = true;
            Object.keys(AdvancementEngine.catalog).forEach(key => {
                AdvancementEngine.catalog[key].unlocked = true; // Unlock all custom tables instantly
            });
            alert("[SYSTEM INTEGRITY SHIFT]: ALL LOCK MECHANISMS OVERRIDDEN. SKIN CATALOG FULLY ACCESSIBLE!");
        }

        if (challengeClear && selectedTask) {
            activeBilliardChallenge = null; // Clear task assignment flags
            gameState.currentXP += selectedTask.rewardXp;
            
            if (gameState.currentXP >= 80) {
                gameState.currentXP %= 80;
                gameState.currentLevel += 1;
            }

            if (typeof triggerFloatingScoreText === 'function') {
                triggerFloatingScoreText(400, 200, `CHALLENGE CLEAR! +${selectedTask.rewardXp} XP`, "#00ff00");
            }
            if (typeof RetroAudio !== 'undefined') RetroAudio.playHit(0.5);
            if (typeof renderUpdateView === 'function') renderUpdateView();
        }
    }
};
// --- AUTOMATED TOURNAMENT AND LEAGUE STANDINGS SAVER ---
function autoSaveTournamentProgress() {
    console.log("[CAREER AUTO-SAVE] Exporting current standings payload to device memory...");
    
    const careerPayload = {
        gameStateData: {
            level: gameState.currentLevel,
            xp: gameState.currentXP,
            score: gameState.gameScore
        },
        tournamentData: CareerSystem.tournamentBracket,
        leagueData: CareerSystem.leagueStandings,
        inventoryData: typeof playerInventoryStakes !== 'undefined' ? playerInventoryStakes : { walletBalance: 0, equippedCueDesign: "STANDARD" },
        ruleCache: {
            assignedGroup: matchRuleContext.playerAssignedGroup,
            sunkHistory: matchRuleContext.sunkBallsCollection
        }
    };

    // Safely write payload to browser local storage registry strings fields
    localStorage.setItem('negaPool_activeCareerBackup', JSON.stringify(careerPayload));
}

function autoLoadTournamentProgress() {
    const rawBackup = localStorage.getItem('negaPool_activeCareerBackup');
    if (!rawBackup) return;

    try {
        const backup = JSON.parse(rawBackup);
        
        // 1. Sync game profile levels data
        if (backup.gameStateData) {
            gameState.currentLevel = backup.gameStateData.level || 1;
            gameState.currentXP = backup.gameStateData.xp || 0;
            gameState.gameScore = backup.gameStateData.score || 0;
        }

        // 2. Restore active bracket hierarchies arrays
        if (backup.tournamentData && backup.tournamentData.length > 0) {
            CareerSystem.tournamentBracket = backup.tournamentData;
        }
        if (backup.leagueData && backup.leagueData.length > 0) {
            CareerSystem.leagueStandings = backup.leagueData;
        }

        // 3. Restore item currencies wallets
        if (backup.inventoryData && typeof playerInventoryStakes !== 'undefined') {
            playerInventoryStakes.walletBalance = backup.inventoryData.walletBalance || 0;
            playerInventoryStakes.equippedCueDesign = backup.inventoryData.equippedCueDesign || "STANDARD";
        }

        // 4. Restore rule configurations
        if (backup.ruleCache) {
            matchRuleContext.playerAssignedGroup = backup.ruleCache.assignedGroup;
            matchRuleContext.sunkBallsCollection = backup.ruleCache.sunkHistory || [];
            if (typeof updateVisualSunkRackSlot === 'function') updateVisualSunkRackSlot();
        }

        console.log("[CAREER LOAD] Tournament and League brackets data completely restored from cache.");
    } catch(err) {
        console.error("[CAREER LOAD ERROR] Failed to parse local storage payload data:", err);
    }
}

// Automatically load tournament history records on system initialization boot lines
setTimeout(autoLoadTournamentProgress, 500);

// --- AI TACTICAL BEHAVIOR MODIFIER GLOBALS ---
var globalAiDifficultySettings = {
    currentTier: "EXPERT",
    accuracyModifier: 0.82,
    safetyTendencyPct: 0.45,
    thinkingDelayMs: 2000
};

const AiBehaviorController = {
    difficultyTiers: [
        { key: "ROOKIE",  acc: 0.65, safety: 0.15, delay: 1500, desc: "CLUMSY STROKES. COMPUTER RARELY ATTEMPTS SAFETY PLAYS." },
        { key: "EXPERT",  acc: 0.82, safety: 0.45, delay: 2000, desc: "STANDARD EXH MATCH TACTICS. BALANCED OFFENSE & DEFENSE." },
        { key: "OVERLORD", acc: 0.98, safety: 0.80, delay: 2500, desc: "FLAWLESS VECTOR LINES. PUNISHES SCRATCHES WITH LONG RUNOUTS." }
    ],

    // Compiles an interactive configuration layout card using safe bracket arrays
    displayDifficultyMenu() {
        const bubbleContent = document.querySelector('.bubble-content-scroll');
        if (!bubbleContent) return;

        bubbleContent.innerHTML = ""; // Wipe content zone securely

        // Add back buttons and headers using safe elements
        bubbleContent.appendChild(createNodeFromBracket(["", "[ << BACK TO MENU SELECTIONS ]", "button", "displayExhibitionLobby()"]));
        bubbleContent.appendChild(createNodeFromBracket(["color: #ffe119; margin-top: 10px; font-weight: bold; font-size: 1rem;", "[ CONFIG SYSTEM: AI BEHAVIOR VALUES ]", "div"]));
        bubbleContent.appendChild(createNodeFromBracket(["font-size: 10px; color: #00ff00; margin-bottom: 8px;", `CURRENT MODE OPERATOR: ${globalAiDifficultySettings.currentTier}`, "div"]));

        let optionsBoxWrapper = document.createElement('div');
        optionsBoxWrapper.style.cssText = "display: flex; flex-direction: column; gap: 6px; margin-top: 6px;";

        this.difficultyTiers.forEach(tier => {
            const isActive = globalAiDifficultySettings.currentTier === tier.key;
            
            let optionRow = document.createElement('div');
            optionRow.style.cssText = `border: 1px solid ${isActive ? '#00ff00' : '#444'}; padding: 6px; background: #0d0d0d; font-size: 11px;`;

            let metaHeader = document.createElement('div');
            metaHeader.style.cssText = `font-weight: bold; color: ${isActive ? '#00ff00' : '#fff'}; display: flex; justify-content: space-between;`;
            metaHeader.textContent = `${tier.key} MODE ${isActive ? '[ ACTIVE ]' : ''}`;
            cardNode = metaHeader; // Map loop references safely
            optionRow.appendChild(metaHeader);

            let descriptionText = document.createElement('div');
            descriptionText.style.cssText = "font-size: 9px; color: #777; margin-top: 2px; line-height: 12px;";
            descriptionText.textContent = `BEHAVIOR: ${tier.desc} (ACC: ${Math.round(tier.acc*100)}% | SAFE: ${Math.round(tier.safety*100)}%)`;
            optionRow.appendChild(descriptionText);

            if (!isActive) {
                let applyBtn = document.createElement('button');
                applyBtn.style.cssText = "width: 100%; text-align: center; margin-top: 4px; padding: 2px; font-size: 9px; border: 1px solid #fff; background: transparent; color: #fff; font-family: inherit; cursor: pointer;";
                applyBtn.textContent = `>> INITIALIZE ${tier.key} PROCESSING BEHAVIORS`;
                applyBtn.setAttribute('onclick', `AiBehaviorController.applyTierConfig('${tier.key}')`);
                optionRow.appendChild(applyBtn);
            }

            optionsBoxWrapper.appendChild(optionRow);
        });

        bubbleContent.appendChild(optionsBoxWrapper);
    },

    applyTierConfig(tierKey) {
        const matchingData = this.challenges = this.difficultyTiers.find(t => t.key === tierKey);
        if (!matchingData) return;

        // Apply chosen properties directly to the global settings object
        globalAiDifficultySettings.currentTier = matchingData.key;
        globalAiDifficultySettings.accuracyModifier = matchingData.acc;
        globalAiDifficultySettings.safetyTendencyPct = matchingData.safety;
        globalAiDifficultySettings.thinkingDelayMs = matchingData.delay;

        if (typeof RetroAudio !== 'undefined') RetroAudio.playHit(0.4);
        
        // Refresh menu display smoothly
        this.displayDifficultyMenu();
    }
};
