// ---------------------------------------------------------
// GEMINI API CONFIGURATIE
// ---------------------------------------------------------
const apiKey = (typeof window !== 'undefined' && window.geminiApiKey) ? window.geminiApiKey : "";

// ---------------------------------------------------------
// SVG ICOON ASSETS (Lucide stijl)
// ---------------------------------------------------------
const wrapSvg = (paths) => `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`;

const ICONS = {
    magic: wrapSvg('<path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/>'),
    grammar: wrapSvg('<path d="m15 21 2-2 4 4"/><path d="M4.5 13h5"/><path d="M3 16l4.5-12 4.5 12"/>'),
    summarize: wrapSvg('<path d="M4 6h16"/><path d="M4 12h10"/><path d="M4 18h6"/>'),
    professional: wrapSvg('<rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>'),
    translate: wrapSvg('<path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m22 22-5-10-5 10"/><path d="m14 18h6"/>'),
    bold: wrapSvg('<path d="M14 12a4 4 0 0 0 0-8H6v8"/><path d="M15 20a4 4 0 0 0 0-8H6v8Z"/>'),
    italic: wrapSvg('<line x1="19" x2="10" y1="4" y2="4"/><line x1="14" x2="5" y1="20" y2="20"/><line x1="15" x2="9" y1="4" y2="20"/>'),
    underline: wrapSvg('<path d="M6 4v6a6 6 0 0 0 12 0V4"/><line x1="4" x2="20" y1="20" y2="20"/>'),
    strike: wrapSvg('<path d="M16 4H9a3 3 0 0 0-2.83 4"/><path d="M14 12a4 4 0 0 1 0 8H6"/><line x1="4" x2="20" y1="12" y2="12"/>'),
    h1: wrapSvg('<path d="M4 12h8"/><path d="M4 18V6"/><path d="M12 18V6"/><path d="m17 12 3-2v8"/>'),
    h2: wrapSvg('<path d="M4 12h8"/><path d="M4 18V6"/><path d="M12 18V6"/><path d="M21 18h-4c0-4 4-3 4-6 0-1.5-2-2.5-4-1"/>'),
    p: wrapSvg('<path d="M13 4v16"/><path d="M17 4v16"/><path d="M19 4H9.5a4.5 4.5 0 0 0 0 9H13"/>'),
    quote: wrapSvg('<path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/>'),
    ul: wrapSvg('<line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/>'),
    ol: wrapSvg('<line x1="10" x2="21" y1="6" y2="6"/><line x1="10" x2="21" y1="12" y2="12"/><line x1="10" x2="21" y1="18" y2="18"/><path d="M4 6h1v4"/><path d="M4 10h2"/><path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"/>'),
    left: wrapSvg('<line x1="21" x2="3" y1="6" y2="6"/><line x1="15" x2="3" y1="12" y2="12"/><line x1="17" x2="3" y1="18" y2="18"/>'),
    center: wrapSvg('<line x1="21" x2="3" y1="6" y2="6"/><line x1="17" x2="7" y1="12" y2="12"/><line x1="19" x2="5" y1="18" y2="18"/>'),
    link: wrapSvg('<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>'),
    unlink: wrapSvg('<path d="m18.84 12.25 1.72-1.71h-.01a5.001 5.001 0 0 0-7.07-7.07l-1.72 1.71"/><path d="m5.17 11.75-1.71 1.71a5.001 5.001 0 0 0 7.07 7.07l1.71-1.71"/><line x1="8" x2="8" y1="2" y2="5"/><line x1="2" x2="5" y1="8" y2="8"/><line x1="16" x2="16" y1="19" y2="22"/><line x1="19" x2="22" y1="16" y2="16"/>'),
    image: wrapSvg('<rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>'),
    color: wrapSvg('<circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>'),
    undo: wrapSvg('<path d="M3 7v6h6"/><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"/>'),
    code: wrapSvg('<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>')
};

// ---------------------------------------------------------
// AANGEPASTE UI DIALOGEN
// ---------------------------------------------------------
function injectDialogs() {
    if (!document.getElementById('message-dialog') && !document.getElementById('input-dialog')) {
        const dialogHTML = `
            <!-- Herbruikbare Melding Dialoog -->
            <dialog id="message-dialog">
                <form method="dialog">
                    <div class="dialog-header" id="message-dialog-title">Melding</div>
                    <p id="message-dialog-body" class="text-muted"></p>
                    <div class="dialog-actions">
                        <button type="submit" class="btn btn-primary">OK</button>
                    </div>
                </form>
            </dialog>

            <!-- Herbruikbare Invoer Dialoog -->
            <dialog id="input-dialog">
                <form method="dialog" id="input-dialog-form">
                    <div class="dialog-header" id="input-dialog-title">Invoer Vereist</div>
                    <p id="input-dialog-hint" class="text-muted mb-2" style="font-size: 0.9em; display: none;"></p>
                    <input type="text" id="input-dialog-field" class="form-control" required>
                    <div class="dialog-actions">
                        <button type="button" class="btn btn-light" id="input-cancel-btn">Annuleren</button>
                        <button type="submit" class="btn btn-primary">Verzenden</button>
                    </div>
                </form>
            </dialog>
        `;
        document.body.insertAdjacentHTML('beforeend', dialogHTML);
    }
}

function showMessage(title, message) {
    injectDialogs();
    const dialog = document.getElementById('message-dialog');
    document.getElementById('message-dialog-title').innerText = title;
    document.getElementById('message-dialog-body').innerText = message;
    dialog.showModal();
}

function askInput(title, placeholder, defaultValue = '', hint = '') {
    injectDialogs();
    return new Promise(resolve => {
        const dialog = document.getElementById('input-dialog');
        const input = document.getElementById('input-dialog-field');
        const hintEl = document.getElementById('input-dialog-hint');

        document.getElementById('input-dialog-title').innerText = title;
        input.placeholder = placeholder;
        input.value = defaultValue;

        if (hint) {
            hintEl.innerText = hint;
            hintEl.style.display = 'block';
        } else {
            hintEl.style.display = 'none';
        }

        const cancelBtn = document.getElementById('input-cancel-btn');
        const form = document.getElementById('input-dialog-form');

        const cleanup = () => {
            cancelBtn.removeEventListener('click', onCancel);
            form.removeEventListener('submit', onSubmit);
        };

        const onCancel = (e) => {
            e.preventDefault();
            cleanup();
            dialog.close();
            resolve(null);
        };

        const onSubmit = (e) => {
            e.preventDefault();
            cleanup();
            dialog.close();
            resolve(input.value);
        };

        cancelBtn.addEventListener('click', onCancel);
        form.addEventListener('submit', onSubmit);

        dialog.showModal();
    });
}

// ---------------------------------------------------------
// GEMINI API AANROEP LOGICA MET RETRY
// ---------------------------------------------------------
async function callGeminiAPI(promptText, configuredKey) {
    const keyToUse = configuredKey || apiKey;
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${keyToUse}`;

    // We gebruiken hier extreem strikte systeemregels om te voorkomen dat Gemini
    // Markdown, conversationele tekst of extra wrapper tags (zoals <h2> of <p>) toevoegt.
    const payload = {
        contents: [{ parts: [{ text: promptText }] }],
        systemInstruction: {
            parts: [{
                text: "You are a strict HTML text-processing AI. Modify the text inside the HTML according to the user's instructions.\n\nCRITICAL RULES:\n1. Keep the EXACT SAME HTML tags, attributes, and structure.\n2. DO NOT add any new wrapper tags around the output.\n3. DO NOT output markdown code blocks.\n4. Output ONLY the raw HTML string.\n\nEXAMPLE INPUT:\n<h2>Hello</h2>\n<p>This is <b>bold</b>.</p>\n\nEXAMPLE CORRECT OUTPUT:\n<h2>Bonjour</h2>\n<p>C'est <b>gras</b>.</p>\n\nINCORRECT OUTPUT (Never wrap the output in extra tags!):\n<h2><h2>Bonjour</h2><p>C'est <b>gras</b>.</p></h2>"
            }]
        }
    };

    const delays = [1000, 2000, 4000, 8000];
    let lastError;

    for (let i = 0; i <= delays.length; i++) {
        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) throw new Error(`API fout (${response.status})`);

            const result = await response.json();
            return result.candidates?.[0]?.content?.parts?.[0]?.text || "";
        } catch (err) {
            lastError = err;
            if (i < delays.length) {
                await new Promise(res => setTimeout(res, delays[i]));
            }
        }
    }
    throw new Error(`Inhoud genereren mislukt: ${lastError.message}`);
}

// ---------------------------------------------------------
// EDITOR INITIALISATIE
// ---------------------------------------------------------
function initializePulseEditor(toolbarId, editorId, sourceId, geminiApiKey = '') {
    injectDialogs();

    const toolbar = typeof toolbarId === 'string' ? document.getElementById(toolbarId) : toolbarId;
    if (!toolbar) return;
    toolbar.classList.add('pulse-editor-toolbar');

    const editor = typeof editorId === 'string' ? document.getElementById(editorId) : editorId;
    const sourceView = sourceId ? (typeof sourceId === 'string' ? document.getElementById(sourceId) : sourceId) : null;
    if (sourceView) {
        sourceView.classList.add('source-view');
    }
    let sourceMode = false;

    if (editor.getAttribute('contenteditable') !== 'true') {
        editor.setAttribute('contenteditable', 'true');
    }
    document.execCommand('defaultParagraphSeparator', false, 'p');

    // Toolbar Configuratie
    const commands = [
        // Groep 1: AI Integratie (Aangepast & Presets)
        {
            type: 'dropdown',
            mainButton: { svg: ICONS.magic, command: 'ai-custom', title: 'Vraag AI (Aangepast)', type: 'custom', class: 'btn-magic dropdown-main' },
            items: [
                { svg: ICONS.grammar, text: 'Grammatica', command: 'ai-grammar', title: 'Grammatica corrigeren (Selecteer eerst tekst)', type: 'custom', class: 'btn-ai-preset' },
                { svg: ICONS.translate, text: 'Vertalen', command: 'ai-translate', title: 'Vertalen (Selecteer eerst tekst)', type: 'custom', class: 'btn-ai-preset' },
                { svg: ICONS.summarize, text: 'Samenvatten', command: 'ai-summarize', title: 'Samenvatten (Selecteer eerst tekst)', type: 'custom', class: 'btn-ai-preset' },
                { svg: ICONS.professional, text: 'Professioneel', command: 'ai-professional', title: 'Professionele Toon (Selecteer eerst tekst)', type: 'custom', class: 'btn-ai-preset' },
            ]
        },
        { divider: true },

        // Groep 2: Basis Opmaak
        { svg: ICONS.bold, command: 'bold', title: 'Vet', type: 'state' },
        { svg: ICONS.italic, command: 'italic', title: 'Cursief', type: 'state' },
        { svg: ICONS.underline, command: 'underline', title: 'Onderstreept', type: 'state' },
        { svg: ICONS.strike, command: 'strikeThrough', title: 'Doorhaald', type: 'state' },
        { divider: true },

        // Groep 3: Koppen & Alinea's
        { svg: ICONS.h1, command: 'formatBlock', value: 'H1', title: 'Kop 1', type: 'value' },
        { svg: ICONS.h2, command: 'formatBlock', value: 'H2', title: 'Kop 2', type: 'value' },
        { svg: ICONS.p, command: 'formatBlock', value: 'P', title: 'Alinea', type: 'value' },
        { svg: ICONS.quote, command: 'formatBlock', value: 'BLOCKQUOTE', title: 'Citaat', type: 'value' },
        { divider: true },

        // Groep 4: Lijsten
        { svg: ICONS.ul, command: 'insertUnorderedList', title: 'Opsommingslijst', type: 'state' },
        { svg: ICONS.ol, command: 'insertOrderedList', title: 'Genummerde lijst', type: 'state' },
        { divider: true },

        // Groep 5: Uitlijning
        { svg: ICONS.left, command: 'justifyLeft', title: 'Links uitlijnen', type: 'state' },
        { svg: ICONS.center, command: 'justifyCenter', title: 'Centreren', type: 'state' },
        { divider: true },

        // Groep 6: Media & Hulpprogramma's
        { svg: ICONS.link, command: 'createLink', title: 'Link maken', type: 'action' },
        { svg: ICONS.unlink, command: 'unlink', title: 'Link verwijderen', type: 'action' },
        { svg: ICONS.image, command: 'insertImage', title: 'Afbeelding invoegen', type: 'action' },
        { svg: ICONS.color, command: 'foreColor', title: 'Tekstkleur', type: 'custom' },
        { divider: true },
        { svg: ICONS.undo, command: 'undo', title: 'Ongedaan maken', type: 'action' },
        // Only include toggleSource if sourceView exists
        ...(sourceView ? [{ svg: ICONS.code, command: 'toggleSource', title: 'Broncode bekijken', type: 'action' }] : [])
    ];

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
            mainButton.className = mainBtnConfig.class ? `btn ${mainBtnConfig.class}` : 'btn btn-light';
            mainButton.title = mainBtnConfig.title;
            mainButton.dataset.command = mainBtnConfig.command;

            let mainInnerContent = mainBtnConfig.svg;
            if (mainBtnConfig.text) mainInnerContent += `<span>${mainBtnConfig.text}</span>`;
            mainButton.innerHTML = mainInnerContent;

            mainButton.addEventListener('mousedown', (e) => {
                e.preventDefault();
                handleToolbarClick(mainButton, mainBtnConfig);
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
                itemBtn.className = itemConfig.class ? `btn ${itemConfig.class}` : 'btn btn-light';
                itemBtn.title = itemConfig.title;
                itemBtn.dataset.command = itemConfig.command;

                let itemInnerContent = itemConfig.svg;
                if (itemConfig.text) itemInnerContent += `<span>${itemConfig.text}</span>`;
                itemBtn.innerHTML = itemInnerContent;

                itemBtn.addEventListener('mousedown', (e) => {
                    e.preventDefault();
                    handleToolbarClick(itemBtn, itemConfig);
                    dropdownContent.classList.remove('show');
                });
                dropdownContent.appendChild(itemBtn);
            });

            toggleButton.addEventListener('click', (e) => {
                e.stopPropagation();
                dropdownContent.classList.toggle('show');
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
        button.className = config.class ? `btn ${config.class}` : 'btn btn-light';
        button.title = config.title;
        button.dataset.command = config.command;
        if (config.value) button.dataset.value = config.value;

        let innerContent = config.svg;
        if (config.text) innerContent += `<span>${config.text}</span>`;
        button.innerHTML = innerContent;

        if (config.command === 'foreColor') {
            const colorInput = document.createElement('input');
            colorInput.type = 'color';
            colorInput.className = 'pulse-editor-color-input';
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
            });
            colorInput.addEventListener('click', (e) => e.stopPropagation());

            button.addEventListener('mousedown', (e) => {
                e.preventDefault();
                if (!sourceMode) colorInput.click();
            });
        } else {
            button.addEventListener('mousedown', (e) => {
                e.preventDefault();
                handleToolbarClick(button, config);
            });
        }

        return button;
    };

    const handleToolbarClick = async (button, config) => {
        const command = config.command;

        if (command === 'toggleSource') {
            toggleSourceView(button);
            return;
        }

        if (sourceMode) return;

        // Selectie ophalen vóór async acties
        const selection = window.getSelection();
        let savedRange = null;
        let selectedHtml = "";

        if (selection.rangeCount > 0 && editor.contains(selection.getRangeAt(0).commonAncestorContainer)) {
            savedRange = selection.getRangeAt(0);

            if (selection.toString().trim() !== "") {
                const tempDiv = document.createElement("div");
                tempDiv.appendChild(savedRange.cloneContents());
                selectedHtml = tempDiv.innerHTML;
            }
        }

        // AI Commando Afhandeling
        if (command.startsWith('ai-')) {
            let finalPrompt = "";

            if (command === 'ai-custom') {
                const instruction = await askInput(
                    'Vraag AI Assistent',
                    'bijv. Maak het enthousiast',
                    '',
                    selectedHtml ? `Bewerkt geselecteerde tekst.` : 'Genereert nieuwe tekst op cursorpositie'
                );
                if (!instruction) return;
                finalPrompt = selectedHtml
                    ? `Instruction: ${instruction}\n\nCRITICAL: Keep the exact same HTML structure. Do not nest tags that were not nested in the input. Do not add wrapping tags. Input HTML:\n\n${selectedHtml}`
                    : `Instruction: ${instruction}\n\n(Write a concise response suitable for immediate insertion.)`;
            } else {
                // Preset Commando's
                if (!selectedHtml) {
                    showMessage('Melding', 'Selecteer eerst wat tekst om deze AI-tool te gebruiken.');
                    return;
                }

                // Strikte prompt formulering om HTML te behouden
                if (command === 'ai-grammar') {
                    finalPrompt = `Fix spelling and grammar errors. CRITICAL: Output the exact same HTML structure. Do NOT add any wrapper tags around the result. Input HTML:\n\n${selectedHtml}`;
                } else if (command === 'ai-summarize') {
                    finalPrompt = `Summarize this content. Retain inline HTML structure like <b> or <i>. Keep root elements like <p> intact. Do NOT add any wrapper tags around the result. Input HTML:\n\n${selectedHtml}`;
                } else if (command === 'ai-professional') {
                    finalPrompt = `Rewrite this to have a professional business tone. CRITICAL: Output the exact same HTML structure. Do NOT add any wrapper tags around the result. Input HTML:\n\n${selectedHtml}`;
                } else if (command === 'ai-translate') {
                    const targetLang = await askInput(
                        'Vertalen naar',
                        'bijv. Engels, Frans, Spaans',
                        'Engels',
                        'Voer de taal in waarnaar u de geselecteerde tekst wilt vertalen.'
                    );
                    if (!targetLang) return;
                    finalPrompt = `Translate the human-readable text into ${targetLang}. CRITICAL: Output the exact same HTML structure. Do NOT add any wrapper tags (like an extra <h2> or <div>) around the result. Input HTML:\n\n${selectedHtml}`;
                }
            }

            // Laden status instellen
            const originalContent = button.innerHTML;
            button.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" style="margin-right: 4px;"></span>' + (config.text ? `<span>${config.text}</span>` : '');
            button.disabled = true;

            try {
                let aiResult = await callGeminiAPI(finalPrompt, geminiApiKey);

                // Markdown blokken verwijderen die de AI soms genereert
                aiResult = aiResult.replace(/^\`{3}[a-z]*\n?/im, '').replace(/\`{3}\n?$/im, '').trim();

                editor.focus();
                if (savedRange) {
                    selection.removeAllRanges();
                    selection.addRange(savedRange);
                }
                // document.execCommand vervangt het perfect zonder de DOM-scope te breken
                document.execCommand('insertHTML', false, aiResult);
            } catch (err) {
                showMessage('AI Fout', err.message);
            } finally {
                button.innerHTML = originalContent;
                button.disabled = false;
                updateToolbarState();
            }
            return;
        }

        // Focus herstellen voor native commando's
        editor.focus();
        if (savedRange) {
            selection.removeAllRanges();
            selection.addRange(savedRange);
        }

        // Native Acties
        if (command === 'createLink') {
            const url = await askInput('Link Maken', 'Voer URL in (bijv. https://google.com)', 'https://');
            if (url && (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('mailto:'))) {
                editor.focus();
                if (savedRange) { selection.removeAllRanges(); selection.addRange(savedRange); }
                document.execCommand(command, false, url);
            }
        } else if (command === 'insertImage') {
            const url = await askInput('Afbeelding Invoegen', 'Voer afbeeldings-URL in', 'https://');
            if (url && (url.startsWith('http://') || url.startsWith('https://'))) {
                editor.focus();
                if (savedRange) { selection.removeAllRanges(); selection.addRange(savedRange); }
                document.execCommand(command, false, url);
            }
        } else {
            document.execCommand(command, false, config.value || null);
        }

        updateToolbarState();
    };

    const toggleSourceView = (button) => {
        if (!sourceView) return;
        sourceMode = !sourceMode;
        button.classList.toggle('active', sourceMode);
        const buttons = toolbar.querySelectorAll('button');
        buttons.forEach(btn => { if (btn !== button) btn.disabled = sourceMode; });

        if (sourceMode) {
            sourceView.value = editor.innerHTML;
            editor.style.display = 'none';
            sourceView.style.display = 'block';
            sourceView.style.height = (editor.offsetHeight || 350) + 'px';
        } else {
            editor.innerHTML = sourceView.value;
            sourceView.style.display = 'none';
            editor.style.display = 'block';
        }
    };

    const updateToolbarState = () => {
        if (sourceMode) return;
        commands.forEach(config => {
            if (config.divider || config.type === 'action' || config.type === 'custom') return;
            const selector = config.value ? `button[data-command="${config.command}"][data-value="${config.value}"]` : `button[data-command="${config.command}"]`;
            const button = toolbar.querySelector(selector);
            if (!button) return;

            let isActive = false;
            try {
                if (config.type === 'state') isActive = document.queryCommandState(config.command);
                else if (config.type === 'value') {
                    const value = document.queryCommandValue(config.command);
                    if (config.command === 'formatBlock' && value) isActive = (value.toLowerCase() === config.value.toLowerCase());
                }
            } catch (err) {}

            if (isActive) button.classList.add('active');
            else button.classList.remove('active');
        });
    };

    toolbar.innerHTML = '';
    commands.forEach(cmd => toolbar.appendChild(createButton(cmd)));

    if (sourceView && sourceView.value) editor.innerHTML = sourceView.value;
    else if (!editor.innerHTML.trim()) editor.innerHTML = '<p><br></p>';

    const syncContent = () => { if (!sourceMode && sourceView) sourceView.value = editor.innerHTML; };
    editor.addEventListener('input', syncContent);
    document.addEventListener('selectionchange', () => {
        if (window.getSelection().rangeCount > 0 && editor.contains(window.getSelection().getRangeAt(0).commonAncestorContainer)) updateToolbarState();
    });
    editor.addEventListener('click', updateToolbarState);
    editor.addEventListener('keyup', updateToolbarState);
    const form = editor.closest('form');
    if (form) form.addEventListener('submit', syncContent);
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initializePulseEditor };
} else if (typeof window !== 'undefined') {
    window.initializePulseEditor = initializePulseEditor;
}
