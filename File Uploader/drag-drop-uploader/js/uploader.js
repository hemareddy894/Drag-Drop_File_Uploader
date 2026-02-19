// uploader.js
// Main application logic for drag & drop uploader
'use strict';

import { validateFile, fakeUpload, DragCounter } from './utils.js';
import { createFileListItem, updateStats, flashMessage, toggleTheme, setProgress, showDragPreview, clearDragPreview } from './ui.js';

class Uploader {
    constructor() {
        this.files = [];
        this.totalSize = 0;
        this.dragCounter = new DragCounter();

        this.dropZone = document.getElementById('drop-zone');
        this.fileInput = document.getElementById('file-input');
        this.fileList = document.getElementById('file-list');
        this.clearBtn = document.getElementById('clear-all');
        this.modeToggle = document.getElementById('mode-toggle');

        this.attachEvents();
        this.updateUI();
    }

    attachEvents() {
        // drag & drop
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(evt => {
            this.dropZone.addEventListener(evt, this.handleDrag.bind(this));
        });
        this.dropZone.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') {
                this.fileInput.click();
            }
        });
        this.fileInput.addEventListener('change', e => this.handleFiles(e.target.files));

        // delegation for remove buttons
        this.fileList.addEventListener('click', e => {
            if (e.target.classList.contains('remove-btn')) {
                const li = e.target.closest('li');
                this.removeFile(li.dataset.filename);
            }
        });

        this.clearBtn.addEventListener('click', () => this.clearAll());
        this.modeToggle.addEventListener('click', toggleTheme);
    }

    handleDrag(e) {
        e.preventDefault();
        const { type } = e;
        const names = this.extractNames(e);
        if (type === 'dragenter') {
            this.dragCounter.increment();
            this.dropZone.classList.add('drag-over');
            showDragPreview(names);
        } else if (type === 'dragleave') {
            if (this.dragCounter.decrement() === 0) {
                this.dropZone.classList.remove('drag-over');
                clearDragPreview();
            }
        } else if (type === 'dragover') {
            e.dataTransfer.dropEffect = 'copy';
            showDragPreview(names);
        } else if (type === 'drop') {
            this.dropZone.classList.remove('drag-over');
            this.dragCounter.counter = 0;
            clearDragPreview();
            this.handleFiles(e.dataTransfer.files);
        }
    }

    /**
     * Read names from dataTransfer object so we can preview during drag.
     * @param {DragEvent} e
     * @returns {string[]}
     */
    extractNames(e) {
        const items = e.dataTransfer?.items;
        if (!items) return [];
        const names = [];
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            if (item.kind === 'file') {
                names.push(item.getAsFile()?.name || '');
            }
        }
        return names;
    }

    handleFiles(fileList) {
        Array.from(fileList).forEach(file => {
            const { valid, error } = validateFile(file);
            if (!valid) {
                flashMessage(error, 'error');
            } else {
                this.addFile(file);
            }
        });
    }

    addFile(file) {
        this.files.push(file);
        this.totalSize += file.size;
        const li = createFileListItem(file);
        this.fileList.appendChild(li);
        this.updateUI();
        this.uploadFile(file, li);
    }

    uploadFile(file, li) {
        fakeUpload(file, percent => setProgress(li, percent))
            .then(() => {
                flashMessage(`${file.name} uploaded`, 'success');
            });
    }

    removeFile(name) {
        const index = this.files.findIndex(f => f.name === name);
        if (index !== -1) {
            const file = this.files[index];
            this.totalSize -= file.size;
            this.files.splice(index, 1);
            const li = this.fileList.querySelector(`li[data-filename="${name}"]`);
            if (li) li.remove();
            this.updateUI();
        }
    }

    clearAll() {
        this.files = [];
        this.totalSize = 0;
        this.fileList.innerHTML = '';
        this.updateUI();
    }

    updateUI() {
        updateStats(this.files.length, this.totalSize);
        this.clearBtn.disabled = this.files.length === 0;
    }
}

// initialize when DOM is ready
window.addEventListener('DOMContentLoaded', () => new Uploader());
