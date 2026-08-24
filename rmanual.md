# Pulse Editor 2.0 Manual & Integration Guide

Welcome to the comprehensive reference manual for Pulse Editor 2.0!

Pulse Editor is a lightweight, framework-agnostic rich text and code editor powered by Google Gemini 2.5 Generative AI. It offers a zero-dependency architecture, seamless theme support, table & image tools, floating bubble menu, and multi-instance capabilities.

---

## 1. Installation & Integration

### Vanilla HTML & JavaScript

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="path/to/editor.css">
</head>
<body>
    <div class="editor-container">
        <div id="pulse-toolbar"></div>
        <div id="pulse-editor"></div>
        <textarea id="pulse-source" style="display:none;"></textarea>
    </div>

    <script src="path/to/editor.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const editor = initializePulseEditor('pulse-toolbar', 'pulse-editor', 'pulse-source', {
                apiKey: 'YOUR_GEMINI_API_KEY', // or window.geminiApiKey
                theme: 'auto',
                placeholder: 'Begin typing your document...',
                floatingMenu: true,
                stats: true,
                onChange: ({ html, text }) => {
                    console.log('Document length:', text.length);
                }
            });
        });
    </script>
</body>
</html>
```

### React / Next.js (Client Component)

```jsx
import React, { useEffect, useRef } from 'react';
import { initializePulseEditor } from './editor.js';
import './editor.css';

export default function ReactPulseEditor({ apiKey, initialHtml = '', onChange }) {
    const toolbarRef = useRef(null);
    const editorRef = useRef(null);
    const sourceRef = useRef(null);
    const controllerRef = useRef(null);

    useEffect(() => {
        if (toolbarRef.current && editorRef.current) {
            controllerRef.current = initializePulseEditor(
                toolbarRef.current,
                editorRef.current,
                sourceRef.current,
                {
                    apiKey,
                    floatingMenu: true,
                    stats: true,
                    onChange: (data) => {
                        if (onChange) onChange(data);
                    }
                }
            );

            if (initialHtml) {
                controllerRef.current.setContent(initialHtml);
            }
        }

        return () => {
            if (controllerRef.current) {
                controllerRef.current.destroy();
            }
        };
    }, [apiKey]);

    return (
        <div className="editor-container">
            <div ref={toolbarRef}></div>
            <div ref={editorRef} className="editor-content-area"></div>
            <textarea ref={sourceRef} style={{ display: 'none' }}></textarea>
        </div>
    );
}
```

### Vue 3 (Composition API)

```vue
<template>
  <div class="editor-container">
    <div ref="toolbarEl"></div>
    <div ref="editorEl" class="editor-content-area"></div>
    <textarea ref="sourceEl" style="display: none;"></textarea>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { initializePulseEditor } from './editor.js';
import './editor.css';

const props = defineProps({
  apiKey: String,
  modelValue: String
});
const emit = defineEmits(['update:modelValue', 'change']);

const toolbarEl = ref(null);
const editorEl = ref(null);
const sourceEl = ref(null);
let editorInstance = null;

onMounted(() => {
  editorInstance = initializePulseEditor(
    toolbarEl.value,
    editorEl.value,
    sourceEl.value,
    {
      apiKey: props.apiKey,
      floatingMenu: true,
      stats: true,
      onChange: (data) => {
        emit('update:modelValue', data.html);
        emit('change', data);
      }
    }
  );

  if (props.modelValue) {
    editorInstance.setContent(props.modelValue);
  }
});

onBeforeUnmount(() => {
  if (editorInstance) editorInstance.destroy();
});
</script>
```

---

## 2. Configuration Options

`initializePulseEditor(toolbar, editor, source, options)` accepts the following options:

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `apiKey` | `string` | `""` | Google Gemini API Key. If omitted, the editor looks at `window.geminiApiKey` or prompts the user via an interactive modal. |
| `theme` | `string` | `"auto"` | `"light"`, `"dark"`, or `"auto"` (matches system preferences). |
| `placeholder` | `string` | `""` | Ghost text shown when the editor is completely empty. |
| `floatingMenu`| `boolean` | `true` | Enables the floating bubble selection toolbar on highlighted text. |
| `stats` | `boolean` | `true` | Shows word count, character count, and reading time in the bottom status bar. |
| `language` | `string` | `""` | Initial code mode language (e.g. `"javascript"`, `"html"`, `"css"`, `"python"`, `"php"`, `"json"`). Empty string activates Rich Text mode. |
| `onChange` | `function` | `undefined` | Callback invoked whenever editor content changes: `onChange({ html, text })`. |
| `onInit` | `function` | `undefined` | Callback invoked when initialization finishes: `onInit({ controller })`. |
| `onThemeChange` | `function` | `undefined` | Callback invoked on theme toggle: `onThemeChange({ isDark })`. |
| `onModeChange` | `function` | `undefined` | Callback invoked when switching between Rich Text, Code Mode, or Source View: `onModeChange({ mode })`. |

---

## 3. Instance Controller API

The object returned by `initializePulseEditor(...)` provides the following methods:

- **`getContent()`**: Returns the current HTML string (or raw code string in Code Mode).
- **`setContent(html)`**: Replaces the editor content with the specified HTML (or code).
- **`getMarkdown()`**: Converts the current HTML content to clean Markdown string.
- **`setMarkdown(markdownText)`**: Converts a Markdown string to HTML and loads it into the editor.
- **`getText()`**: Returns the plain unformatted text content.
- **`getStats()`**: Returns `{ words: number, characters: number, readingTimeMinutes: number }`.
- **`setTheme('dark' | 'light')`**: Changes the active theme dynamically.
- **`setLanguage(lang)`**: Switches between Rich Text (`""`) and Code Mode (`"javascript"`, `"python"`, etc.).
- **`execCommand(command, value)`**: Executes any native or custom command programmatically (e.g., `'bold'`, `'insertHTML'`, `'toggleSearch'`).
- **`focus()` / `blur()`**: Sets or removes focus from the editor content area.
- **`on(event, handler)` / `off(event, handler)`**: Subscribes/unsubscribes to events (`'change'`, `'themeChange'`, `'modeChange'`).
- **`destroy()`**: Cleans up DOM event listeners and removes injected subcomponents.

---

## 4. Generative AI Tools (Gemini 2.5)

Pulse Editor includes built-in AI tools designed specifically for rich text editing:

1. **Custom AI Prompt (`ai-custom`)**: Direct instructions for rewriting, extending, or generating content at the cursor.
2. **Grammar & Spelling (`ai-grammar`)**: Accurately fixes typos, spelling, and grammar while retaining all HTML tags and styling.
3. **Expand Text (`ai-expand`)**: Elaborates short notes or brief statements into a complete, coherent paragraph.
4. **Tone Switcher (`ai-tone`)**: Restyles text into Professional, Casual, Persuasive, Academic, Concise, or Creative voice.
5. **Summarize (`ai-summarize`)**: Distills selected text or entire document into executive bullet points or a concise synopsis.
6. **Translate (`ai-translate`)**: Translates selected text to any selected language while keeping styling intact.
7. **SEO Optimizer (`ai-seo`)**: Generates optimized headings, focus keywords, and meta description suggestions.
8. **Tags & Taxonomy (`ai-tags`)**: Recommends category badges and keyword hashtags based on the document content.

---

## 5. Keyboard Shortcuts

- `Ctrl + B` / `Cmd + B`: **Bold**
- `Ctrl + I` / `Cmd + I`: *Italic*
- `Ctrl + U` / `Cmd + U`: <u>Underline</u>
- `Ctrl + K` / `Cmd + K`: Insert or Edit Link
- `Ctrl + F` / `Cmd + F`: Open Search & Replace
- `Ctrl + H` / `Cmd + H`: Open Search & Replace
- `Ctrl + Z` / `Cmd + Z`: Undo
- `Ctrl + Y` / `Cmd + Y`: Redo
- `Ctrl + /` / `Cmd + /`: Open Shortcuts Dialog
- `Tab`: Indent 4 spaces (in Code Mode)
- `Esc`: Close open modal dialog or search panel
