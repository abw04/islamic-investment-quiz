
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';

interface QuizProps {
  onComplete: (score: number) => void;
}

const questions = [
  {
    id: 1,
    question: "How old are you?",
    options: [
      { text: "Under 25", score: 1 },
      { text: "25–40", score: 2 },
      { text: "Over 40", score: 3 }
    ]
  },
  {
    id: 2,
    question: "What is your main financial goal for investing?",
    options: [
      { text: "Grow my savings quickly", score: 1 },
      { text: "Grow steadily over time", score: 2 },
      { text: "Preserve my savings, avoid loss", score: 3 }
    ]
  },
  {
    id: 3,
    question: "How much experience do you have with investing?",
    options: [
      { text: "None at all", score: 3 },
      { text: "A little", score: 2 },
      { text: "Quite a bit", score: 1 }
    ]
  },
  {
    id: 4,
    question: "How would you feel if your investment dropped in value by 10%?",
    options: [
      { text: "Panic! I'd want to sell", score: 3 },
      { text: "I'd be worried, but might stay in", score: 2 },
      { text: "I'd stay calm, it happens", score: 1 }
    ]
  },
  {
    id: 5,
    question: "How much of your monthly income can you invest comfortably?",
    options: [
      { text: "Less than 10%", score: 3 },
      { text: "10–25%", score: 2 },
      { text: "More than 25%", score: 1 }
    ]
  },
  {
    id: 6,
    question: "Which statement describes you best?",
    options: [
      { text: "I want stable returns, even if growth is slow", score: 3 },
      { text: "I want a balance of safety and growth", score: 2 },
      { text: "I want high returns and am OK with some risk", score: 1 }
    ]
  }
];

const Quiz = ({ onComplete }: QuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');

  const handleNext = () => {
    if (selectedAnswer) {
      const score = parseInt(selectedAnswer);
      const newAnswers = [...answers, score];
      setAnswers(newAnswers);
      
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer('');
      } else {
        // Quiz complete, calculate total score
        const totalScore = newAnswers.reduce((sum, score) => sum + score, 0);
        onComplete(totalScore);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setAnswers(answers.slice(0, -1));
      setSelectedAnswer('');
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const question = questions[currentQuestion];

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Investment Risk Quiz</h2>
          <span className="text-gray-600">{currentQuestion + 1} of {questions.length}</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl text-gray-800">{question.question}</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
            {question.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2 p-4 rounded-lg hover:bg-emerald-50 transition-colors">
                <RadioGroupItem value={option.score.toString()} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer text-lg">
                  {option.text}
                </Label>
              </div>
            ))}
          </RadioGroup>

          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="px-6"
            >
              Previous
            </Button>
            <Button
              onClick={handleNext}
              disabled={!selectedAnswer}
              className="bg-emerald-600 hover:bg-emerald-700 px-6"
            >
              {currentQuestion === questions.length - 1 ? 'Get My Results' : 'Next'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Quiz;
