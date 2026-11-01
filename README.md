# Utsav: AI Celebration & Event Planner

PromptWars Challenge 5. Plan weddings, birthdays and community events with an AI-generated budget, countdown timeline, vendor checklists and personalized ideas.

## Features
- Inputs: event type, date, guests, budget (INR), city, theme, notes
- Budget breakdown (normalised to 100%), dated timeline, vendor checklists, ideas
- Follow-up chat to change the plan ("cut the budget by 20%")
- Offline fallback planner if the AI is unavailable
- Print / save as PDF, keyboard accessible, live status messages

## Gen AI
Google Gemini 2.5 Flash (JSON mode) generates and revises the plan. Output is validated and budget percentages are re-normalised before rendering.

## Security
The Gemini key lives in a Netlify environment variable and is only used by `netlify/functions/plan.js`. The function validates input type and size. No key is stored in this repo.

## Run and test
```
npm test
```
Deploy on Netlify and set `GEMINI_API_KEY`.

## Structure
- `index.html`: UI and logic
- `netlify/functions/plan.js`: secure Gemini proxy
- `tests/plan.test.js`: function tests
