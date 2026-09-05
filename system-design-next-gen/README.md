# System Design Field Guide

A learner-first dashboard for the Markdown notes in the parent `system-design` repository.

## Commands

```bash
npm install
npm run dev
npm run build
```

The generator reads `../notes/*.md`, writes sanitized HTML and a catalog to `public/generated`, and links to PDFs in the parent repository without copying them.
