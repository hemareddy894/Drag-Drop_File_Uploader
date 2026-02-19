// utils.js
// shared helper functions and validation logic
'use strict';

const MAX_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
];

/**
 * Check if a File object meets the allowed type and size restrictions.
 * @param {File} file
 * @returns {{valid: boolean, error: string|null}}
 */
export function validateFile(file) {
    if (!ALLOWED_TYPES.includes(file.type)) {
        return { valid: false, error: 'Unsupported file type' };
    }
    if (file.size > MAX_SIZE) {
        return { valid: false, error: 'File exceeds 5MB limit' };
    }
    return { valid: true, error: null };
}

/**
 * Convert bytes to human-readable string.
 * @param {number} bytes
 * @returns {string}
 */
export function formatSize(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Simulate an API upload with a progress callback.
 * @param {File} file
 * @param {function(number):void} onProgress
 * @returns {Promise<void>}
 */
export function fakeUpload(file, onProgress) {
    return new Promise((resolve) => {
        const total = 100;
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 20;
            if (progress >= total) {
                onProgress(100);
                clearInterval(interval);
                setTimeout(resolve, 200); // delay to show bar full
            } else {
                onProgress(Math.floor(progress));
            }
        }, 200);
    });
}

/**
 * Simple counter to manage dragenter/dragleave events
 */
export class DragCounter {
    constructor() {
        this.counter = 0;
    }
    increment() {
        this.counter += 1;
        return this.counter;
    }
    decrement() {
        this.counter -= 1;
        return this.counter;
    }
}
