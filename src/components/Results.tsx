
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, TrendingUp, Target } from 'lucide-react';
import type { RiskProfile } from '../pages/Index';

interface ResultsProps {
  riskProfile: RiskProfile;
  score: number;
  onViewRecommendations: () => void;
  onRetakeQuiz: () => void;
}

const profileData = {
  'Cautious Saver': {
    icon: Shield,
    color: 'bg-emerald-100 text-emerald-800',
    description: "You prefer to keep your money safe and grow it slowly but steadily. You don't like big ups and downs in your investments.",
    characteristics: [
      "You value security over high returns",
      "You prefer predictable, steady growth",
      "You want to preserve your capital",
      "You're comfortable with lower returns for less risk"
    ]
  },
  'Balanced Grower': {
    icon: Target,
    color: 'bg-amber-100 text-amber-800',
    description: "You want a good balance between growing your money and keeping it safe. You're okay with some ups and downs for better returns.",
    characteristics: [
      "You want moderate growth with reasonable safety",
      "You can handle some market fluctuations",
      "You're building wealth for medium-term goals",
      "You like diversifying your investments"
    ]
  },
  'Growth Seeker': {
    icon: TrendingUp,
    color: 'bg-blue-100 text-blue-800',
    description: "You're willing to take more risk to grow your money faster. You understand that investments can go up and down, but you're focused on long-term growth.",
    characteristics: [
      "You're comfortable with market volatility",
      "You prioritize growth over stability",
      "You have a long-term investment horizon",
      "You can handle temporary losses for potential gains"
    ]
  }
};

const Results = ({ riskProfile, score, onViewRecommendations, onRetakeQuiz }: ResultsProps) => {
  const profile = profileData[riskProfile];
  const Icon = profile.icon;

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-6">
          <div className="p-6 bg-white rounded-full shadow-lg">
            <Icon className="h-16 w-16 text-emerald-600" />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Your Investment Profile</h1>
        <Badge className={`text-lg px-6 py-2 ${profile.color}`}>
          {riskProfile}
        </Badge>
      </div>

      <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm mb-8">
        <CardHeader>
          <CardTitle className="text-xl text-gray-800">What This Means</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            {profile.description}
          </p>
          
          <h3 className="font-semibold text-gray-800 mb-4">Your Investment Characteristics:</h3>
          <ul className="space-y-3">
            {profile.characteristics.map((characteristic, index) => (
              <li key={index} className="flex items-start">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span className="text-gray-700">{characteristic}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <div className="text-center space-y-4">
        <Button
          onClick={onViewRecommendations}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 text-lg rounded-lg mr-4"
        >
          See My Halal Investment Options
        </Button>
        
        <div>
          <Button
            variant="outline"
            onClick={onRetakeQuiz}
            className="px-6 py-2"
          >
            Retake Quiz
          </Button>
        </div>

        <p className="text-sm text-gray-500 mt-6">
          Quiz Score: {score} out of 18 points
        </p>
      </div>
    </div>
  );
};

export default Results;
