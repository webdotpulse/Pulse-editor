# Pulse Editor 2.0

A modern, lightweight, dependency-free AI-powered rich text and code editor for the web.

![Pulse Editor](https://img.shields.io/badge/Pulse-2.0.0-6366f1)
![License](https://img.shields.io/badge/License-MIT-green)
![Dependencies](https://img.shields.io/badge/Dependencies-None-blue)

---

## ✨ Features

- 🪄 **Generative AI Suite (Google Gemini 2.5):**
  - **Custom AI Prompt:** Freeform rewriting, elaboration, or generation at cursor position.
  - **Grammar & Spell Check:** Flawless proofreading while maintaining exact HTML tags and structure.
  - **Text Expansion (Expand):** Expand short thoughts or outlines into complete, well-formed paragraphs.
  - **Tone & Style Presets:** Professional, Casual, Persuasive, Academic, Concise, and Creative.
  - **Summarization:** Executive summary and bullet-point generation.
  - **Translation:** Instant multi-language translation (English, Spanish, French, German, Dutch, Italian, etc.).
  - **SEO Optimizer:** Keyphrases, heading structure recommendations, and meta descriptions.
  - **Auto Tags & Categories:** Automatic topic extraction and tagging.

- 💬 **Floating Bubble Selection Menu:**
  - Medium / Notion style floating formatting menu appearing directly over selected text.

- 🖼️ **Interactive Image Resizer & Tools:**
  - Interactive alignment (Left, Center, Right, Inline), sizing presets (25%, 50%, 100%), and quick controls.

- 📊 **Table Management:**
  - Insert tables, add/remove rows and columns, format table headers, and responsive styling.

- 💻 **Code Mode & Rich Text Code Blocks:**
  - Full Code Editor mode with syntax highlighting for JavaScript, HTML, CSS, Python, PHP, JSON, and SQL.
  - Line numbers gutter with block folding (`{...}`, `[...]`, `<tag>...</tag>`).
  - Tab indentation and auto-closing bracket handling.
  - Code block insertion with Highlight.js in Rich Text mode.

- 🔍 **Search & Replace Engine:**
  - Safe TreeWalker search and replace in **Rich Text Mode** without altering DOM structure.
  - RegExp, case matching, Next / Previous navigation, Replace, and Replace All in both Rich Text and Code Mode.

- 🌓 **Dark Mode & CSS Design System:**
  - Built-in light/dark theme toggle and CSS Custom Properties for easy theme customization.

- 📊 **Live Word & Character Statistics:**
  - Real-time word count, character count, and estimated reading time status bar.

- 🧩 **Multi-Instance & Framework Friendly:**
  - 100% scoped without DOM ID collisions. Works out of the box with Vanilla JS, React, Vue 3, Svelte, and Angular.

---

## 🚀 Quick Start

### 1. Include CSS and JS

```html
<link rel="stylesheet" href="editor.css">
<script src="editor.js"></script>
```

### 2. Add Editor HTML

```html
<div class="editor-container">
    <div id="toolbar"></div>
    <div id="editor"></div>
    <textarea id="source" style="display:none;"></textarea>
</div>
```

### 3. Initialize Editor

```javascript
document.addEventListener('DOMContentLoaded', () => {
    const editor = initializePulseEditor('toolbar', 'editor', 'source', {
        apiKey: 'YOUR_GEMINI_API_KEY', // or set window.geminiApiKey
        placeholder: 'Write your story...',
        theme: 'auto', // 'light' | 'dark' | 'auto'
        floatingMenu: true,
        stats: true,
        onChange: ({ html, text }) => {
            console.log('Content changed:', text.length);
        }
    });
});
```

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
| :--- | :--- |
| `Ctrl + B` (`Cmd + B`) | Bold |
| `Ctrl + I` (`Cmd + I`) | Italic |
| `Ctrl + U` (`Cmd + U`) | Underline |
| `Ctrl + K` (`Cmd + K`) | Insert / Edit Link |
| `Ctrl + F` (`Cmd + F`) | Open Search & Replace |
| `Ctrl + H` (`Cmd + H`) | Open Search & Replace |
| `Ctrl + Z` (`Cmd + Z`) | Undo |
| `Ctrl + Y` (`Cmd + Y`) | Redo |
| `Ctrl + /` (`Cmd + /`) | Open Shortcuts Cheatsheet |
| `Tab` | Indent (in Code Mode) |
| `Esc` | Close Search Panel / Modals |

---

## 🛠️ API Reference

### `initializePulseEditor(toolbarTarget, editorTarget, sourceTarget, options)`

Returns a controller instance:

```javascript
const editor = initializePulseEditor(toolbar, editorEl, sourceEl, options);
```

#### Options

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `apiKey` | `string` | `""` | Google Gemini API Key |
| `theme` | `string` | `"auto"` | `"light"`, `"dark"`, or `"auto"` |
| `placeholder` | `string` | `""` | Placeholder text when empty |
| `floatingMenu`| `boolean`| `true` | Enable/disable floating selection toolbar |
| `stats` | `boolean` | `true` | Enable/disable bottom status bar |
| `language` | `string` | `""` | Initial code language (`"javascript"`, `"html"`, etc.) |
| `onChange` | `function` | `undefined` | Callback fired on content change |

#### Controller Instance Methods

- `editor.getContent()`: Returns HTML string (or raw code in Code Mode).
- `editor.setContent(html)`: Updates editor content.
- `editor.getMarkdown()`: Exports editor content as Markdown.
- `editor.setMarkdown(markdown)`: Imports and renders Markdown.
- `editor.getText()`: Returns plain text without tags.
- `editor.getStats()`: Returns `{ words, characters, readingTimeMinutes }`.
- `editor.setTheme('dark' | 'light')`: Switches editor theme dynamically.
- `editor.setLanguage(lang)`: Switches between Rich Text (`""`) and Code Mode (`"javascript"`, `"html"`, etc.).
- `editor.execCommand(command, value)`: Executes a formatting or editor command programmatically.
- `editor.focus()` / `editor.blur()`: Manages keyboard focus.
- `editor.destroy()`: Tears down all dynamic DOM elements and listeners.

---

## 📄 License

MIT © [webdotpulse](https://github.com/webdotpulse/Pulse-editor)