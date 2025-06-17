
import { useState } from 'react';
import LandingPage from '../components/LandingPage';
import Quiz from '../components/Quiz';
import Results from '../components/Results';
import Recommendations from '../components/Recommendations';

export type RiskProfile = 'Cautious Saver' | 'Balanced Grower' | 'Growth Seeker';

const Index = () => {
  const [currentStep, setCurrentStep] = useState<'landing' | 'quiz' | 'results' | 'recommendations'>('landing');
  const [quizScore, setQuizScore] = useState<number>(0);
  const [riskProfile, setRiskProfile] = useState<RiskProfile>('Cautious Saver');

  const handleStartQuiz = () => {
    setCurrentStep('quiz');
  };

  const handleQuizComplete = (score: number) => {
    setQuizScore(score);
    // Calculate risk profile based on score
    let profile: RiskProfile;
    if (score >= 14) {
      profile = 'Cautious Saver';
    } else if (score >= 9) {
      profile = 'Balanced Grower';
    } else {
      profile = 'Growth Seeker';
    }
    setRiskProfile(profile);
    setCurrentStep('results');
  };

  const handleViewRecommendations = () => {
    setCurrentStep('recommendations');
  };

  const handleRetakeQuiz = () => {
    setQuizScore(0);
    setCurrentStep('quiz');
  };

  const handleBackToStart = () => {
    setQuizScore(0);
    setCurrentStep('landing');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-amber-50">
      {currentStep === 'landing' && <LandingPage onStartQuiz={handleStartQuiz} />}
      {currentStep === 'quiz' && <Quiz onComplete={handleQuizComplete} />}
      {currentStep === 'results' && (
        <Results 
          riskProfile={riskProfile} 
          score={quizScore}
          onViewRecommendations={handleViewRecommendations}
          onRetakeQuiz={handleRetakeQuiz}
        />
      )}
      {currentStep === 'recommendations' && (
        <Recommendations 
          riskProfile={riskProfile}
          onRetakeQuiz={handleRetakeQuiz}
          onBackToStart={handleBackToStart}
        />
      )}
    </div>
  );
};

export default Index;
