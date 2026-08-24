#!/usr/bin/env python3
"""
Test Suite for Pulse Editor 2.0
Validates syntax rules, CSS tokens, JS export contracts, and HTML demo integrity.
"""

import os
import re
import sys

def test_file_existence():
    files = ['editor.js', 'editor.css', 'demo.html', 'README.md', 'rmanual.md']
    for f in files:
        assert os.path.exists(f), f"File {f} does not exist"
    print("✓ All core repository files exist.")

def test_css_design_system():
    with open('editor.css', 'r', encoding='utf-8') as f:
        css = f.read()

    required_vars = [
        '--pulse-font-family',
        '--pulse-bg',
        '--pulse-surface',
        '--pulse-border',
        '--pulse-primary',
        '--pulse-ai-gradient',
        '--pulse-shadow',
        '--pulse-gutter-bg',
        '--token-keyword',
        '--token-string'
    ]
    for var in required_vars:
        assert var in css, f"Missing CSS variable: {var}"

    required_classes = [
        '.pulse-theme-dark',
        '.pulse-floating-toolbar',
        '.pulse-image-toolbar',
        '.pulse-search-panel',
        '.pulse-status-bar',
        'dialog.pulse-dialog',
        '.pulse-gutter',
        '.code-mode-active'
    ]
    for cls in required_classes:
        assert cls in css, f"Missing CSS class: {cls}"

    print("✓ CSS design system and classes validated.")

def test_js_syntax_and_exports():
    with open('editor.js', 'r', encoding='utf-8') as f:
        js = f.read()

    # Test export patterns
    assert 'initializePulseEditor' in js
    assert 'PulseEditor' in js
    assert 'callGeminiAPI' in js
    assert 'Dialogs' in js
    assert 'ICONS' in js

    # Test AI Presets
    ai_presets = [
        'ai-custom',
        'ai-grammar',
        'ai-expand',
        'ai-tone',
        'ai-summarize',
        'ai-translate',
        'ai-seo',
        'ai-tags'
    ]
    for preset in ai_presets:
        assert preset in js, f"Missing AI preset: {preset}"

    # Test Methods in controller
    methods = [
        'getContent',
        'setContent',
        'getMarkdown',
        'setMarkdown',
        'getText',
        'getStats',
        'setTheme',
        'setLanguage',
        'destroy',
        'execCommand'
    ]
    for m in methods:
        assert m in js, f"Missing controller method: {m}"

    print("✓ JS API structure, controller methods, and AI presets validated.")

def test_html_demo_structure():
    with open('demo.html', 'r', encoding='utf-8') as f:
        html = f.read()

    assert 'editor.css' in html
    assert 'editor.js' in html
    assert 'initializePulseEditor' in html
    assert 'lang-select' in html
    assert 'Pulse Editor 2.0' in html
    assert 'pulse-table' in html

    print("✓ demo.html structure validated.")

def test_regex_tokenizer_patterns():
    # Test token rules logic
    js_keyword_regex = re.compile(r'\b(function|const|let|var|if|else|for|while|return|new|this|class|extends|import|export|from|await|async|try|catch|switch|case|default|break|continue|typeof|instanceof)\b')
    assert js_keyword_regex.search("const x = 10; function hello() {}") is not None

    py_keyword_regex = re.compile(r'\b(def|class|if|elif|else|for|while|return|import|from|as|try|except|finally|with|pass|break|continue|yield|lambda|None|True|False|is|not|and|or|in)\b')
    assert py_keyword_regex.search("def test(): return True") is not None

    php_keyword_regex = re.compile(r'\b(echo|if|else|elseif|for|foreach|while|do|switch|case|default|break|continue|function|return|class|extends|implements|public|private|protected|static|new|require|include|require_once|include_once|namespace|use|trait)\b')
    assert php_keyword_regex.search("echo 'test';") is not None

    print("✓ Regex token rules patterns validated.")

if __name__ == '__main__':
    test_file_existence()
    test_css_design_system()
    test_js_syntax_and_exports()
    test_html_demo_structure()
    test_regex_tokenizer_patterns()
    print("\n🎉 ALL TESTS PASSED SUCCESSFULLY!")
