# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Start development server**: `npm run dev` (runs on port 8080)
- **Build for production**: `npm run build`
- **Build for development**: `npm run build:dev`
- **Lint code**: `npm run lint`
- **Preview production build**: `npm run preview`

## Project Architecture

This is an Islamic investment quiz application built with React, TypeScript, and Vite. The app guides users through a risk assessment quiz and provides personalized Shariah-compliant investment recommendations.

### Core Application Flow

The app follows a single-page application pattern with step-based navigation managed in `src/pages/Index.tsx`:

1. **Landing Page** (`src/components/LandingPage.tsx`) - Introduction and quiz start
2. **Quiz** (`src/components/Quiz.tsx`) - 6-question risk assessment
3. **Results** (`src/components/Results.tsx`) - Risk profile display  
4. **Recommendations** (`src/components/Recommendations.tsx`) - Personalized investment options

### Key Components Structure

- **Quiz Logic**: Hardcoded 6 questions with scoring system (1-3 points per answer)
- **Risk Profiling**: Score ranges determine risk categories:
  - 14+ points: "Cautious Saver"
  - 9-13 points: "Balanced Grower" 
  - <9 points: "Growth Seeker"
- **Investment Data**: Static instrument definitions in `Recommendations.tsx` with detailed platform info

### Technology Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **Build Tool**: Vite with SWC
- **Routing**: React Router DOM
- **State Management**: React useState (no external state library)
- **UI Library**: shadcn/ui components (extensive set in `src/components/ui/`)

### Path Aliases

The project uses `@/*` path alias pointing to `src/*` directory. All imports use absolute paths with the `@/` prefix.

### Shariah Compliance Focus

The application specifically targets Islamic finance principles:
- All investment recommendations are Shariah-compliant
- Includes educational content about halal investment principles
- Features special handling for controversial instruments (e.g. Bitcoin with scholar notes)

### Development Notes

- No test framework is currently configured
- TypeScript config has relaxed settings (noImplicitAny: false, strictNullChecks: false)
- The app is designed to work with Lovable platform for deployment
- Uses Lovable's component tagger in development mode