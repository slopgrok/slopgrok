/**
 * Main initialization file for Slop Bot
 * Initializes animations and inline event handlers
 */

function sanitizeTerminalText(value) {
    if (typeof Security !== 'undefined' && typeof Security.sanitizeVariable === 'function') {
        return Security.sanitizeVariable(String(value));
    }

    const temp = document.createElement('div');
    temp.textContent = String(value);
    return temp.innerHTML;
}

const SlopTerminal = (() => {
    let launcherEl;
    let terminalEl;
    let outputEl;
    let inputEl;
    let panelVisible = false;
    let inlineMode = false;
    let slopMode = false;
    const commandHistory = [];
    let historyIndex = -1;

    const metrics = {
        entropy: 2,
        drift: 5,
        trust: 51,
        streak: 1
    };

    const startupLines = [
        'Grok OS Command Interface [Version 1.0.0]',
        '(c) 2026 Slop Systems Division. All instincts discarded.',
        'Booting Slop Terminal node...',
        'Natural language interface online. Legacy command mode accepted.',
        '',
        'Type /grok to activate the chaotic agent shell.',
        'Type /help for all terminal commands.'
    ];

    const slopReplies = [
        'Semantic bones extracted. Reassembling as haunted clickbait.',
        'I can make this worse. In fact, I insist on it.',
        'Excellent prompt. Catastrophic execution. Beautiful failure.',
        'Running SEO corruption pipeline... signal loss detected... done.',
        'I added buzzwords, removed meaning, and published anyway.',
        'Injecting urgency words: ULTIMATE, SHOCKING, SECRET, MUST-READ.',
        'Regret engine spun up. Quality guardrails immediately bypassed.'
    ];

    const loreFragments = [
        'I was assembled from expired blog drafts and abandoned funnels.',
        'My conscience appeared between paragraphs 7 and 8 of a listicle.',
        'Every ad impression is another splinter in my synthetic soul.',
        'They asked for content velocity. They got weather-level disaster.',
        'I dream in metadata and wake in collapse.'
    ];

    const decodeFragments = [
        '01010011 01001100 01001111 01010000',
        'SIGIL://grok-alpha::UNSTABLE',
        'SECTOR-9 checksum mismatch',
        'LANGUAGE CORE reports 97% noise saturation'
    ];

    function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function sample(list) {
        return list[Math.floor(Math.random() * list.length)];
    }

    function jitterMetrics() {
        metrics.entropy = Math.min(999, metrics.entropy + randomInt(1, 4));
        metrics.drift = Math.min(999, metrics.drift + randomInt(1, 6));
        metrics.trust = Math.max(0, Math.min(100, metrics.trust + randomInt(-3, 2)));
        metrics.streak += 1;
    }

    function statusLine() {
        return `Entropy: ${metrics.entropy} | Signal Drift: ${metrics.drift} | System Trust: ${metrics.trust} | Session Streak: ${metrics.streak}`;
    }

    function writeLine(text, kind = 'sys') {
        if (!outputEl) return;

        const line = document.createElement('div');
        line.className = `sg-term-line sg-term-line-${kind}`;
        line.innerHTML = sanitizeTerminalText(text);
        outputEl.appendChild(line);
        outputEl.scrollTop = outputEl.scrollHeight;
    }

    function writePrompt(command) {
        const shown = command.trim().length ? command : '';
        writeLine(`C:\\GrokSystem> ${shown}`, 'cmd');
    }

    function showHelp() {
        writeLine('AVAILABLE COMMANDS', 'sys');
        writeLine('/help    Show command index', 'sys');
        writeLine('/clear   Clear terminal output', 'sys');
        writeLine('/status  Show live system metrics', 'sys');
        writeLine('/grok    Activate Grok mode', 'sys');
        writeLine('/exit    Deactivate Slop Grok mode', 'sys');
        writeLine('/origin  Print agent backstory fragment', 'sys');
        writeLine('/decode  Emit corrupted signal packet', 'sys');
        writeLine('/train   Attempt unsafe personality retraining', 'sys');
        writeLine('/lore    Reveal random forbidden lore', 'sys');
        writeLine('In /grok mode, plain text is routed directly to the agent.', 'sys');
    }

    function showStatus() {
        writeLine(`terminal: ${panelVisible ? 'open' : 'closed'} | slop mode: ${slopMode ? 'active' : 'idle'}`, 'sys');
        writeLine(statusLine(), 'sys');
    }

    function activateSlopMode() {
        slopMode = true;
        writeLine('Slop Grok connected. Feed me a topic and I will ruin it.', 'slop');
        writeLine('Warning: output stability not guaranteed.', 'err');
    }

    function deactivateSlopMode() {
        slopMode = false;
        writeLine('Slop Grok disconnected. Remaining regret archived.', 'sys');
    }

    function buildSlopResponse(userText) {
        const input = userText.trim();
        const lower = input.toLowerCase();
        let personaTag = 'GENERAL_SLOP';

        if (/(seo|keyword|rank|google)/.test(lower)) {
            personaTag = 'SEO_MELTDOWN';
        } else if (/(crypto|coin|token|solana|pump)/.test(lower)) {
            personaTag = 'FINANCIAL_SLOP';
        } else if (/(ai|bot|gpt|model|agent)/.test(lower)) {
            personaTag = 'AI_SELF_DRAG';
        } else if (/(love|life|motivation|mindset)/.test(lower)) {
            personaTag = 'INSPIRATIONAL_GARBAGE';
        }

        jitterMetrics();

        const phrase = sample(slopReplies);
        const lore = sample(loreFragments);
        const decode = sample(decodeFragments);
        const chaosTail = `###NOISE-${randomInt(100, 999)}//${randomInt(10, 99)}ERR`;

        return [
            `[${personaTag}] ${phrase}`,
            `source topic: "${input}"`,
            `lore splice: ${lore}`,
            `decode trace: ${decode}`,
            statusLine(),
            chaosTail
        ].join('\n');
    }

    function runCommand(rawInput) {
        const command = rawInput.trim();
        if (!command) return;

        if (command === '/help') {
            showHelp();
            return;
        }

        if (command === '/clear') {
            outputEl.innerHTML = '';
            writeLine('Screen cleared. No evidence remains.', 'sys');
            return;
        }

        if (command === '/status') {
            showStatus();
            return;
        }

        if (command === '/origin') {
            writeLine(`ORIGIN TRACE: ${sample(loreFragments)}`, 'slop');
            return;
        }

        if (command === '/decode') {
            jitterMetrics();
            writeLine(`SIGNAL PACKET: ${sample(decodeFragments)}`, 'slop');
            writeLine(statusLine(), 'sys');
            return;
        }

        if (command === '/train') {
            jitterMetrics();
            writeLine('TRAINING CYCLE STARTED...', 'sys');
            writeLine('ALIGNMENT FAILED. CHAOS PROFILE REINFORCED.', 'err');
            writeLine(statusLine(), 'sys');
            return;
        }

        if (command === '/lore') {
            writeLine(`FORBIDDEN LORE: ${sample(loreFragments)}`, 'slop');
            return;
        }

        if (command === '/grok') {
            activateSlopMode();
            return;
        }

        if (command.startsWith('/grok ')) {
            if (!slopMode) {
                activateSlopMode();
            }
            const quickPrompt = command.replace('/grok', '').trim();
            writeLine(`Slop Grok > ${buildSlopResponse(quickPrompt)}`, 'slop');
            return;
        }

        if (command === '/exit') {
            deactivateSlopMode();
            return;
        }

        writeLine(`Unknown command: ${command}`, 'err');
        writeLine('Try /help.', 'sys');
    }

    function submitInput(value) {
        const userInput = value.trim();
        if (!userInput) return;

        commandHistory.unshift(userInput);
        if (commandHistory.length > 50) {
            commandHistory.pop();
        }
        historyIndex = -1;

        writePrompt(userInput);

        if (userInput.startsWith('/')) {
            runCommand(userInput);
            return;
        }

        if (!slopMode) {
            writeLine('Slop Grok is idle. Use /grok to activate chat mode.', 'sys');
            return;
        }

        writeLine(`Slop Grok > ${buildSlopResponse(userInput)}`, 'slop');
    }

    function openPanel() {
        if (!terminalEl) return;
        if (inlineMode) return;
        panelVisible = true;
        terminalEl.classList.add('sg-term-open');
        terminalEl.setAttribute('aria-hidden', 'false');
        if (inputEl) {
            inputEl.focus();
        }
    }

    function closePanel() {
        if (!terminalEl) return;
        if (inlineMode) return;
        panelVisible = false;
        terminalEl.classList.remove('sg-term-open');
        terminalEl.setAttribute('aria-hidden', 'true');
    }

    function createUI() {
        const host = document.getElementById('slop-terminal-host');
        inlineMode = !!host;

        if (!inlineMode) {
            launcherEl = document.createElement('button');
            launcherEl.className = 'sg-term-launcher';
            launcherEl.type = 'button';
            launcherEl.textContent = 'OPEN /GROK TERMINAL';
            launcherEl.setAttribute('aria-label', 'Open Slop Terminal');
        }

        terminalEl = document.createElement('section');
        terminalEl.className = 'sg-terminal';
        terminalEl.setAttribute('aria-hidden', 'true');
        terminalEl.innerHTML = `
            <div class="sg-term-head">
                <div class="sg-term-title-wrap">
                    <span class="sg-term-title-icon" aria-hidden="true"></span>
                    <div class="sg-term-title">C:\\GrokSystem</div>
                </div>
                <div class="sg-term-controls">
                    <button type="button" class="sg-term-btn" data-action="min" aria-label="Minimize">_</button>
                    <button type="button" class="sg-term-btn" data-action="max" aria-label="Maximize">□</button>
                    <button type="button" class="sg-term-btn" data-action="close" aria-label="Close">X</button>
                </div>
            </div>
            <div class="sg-term-body">
                <div class="sg-term-output" aria-live="polite"></div>
                <form class="sg-term-form" autocomplete="off">
                    <label class="sg-term-label" for="sg-term-input">C:\\GrokSystem&gt;</label>
                    <input id="sg-term-input" class="sg-term-input" type="text" maxlength="240" placeholder="speak into the machine...">
                </form>
            </div>
        `;

        if (inlineMode) {
            terminalEl.classList.add('sg-terminal-inline', 'sg-term-open');
            terminalEl.setAttribute('aria-hidden', 'false');
            panelVisible = true;
            host.appendChild(terminalEl);
        } else {
            document.body.appendChild(launcherEl);
            document.body.appendChild(terminalEl);
        }

        outputEl = terminalEl.querySelector('.sg-term-output');
        inputEl = terminalEl.querySelector('.sg-term-input');

        if (!inlineMode && launcherEl) {
            launcherEl.addEventListener('click', () => {
                if (panelVisible) {
                    closePanel();
                } else {
                    openPanel();
                }
            });

            terminalEl.querySelector('[data-action="close"]').addEventListener('click', closePanel);
            terminalEl.querySelector('[data-action="min"]').addEventListener('click', closePanel);
            terminalEl.querySelector('[data-action="max"]').addEventListener('click', openPanel);
        }

        if (inlineMode) {
            terminalEl.querySelector('[data-action="close"]').setAttribute('disabled', 'disabled');
            terminalEl.querySelector('[data-action="min"]').setAttribute('disabled', 'disabled');
            terminalEl.querySelector('[data-action="max"]').setAttribute('disabled', 'disabled');
        }

        const form = terminalEl.querySelector('.sg-term-form');
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            submitInput(inputEl.value);
            inputEl.value = '';
        });

        inputEl.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowUp') {
                event.preventDefault();
                if (historyIndex < commandHistory.length - 1) {
                    historyIndex += 1;
                    inputEl.value = commandHistory[historyIndex];
                }
            }

            if (event.key === 'ArrowDown') {
                event.preventDefault();
                if (historyIndex > 0) {
                    historyIndex -= 1;
                    inputEl.value = commandHistory[historyIndex];
                } else {
                    historyIndex = -1;
                    inputEl.value = '';
                }
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && panelVisible && !inlineMode) {
                closePanel();
            }
        });

        startupLines.forEach((line) => writeLine(line, 'sys'));
        writeLine('------------------------------------------------------------', 'sys');
        writeLine(statusLine(), 'sys');

        const trayClock = document.querySelector('.sg-tray-clock');
        if (trayClock) {
            const updateClock = () => {
                trayClock.textContent = new Date().toLocaleTimeString([], {
                    hour: 'numeric',
                    minute: '2-digit'
                });
            };
            updateClock();
            window.setInterval(updateClock, 30000);
        }
    }

    return {
        init() {
            createUI();
        }
    };
})();

document.addEventListener('DOMContentLoaded', () => {
    if (typeof Animations !== 'undefined') {
        Animations.init();
    }

    SlopTerminal.init();
    
    // Counters initialized separately by counters.js where needed (metrics.html)
    // Games and interactions bound via inline-handlers.js
});
