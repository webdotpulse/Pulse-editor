/**
 * Pulse Editor - Lightweight, Dependency-Free AI-Powered Rich Text & Code Editor
 * https://github.com/webdotpulse/Pulse-editor
 *
 * @version 2.0.0
 * @license MIT
 */

(function (global, factory) {
    if (typeof exports === 'object' && typeof module !== 'undefined') {
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        define(factory);
    } else {
        const exports = factory();
        global.initializePulseEditor = exports.initializePulseEditor;
        global.PulseEditor = exports.PulseEditor;
    }
}(typeof globalThis !== 'undefined' ? globalThis : typeof self !== 'undefined' ? self : this, function () {
    'use strict';

    let instanceCounter = 0;

    // ---------------------------------------------------------
    // SVG ICONS (Lucide Style)
    // ---------------------------------------------------------
    const wrapSvg = (paths) => `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`;

    const ICONS = {
        magic: wrapSvg('<path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/>'),
        grammar: wrapSvg('<path d="m15 21 2-2 4 4"/><path d="M4.5 13h5"/><path d="M3 16l4.5-12 4.5 12"/>'),
        expand: wrapSvg('<polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" x2="14" y1="3" y2="10"/><line x1="3" x2="10" y1="21" y2="14"/>'),
        tone: wrapSvg('<circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" x2="9.01" y1="9" y2="9"/><line x1="15" x2="15.01" y1="9" y2="9"/>'),
        summarize: wrapSvg('<path d="M4 6h16"/><path d="M4 12h10"/><path d="M4 18h6"/>'),
        professional: wrapSvg('<rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>'),
        translate: wrapSvg('<path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m22 22-5-10-5 10"/><path d="m14 18h6"/>'),
        seo: wrapSvg('<circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/><path d="M11 8v6"/><path d="M8 11h6"/>'),
        tags: wrapSvg('<path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"/><path d="M7 7h.01"/>'),
        bold: wrapSvg('<path d="M14 12a4 4 0 0 0 0-8H6v8"/><path d="M15 20a4 4 0 0 0 0-8H6v8Z"/>'),
        italic: wrapSvg('<line x1="19" x2="10" y1="4" y2="4"/><line x1="14" x2="5" y1="20" y2="20"/><line x1="15" x2="9" y1="4" y2="20"/>'),
        underline: wrapSvg('<path d="M6 4v6a6 6 0 0 0 12 0V4"/><line x1="4" x2="20" y1="20" y2="20"/>'),
        strike: wrapSvg('<path d="M16 4H9a3 3 0 0 0-2.83 4"/><path d="M14 12a4 4 0 0 1 0 8H6"/><line x1="4" x2="20" y1="12" y2="12"/>'),
        h1: wrapSvg('<path d="M4 12h8"/><path d="M4 18V6"/><path d="M12 18V6"/><path d="m17 12 3-2v8"/>'),
        h2: wrapSvg('<path d="M4 12h8"/><path d="M4 18V6"/><path d="M12 18V6"/><path d="M21 18h-4c0-4 4-3 4-6 0-1.5-2-2.5-4-1"/>'),
        h3: wrapSvg('<path d="M4 12h8"/><path d="M4 18V6"/><path d="M12 18V6"/><path d="M17.5 10.5c1.7-1 3.5 0 3.5 1.5a2 2 0 0 1-2 2"/><path d="M17 18a4 4 0 0 0 4-4"/>'),
        p: wrapSvg('<path d="M13 4v16"/><path d="M17 4v16"/><path d="M19 4H9.5a4.5 4.5 0 0 0 0 9H13"/>'),
        quote: wrapSvg('<path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/>'),
        ul: wrapSvg('<line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/>'),
        ol: wrapSvg('<line x1="10" x2="21" y1="6" y2="6"/><line x1="10" x2="21" y1="12" y2="12"/><line x1="10" x2="21" y1="18" y2="18"/><path d="M4 6h1v4"/><path d="M4 10h2"/><path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"/>'),
        left: wrapSvg('<line x1="21" x2="3" y1="6" y2="6"/><line x1="15" x2="3" y1="12" y2="12"/><line x1="17" x2="3" y1="18" y2="18"/>'),
        center: wrapSvg('<line x1="21" x2="3" y1="6" y2="6"/><line x1="17" x2="7" y1="12" y2="12"/><line x1="19" x2="5" y1="18" y2="18"/>'),
        right: wrapSvg('<line x1="21" x2="3" y1="6" y2="6"/><line x1="21" x2="9" y1="12" y2="12"/><line x1="21" x2="7" y1="18" y2="18"/>'),
        justify: wrapSvg('<line x1="3" x2="21" y1="6" y2="6"/><line x1="3" x2="21" y1="12" y2="12"/><line x1="3" x2="21" y1="18" y2="18"/>'),
        link: wrapSvg('<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>'),
        unlink: wrapSvg('<path d="m18.84 12.25 1.72-1.71h-.01a5.001 5.001 0 0 0-7.07-7.07l-1.72 1.71"/><path d="m5.17 11.75-1.71 1.71a5.001 5.001 0 0 0 7.07 7.07l1.71-1.71"/><line x1="8" x2="8" y1="2" y2="5"/><line x1="2" x2="5" y1="8" y2="8"/><line x1="16" x2="16" y1="19" y2="22"/><line x1="19" x2="22" y1="16" y2="16"/>'),
        image: wrapSvg('<rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>'),
        color: wrapSvg('<circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>'),
        undo: wrapSvg('<path d="M3 7v6h6"/><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"/>'),
        redo: wrapSvg('<path d="M21 7v6h-6"/><path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3L21 13"/>'),
        code: wrapSvg('<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>'),
        table: wrapSvg('<rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><line x1="3" x2="21" y1="9" y2="9"/><line x1="9" x2="9" y1="9" y2="21"/>'),
        hr: wrapSvg('<line x1="3" x2="21" y1="12" y2="12"/>'),
        clear: wrapSvg('<path d="M12 2v4"/><path d="m4.93 4.93 2.83 2.83"/><path d="M2 12h4"/><path d="m4.93 19.07 2.83-2.83"/><path d="M12 22v-4"/><path d="m19.07 19.07-2.83-2.83"/><path d="M22 12h-4"/><path d="m19.07 4.93-2.83 2.83"/>'),
        markdown: wrapSvg('<path d="M20.5 5h-17C2.12 5 1 6.12 1 7.5v9C1 17.88 2.12 19 3.5 19h17c1.38 0 2.5-1.12 2.5-2.5v-9C23 6.12 21.88 5 20.5 5zm-14.7 10h-2V9.87l-1.3 1.3-1.4-1.4 3.7-3.7 3.7 3.7-1.4 1.4-1.3-1.3V15zm8.4-1.3H16v-2h-2V9.5h-1.8v2.2h-2v2h2v1.3H12l3.1 3.1 3.1-3.1h-4z"/>'),
        search: wrapSvg('<circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/>'),
        maximize: wrapSvg('<path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>'),
        minimize: wrapSvg('<path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/>'),
        theme: wrapSvg('<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>'),
        help: wrapSvg('<circle cx="12" cy="12" r="10"/><path d="9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" x2="12.01" y1="17" y2="17"/>'),
        settings: wrapSvg('<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>')
    };

    // ---------------------------------------------------------
    // DIALOG SYSTEM (Leak-Free & Escape-Safe)
    // ---------------------------------------------------------
    const Dialogs = {
        showMessage(title, message) {
            return new Promise((resolve) => {
                const dialog = document.createElement('dialog');
                dialog.className = 'pulse-dialog';
                dialog.innerHTML = `
                    <form method="dialog">
                        <div class="dialog-header">${title}</div>
                        <div class="dialog-body">${message}</div>
                        <div class="dialog-actions">
                            <button type="submit" class="dialog-btn dialog-btn-primary">OK</button>
                        </div>
                    </form>
                `;
                document.body.appendChild(dialog);
                const cleanup = () => {
                    dialog.remove();
                    resolve(true);
                };
                dialog.addEventListener('close', cleanup, { once: true });
                dialog.showModal();
            });
        },

        askInput(title, placeholder = '', defaultValue = '', hint = '') {
            return new Promise((resolve) => {
                const dialog = document.createElement('dialog');
                dialog.className = 'pulse-dialog';
                dialog.innerHTML = `
                    <form method="dialog">
                        <div class="dialog-header">${title}</div>
                        ${hint ? `<div class="dialog-body" style="margin-bottom: 0.5rem; font-size: 0.85em;">${hint}</div>` : ''}
                        <input type="text" class="dialog-input" placeholder="${placeholder}" value="${defaultValue}" required autofocus>
                        <div class="dialog-actions">
                            <button type="button" class="dialog-btn dialog-btn-cancel" data-action="cancel">Annuleren</button>
                            <button type="submit" class="dialog-btn dialog-btn-primary">Verzenden</button>
                        </div>
                    </form>
                `;
                document.body.appendChild(dialog);
                const input = dialog.querySelector('input');
                const form = dialog.querySelector('form');
                const cancelBtn = dialog.querySelector('[data-action="cancel"]');
                let resolvedValue = null;

                cancelBtn.addEventListener('click', () => {
                    resolvedValue = null;
                    dialog.close();
                });

                form.addEventListener('submit', (e) => {
                    e.preventDefault();
                    resolvedValue = input.value;
                    dialog.close();
                });

                dialog.addEventListener('close', () => {
                    dialog.remove();
                    resolve(resolvedValue);
                }, { once: true });

                dialog.showModal();
                input.select();
            });
        },

        askTextarea(title, placeholder = '', defaultValue = '', hint = '') {
            return new Promise((resolve) => {
                const dialog = document.createElement('dialog');
                dialog.className = 'pulse-dialog';
                dialog.style.maxWidth = '600px';
                dialog.innerHTML = `
                    <form method="dialog">
                        <div class="dialog-header">${title}</div>
                        ${hint ? `<div class="dialog-body" style="margin-bottom: 0.5rem; font-size: 0.85em;">${hint}</div>` : ''}
                        <textarea class="dialog-textarea" style="min-height: 180px;" placeholder="${placeholder}">${defaultValue}</textarea>
                        <div class="dialog-actions">
                            <button type="button" class="dialog-btn dialog-btn-cancel" data-action="cancel">Annuleren</button>
                            <button type="submit" class="dialog-btn dialog-btn-primary">OK</button>
                        </div>
                    </form>
                `;
                document.body.appendChild(dialog);
                const textarea = dialog.querySelector('textarea');
                const form = dialog.querySelector('form');
                const cancelBtn = dialog.querySelector('[data-action="cancel"]');
                let resolvedValue = null;

                cancelBtn.addEventListener('click', () => {
                    resolvedValue = null;
                    dialog.close();
                });

                form.addEventListener('submit', (e) => {
                    e.preventDefault();
                    resolvedValue = textarea.value;
                    dialog.close();
                });

                dialog.addEventListener('close', () => {
                    dialog.remove();
                    resolve(resolvedValue);
                }, { once: true });

                dialog.showModal();
                textarea.focus();
            });
        },

        askSelect(title, options = [], defaultVal = '', hint = '') {
            return new Promise((resolve) => {
                const dialog = document.createElement('dialog');
                dialog.className = 'pulse-dialog';
                const optsHtml = options.map(opt => {
                    const val = typeof opt === 'string' ? opt : opt.value;
                    const label = typeof opt === 'string' ? opt : opt.label;
                    return `<option value="${val}" ${val === defaultVal ? 'selected' : ''}>${label}</option>`;
                }).join('');

                dialog.innerHTML = `
                    <form method="dialog">
                        <div class="dialog-header">${title}</div>
                        ${hint ? `<div class="dialog-body" style="margin-bottom: 0.5rem; font-size: 0.85em;">${hint}</div>` : ''}
                        <select class="dialog-select" required autofocus>
                            ${optsHtml}
                        </select>
                        <div class="dialog-actions">
                            <button type="button" class="dialog-btn dialog-btn-cancel" data-action="cancel">Annuleren</button>
                            <button type="submit" class="dialog-btn dialog-btn-primary">Selecteren</button>
                        </div>
                    </form>
                `;
                document.body.appendChild(dialog);
                const select = dialog.querySelector('select');
                const form = dialog.querySelector('form');
                const cancelBtn = dialog.querySelector('[data-action="cancel"]');
                let resolvedValue = null;

                cancelBtn.addEventListener('click', () => {
                    resolvedValue = null;
                    dialog.close();
                });

                form.addEventListener('submit', (e) => {
                    e.preventDefault();
                    resolvedValue = select.value;
                    dialog.close();
                });

                dialog.addEventListener('close', () => {
                    dialog.remove();
                    resolve(resolvedValue);
                }, { once: true });

                dialog.showModal();
            });
        },

        showShortcuts() {
            const shortcuts = [
                { key: 'Ctrl + B', desc: 'Vetgedrukt (Bold)' },
                { key: 'Ctrl + I', desc: 'Cursief (Italic)' },
                { key: 'Ctrl + U', desc: 'Onderstreept (Underline)' },
                { key: 'Ctrl + K', desc: 'Link invoegen' },
                { key: 'Ctrl + F', desc: 'Zoeken & Vervangen' },
                { key: 'Ctrl + H', desc: 'Vervangen' },
                { key: 'Ctrl + Z', desc: 'Ongedaan maken (Undo)' },
                { key: 'Ctrl + Y', desc: 'Opnieuw uitvoeren (Redo)' },
                { key: 'Ctrl + Alt + 1', desc: 'Koptekst 1 (H1)' },
                { key: 'Ctrl + Alt + 2', desc: 'Koptekst 2 (H2)' },
                { key: 'Ctrl + Alt + 0', desc: 'Paragraaf (Normal)' },
                { key: 'Ctrl + Shift + 8', desc: 'Opsommingslijst' },
                { key: 'Ctrl + Shift + 7', desc: 'Genummerde lijst' },
                { key: 'Ctrl + /', desc: 'Sneltoetsen overzicht' }
            ];

            const gridHtml = shortcuts.map(s => `
                <div class="shortcut-item">
                    <span>${s.desc}</span>
                    <kbd>${s.key}</kbd>
                </div>
            `).join('');

            return this.showMessage(
                'Pulse Editor - Sneltoetsen',
                `<div class="shortcuts-grid">${gridHtml}</div>`
            );
        }
    };

    // ---------------------------------------------------------
    // GEMINI GENERATIVE AI CLIENT
    // ---------------------------------------------------------
    async function callGeminiAPI(promptText, configuredKey) {
        let keyToUse = configuredKey || (typeof window !== 'undefined' ? window.geminiApiKey : "") || "";
        if (!keyToUse && typeof localStorage !== 'undefined') {
            keyToUse = localStorage.getItem('pulse_gemini_api_key') || "";
        }

        if (!keyToUse) {
            keyToUse = await Dialogs.askInput(
                'Gemini API Key Vereist',
                'Plak hier uw Google Gemini API key...',
                '',
                'Geen API-sleutel gevonden. Voer een geldige Google Gemini API-sleutel in om AI-functies te gebruiken.'
            );
            if (!keyToUse) throw new Error('Geen Gemini API Key geconfigureerd.');
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem('pulse_gemini_api_key', keyToUse);
            }
            if (typeof window !== 'undefined') {
                window.geminiApiKey = keyToUse;
            }
        }

        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${keyToUse}`;

        const payload = {
            contents: [{ parts: [{ text: promptText }] }],
            systemInstruction: {
                parts: [{
                    text: "You are a strict, world-class HTML text-processing AI assistant for rich text editors.\n\nCRITICAL RULES:\n1. Maintain all existing HTML tags, attributes, links, and structure unless explicitly instructed otherwise.\n2. DO NOT add top-level wrapper tags if they were not in the input.\n3. DO NOT output markdown code blocks (such as ```html ... ```).\n4. Return ONLY valid, clean HTML ready for direct DOM insertion."
                }]
            }
        };

        const delays = [1000, 2000, 4000];
        let lastError;

        for (let i = 0; i <= delays.length; i++) {
            try {
                const response = await fetch(endpoint, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (!response.ok) {
                    const errData = await response.json().catch(() => ({}));
                    const msg = errData.error?.message || `HTTP ${response.status}`;
                    throw new Error(`Gemini API fout: ${msg}`);
                }

                const result = await response.json();
                let output = result.candidates?.[0]?.content?.parts?.[0]?.text || "";
                output = output.replace(/^```[a-z]*\n?/im, '').replace(/```\n?$/im, '').trim();
                return output;
            } catch (err) {
                lastError = err;
                if (i < delays.length) {
                    await new Promise(res => setTimeout(res, delays[i]));
                }
            }
        }
        throw new Error(`AI genereren mislukt: ${lastError.message}`);
    }

    // ---------------------------------------------------------
    // SYNTAX LEXER CONFIGURATION
    // ---------------------------------------------------------
    const syntaxRules = {
        javascript: [
            { regex: /("(?:\\"|[^"])*"|'(?:\\'|[^'])*'|`(?:\\`|[^`])*`)/g, class: 'string' },
            { regex: /(\/\/.*|\/\*[\s\S]*?\*\/)/g, class: 'comment' },
            { regex: /\b(function|const|let|var|if|else|for|while|return|new|this|class|extends|import|export|from|await|async|try|catch|switch|case|default|break|continue|typeof|instanceof)\b/g, class: 'keyword' },
            { regex: /\b(\d+(?:\.\d+)?)\b/g, class: 'number' },
            { regex: /([=+*\/%<>&|!?-]+)/g, class: 'operator' }
        ],
        css: [
            { regex: /(\/\*[\s\S]*?\*\/)/g, class: 'comment' },
            { regex: /("(?:\\"|[^"])*"|'(?:\\'|[^'])*')/g, class: 'string' },
            { regex: /(@(?:media|import|keyframes|font-face|supports|container)\b)/g, class: 'keyword' },
            { regex: /([a-zA-Z-]+)(?=\s*:)/g, class: 'attr' },
            { regex: /\b(\d+(?:px|em|rem|%|vh|vw|s|ms|deg|fr)?)\b/g, class: 'number' },
            { regex: /(#[0-9a-fA-F]{3,8}\b)/g, class: 'number' },
            { regex: /([{}()])/g, class: 'operator' }
        ],
        html: [
            { regex: /(&lt;!--[\s\S]*?--&gt;)/g, class: 'comment' },
            { regex: /(&lt;\/?[a-zA-Z0-9-]+)/g, class: 'tag' },
            { regex: /(&gt;)/g, class: 'tag' },
            { regex: /([a-zA-Z0-9-]+)=/g, class: 'attr' },
            { regex: /("(?:\\"|[^"])*"|'(?:\\'|[^'])*')/g, class: 'string' }
        ],
        php: [
            { regex: /("(?:\\"|[^"])*"|'(?:\\'|[^'])*')/g, class: 'string' },
            { regex: /(\/\/.*|\/\*[\s\S]*?\*\/|#.*)/g, class: 'comment' },
            { regex: /\b(echo|if|else|elseif|for|foreach|while|do|switch|case|default|break|continue|function|return|class|extends|implements|public|private|protected|static|new|require|include|require_once|include_once|namespace|use|trait)\b/g, class: 'keyword' },
            { regex: /(\$[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*)/g, class: 'variable' },
            { regex: /\b(\d+(?:\.\d+)?)\b/g, class: 'number' },
            { regex: /(&lt;\?php|\?&gt;)/gi, class: 'keyword' }
        ],
        json: [
            { regex: /("(?:\\"|[^"])*")(?=\s*:)/g, class: 'attr' },
            { regex: /(?<=:\s*)("(?:\\"|[^"])*")/g, class: 'string' },
            { regex: /\b(true|false|null)\b/g, class: 'keyword' },
            { regex: /\b(-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)\b/g, class: 'number' },
            { regex: /([{}\[\],])/g, class: 'operator' }
        ],
        python: [
            { regex: /("(?:\\"|[^"])*"|'(?:\\'|[^'])*'|"""[\s\S]*?"""|'''[\s\S]*?''')/g, class: 'string' },
            { regex: /(#.*)/g, class: 'comment' },
            { regex: /\b(def|class|if|elif|else|for|while|return|import|from|as|try|except|finally|with|pass|break|continue|yield|lambda|None|True|False|is|not|and|or|in)\b/g, class: 'keyword' },
            { regex: /\b(\d+(?:\.\d+)?)\b/g, class: 'number' },
            { regex: /([=+*\/%<>&|!?-]+)/g, class: 'operator' }
        ]
    };

    function tokenizeText(text, lang, searchQuery = '', useRegex = false) {
        let escaped = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

        if (lang && syntaxRules[lang]) {
            const tokens = [];
            const rules = syntaxRules[lang];

            rules.forEach(rule => {
                escaped = escaped.replace(rule.regex, (match, p1) => {
                    const id = `__PULSE_TOKEN_${tokens.length}__`;
                    tokens.push(`<span class="token ${rule.class}">${p1 || match}</span>`);
                    return id;
                });
            });

            for (let i = tokens.length - 1; i >= 0; i--) {
                escaped = escaped.replace(`__PULSE_TOKEN_${i}__`, tokens[i]);
            }
        }

        if (searchQuery) {
            try {
                const flags = 'gi';
                let regex = useRegex ? new RegExp(`(${searchQuery})`, flags) : new RegExp(`(${searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, flags);
                const parts = escaped.split(/(<[^>]*>)/g);
                for (let i = 0; i < parts.length; i++) {
                    if (!parts[i].startsWith('<')) {
                        parts[i] = parts[i].replace(regex, '<mark class="search-match">$1</mark>');
                    }
                }
                escaped = parts.join('');
            } catch (e) {}
        }

        const lines = escaped.split('\n');
        return lines.map(line => `<div class="code-line">${line || '<br>'}</div>`).join('');
    }

    // ---------------------------------------------------------
    // PULSE EDITOR INSTANCE
    // ---------------------------------------------------------
    function initializePulseEditor(toolbarTarget, editorTarget, sourceTarget, optionsOrApiKey = {}) {
        const instanceId = ++instanceCounter;

        // Parse options
        let options = {};
        if (typeof optionsOrApiKey === 'string') {
            options = { apiKey: optionsOrApiKey };
        } else if (typeof optionsOrApiKey === 'object' && optionsOrApiKey !== null) {
            options = { ...optionsOrApiKey };
        }

        const apiKey = options.apiKey || (typeof window !== 'undefined' ? window.geminiApiKey : "") || "";
        const theme = options.theme || 'auto';
        const placeholder = options.placeholder || '';
        const floatingMenuEnabled = options.floatingMenu !== false;
        const statsEnabled = options.stats !== false;

        // Resolve Elements
        const toolbar = typeof toolbarTarget === 'string' ? document.getElementById(toolbarTarget) : toolbarTarget;
        const editor = typeof editorTarget === 'string' ? document.getElementById(editorTarget) : editorTarget;
        const sourceView = sourceTarget ? (typeof sourceTarget === 'string' ? document.getElementById(sourceTarget) : sourceTarget) : null;

        if (!editor) {
            console.error('PulseEditor: Editor container element niet gevonden.');
            return null;
        }

        if (toolbar) toolbar.classList.add('pulse-editor-toolbar');
        editor.classList.add('editor-content-area');
        if (placeholder) editor.setAttribute('placeholder', placeholder);

        const container = editor.closest('.editor-container') || editor.parentElement;
        if (container && !container.classList.contains('editor-container')) {
            container.classList.add('editor-container');
        }

        if (sourceView) {
            sourceView.classList.add('source-view');
        }

        // Apply theme
        if (theme === 'dark') {
            container.classList.add('pulse-theme-dark');
        } else if (theme === 'light') {
            container.classList.remove('pulse-theme-dark');
        }

        // Internal State
        let sourceMode = false;
        let currentLang = options.language || '';
        let searchQuery = '';
        let replaceQuery = '';
        let useRegex = false;
        let currentMatchIndex = 0;
        let isDestroyed = false;
        const eventListeners = new Map();

        // ---------------------------------------------------------
        // DOM Structure & Subcomponents Setup
        // ---------------------------------------------------------
        let wrapper = editor.parentElement.querySelector('.editor-main-wrap');
        if (!wrapper) {
            wrapper = document.createElement('div');
            wrapper.className = 'editor-main-wrap';
            editor.parentNode.insertBefore(wrapper, editor);
            wrapper.appendChild(editor);
        }

        const gutter = document.createElement('div');
        gutter.className = 'pulse-gutter';
        gutter.id = `pulse-gutter-${instanceId}`;
        gutter.style.display = 'none';
        wrapper.insertBefore(gutter, editor);

        // Search Panel
        const searchPanel = document.createElement('div');
        searchPanel.id = `pulse-search-${instanceId}`;
        searchPanel.className = 'pulse-search-panel';
        searchPanel.style.display = 'none';
        searchPanel.innerHTML = `
            <div class="search-panel-row">
                <input type="text" class="search-panel-input pulse-search-input" placeholder="Zoeken...">
                <button type="button" class="search-panel-btn pulse-search-prev" title="Vorige match">▲</button>
                <button type="button" class="search-panel-btn pulse-search-next" title="Volgende match">▼</button>
                <button type="button" class="search-panel-close pulse-search-close" title="Sluiten">×</button>
            </div>
            <div class="search-panel-row">
                <input type="text" class="search-panel-input pulse-replace-input" placeholder="Vervangen door...">
                <button type="button" class="search-panel-btn pulse-replace-btn">Vervang</button>
                <button type="button" class="search-panel-btn pulse-replace-all-btn">Alles</button>
            </div>
            <div class="search-panel-row" style="font-size: 0.85em;">
                <label style="display: inline-flex; align-items: center; gap: 4px; cursor: pointer;">
                    <input type="checkbox" class="pulse-search-regex"> RegExp
                </label>
                <span class="pulse-search-count" style="margin-left: auto; color: var(--pulse-text-muted);">0/0</span>
            </div>
        `;
        container.appendChild(searchPanel);

        // Floating Bubble Selection Toolbar
        let floatingToolbar = null;
        if (floatingMenuEnabled) {
            floatingToolbar = document.createElement('div');
            floatingToolbar.className = 'pulse-floating-toolbar';
            floatingToolbar.innerHTML = `
                <button type="button" class="btn" data-command="bold" title="Vet">${ICONS.bold}</button>
                <button type="button" class="btn" data-command="italic" title="Cursief">${ICONS.italic}</button>
                <button type="button" class="btn" data-command="underline" title="Onderstreept">${ICONS.underline}</button>
                <button type="button" class="btn" data-command="createLink" title="Link">${ICONS.link}</button>
                <span class="toolbar-divider"></span>
                <button type="button" class="btn btn-magic" data-command="ai-custom" title="Vraag AI">${ICONS.magic}<span>AI</span></button>
            `;
            container.appendChild(floatingToolbar);
        }

        // Status Bar
        let statusBar = null;
        if (statsEnabled) {
            statusBar = document.createElement('div');
            statusBar.className = 'pulse-status-bar';
            statusBar.innerHTML = `
                <div class="pulse-status-stats">
                    <span class="pulse-stat-words">0 woorden</span>
                    <span class="pulse-stat-chars">0 tekens</span>
                    <span class="pulse-stat-reading">0 min leestijd</span>
                </div>
                <div class="pulse-status-info">
                    <span class="pulse-status-badge pulse-mode-badge">${currentLang ? currentLang.toUpperCase() : 'Rich Text'}</span>
                </div>
            `;
            container.appendChild(statusBar);
        }

        if (editor.getAttribute('contenteditable') !== 'true') {
            editor.setAttribute('contenteditable', 'true');
        }
        document.execCommand('defaultParagraphSeparator', false, 'p');

        // ---------------------------------------------------------
        // TOOLBAR COMMANDS CONFIGURATION
        // ---------------------------------------------------------
        const defaultCommands = [
            // Group 1: Generative AI Assistant
            {
                type: 'dropdown',
                mainButton: { svg: ICONS.magic, command: 'ai-custom', title: 'Vraag AI Assistent', type: 'custom', class: 'btn-magic dropdown-main', text: 'AI' },
                items: [
                    { svg: ICONS.grammar, text: 'Grammatica & Spelling', command: 'ai-grammar', title: 'Verbeter grammatica en spelling', type: 'custom', class: 'btn-ai-preset' },
                    { svg: ICONS.expand, text: 'Tekst Uitbreiden', command: 'ai-expand', title: 'Breid korte tekst uit naar een alinea', type: 'custom', class: 'btn-ai-preset' },
                    { svg: ICONS.tone, text: 'Toon Wijzigen...', command: 'ai-tone', title: 'Pas schrijfstijl of toon aan', type: 'custom', class: 'btn-ai-preset' },
                    { svg: ICONS.summarize, text: 'Samenvatten', command: 'ai-summarize', title: 'Vat geselecteerde tekst samen', type: 'custom', class: 'btn-ai-preset' },
                    { svg: ICONS.translate, text: 'Vertalen...', command: 'ai-translate', title: 'Vertaal naar een andere taal', type: 'custom', class: 'btn-ai-preset' },
                    { svg: ICONS.seo, text: 'SEO Suggesties', command: 'ai-seo', title: 'Optimaliseer voor zoekmachines', type: 'custom', class: 'btn-ai-preset' },
                    { svg: ICONS.tags, text: 'Tags & Categorieën', command: 'ai-tags', title: 'Genereer tags en categorieën', type: 'custom', class: 'btn-ai-preset' }
                ]
            },
            { divider: true },

            // Group 2: Basic Formatting
            { svg: ICONS.bold, command: 'bold', title: 'Vet (Ctrl+B)', type: 'state' },
            { svg: ICONS.italic, command: 'italic', title: 'Cursief (Ctrl+I)', type: 'state' },
            { svg: ICONS.underline, command: 'underline', title: 'Onderstreept (Ctrl+U)', type: 'state' },
            { svg: ICONS.strike, command: 'strikeThrough', title: 'Doorhalen', type: 'state' },
            { divider: true },

            // Group 3: Headings & Paragraphs
            { svg: ICONS.h1, command: 'formatBlock', value: 'H1', title: 'Kop 1 (H1)', type: 'value' },
            { svg: ICONS.h2, command: 'formatBlock', value: 'H2', title: 'Kop 2 (H2)', type: 'value' },
            { svg: ICONS.h3, command: 'formatBlock', value: 'H3', title: 'Kop 3 (H3)', type: 'value' },
            { svg: ICONS.p, command: 'formatBlock', value: 'P', title: 'Paragraaf', type: 'value' },
            { svg: ICONS.quote, command: 'formatBlock', value: 'BLOCKQUOTE', title: 'Citaat (Blockquote)', type: 'value' },
            { divider: true },

            // Group 4: Lists & Alignment
            { svg: ICONS.ul, command: 'insertUnorderedList', title: 'Opsommingslijst', type: 'state' },
            { svg: ICONS.ol, command: 'insertOrderedList', title: 'Genummerde lijst', type: 'state' },
            { svg: ICONS.left, command: 'justifyLeft', title: 'Links uitlijnen', type: 'state' },
            { svg: ICONS.center, command: 'justifyCenter', title: 'Centreren', type: 'state' },
            { svg: ICONS.right, command: 'justifyRight', title: 'Rechts uitlijnen', type: 'state' },
            { divider: true },

            // Group 5: Insertions (Link, Image, Table, Code Block)
            { svg: ICONS.link, command: 'createLink', title: 'Link invoegen (Ctrl+K)', type: 'action' },
            { svg: ICONS.unlink, command: 'unlink', title: 'Link verwijderen', type: 'action' },
            { svg: ICONS.image, command: 'insertImage', title: 'Afbeelding invoegen', type: 'action' },
            {
                type: 'dropdown',
                mainButton: { svg: ICONS.table, command: 'table-insert', title: 'Tabel Invoegen', type: 'custom' },
                items: [
                    { svg: ICONS.table, text: 'Tabel Invoegen (3x3)', command: 'table-insert', title: 'Tabel Invoegen', type: 'custom' },
                    { svg: ICONS.table, text: 'Rij Boven Invoegen', command: 'table-insert-row-above', title: 'Rij Boven Invoegen', type: 'custom' },
                    { svg: ICONS.table, text: 'Rij Onder Invoegen', command: 'table-insert-row-below', title: 'Rij Onder Invoegen', type: 'custom' },
                    { svg: ICONS.table, text: 'Kolom Links Invoegen', command: 'table-insert-col-left', title: 'Kolom Links Invoegen', type: 'custom' },
                    { svg: ICONS.table, text: 'Kolom Rechts Invoegen', command: 'table-insert-col-right', title: 'Kolom Rechts Invoegen', type: 'custom' },
                    { svg: ICONS.table, text: 'Rij Verwijderen', command: 'table-delete-row', title: 'Rij Verwijderen', type: 'custom' },
                    { svg: ICONS.table, text: 'Kolom Verwijderen', command: 'table-delete-col', title: 'Kolom Verwijderen', type: 'custom' },
                    { svg: ICONS.table, text: 'Tabel Verwijderen', command: 'table-delete-table', title: 'Tabel Verwijderen', type: 'custom' }
                ]
            },
            { svg: ICONS.code, command: 'insertCodeBlock', title: 'Codeblok Invoegen', type: 'custom' },
            { svg: ICONS.color, command: 'foreColor', title: 'Tekstkleur', type: 'custom' },
            { svg: ICONS.hr, command: 'insertHorizontalRule', title: 'Horizontale lijn', type: 'action' },
            { svg: ICONS.clear, command: 'removeFormat', title: 'Opmaak wissen', type: 'action' },
            { divider: true },

            // Group 6: History & Utilities
            { svg: ICONS.undo, command: 'undo', title: 'Ongedaan maken (Ctrl+Z)', type: 'action' },
            { svg: ICONS.redo, command: 'redo', title: 'Opnieuw uitvoeren (Ctrl+Y)', type: 'action' },
            { divider: true },

            // Group 7: Markdown & Search & Theme
            {
                type: 'dropdown',
                mainButton: { svg: ICONS.markdown, command: 'markdown-import', title: 'Markdown Import / Export', type: 'custom' },
                items: [
                    { svg: ICONS.markdown, text: 'Importeer Markdown', command: 'markdown-import', title: 'Markdown importeren', type: 'custom' },
                    { svg: ICONS.markdown, text: 'Exporteer Markdown', command: 'markdown-export', title: 'Als Markdown kopiëren/exporteren', type: 'custom' }
                ]
            },
            { svg: ICONS.search, command: 'toggleSearch', title: 'Zoeken & Vervangen (Ctrl+F)', type: 'action' },
            { svg: ICONS.theme, command: 'toggleTheme', title: 'Thema Wisselen (Licht/Donker)', type: 'action' },
            { svg: ICONS.help, command: 'showShortcuts', title: 'Sneltoetsen (Ctrl+/)', type: 'action' },
            { svg: ICONS.maximize, command: 'toggleFullscreen', title: 'Volledig Scherm', type: 'action' },
            ...(sourceView ? [{ svg: ICONS.code, command: 'toggleSource', title: 'HTML Broncode bekijken', type: 'action' }] : [])
        ];

        const commands = options.buttons ? options.buttons : defaultCommands;

        // ---------------------------------------------------------
        // TOOLBAR BUTTON CREATOR
        // ---------------------------------------------------------
        const createButton = (config) => {
            if (config.divider) {
                const divider = document.createElement('span');
                divider.className = 'toolbar-divider';
                return divider;
            }

            if (config.type === 'dropdown') {
                const dropdownContainer = document.createElement('div');
                dropdownContainer.className = 'pulse-editor-dropdown';

                const buttonGroup = document.createElement('div');
                buttonGroup.className = 'pulse-editor-dropdown-group';

                const mainBtnConfig = config.mainButton;
                const mainButton = document.createElement('button');
                mainButton.type = 'button';
                mainButton.className = mainBtnConfig.class ? `btn ${mainBtnConfig.class}` : 'btn';
                mainButton.title = mainBtnConfig.title;
                mainButton.dataset.command = mainBtnConfig.command;

                let mainContent = mainBtnConfig.svg;
                if (mainBtnConfig.text) mainContent += `<span>${mainBtnConfig.text}</span>`;
                mainButton.innerHTML = mainContent;

                mainButton.addEventListener('mousedown', (e) => {
                    e.preventDefault();
                    handleCommand(mainBtnConfig.command, mainBtnConfig);
                });

                const toggleButton = document.createElement('button');
                toggleButton.type = 'button';
                toggleButton.className = 'btn btn-dropdown-toggle';
                toggleButton.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>';

                const dropdownContent = document.createElement('div');
                dropdownContent.className = 'pulse-editor-dropdown-content';

                config.items.forEach(itemConfig => {
                    const itemBtn = document.createElement('button');
                    itemBtn.type = 'button';
                    itemBtn.className = itemConfig.class ? `btn ${itemConfig.class}` : 'btn';
                    itemBtn.title = itemConfig.title;
                    itemBtn.dataset.command = itemConfig.command;

                    let itemContent = itemConfig.svg;
                    if (itemConfig.text) itemContent += `<span>${itemConfig.text}</span>`;
                    itemBtn.innerHTML = itemContent;

                    itemBtn.addEventListener('mousedown', (e) => {
                        e.preventDefault();
                        dropdownContent.classList.remove('show');
                        handleCommand(itemConfig.command, itemConfig);
                    });
                    dropdownContent.appendChild(itemBtn);
                });

                toggleButton.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const isShown = dropdownContent.classList.contains('show');
                    document.querySelectorAll('.pulse-editor-dropdown-content.show').forEach(d => d.classList.remove('show'));
                    if (!isShown) dropdownContent.classList.add('show');
                });

                document.addEventListener('click', () => {
                    dropdownContent.classList.remove('show');
                });

                buttonGroup.appendChild(mainButton);
                buttonGroup.appendChild(toggleButton);
                dropdownContainer.appendChild(buttonGroup);
                dropdownContainer.appendChild(dropdownContent);
                return dropdownContainer;
            }

            const button = document.createElement('button');
            button.type = 'button';
            button.className = config.class ? `btn ${config.class}` : 'btn';
            button.title = config.title;
            button.dataset.command = config.command;
            if (config.value) button.dataset.value = config.value;

            let content = config.svg;
            if (config.text) content += `<span>${config.text}</span>`;
            button.innerHTML = content;

            if (config.command === 'foreColor') {
                const colorInput = document.createElement('input');
                colorInput.type = 'color';
                colorInput.style.position = 'absolute';
                colorInput.style.opacity = '0';
                colorInput.style.width = '1px';
                colorInput.style.height = '1px';
                colorInput.style.pointerEvents = 'none';

                button.style.position = 'relative';
                button.appendChild(colorInput);

                colorInput.addEventListener('input', (e) => {
                    editor.focus();
                    document.execCommand('foreColor', false, e.target.value);
                    syncContent();
                });

                button.addEventListener('mousedown', (e) => {
                    e.preventDefault();
                    if (!sourceMode) colorInput.click();
                });
            } else {
                button.addEventListener('mousedown', (e) => {
                    e.preventDefault();
                    handleCommand(config.command, config);
                });
            }

            return button;
        };

        if (toolbar) {
            toolbar.innerHTML = '';
            commands.forEach(cmd => toolbar.appendChild(createButton(cmd)));
        }

        // Setup Floating Toolbar Events
        if (floatingToolbar) {
            floatingToolbar.querySelectorAll('.btn').forEach(btn => {
                btn.addEventListener('mousedown', (e) => {
                    e.preventDefault();
                    const cmd = btn.dataset.command;
                    handleCommand(cmd, { command: cmd });
                });
            });
        }

        // ---------------------------------------------------------
        // COMMAND HANDLER
        // ---------------------------------------------------------
        const handleCommand = async (command, config = {}) => {
            if (command === 'toggleFullscreen') {
                container.classList.toggle('fullscreen-mode');
                const isFullscreen = container.classList.contains('fullscreen-mode');
                const btn = toolbar ? toolbar.querySelector('button[data-command="toggleFullscreen"]') : null;
                if (btn) {
                    btn.innerHTML = isFullscreen ? ICONS.minimize : ICONS.maximize;
                    btn.title = isFullscreen ? 'Sluiten Volledig Scherm' : 'Volledig Scherm';
                }
                return;
            }

            if (command === 'toggleTheme') {
                container.classList.toggle('pulse-theme-dark');
                triggerEvent('themeChange', { isDark: container.classList.contains('pulse-theme-dark') });
                return;
            }

            if (command === 'showShortcuts') {
                await Dialogs.showShortcuts();
                return;
            }

            if (command === 'toggleSearch') {
                const isHidden = searchPanel.style.display === 'none';
                searchPanel.style.display = isHidden ? 'flex' : 'none';
                if (isHidden) {
                    const searchInp = searchPanel.querySelector('.pulse-search-input');
                    searchInp.focus();
                    const sel = window.getSelection().toString();
                    if (sel) {
                        searchInp.value = sel;
                        searchQuery = sel;
                        updateSearch();
                    }
                }
                return;
            }

            if (command === 'toggleSource') {
                toggleSourceView();
                return;
            }

            if (sourceMode) return;

            // Capture current selection before modal dialogs
            const selection = window.getSelection();
            let savedRange = null;
            let selectedHtml = "";
            let selectedText = "";

            if (selection.rangeCount > 0 && editor.contains(selection.getRangeAt(0).commonAncestorContainer)) {
                savedRange = selection.getRangeAt(0);
                selectedText = selection.toString();
                if (selectedText) {
                    const tempDiv = document.createElement('div');
                    tempDiv.appendChild(savedRange.cloneContents());
                    selectedHtml = tempDiv.innerHTML;
                }
            }

            // Restore selection helper
            const restoreSelection = () => {
                editor.focus();
                if (savedRange) {
                    selection.removeAllRanges();
                    selection.addRange(savedRange);
                }
            };

            // AI COMMANDS
            if (command.startsWith('ai-')) {
                let prompt = "";
                let loadingBtn = toolbar ? toolbar.querySelector(`button[data-command="${command}"]`) : null;

                if (command === 'ai-custom') {
                    const instruction = await Dialogs.askInput(
                        'Vraag AI Assistent',
                        'bijv. Maak de tekst wervend en bondig...',
                        '',
                        selectedHtml ? 'Bewerkt de geselecteerde tekst.' : 'Genereert nieuwe tekst op cursorpositie.'
                    );
                    if (!instruction) return;
                    prompt = selectedHtml
                        ? `Instruction: ${instruction}\n\nMaintain exact HTML markup tags. Input HTML:\n${selectedHtml}`
                        : `Instruction: ${instruction}\n\nWrite a well-formatted response ready to insert into the document.`;
                } else if (command === 'ai-grammar') {
                    if (!selectedHtml) {
                        await Dialogs.showMessage('Selectie Vereist', 'Selecteer eerst tekst om spelling en grammatica te corrigeren.');
                        return;
                    }
                    prompt = `Fix all spelling, grammar, and punctuation mistakes. Retain exact HTML markup and attributes. Input HTML:\n${selectedHtml}`;
                } else if (command === 'ai-expand') {
                    if (!selectedHtml) {
                        await Dialogs.showMessage('Selectie Vereist', 'Selecteer een zin of gedachte om uit te breiden.');
                        return;
                    }
                    prompt = `Expand this short text into a well-crafted, coherent, and comprehensive paragraph. Maintain existing HTML structure. Input HTML:\n${selectedHtml}`;
                } else if (command === 'ai-tone') {
                    if (!selectedHtml) {
                        await Dialogs.showMessage('Selectie Vereist', 'Selecteer eerst tekst om de schrijfstijl/toon aan te passen.');
                        return;
                    }
                    const selectedTone = await Dialogs.askSelect(
                        'Schrijfstijl / Toon Kiezen',
                        [
                            { value: 'Professioneel & Zakelijk', label: 'Professioneel & Zakelijk' },
                            { value: 'Informeel & Vriendelijk', label: 'Informeel & Vriendelijk' },
                            { value: 'Overtuigend & Wervend (Sales/Marketing)', label: 'Overtuigend & Wervend' },
                            { value: 'Academisch & Formeel', label: 'Academisch & Formeel' },
                            { value: 'Beknopt & To-the-point', label: 'Beknopt & Krachtig' },
                            { value: 'Creatief & Inspirerend', label: 'Creatief & Inspirerend' }
                        ],
                        'Professioneel & Zakelijk'
                    );
                    if (!selectedTone) return;
                    prompt = `Rewrite this text in a ${selectedTone} tone. Maintain the exact same HTML formatting tags. Input HTML:\n${selectedHtml}`;
                } else if (command === 'ai-summarize') {
                    const textToSummarize = selectedHtml || editor.innerHTML;
                    prompt = `Summarize this text clearly and concisely. Format key points using an unordered list (<ul><li>...) or clear paragraphs. Input HTML:\n${textToSummarize}`;
                } else if (command === 'ai-translate') {
                    if (!selectedHtml) {
                        await Dialogs.showMessage('Selectie Vereist', 'Selecteer eerst tekst om te vertalen.');
                        return;
                    }
                    const targetLang = await Dialogs.askSelect(
                        'Vertalen Naar Taal',
                        ['Engels', 'Nederlands', 'Duits', 'Frans', 'Spaans', 'Italiaans', 'Portugees', 'Chinees', 'Japans', 'Arabisch'],
                        'Engels'
                    );
                    if (!targetLang) return;
                    prompt = `Translate the human-readable text into ${targetLang}. Keep all HTML tags and structural markup intact. Input HTML:\n${selectedHtml}`;
                } else if (command === 'ai-seo') {
                    const content = selectedText || editor.innerText;
                    prompt = `Analyze this text for SEO and provide 4 practical suggestions: 1) Optimized Title (H1), 2) Meta Description (under 160 chars), 3) Focus Keywords, 4) Content Improvements. Format as clean HTML with <h4> and <ul>. Input text:\n${content}`;
                    const res = await callGeminiAPI(prompt, apiKey);
                    await Dialogs.showMessage('SEO Analyse & Suggesties', `<div style="max-height: 400px; overflow-y: auto;">${res}</div>`);
                    return;
                } else if (command === 'ai-tags') {
                    const content = selectedText || editor.innerText;
                    prompt = `Suggest 5-8 relevant tags and 2 categories for this document. Format as HTML badge spans like: <span style="display:inline-block;background:#eef2ff;color:#4f46e5;padding:2px 8px;border-radius:12px;margin:2px;font-size:0.85em;">#tag</span>. Input text:\n${content}`;
                    const res = await callGeminiAPI(prompt, apiKey);
                    restoreSelection();
                    document.execCommand('insertHTML', false, `<p><strong>Tags:</strong> ${res}</p>`);
                    syncContent();
                    return;
                }

                let origBtnHtml = "";
                if (loadingBtn) {
                    origBtnHtml = loadingBtn.innerHTML;
                    loadingBtn.innerHTML = '<span class="pulse-ai-loading" style="display:inline-block;width:16px;height:16px;border-radius:50%;"></span>';
                    loadingBtn.disabled = true;
                }
                editor.classList.add('pulse-ai-loading');

                try {
                    const aiResult = await callGeminiAPI(prompt, apiKey);
                    restoreSelection();
                    document.execCommand('insertHTML', false, aiResult);
                    syncContent();
                } catch (err) {
                    await Dialogs.showMessage('AI Assistent Fout', err.message);
                } finally {
                    editor.classList.remove('pulse-ai-loading');
                    if (loadingBtn) {
                        loadingBtn.innerHTML = origBtnHtml;
                        loadingBtn.disabled = false;
                    }
                    updateToolbarState();
                }
                return;
            }

            // MARKDOWN COMMANDS
            if (command === 'markdown-import') {
                const mdText = await Dialogs.askTextarea('Importeer Markdown', '# Koptekst\n\nPlak hier uw Markdown...');
                if (mdText) {
                    if (typeof marked === 'undefined') {
                        await loadExternalScript('https://cdn.jsdelivr.net/npm/marked/marked.min.js');
                    }
                    const parsedHtml = (typeof marked !== 'undefined' && marked.parse) ? marked.parse(mdText) : mdText.replace(/\n/g, '<br>');
                    restoreSelection();
                    document.execCommand('insertHTML', false, parsedHtml);
                    syncContent();
                }
                return;
            }

            if (command === 'markdown-export') {
                if (typeof TurndownService === 'undefined') {
                    await loadExternalScript('https://unpkg.com/turndown/dist/turndown.js');
                }
                let markdown = "";
                if (typeof TurndownService !== 'undefined') {
                    const td = new TurndownService({ headingStyle: 'atx', codeBlockStyle: 'fenced' });
                    markdown = td.turndown(editor.innerHTML);
                } else {
                    markdown = editor.innerText;
                }
                await Dialogs.askTextarea('Exporteer Markdown', '', markdown, 'Kopieer de onderstaande Markdown.');
                return;
            }

            // CODE BLOCK INSERTION
            if (command === 'insertCodeBlock') {
                const lang = await Dialogs.askSelect(
                    'Programmeertaal voor Codeblok',
                    ['javascript', 'html', 'css', 'php', 'python', 'json', 'sql', 'typescript', 'bash'],
                    'javascript'
                );
                if (lang) {
                    const code = await Dialogs.askTextarea('Code Invoegen', '// Plak hier uw code...');
                    if (code) {
                        const escapedCode = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
                        const blockHtml = `<pre><code class="language-${lang}">${escapedCode}</code></pre><p><br></p>`;
                        restoreSelection();
                        document.execCommand('insertHTML', false, blockHtml);
                        syncContent();
                    }
                }
                return;
            }

            // TABLE COMMANDS
            if (command.startsWith('table-')) {
                restoreSelection();
                if (command === 'table-insert') {
                    const tableHtml = `
                        <table class="pulse-table">
                            <thead>
                                <tr><th>Kop 1</th><th>Kop 2</th><th>Kop 3</th></tr>
                            </thead>
                            <tbody>
                                <tr><td><br></td><td><br></td><td><br></td></tr>
                                <tr><td><br></td><td><br></td><td><br></td></tr>
                            </tbody>
                        </table>
                        <p><br></p>
                    `;
                    document.execCommand('insertHTML', false, tableHtml);
                    syncContent();
                    return;
                }

                let cell = null;
                if (savedRange) {
                    let node = savedRange.startContainer;
                    if (node.nodeType === Node.TEXT_NODE) node = node.parentNode;
                    cell = node.closest('td, th');
                }

                if (!cell) {
                    await Dialogs.showMessage('Tabel Actie', 'Plaats uw cursor in een tabelcel om deze actie uit te voeren.');
                    return;
                }

                const row = cell.closest('tr');
                const table = cell.closest('table');
                const tbody = table.querySelector('tbody') || table;
                const cellIndex = Array.from(row.children).indexOf(cell);
                const rowIndex = Array.from(tbody.children).indexOf(row);

                if (command === 'table-insert-row-above') {
                    const newRow = tbody.insertRow(rowIndex);
                    Array.from(row.children).forEach(() => { newRow.insertCell().innerHTML = '<br>'; });
                } else if (command === 'table-insert-row-below') {
                    const newRow = tbody.insertRow(rowIndex + 1);
                    Array.from(row.children).forEach(() => { newRow.insertCell().innerHTML = '<br>'; });
                } else if (command === 'table-insert-col-left') {
                    Array.from(table.querySelectorAll('tr')).forEach(tr => { tr.insertCell(cellIndex).innerHTML = '<br>'; });
                } else if (command === 'table-insert-col-right') {
                    Array.from(table.querySelectorAll('tr')).forEach(tr => { tr.insertCell(cellIndex + 1).innerHTML = '<br>'; });
                } else if (command === 'table-delete-row') {
                    row.remove();
                } else if (command === 'table-delete-col') {
                    Array.from(table.querySelectorAll('tr')).forEach(tr => { if (tr.children[cellIndex]) tr.children[cellIndex].remove(); });
                } else if (command === 'table-delete-table') {
                    table.remove();
                }
                syncContent();
                return;
            }

            // LINK COMMAND
            if (command === 'createLink') {
                const url = await Dialogs.askInput('Link Invoegen', 'https://example.com', 'https://');
                if (url && url !== 'https://') {
                    restoreSelection();
                    document.execCommand('createLink', false, url);
                    syncContent();
                }
                return;
            }

            // IMAGE COMMAND & RESIZER
            if (command === 'insertImage') {
                const url = await Dialogs.askInput('Afbeelding Invoegen', 'Voer afbeeldings-URL in (https://...)', 'https://');
                if (url && url !== 'https://') {
                    restoreSelection();
                    const imgHtml = `<p><img src="${url}" alt="Afbeelding" style="max-width: 100%; border-radius: 6px;"></p>`;
                    document.execCommand('insertHTML', false, imgHtml);
                    syncContent();
                    setupImageResizers();
                }
                return;
            }

            // STANDARD FORMATTING COMMANDS
            restoreSelection();
            if (config.value) {
                document.execCommand(command, false, config.value);
            } else {
                document.execCommand(command, false, null);
            }
            syncContent();
            updateToolbarState();
        };

        // ---------------------------------------------------------
        // SOURCE VIEW TOGGLE
        // ---------------------------------------------------------
        const toggleSourceView = () => {
            if (!sourceView) return;
            sourceMode = !sourceMode;
            const btn = toolbar ? toolbar.querySelector('button[data-command="toggleSource"]') : null;
            if (btn) btn.classList.toggle('active', sourceMode);

            if (toolbar) {
                toolbar.querySelectorAll('button').forEach(b => {
                    if (b !== btn && b.dataset.command !== 'toggleFullscreen' && b.dataset.command !== 'toggleTheme') {
                        b.disabled = sourceMode;
                    }
                });
            }

            if (sourceMode) {
                sourceView.value = editor.innerHTML;
                editor.style.display = 'none';
                sourceView.style.display = 'block';
                sourceView.style.height = `${editor.offsetHeight || 380}px`;
                sourceView.focus();
            } else {
                editor.innerHTML = sourceView.value;
                sourceView.style.display = 'none';
                editor.style.display = 'block';
                editor.focus();
                syncContent();
            }
            triggerEvent('modeChange', { mode: sourceMode ? 'source' : (currentLang || 'rich-text') });
        };

        // ---------------------------------------------------------
        // TOOLBAR & FLOATING SELECTION STATE
        // ---------------------------------------------------------
        const updateToolbarState = () => {
            if (sourceMode || isDestroyed) return;

            commands.forEach(config => {
                if (config.divider || config.type === 'action' || config.type === 'custom') return;
                const selector = config.value ? `button[data-command="${config.command}"][data-value="${config.value}"]` : `button[data-command="${config.command}"]`;
                const btn = toolbar ? toolbar.querySelector(selector) : null;
                if (!btn) return;

                let isActive = false;
                try {
                    if (config.type === 'state') isActive = document.queryCommandState(config.command);
                    else if (config.type === 'value') {
                        const val = document.queryCommandValue(config.command);
                        if (config.command === 'formatBlock' && val) {
                            isActive = (val.toLowerCase() === config.value.toLowerCase());
                        }
                    }
                } catch (e) {}

                btn.classList.toggle('active', isActive);
            });

            // Update Floating Bubble Toolbar
            if (floatingToolbar) {
                const sel = window.getSelection();
                if (!sel.isCollapsed && editor.contains(sel.anchorNode)) {
                    const range = sel.getRangeAt(0);
                    const rect = range.getBoundingClientRect();
                    const containerRect = container.getBoundingClientRect();

                    floatingToolbar.style.top = `${rect.top - containerRect.top - 46}px`;
                    floatingToolbar.style.left = `${rect.left - containerRect.left + (rect.width / 2) - (floatingToolbar.offsetWidth / 2)}px`;
                    floatingToolbar.classList.add('show');
                } else {
                    floatingToolbar.classList.remove('show');
                }
            }
        };

        // ---------------------------------------------------------
        // STATS BAR UPDATE
        // ---------------------------------------------------------
        const updateStats = () => {
            if (!statusBar) return;
            const text = editor.innerText.trim();
            const words = text ? text.split(/\s+/).filter(Boolean).length : 0;
            const chars = text.length;
            const readingMin = Math.ceil(words / 200);

            const wEl = statusBar.querySelector('.pulse-stat-words');
            const cEl = statusBar.querySelector('.pulse-stat-chars');
            const rEl = statusBar.querySelector('.pulse-stat-reading');
            const bEl = statusBar.querySelector('.pulse-mode-badge');

            if (wEl) wEl.innerText = `${words} ${words === 1 ? 'woord' : 'woorden'}`;
            if (cEl) cEl.innerText = `${chars} ${chars === 1 ? 'teken' : 'tekens'}`;
            if (rEl) rEl.innerText = `${readingMin} min leestijd`;
            if (bEl) bEl.innerText = currentLang ? currentLang.toUpperCase() : 'Rich Text';
        };

        // ---------------------------------------------------------
        // IMAGE RESIZING & CONTROLS
        // ---------------------------------------------------------
        const setupImageResizers = () => {
            editor.querySelectorAll('img').forEach(img => {
                if (img.dataset.pulseImageReady) return;
                img.dataset.pulseImageReady = 'true';

                img.addEventListener('click', (e) => {
                    e.stopPropagation();
                    selectImage(img);
                });
            });
        };

        const selectImage = (img) => {
            document.querySelectorAll('.pulse-image-selected').forEach(el => el.classList.remove('pulse-image-selected'));
            document.querySelectorAll('.pulse-image-toolbar').forEach(el => el.remove());

            img.classList.add('pulse-image-selected');

            const imgToolbar = document.createElement('div');
            imgToolbar.className = 'pulse-image-toolbar';
            imgToolbar.innerHTML = `
                <button type="button" class="btn" data-size="25%">25%</button>
                <button type="button" class="btn" data-size="50%">50%</button>
                <button type="button" class="btn" data-size="100%">100%</button>
                <span class="toolbar-divider"></span>
                <button type="button" class="btn" data-align="left">Links</button>
                <button type="button" class="btn" data-align="center">Midden</button>
                <button type="button" class="btn" data-align="right">Rechts</button>
                <span class="toolbar-divider"></span>
                <button type="button" class="btn" data-action="delete" style="color: var(--pulse-danger);">Verwijder</button>
            `;

            img.parentElement.style.position = 'relative';
            img.parentElement.appendChild(imgToolbar);

            imgToolbar.addEventListener('click', (e) => {
                e.stopPropagation();
                const btn = e.target.closest('button');
                if (!btn) return;

                if (btn.dataset.size) {
                    img.style.width = btn.dataset.size;
                } else if (btn.dataset.align) {
                    const align = btn.dataset.align;
                    if (align === 'center') {
                        img.style.display = 'block';
                        img.style.margin = '1rem auto';
                        img.style.float = 'none';
                    } else if (align === 'left') {
                        img.style.display = 'inline';
                        img.style.float = 'left';
                        img.style.margin = '0 1rem 1rem 0';
                    } else if (align === 'right') {
                        img.style.display = 'inline';
                        img.style.float = 'right';
                        img.style.margin = '0 0 1rem 1rem';
                    }
                } else if (btn.dataset.action === 'delete') {
                    img.remove();
                    imgToolbar.remove();
                }
                syncContent();
            });

            document.addEventListener('click', function onDocClick() {
                img.classList.remove('pulse-image-selected');
                imgToolbar.remove();
                document.removeEventListener('click', onDocClick);
            });
        };

        // ---------------------------------------------------------
        // SEARCH & REPLACE (Rich Text & Code Mode)
        // ---------------------------------------------------------
        const searchInput = searchPanel.querySelector('.pulse-search-input');
        const replaceInput = searchPanel.querySelector('.pulse-replace-input');
        const regexCheck = searchPanel.querySelector('.pulse-search-regex');
        const countSpan = searchPanel.querySelector('.pulse-search-count');

        const updateSearch = () => {
            searchQuery = searchInput.value;
            useRegex = regexCheck.checked;

            if (currentLang) {
                updateCodeView();
            } else {
                highlightRichTextSearch();
            }

            const matches = editor.querySelectorAll('mark.search-match');
            countSpan.innerText = matches.length > 0 ? `${currentMatchIndex + 1}/${matches.length}` : '0/0';

            matches.forEach(m => m.classList.remove('active'));
            if (matches.length > 0) {
                if (currentMatchIndex >= matches.length) currentMatchIndex = 0;
                if (currentMatchIndex < 0) currentMatchIndex = matches.length - 1;
                matches[currentMatchIndex].classList.add('active');
                matches[currentMatchIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
                countSpan.innerText = `${currentMatchIndex + 1}/${matches.length}`;
            }
        };

        const highlightRichTextSearch = () => {
            // Remove previous search markers
            editor.querySelectorAll('mark.search-match').forEach(mark => {
                const parent = mark.parentNode;
                while (mark.firstChild) parent.insertBefore(mark.firstChild, mark);
                mark.remove();
            });

            if (!searchQuery) return;

            try {
                const flags = 'gi';
                const regex = useRegex ? new RegExp(searchQuery, flags) : new RegExp(searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), flags);
                const treeWalker = document.createTreeWalker(editor, NodeFilter.SHOW_TEXT, null, false);
                const textNodes = [];

                while (treeWalker.nextNode()) {
                    textNodes.push(treeWalker.currentNode);
                }

                textNodes.forEach(node => {
                    const text = node.nodeValue;
                    if (regex.test(text)) {
                        regex.lastIndex = 0;
                        const fragment = document.createDocumentFragment();
                        let lastIdx = 0;
                        let match;

                        while ((match = regex.exec(text)) !== null) {
                            if (match.index > lastIdx) {
                                fragment.appendChild(document.createTextNode(text.substring(lastIdx, match.index)));
                            }
                            const mark = document.createElement('mark');
                            mark.className = 'search-match';
                            mark.innerText = match[0];
                            fragment.appendChild(mark);
                            lastIdx = regex.lastIndex;
                        }

                        if (lastIdx < text.length) {
                            fragment.appendChild(document.createTextNode(text.substring(lastIdx)));
                        }

                        node.parentNode.replaceChild(fragment, node);
                    }
                });
            } catch (e) {}
        };

        searchPanel.querySelector('.pulse-search-prev').addEventListener('click', () => { currentMatchIndex--; updateSearch(); });
        searchPanel.querySelector('.pulse-search-next').addEventListener('click', () => { currentMatchIndex++; updateSearch(); });
        searchPanel.querySelector('.pulse-search-close').addEventListener('click', () => {
            searchPanel.style.display = 'none';
            searchQuery = '';
            searchInput.value = '';
            updateSearch();
        });

        searchInput.addEventListener('input', () => { currentMatchIndex = 0; updateSearch(); });
        regexCheck.addEventListener('change', () => { currentMatchIndex = 0; updateSearch(); });

        searchPanel.querySelector('.pulse-replace-btn').addEventListener('click', () => {
            const matches = editor.querySelectorAll('mark.search-match');
            if (matches.length > 0 && matches[currentMatchIndex]) {
                const repVal = replaceInput.value;
                const matchEl = matches[currentMatchIndex];
                matchEl.parentNode.replaceChild(document.createTextNode(repVal), matchEl);
                syncContent();
                updateSearch();
            }
        });

        searchPanel.querySelector('.pulse-replace-all-btn').addEventListener('click', () => {
            const repVal = replaceInput.value;
            if (currentLang) {
                let raw = editor.innerText;
                const regex = useRegex ? new RegExp(searchQuery, 'g') : new RegExp(searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
                raw = raw.replace(regex, repVal);
                editor.innerHTML = tokenizeText(raw, currentLang, '', false);
            } else {
                const matches = editor.querySelectorAll('mark.search-match');
                matches.forEach(m => m.parentNode.replaceChild(document.createTextNode(repVal), m));
            }
            syncContent();
            updateSearch();
        });

        // ---------------------------------------------------------
        // CODE MODE & GUTTER
        // ---------------------------------------------------------
        const updateGutter = () => {
            if (!currentLang) return;
            let gutterHtml = '';
            const lines = editor.children;
            for (let i = 0; i < lines.length; i++) {
                const lineEl = lines[i];
                const text = lineEl.innerText;
                const h = lineEl.offsetHeight || 26;
                let foldIcon = '';

                if (text.match(/[{[]/) || text.match(/<[a-zA-Z0-9-]+[^>]*>$/)) {
                    foldIcon = (lineEl.nextElementSibling && lineEl.nextElementSibling.classList.contains('folded')) ? '<span class="fold-icon">▶</span>' : '<span class="fold-icon">▼</span>';
                }
                gutterHtml += `<div class="gutter-line" data-line="${i}" style="height: ${h}px">${i + 1}${foldIcon}</div>`;
            }
            gutter.innerHTML = gutterHtml;
        };

        gutter.addEventListener('mousedown', (e) => {
            e.preventDefault();
            if (e.target.classList.contains('fold-icon')) {
                const lineNum = parseInt(e.target.parentElement.dataset.line);
                const lines = editor.children;
                const isFolding = e.target.innerText === '▼';
                e.target.innerText = isFolding ? '▶' : '▼';

                let depth = 1;
                let endIdx = lineNum;
                for (let i = lineNum + 1; i < lines.length; i++) {
                    const lText = lines[i].innerText;
                    const opens = (lText.match(/[{[<]/g) || []).length;
                    const closes = (lText.match(/[}\]>]/g) || []).length;
                    depth += opens - closes;
                    if (depth <= 0) { endIdx = i; break; }
                }

                for (let i = lineNum + 1; i < endIdx && i < lines.length; i++) {
                    lines[i].classList.toggle('folded', isFolding);
                }
            }
        });

        const updateCodeView = () => {
            if (!currentLang) return;
            const rawText = editor.innerText;
            editor.innerHTML = tokenizeText(rawText, currentLang, searchQuery, useRegex);
            updateGutter();
        };

        // ---------------------------------------------------------
        // SYNC & EVENT EMISSION
        // ---------------------------------------------------------
        const syncContent = () => {
            if (sourceView && !sourceMode) {
                sourceView.value = currentLang ? editor.innerText : editor.innerHTML;
            }
            updateStats();
            triggerEvent('change', { html: editor.innerHTML, text: editor.innerText });
        };

        // ---------------------------------------------------------
        // KEYBOARD SHORTCUTS & EVENT LISTENERS
        // ---------------------------------------------------------
        editor.addEventListener('input', () => {
            if (currentLang) updateGutter();
            syncContent();
        });

        editor.addEventListener('keydown', (e) => {
            const isCtrlOrMeta = e.ctrlKey || e.metaKey;

            // Code Mode Tab Key
            if (currentLang && e.key === 'Tab') {
                e.preventDefault();
                document.execCommand('insertText', false, '    ');
                return;
            }

            // Code Mode Enter Key
            if (currentLang && e.key === 'Enter') {
                e.preventDefault();
                document.execCommand('insertText', false, '\n');
                return;
            }

            // Shortcuts
            if (isCtrlOrMeta) {
                const k = e.key.toLowerCase();
                if (k === 'b') { e.preventDefault(); handleCommand('bold'); }
                else if (k === 'i') { e.preventDefault(); handleCommand('italic'); }
                else if (k === 'u') { e.preventDefault(); handleCommand('underline'); }
                else if (k === 'k') { e.preventDefault(); handleCommand('createLink'); }
                else if (k === 'f') { e.preventDefault(); handleCommand('toggleSearch'); }
                else if (k === 'h') { e.preventDefault(); handleCommand('toggleSearch'); }
                else if (k === '/') { e.preventDefault(); handleCommand('showShortcuts'); }
            }
        });

        document.addEventListener('selectionchange', () => {
            if (window.getSelection().rangeCount > 0 && editor.contains(window.getSelection().getRangeAt(0).commonAncestorContainer)) {
                updateToolbarState();
            }
        });

        editor.addEventListener('click', updateToolbarState);
        editor.addEventListener('keyup', updateToolbarState);

        const parentForm = editor.closest('form');
        if (parentForm) parentForm.addEventListener('submit', syncContent);

        // Initial setup
        if (sourceView && sourceView.value) {
            editor.innerHTML = sourceView.value;
        } else if (!editor.innerHTML.trim()) {
            editor.innerHTML = '<p><br></p>';
        }

        setupImageResizers();
        updateStats();

        // ---------------------------------------------------------
        // EVENT EMITTER HELPERS
        // ---------------------------------------------------------
        function triggerEvent(eventName, data) {
            if (options[`on${eventName.charAt(0).toUpperCase() + eventName.slice(1)}`]) {
                try { options[`on${eventName.charAt(0).toUpperCase() + eventName.slice(1)}`](data); } catch (e) {}
            }
            if (eventListeners.has(eventName)) {
                eventListeners.get(eventName).forEach(cb => {
                    try { cb(data); } catch (e) {}
                });
            }
        }

        // Helper to load external CDN script once
        function loadExternalScript(src) {
            return new Promise((resolve, reject) => {
                if (document.querySelector(`script[src="${src}"]`)) return resolve();
                const script = document.createElement('script');
                script.src = src;
                script.onload = resolve;
                script.onerror = reject;
                document.head.appendChild(script);
            });
        }

        // ---------------------------------------------------------
        // PUBLIC API CONTROLLER OBJECT
        // ---------------------------------------------------------
        const controller = {
            id: instanceId,
            editor,
            toolbar,
            sourceView,
            container,

            getContent() {
                return currentLang ? editor.innerText : editor.innerHTML;
            },

            setContent(content) {
                if (currentLang) {
                    editor.innerText = content;
                    updateCodeView();
                } else {
                    editor.innerHTML = content || '<p><br></p>';
                }
                setupImageResizers();
                syncContent();
            },

            getMarkdown() {
                if (typeof TurndownService !== 'undefined') {
                    const td = new TurndownService({ headingStyle: 'atx' });
                    return td.turndown(editor.innerHTML);
                }
                return editor.innerText;
            },

            async setMarkdown(md) {
                if (typeof marked === 'undefined') {
                    await loadExternalScript('https://cdn.jsdelivr.net/npm/marked/marked.min.js');
                }
                const html = (typeof marked !== 'undefined' && marked.parse) ? marked.parse(md) : md.replace(/\n/g, '<br>');
                this.setContent(html);
            },

            getText() {
                return editor.innerText;
            },

            getStats() {
                const text = editor.innerText.trim();
                const words = text ? text.split(/\s+/).filter(Boolean).length : 0;
                return {
                    words,
                    characters: text.length,
                    readingTimeMinutes: Math.ceil(words / 200)
                };
            },

            setTheme(newTheme) {
                if (newTheme === 'dark') container.classList.add('pulse-theme-dark');
                else container.classList.remove('pulse-theme-dark');
                triggerEvent('themeChange', { isDark: container.classList.contains('pulse-theme-dark') });
            },

            setLanguage(lang) {
                currentLang = lang;
                if (currentLang) {
                    editor.classList.add('code-mode-active');
                    gutter.style.display = 'block';
                    if (toolbar) toolbar.style.display = 'none';
                    updateCodeView();
                } else {
                    editor.classList.remove('code-mode-active');
                    gutter.style.display = 'none';
                    if (toolbar) toolbar.style.display = '';
                    editor.innerHTML = '<p>' + editor.innerText.replace(/\n/g, '<br>') + '</p>';
                }
                syncContent();
                triggerEvent('modeChange', { mode: currentLang || 'rich-text' });
            },

            focus() {
                editor.focus();
            },

            blur() {
                editor.blur();
            },

            execCommand(cmd, val = null) {
                handleCommand(cmd, { command: cmd, value: val });
            },

            on(event, callback) {
                if (!eventListeners.has(event)) eventListeners.set(event, []);
                eventListeners.get(event).push(callback);
            },

            off(event, callback) {
                if (eventListeners.has(event)) {
                    eventListeners.set(event, eventListeners.get(event).filter(cb => cb !== callback));
                }
            },

            destroy() {
                isDestroyed = true;
                gutter.remove();
                searchPanel.remove();
                if (floatingToolbar) floatingToolbar.remove();
                if (statusBar) statusBar.remove();
                if (parentForm) parentForm.removeEventListener('submit', syncContent);
            }
        };

        triggerEvent('init', { controller });
        return controller;
    }

    return {
        initializePulseEditor,
        PulseEditor: {
            init: initializePulseEditor,
            callGeminiAPI,
            Dialogs,
            ICONS
        }
    };
}));
