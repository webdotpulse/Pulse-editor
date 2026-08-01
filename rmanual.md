# Pulse-editor Manual

Welcome to the Pulse-editor manual! Pulse-editor is a lightweight, AI-powered rich text editor that provides advanced editing features, generative AI formatting and translation, and a customizable UI.

## Introduction
The Pulse-editor gives you standard rich text options (bold, italic, lists, headers, etc) along with intelligent AI presets using the Gemini API. Presets include grammar correction, summarizing, translating, and switching to a professional tone.

## Setup & Configuration

### Standard HTML Setup (Vanilla JS)
To use the editor in standard HTML environments, include the CSS and JS files, create the necessary DOM elements, and initialize the editor.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <link rel="stylesheet" href="path/to/editor.css">
</head>
<body>
    <div class="editor-container">
        <!-- The Toolbar -->
        <div id="pulse-toolbar"></div>

        <!-- The Rich Text Editor -->
        <div id="pulse-editor" class="editor-content-area"></div>

        <!-- The Source Code View (Optional) -->
        <textarea id="pulse-source"></textarea>
    </div>

    <script src="path/to/editor.js"></script>
    <script>
        // Provide your Gemini API key, or define window.geminiApiKey before initialization
        document.addEventListener('DOMContentLoaded', () => {
            initializePulseEditor('pulse-toolbar', 'pulse-editor', 'pulse-source', 'YOUR_API_KEY');
        });
    </script>
</body>
</html>
```

### Advanced Framework Setup (React, Vue, Svelte)
Pulse-editor now allows passing direct DOM elements (e.g., via React `refs`) instead of just string IDs, making it framework-agnostic.

**React Example:**
```jsx
import React, { useEffect, useRef } from 'react';
import { initializePulseEditor } from './editor.js'; // Ensure the file is in your source directory
import './editor.css';

const PulseEditor = ({ apiKey }) => {
    const toolbarRef = useRef(null);
    const editorRef = useRef(null);
    const sourceRef = useRef(null);

    useEffect(() => {
        if (toolbarRef.current && editorRef.current) {
            // Passing the ref currents directly
            initializePulseEditor(toolbarRef.current, editorRef.current, sourceRef.current, apiKey);
        }
    }, [apiKey]);

    return (
        <div className="editor-container">
            <div ref={toolbarRef}></div>
            <div ref={editorRef} className="editor-content-area"></div>
            <textarea ref={sourceRef}></textarea>
        </div>
    );
};

export default PulseEditor;
```

**Vue 3 Example:**
```vue
<template>
  <div class="editor-container">
    <div ref="toolbar"></div>
    <div ref="editor" class="editor-content-area"></div>
    <textarea ref="source"></textarea>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { initializePulseEditor } from './editor.js';
import './editor.css';

const toolbar = ref(null);
const editor = ref(null);
const source = ref(null);
const apiKey = 'YOUR_API_KEY';

onMounted(() => {
    initializePulseEditor(toolbar.value, editor.value, source.value, apiKey);
});
</script>
```

### Gemini API Key Configuration
The Gemini API key can be provided in two ways:
1. Passed as the fourth argument to `initializePulseEditor(toolbar, editor, source, apiKey)`.
2. Set globally on `window.geminiApiKey` before any AI tools are used.

## Usage Guidelines
- The editor automatically synchronizes the content with the source textarea (`sourceId`) during input and form submissions, provided `sourceId` exists.
- The AI tools dynamically rewrite HTML internally, maintaining exact tag structures so you do not lose your formatting during grammatical or professional updates.
- If you do not wish to provide a source view, pass `null` as the 3rd parameter to `initializePulseEditor`. The code editor mode toggle will gracefully fall back.
