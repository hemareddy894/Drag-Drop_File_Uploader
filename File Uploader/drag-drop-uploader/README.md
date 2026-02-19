# Drag & Drop File Uploader

A clean, professional-level drag & drop file uploader built with vanilla HTML, CSS, and JavaScript. Designed as a portfolio-worthy project with modern UI and modular architecture.

## Features

- Drag & drop area with animated highlight
- Click-to-browse file selection
- Multiple file support
- File type validation (images, PDF, Word documents)
- File size validation (max 5MB)
- Simulated upload progress with progress bars
- Image previews
- File list with file name, size, and remove button
- Clear all files button
- File count and total size indicators
- Dark mode toggle
- Accessible (ARIA attributes, keyboard support)
- Modular ES6 code separation (utils, UI, main logic)

## Folder Structure

```
/drag-drop-uploader
    /assets
        /icons        (placeholder for future file type icons)
        /styles
            main.css
            components.css
    /js
        uploader.js
        ui.js
        utils.js
    index.html
    README.md
```

## How to Run

1. Clone or download the repository.
2. Open `index.html` in a modern browser (no server required).
3. Drag files onto the card or click the browse area.

## Screenshots

*(Add screenshots of light and dark mode, upload state, etc.)*

## Future Improvements

- Connect to a real backend API
- Add file-type-specific icons using `/assets/icons`
- Persist uploads in local storage
- Support folder upload
- Add unit tests using a testing framework
- Accessibility audit and enhancements

---

This project is meant to demonstrate clean, scalable front-end architecture without frameworks.