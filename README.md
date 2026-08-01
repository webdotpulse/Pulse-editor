# Pulse-editor

A lightweight, dependency-free AI-powered rich text and code editor.

## Features

- **Rich Text Editing:** Bold, italic, headings, lists, tables, links, images, and colors.
- **Generative AI Features:** Grammar correction, summarization, tone adjustment, and translation via the Gemini API.
- **Markdown Support:** Import and export capabilities dynamically load marked.js and turndown.js when invoked.
- **Code Editing Mode:**
  - Full syntax highlighting for PHP, HTML, CSS, JavaScript, and JSON.
  - Line numbers via a synchronized visual gutter.
  - Code folding of blocks (`{...}`, `[...]`, `<tag>...</tag>`).
- **Search & Replace:** Substring and Regular Expression search toggles, Next/Previous matching, Replace, and Replace All logic.

## Usage

### UI Integration

The `initializePulseEditor(toolbarId, editorId, sourceId, geminiApiKey)` function takes strings or DOM element references to initialize the editor.

**Example HTML structure:**
```html
<div class="editor-container">
    <!-- Optional: Language and Search controls for Code Mode -->
    <select id="lang-select">
        <option value="">Rich Text</option>
        <option value="html">HTML</option>
        <option value="css">CSS</option>
        <option value="javascript">JavaScript</option>
        <option value="json">JSON</option>
        <option value="php">PHP</option>
    </select>
    <button id="search-btn">Search (Ctrl+F)</button>

    <!-- Editor Elements -->
    <div id="toolbar"></div>
    <div id="editor" class="editor-content-area"></div>
    <textarea id="source"></textarea>
</div>
```

### Search Shortcuts

When focused on the editor, press `Ctrl+F` (or `Cmd+F` on macOS) to instantly launch the Search & Replace panel.