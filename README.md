# Toucan Quiz

<img src="public/logo.png" alt="Toucan Quiz" width="96" />

A React quiz app with Markdown, math ($\LaTeX$ via KaTeX), and Mermaid diagram support. Supports two modes: static JSON files or a REST API backend.

---

## Quick Start

```bash
npm install
cp -r data_example public/data   # copy sample quizzes for static mode
npm run dev
```

Open http://localhost:5173.

---

## Application Modes

Set in `public/config.json` (loaded at runtime — no rebuild needed):

### Static mode (default)
```json
{
  "mode": "static",
  "quizzes_per_page": 20
}
```

Quiz data is loaded from `public/data/` (gitignored). This directory is **not committed** — you must create it yourself:

```bash
cp -r data_example public/data
```

Then add your own quiz JSON files.

### API backend mode
```json
{
  "mode": "api",
  "backend_url": "https://api.example.com",
  "signin_page_url": "https://auth.example.com/login",
  "quizzes_per_page": 20
}
```

- `backend_url` — base URL of your API server (see [API Specification](#api-specification) below)
- `signin_page_url` — where to redirect on 401 (a `?returnUrl=` query param is appended)
- `quizzes_per_page` — number of quizzes shown per page on the home screen (default: 10)

---

## Quiz List

The home page shows all quizzes with search, filtering, and sorting:

- **Name search** — filters by quiz title (case-insensitive substring match)
- **Tags** — click one or more tag badges to filter; all selected tags must be present (AND logic)
- **Language** — click one or more language badges to filter; shows quizzes matching any selected language (OR logic). Language names are displayed in English (e.g. Polish, Spanish)
- **Sort** — sort by Date created, Date modified, or Name; toggle ascending/descending

---

## Quiz Data Format

### `public/data/index.json`

List of quiz summaries (used for the home page):

```json
{
  "quizzes": [
    {
      "id": "uuid",
      "name": "Quiz Name",
      "description": "Optional **Markdown** description",
      "tags": ["tag1", "tag2"],
      "mode": "practice",
      "pass_threshold": 70,
      "question_limit": null,
      "question_count": 10,
      "language": "en",
      "created_at": "2024-01-01T00:00:00Z",
      "modified_at": null
    }
  ]
}
```

### `public/data/{uuid}.json`

Full quiz file:

```json
{
  "id": "uuid",
  "name": "Quiz Name",
  "description": "Supports **Markdown**, $math$, and mermaid charts",
  "tags": ["math", "beginner"],
  "mode": "practice",
  "pass_threshold": 70,
  "question_limit": null,
  "language": "en",
  "created_at": "2024-01-01T00:00:00Z",
  "modified_at": null,
  "questions": [
    {
      "id": "uuid",
      "text": "What is $x$ if $x^2 = 4$?",
      "type": "single_choice",
      "choices": [
        { "id": "uuid", "text": "$x = 2$", "is_correct": true },
        { "id": "uuid", "text": "$x = 4$", "is_correct": false }
      ],
      "explanation": "Shown after answering in practice mode.",
      "tags": []
    }
  ]
}
```

#### Field reference

| Field | Type | Description |
|---|---|---|
| `mode` | `"practice"` \| `"exam"` | `exam` requires API backend |
| `pass_threshold` | `number` (0–100) | Minimum % score to pass |
| `question_limit` | `number` \| `null` | If set, randomly selects this many questions per session |
| `question_count` | `number` | Total number of questions in the quiz (index only) |
| `language` | `string` | BCP 47 language code, e.g. `"en"`, `"pl"`, `"es"` |
| `created_at` | ISO 8601 string | Creation timestamp |
| `modified_at` | ISO 8601 string \| `null` | Last modification timestamp, or `null` if never modified |
| `question.type` | `"single_choice"` \| `"multiple_choice"` \| `"text"` \| `"open"` | Answer type |
| `question.explanation` | `string` | Shown after answering in practice mode (supports rich content) |

**Question types:**
- `single_choice` — one correct answer (radio)
- `multiple_choice` — one or more correct answers (checkboxes)
- `text` — free-text input matched against a list of accepted answers (case-insensitive)
- `open` — essay/short answer; shown explanation only, not graded

All text fields (`description`, `question.text`, `choice.text`, `explanation`) support **Markdown**, **KaTeX math** (`$inline$`, `$$block$$`), and **Mermaid diagrams** (fenced code block with ` ```mermaid `).

---

## Quiz Modes

### Practice mode
- Correct answer and explanation shown after each question
- Full review page at the end (filter: all / correct / incorrect)
- Works in both static and API modes

### Exam mode
- No feedback shown during the quiz
- Answers submitted to the API backend on completion
- **Requires API backend mode** (`config.json` `mode: "api"`)

---

## Keyboard Shortcuts (during quiz)

| Key | Action |
|---|---|
| `↑` / `↓` | Navigate between answer choices |
| `←` / `→` | Same as up/down |
| `Space` | Select / toggle focused choice |
| `Enter` | Confirm answer / advance to next question |

For free-text questions (`type: "text"`), keyboard navigation is suspended so you can type normally.

---

## API Specification

Base URL: `{backend_url}/api/v1`

Authentication: Bearer token or session cookie. All endpoints return `401` when unauthenticated — the frontend redirects to `signin_page_url?returnUrl=<current_url>`.

### Endpoints

#### `GET /quizzes`
Returns list of quiz summaries.

**Response:** `QuizSummary[]`
```json
[
  {
    "id": "uuid",
    "name": "Quiz Name",
    "description": "...",
    "tags": [],
    "mode": "practice",
    "pass_threshold": 70,
    "question_limit": null,
    "question_count": 10,
    "language": "en",
    "created_at": "2024-01-01T00:00:00Z",
    "modified_at": null
  }
]
```

#### `GET /quizzes/:id`
Returns a full quiz with all questions.

**Response:** `Quiz` — same shape as the static data format.

> **Note for exam mode:** Do not include `"is_correct": true` on `choice` objects. The frontend uses this field to evaluate answers in practice mode.

#### `POST /sessions`
Creates a server-side session (optional — only needed for exam tracking).

**Request:**
```json
{ "quiz_id": "uuid" }
```

**Response:**
```json
{ "session_id": "uuid" }
```

#### `POST /sessions/:session_id/submit`
Submits exam answers.

**Request:**
```json
{
  "answers": [
    {
      "question_id": "uuid",
      "selected_choice_ids": ["uuid"],
      "text_response": "",
      "is_correct": null,
      "answered_at": 1700000000000
    }
  ]
}
```

**Response:** `ExamResult`
```json
{
  "session_id": "uuid",
  "score": 85,
  "passed": true,
  "submitted_at": "2024-01-01T12:00:00Z"
}
```

#### `GET /sessions/:session_id/result`
Retrieves a previously submitted result (e.g., after page reload).

**Response:** `ExamResult` (same shape as submit response)

---

## Development

```bash
npm run dev       # start dev server
npm run build     # production build (TypeScript check + Vite)
npm run preview   # preview production build
npm run lint      # ESLint
```

---

## Tech Stack

- [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite 6](https://vitejs.dev/)
- [TailwindCSS 3](https://tailwindcss.com/)
- [React Router 6](https://reactrouter.com/)
- [react-markdown](https://github.com/remarkjs/react-markdown) + [remark-math](https://github.com/remarkjs/remark-math) + [rehype-katex](https://github.com/remarkjs/remark-math/tree/main/packages/rehype-katex) for Markdown + math
- [Mermaid](https://mermaid.js.org/) for diagrams (lazy-loaded)
