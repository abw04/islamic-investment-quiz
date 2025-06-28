# Islamic Investment Quiz

A modern React-based web application that helps users determine their Shariah-compliant investment risk profile through an interactive questionnaire.

## Features

- **Interactive Risk Assessment**: 6-question quiz to evaluate investment risk tolerance
- **Shariah-Compliant Focus**: All recommendations adhere to Islamic finance principles
- **Personalized Results**: Risk profiling categorizes users as Cautious Saver, Balanced Grower, or Growth Seeker
- **Investment Recommendations**: Detailed suggestions for halal investment platforms and instruments
- **Modern UI**: Clean, responsive design using shadcn/ui components and Tailwind CSS
- **Mobile Responsive**: Optimized for all device sizes

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite with SWC
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Routing**: React Router DOM
- **State Management**: React useState (no external state library)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/abw04/islamic-investment-quiz.git
cd islamic-investment-quiz
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:8080`

## Available Scripts

- `npm run dev` - Start development server (port 8080)
- `npm run build` - Build for production
- `npm run build:dev` - Build for development
- `npm run lint` - Run ESLint code quality checks
- `npm run preview` - Preview production build

## Testing the Application

### Manual Testing Steps

1. **Landing Page**: Verify the introduction loads with Islamic finance information
2. **Quiz Flow**: Complete all 6 questions and ensure scoring works correctly
3. **Results Page**: Check that risk profile displays based on score ranges:
   - 14+ points: "Cautious Saver"
   - 9-13 points: "Balanced Grower" 
   - <9 points: "Growth Seeker"
4. **Recommendations**: Verify investment suggestions match the risk profile
5. **Navigation**: Test back/forward buttons and page transitions
6. **Responsive Design**: Test on different screen sizes (mobile, tablet, desktop)

### Browser Testing

Test the application in:
- Chrome/Chromium
- Firefox
- Safari
- Edge

### Code Quality

Run linting to check for code quality issues:
```bash
npm run lint
```

Build the project to check for TypeScript errors:
```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── LandingPage.tsx     # Introduction and quiz start
│   ├── Quiz.tsx            # 6-question risk assessment
│   ├── Results.tsx         # Risk profile display
│   ├── Recommendations.tsx # Investment suggestions
│   └── ui/                 # shadcn/ui components
├── pages/
│   ├── Index.tsx           # Main application flow
│   └── NotFound.tsx        # 404 page
├── hooks/                  # Custom React hooks
├── lib/
│   └── utils.ts           # Utility functions
└── main.tsx               # Application entry point
```

## Deployment

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

### Deployment Options

- **Vercel**: Connect your GitHub repository for automatic deployments
- **Netlify**: Drag and drop the `dist/` folder or connect via Git
- **GitHub Pages**: Use GitHub Actions to deploy the built files
- **Any Static Host**: Upload the contents of `dist/` to your web server

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Built with modern React ecosystem tools
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)
- Focus on Islamic finance principles and Shariah compliance