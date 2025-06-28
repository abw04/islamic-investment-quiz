import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Building2, Shield, TrendingUp, Heart } from 'lucide-react';

interface LandingPageProps {
  onStartQuiz: () => void;
}

const LandingPage = ({ onStartQuiz }: LandingPageProps) => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-emerald-100 rounded-full">
            <Building2 className="h-16 w-16 text-emerald-600" />
          </div>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
          Find Your <span className="text-emerald-600">Halal</span> Investment Style
        </h1>
        
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
          Take a quick quiz to discover your Islamic investment risk profile and get personalized, 
          Shariah-compliant investment recommendations tailored just for you.
        </p>
        
        <Button 
          onClick={onStartQuiz}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 text-lg rounded-lg transition-all duration-300 transform hover:scale-105"
        >
          Start Your Journey
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <Card className="text-center p-6 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="flex justify-center mb-4">
              <Shield className="h-12 w-12 text-emerald-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-800">100% Shariah Compliant</h3>
            <p className="text-gray-600">All recommendations follow Islamic financial principles</p>
          </CardContent>
        </Card>

        <Card className="text-center p-6 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="flex justify-center mb-4">
              <TrendingUp className="h-12 w-12 text-amber-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-800">Beginner Friendly</h3>
            <p className="text-gray-600">Simple language, no confusing financial jargon</p>
          </CardContent>
        </Card>

        <Card className="text-center p-6 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="flex justify-center mb-4">
              <Heart className="h-12 w-12 text-rose-500" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-800">Personalized for You</h3>
            <p className="text-gray-600">Get recommendations that match your unique situation</p>
          </CardContent>
        </Card>
      </div>

      <div className="text-center">
        <p className="text-gray-500 mb-4">Trusted by thousands of Indonesian Muslim investors</p>
        <div className="flex justify-center space-x-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <div key={star} className="w-6 h-6 bg-amber-400 rounded-sm transform rotate-45"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
