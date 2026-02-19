// ui.js
// This module contains functions that manipulate the DOM and render state.
'use strict';

import { formatSize } from './utils.js';

/**
 * Create a list item element representing a file
 * @param {File} file
 * @returns {HTMLLIElement}
 */
export function createFileListItem(file) {
    const li = document.createElement('li');
    li.dataset.filename = file.name;

    const info = document.createElement('div');
    info.className = 'file-info';

    // thumbnail for images
    if (file.type.startsWith('image/')) {
        const img = document.createElement('img');
        img.src = URL.createObjectURL(file);
        img.alt = file.name;
        info.appendChild(img);
    }

    const text = document.createElement('span');
    text.textContent = `${file.name} (${formatSize(file.size)})`;
    info.appendChild(text);

    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.className = 'remove-btn';
    removeBtn.setAttribute('aria-label', `Remove ${file.name}`);
    removeBtn.textContent = '✖';

    li.appendChild(info);
    li.appendChild(removeBtn);
    return li;
}

/**
 * Update counter / totals displayed in the UI
 * @param {number} count
 * @param {number} totalSize
 */
export function updateStats(count, totalSize) {
    const countEl = document.getElementById('file-count');
    const sizeEl = document.getElementById('total-size');
    countEl.textContent = `${count} file${count === 1 ? '' : 's'}`;
    sizeEl.textContent = formatSize(totalSize);
}

/**
 * Show a temporary message (error or success) in the drop zone
 * @param {string} message
 * @param {string} type - 'error' or 'success'
 */
export function flashMessage(message, type = 'error') {
    const dropZone = document.getElementById('drop-zone');
    const msgEl = document.createElement('div');
    msgEl.className = `flash ${type}`;
    msgEl.textContent = message;
    dropZone.appendChild(msgEl);
    setTimeout(() => {
        msgEl.remove();
    }, 3000);
}

/**
 * Toggle dark mode
 */
export function toggleTheme() {
    const html = document.documentElement;
    const isDark = html.getAttribute('data-theme') === 'dark';
    html.setAttribute('data-theme', isDark ? 'light' : 'dark');
    document.getElementById('mode-toggle').textContent = isDark ? '🌙' : '☀️';
}

/**
 * Animate a progress bar element associated with the given list item
 * @param {HTMLLIElement} li
 * @param {number} percent
 */
export function setProgress(li, percent) {
    let bar = li.querySelector('.progress-bar');
    if (!bar) {
        bar = document.createElement('div');
        bar.className = 'progress-bar';
        const inner = document.createElement('div');
        inner.className = 'progress';
        bar.appendChild(inner);
        li.appendChild(bar);
    }
    const inner = bar.querySelector('.progress');
    inner.style.width = `${percent}%`;
}

/**
 * Show a small preview list of files being dragged over the drop zone.
 * @param {string[]} names
 */
export function showDragPreview(names) {
    clearDragPreview();
    if (names.length === 0) return;
    const dropZone = document.getElementById('drop-zone');
    const preview = document.createElement('div');
    preview.className = 'drag-preview';
    preview.setAttribute('aria-hidden', 'true');
    preview.textContent = 'Drop to upload: ' + names.join(', ');
    dropZone.appendChild(preview);
}

/**
 * Remove any existing drag preview element.
 */
export function clearDragPreview() {
    const dropZone = document.getElementById('drop-zone');
    const existing = dropZone.querySelector('.drag-preview');
    if (existing) existing.remove();
}
