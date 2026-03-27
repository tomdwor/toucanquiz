# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # start dev server (http://localhost:5173)
npm run build     # TypeScript check + Vite production build
npm run preview   # preview production build
npm run lint      # ESLint
```

Before running `dev` or `build` for the first time, copy the sample data:
```bash
cp -r data_example public/data
```

## Architecture

**React + TypeScript + Vite + TailwindCSS + React Router v6.**

### Application modes (`public/config.json`, loaded at runtime)

- `static` — loads quizzes from `public/data/` (gitignored JSON files)
- `api` — calls a REST backend (`backend_url`); redirects to `signin_page_url` on 401

The active mode determines which `IDataService` implementation is used. The factory is in `src/services/createDataService.ts`.

### Service layer (strategy pattern)

`src/services/DataService.ts` defines `IDataService` with `listQuizzes()`, `getQuiz()`, `submitExamSession()`. Two implementations: `StaticDataService` (fetches `/data/*.json`) and `ApiDataService` (fetches `{backend_url}/api/v1/...`). Provided to all components via `ServiceContext`.

### Quiz session state

`src/context/SessionContext.tsx` — `useReducer` holds the entire `QuizSession` object. `src/utils/sessionBuilder.ts` builds the initial session (shuffles questions and choices, applies `question_limit`). Session flows: start → per-question answers → complete → review (practice) or submit (exam).

### Rich content rendering

`src/components/shared/RichContent.tsx` — single component used everywhere content is displayed (quiz description, questions, choices, explanations, review). Pipeline: `react-markdown` → `remark-math` → `rehype-katex` → `rehype-highlight`. Mermaid diagrams rendered by `MermaidChart.tsx` (lazy-loaded via dynamic import to keep initial bundle small).

### Keyboard navigation

`src/hooks/useKeyboardNav.ts` — window-level keydown listener attached in `QuizSessionPage`. Arrow keys move focus between choices (tracked as index, not DOM focus). `Space` selects, `Enter` confirms/advances. Suspended for `text` question type.

### Data file location

Quiz data lives in `public/data/` (gitignored). `public/data/index.json` contains `QuizSummary[]`; each quiz is a separate `public/data/{uuid}.json` file.

### Naming conventions

- `question_limit` — max questions shown per session (subset of total)
- `choices` — answer options within a question
- `explanation` — note shown after answering (practice mode only)
- Question types: `text` | `single_choice` | `multiple_choice`
