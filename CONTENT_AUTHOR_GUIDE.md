# Content Author Guide

This project is currently data-driven from a single JSON file:

- `src/data/content.json`

It uses placeholder text only. To add real material later, follow this guide.

## 1) Data Structure You Need To Fill

Each subject contains chapters, and each chapter contains 3 sections:

- `long-questions`
- `short-questions-mnemonics`
- `paper-presentation-tips`

Each section supports:

- `files` (PDF or hosted files)
- `externalLinks` (Google Drive links)

Both support:

- `viewUrl`
- `downloadUrl`

## 2) Quick Copy Template

Use this as your chapter template when adding content in `src/data/content.json`:

```json
{
  "slug": "chapter-01",
  "name": "Chapter 01",
  "description": "Add your notes here.",
  "sections": [
    {
      "id": "long-questions",
      "title": "Long Questions",
      "placeholder": "Add your notes here.",
      "files": [
        {
          "id": "long-pdf-1",
          "title": "Chapter 01 Long Questions PDF",
          "provider": "pdf",
          "viewUrl": "https://your-domain.com/files/ch01-long.pdf",
          "downloadUrl": "https://your-domain.com/files/ch01-long.pdf",
          "note": "Optional helper text."
        }
      ],
      "externalLinks": [
        {
          "id": "long-drive-1",
          "title": "Google Drive Long Questions",
          "provider": "google-drive",
          "viewUrl": "https://drive.google.com/file/d/FILE_ID/view",
          "downloadUrl": "https://drive.google.com/uc?export=download&id=FILE_ID",
          "note": "Replace FILE_ID with real id."
        }
      ]
    },
    {
      "id": "short-questions-mnemonics",
      "title": "Short Questions / Mnemonics",
      "placeholder": "Add your notes here.",
      "files": [],
      "externalLinks": []
    },
    {
      "id": "paper-presentation-tips",
      "title": "Paper Presentation Tips",
      "placeholder": "Add your notes here.",
      "files": [],
      "externalLinks": []
    }
  ]
}
```

## 3) Google Drive Link Format

If your share link is:

`https://drive.google.com/file/d/1AbCDeFGhIJkLMnoPQRstuVwXyZ/view?usp=sharing`

Then:

- `viewUrl`: `https://drive.google.com/file/d/1AbCDeFGhIJkLMnoPQRstuVwXyZ/view`
- `downloadUrl`: `https://drive.google.com/uc?export=download&id=1AbCDeFGhIJkLMnoPQRstuVwXyZ`

## 4) Add New Subject

In `src/data/content.json`, add another object inside `subjects`:

```json
{
  "slug": "english",
  "name": "English",
  "classLevels": ["9th", "10th", "11th", "12th"],
  "chapters": []
}
```

## 5) Add New Chapter

Inside a subject's `chapters` array in `src/data/content.json`, add a chapter object using the template from Section 2.

## 6) Verify Changes

Run:

```bash
npm run lint
npm run build
```

If both pass, your data shape is valid.
