
import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { InfoIcon, ChevronLeft, ChevronRight } from 'lucide-react';

interface QuizProps {
  onComplete: (score: number) => void;
}

interface QuizQuestion {
  id: number;
  question: string;
  explanation?: string;
  category: 'demographics' | 'goals' | 'experience' | 'risk_tolerance' | 'capacity' | 'preferences';
  options: {
    text: string;
    score: number;
    explanation?: string;
  }[];
}

const questions: QuizQuestion[] = [
  {
    id: 1,
    question: "How old are you?",
    explanation: "Age affects your investment timeline and risk capacity. Younger investors typically have more time to recover from market downturns.",
    category: 'demographics',
    options: [
      { text: "Under 25", score: 1, explanation: "Long investment horizon allows for higher risk tolerance" },
      { text: "25–40", score: 2, explanation: "Moderate timeline with balanced approach" },
      { text: "Over 40", score: 3, explanation: "Shorter timeline suggests more conservative approach" }
    ]
  },
  {
    id: 2,
    question: "What is your primary financial goal for investing?",
    explanation: "Your investment objective determines the appropriate strategy and risk level.",
    category: 'goals',
    options: [
      { text: "Build wealth for retirement (10+ years)", score: 1, explanation: "Long-term growth focus" },
      { text: "Save for major purchase (3-10 years)", score: 2, explanation: "Moderate growth with some stability" },
      { text: "Preserve wealth and generate income", score: 3, explanation: "Capital preservation priority" }
    ]
  },
  {
    id: 3,
    question: "How much experience do you have with investing?",
    explanation: "Investment experience affects your comfort level with different types of investments and market volatility.",
    category: 'experience',
    options: [
      { text: "Experienced investor (5+ years)", score: 1, explanation: "Comfortable with market fluctuations" },
      { text: "Some experience (1-5 years)", score: 2, explanation: "Growing comfort with investments" },
      { text: "Complete beginner", score: 3, explanation: "Should start with simpler, safer options" }
    ]
  },
  {
    id: 4,
    question: "How would you react if your investment lost 20% of its value in a month?",
    explanation: "This measures your emotional response to market volatility, which is crucial for long-term investment success.",
    category: 'risk_tolerance',
    options: [
      { text: "I'd stay calm and possibly buy more", score: 1, explanation: "High risk tolerance" },
      { text: "I'd be concerned but hold steady", score: 2, explanation: "Moderate risk tolerance" },
      { text: "I'd panic and want to sell immediately", score: 3, explanation: "Low risk tolerance" }
    ]
  },
  {
    id: 5,
    question: "What percentage of your monthly income can you comfortably invest?",
    explanation: "Your investment capacity determines how much risk you can afford to take.",
    category: 'capacity',
    options: [
      { text: "More than 25%", score: 1, explanation: "High investment capacity" },
      { text: "10–25%", score: 2, explanation: "Moderate investment capacity" },
      { text: "Less than 10%", score: 3, explanation: "Limited investment capacity" }
    ]
  },
  {
    id: 6,
    question: "How long can you leave your money invested without needing it?",
    explanation: "Investment time horizon is key to determining appropriate risk level.",
    category: 'capacity',
    options: [
      { text: "10+ years", score: 1, explanation: "Long horizon allows for growth investments" },
      { text: "3-10 years", score: 2, explanation: "Medium horizon suggests balanced approach" },
      { text: "Less than 3 years", score: 3, explanation: "Short horizon requires conservative approach" }
    ]
  },
  {
    id: 7,
    question: "Which best describes your knowledge of Islamic finance principles?",
    explanation: "Understanding Shariah compliance helps in making informed halal investment decisions.",
    category: 'experience',
    options: [
      { text: "Very knowledgeable about halal/haram investments", score: 1, explanation: "Can evaluate complex Shariah-compliant options" },
      { text: "Basic understanding of Islamic finance", score: 2, explanation: "Can handle moderate complexity" },
      { text: "Limited knowledge, prefer simple options", score: 3, explanation: "Should focus on clearly halal, simple investments" }
    ]
  },
  {
    id: 8,
    question: "What is your current financial situation?",
    explanation: "Your financial stability affects how much investment risk you can take.",
    category: 'capacity',
    options: [
      { text: "Strong emergency fund + stable income", score: 1, explanation: "Can afford higher risk investments" },
      { text: "Some savings + regular income", score: 2, explanation: "Moderate risk capacity" },
      { text: "Limited savings + uncertain income", score: 3, explanation: "Should prioritize safety and liquidity" }
    ]
  },
  {
    id: 9,
    question: "Which statement best describes your investment preference?",
    explanation: "Your preference helps determine the right balance between growth potential and stability.",
    category: 'preferences',
    options: [
      { text: "Higher returns are worth higher risk", score: 1, explanation: "Growth-oriented approach" },
      { text: "I want balanced growth with moderate risk", score: 2, explanation: "Balanced approach" },
      { text: "I prioritize safety over returns", score: 3, explanation: "Conservative approach" }
    ]
  },
  {
    id: 10,
    question: "How often would you like to monitor your investments?",
    explanation: "Monitoring frequency affects the type of investments that suit your lifestyle.",
    category: 'preferences',
    options: [
      { text: "Daily - I enjoy tracking markets", score: 1, explanation: "Suitable for active investments" },
      { text: "Monthly - Regular check-ins", score: 2, explanation: "Good for moderate involvement" },
      { text: "Rarely - Set and forget approach", score: 3, explanation: "Best suited for passive investments" }
    ]
  }
];

const Quiz = ({ onComplete }: QuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizStartTime, setQuizStartTime] = useState(new Date());
  const [hasUnsavedProgress, setHasUnsavedProgress] = useState(false);
  const [elapsedMinutes, setElapsedMinutes] = useState(0);
  const radioGroupRef = useRef<HTMLDivElement>(null);

  // Load saved progress on mount
  useEffect(() => {
    try {
      const savedProgress = localStorage.getItem('quiz-progress');
      if (savedProgress) {
        const parsed = JSON.parse(savedProgress);
        const { currentQuestion: savedQ, answers: savedA, selectedAnswer: savedSelected, timestamp } = parsed;
        
        // Validate saved data
        if (typeof savedQ === 'number' && Array.isArray(savedA) && typeof timestamp === 'number') {
          // Only restore if saved within last 24 hours
          if (Date.now() - timestamp < 24 * 60 * 60 * 1000) {
            setCurrentQuestion(savedQ);
            setAnswers(savedA);
            if (savedSelected) {
              setSelectedAnswer(savedSelected);
            }
            setHasUnsavedProgress(true);
          } else {
            localStorage.removeItem('quiz-progress');
          }
        } else {
          // Invalid data format, remove it
          localStorage.removeItem('quiz-progress');
        }
      }
    } catch (error) {
      console.warn('Failed to load quiz progress:', error);
      localStorage.removeItem('quiz-progress');
    }
  }, []);

  // Save progress with debouncing to prevent race conditions
  useEffect(() => {
    if (answers.length > 0) {
      const timeoutId = setTimeout(() => {
        try {
          localStorage.setItem('quiz-progress', JSON.stringify({
            currentQuestion,
            answers,
            selectedAnswer,
            timestamp: Date.now()
          }));
        } catch (error) {
          console.warn('Failed to save quiz progress:', error);
        }
      }, 300); // Debounce for 300ms
      
      return () => clearTimeout(timeoutId);
    }
  }, [currentQuestion, answers, selectedAnswer]);

  // Timer effect
  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedMinutes(Math.ceil((Date.now() - quizStartTime.getTime()) / 60000));
    }, 1000);
    
    return () => clearInterval(interval);
  }, [quizStartTime]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter' && selectedAnswer) {
        event.preventDefault();
        handleNext();
      } else if (event.key === 'ArrowLeft' && currentQuestion > 0) {
        event.preventDefault();
        handlePrevious();
      } else if (event.key === 'ArrowRight' && selectedAnswer) {
        event.preventDefault();
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedAnswer, currentQuestion, handleNext, handlePrevious]);

  const handleNext = useCallback(() => {
    if (!selectedAnswer) {
      // Add visual feedback for validation using ref
      if (radioGroupRef.current) {
        radioGroupRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // Add shake animation class temporarily
        radioGroupRef.current.classList.add('animate-pulse');
        setTimeout(() => {
          if (radioGroupRef.current) {
            radioGroupRef.current.classList.remove('animate-pulse');
          }
        }, 1000);
      }
      return;
    }

    const score = parseInt(selectedAnswer);
    const newAnswers = [...answers, score];
    setAnswers(newAnswers);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer('');
      setShowExplanation(false);
      // Scroll to top of next question
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Quiz complete, calculate total score and clear saved progress
      const totalScore = newAnswers.reduce((sum, score) => sum + score, 0);
      try {
        localStorage.removeItem('quiz-progress');
      } catch (error) {
        console.warn('Failed to clear quiz progress:', error);
      }
      onComplete(totalScore);
    }
  }, [selectedAnswer, answers, currentQuestion, onComplete]);

  const handlePrevious = useCallback(() => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setAnswers(answers.slice(0, -1));
      setSelectedAnswer('');
      setShowExplanation(false);
    }
  }, [currentQuestion, answers]);

  const handleClearProgress = useCallback(() => {
    try {
      localStorage.removeItem('quiz-progress');
    } catch (error) {
      console.warn('Failed to clear quiz progress:', error);
    }
    setHasUnsavedProgress(false);
    setCurrentQuestion(0);
    setAnswers([]);
    setSelectedAnswer('');
    setShowExplanation(false);
    setQuizStartTime(new Date());
    setElapsedMinutes(0);
  }, []);

  const getCategoryColor = (category: string) => {
    const colors = {
      demographics: 'bg-blue-100 text-blue-800',
      goals: 'bg-green-100 text-green-800',
      experience: 'bg-purple-100 text-purple-800',
      risk_tolerance: 'bg-red-100 text-red-800',
      capacity: 'bg-orange-100 text-orange-800',
      preferences: 'bg-gray-100 text-gray-800'
    };
    return colors[category as keyof typeof colors] || colors.preferences;
  };

  // Memoize expensive calculations
  const progress = useMemo(() => ((currentQuestion + 1) / questions.length) * 100, [currentQuestion]);
  const question = useMemo(() => questions[currentQuestion], [currentQuestion]);

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      {hasUnsavedProgress && (
        <Alert className="mb-6 border-blue-200 bg-blue-50">
          <InfoIcon className="h-4 w-4" />
          <AlertDescription className="flex justify-between items-center">
            <span>You have saved progress from a previous session. Continue or start fresh?</span>
            <Button onClick={handleClearProgress} variant="outline" size="sm" className="ml-4">
              Start Fresh
            </Button>
          </AlertDescription>
        </Alert>
      )}
      
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Islamic Investment Quiz</h2>
            <Badge className={getCategoryColor(question.category)} variant="secondary">
              {question.category.replace('_', ' ').toUpperCase()}
            </Badge>
          </div>
          <span className="text-gray-600">{currentQuestion + 1} of {questions.length}</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle 
            id="question-title"
            className="text-xl text-gray-800 mb-3"
            role="heading"
            aria-level={2}
          >
            {question.question}
          </CardTitle>
          {question.explanation && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <InfoIcon className="h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-emerald-700">{question.explanation}</p>
              </div>
            </div>
          )}
        </CardHeader>
        <CardContent>
          <RadioGroup 
            ref={radioGroupRef}
            value={selectedAnswer} 
            onValueChange={setSelectedAnswer}
            className="space-y-3"
            role="radiogroup"
            aria-labelledby="question-title"
            aria-required="true"
          >
            {question.options.map((option, index) => (
              <div 
                key={index} 
                className={`border rounded-lg p-4 transition-all duration-200 ${
                  selectedAnswer === option.score.toString() 
                    ? 'border-emerald-500 bg-emerald-50 shadow-md' 
                    : 'border-gray-200 hover:border-emerald-300 hover:bg-emerald-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <RadioGroupItem 
                    value={option.score.toString()} 
                    id={`option-${index}`}
                    aria-describedby={showExplanation && option.explanation ? `explanation-${index}` : undefined}
                  />
                  <Label 
                    htmlFor={`option-${index}`} 
                    className="flex-1 cursor-pointer text-lg font-medium leading-relaxed"
                  >
                    {option.text}
                  </Label>
                </div>
                {showExplanation && option.explanation && (
                  <div 
                    id={`explanation-${index}`}
                    className="mt-3 ml-6 text-sm text-gray-600 bg-gray-50 p-3 rounded border-l-4 border-emerald-200"
                    role="note"
                    aria-label="Answer explanation"
                  >
                    {option.explanation}
                  </div>
                )}
              </div>
            ))}
          </RadioGroup>

          {selectedAnswer && (
            <div className="mt-4">
              <Button
                onClick={() => setShowExplanation(!showExplanation)}
                variant="ghost"
                size="sm"
                className="text-emerald-600 hover:text-emerald-700"
              >
                <InfoIcon className="h-4 w-4 mr-1" />
                {showExplanation ? 'Hide' : 'Show'} Answer Details
              </Button>
            </div>
          )}

          <div className="flex justify-between items-center mt-8">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="px-6"
              aria-label={currentQuestion === 0 ? 'Previous question (not available)' : 'Go to previous question'}
            >
              <ChevronLeft className="h-4 w-4 mr-1" aria-hidden="true" />
              Previous
            </Button>
            
            <div className="text-center text-sm text-gray-500" role="status" aria-live="polite">
              {elapsedMinutes} min elapsed
            </div>
            
            <Button
              onClick={handleNext}
              className={`px-6 transition-all ${
                !selectedAnswer 
                  ? 'bg-gray-300 hover:bg-gray-400 cursor-not-allowed' 
                  : 'bg-emerald-600 hover:bg-emerald-700'
              }`}
              aria-label={
                currentQuestion === questions.length - 1 
                  ? 'Complete quiz and get results' 
                  : 'Continue to next question'
              }
              aria-describedby={!selectedAnswer ? 'selection-required' : undefined}
            >
              {currentQuestion === questions.length - 1 ? 'Get My Results' : 'Next'}
              <ChevronRight className="h-4 w-4 ml-1" aria-hidden="true" />
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <div id="selection-required" className={`mt-4 text-center text-sm transition-opacity ${
        !selectedAnswer ? 'text-amber-600 opacity-100' : 'text-transparent opacity-0'
      }`} role="status" aria-live="polite">
        Please select an answer to continue
      </div>
      
      <div className="mt-6 text-center text-sm text-gray-500">
        <p>Your progress is automatically saved. You can return anytime within 24 hours.</p>
      </div>
      
      {/* Keyboard navigation instructions */}
      <div className="mt-4 text-center text-xs text-gray-400">
        <p>Use Tab to navigate, Space to select, Enter to continue</p>
      </div>
    </div>
  );
};

export default Quiz;
