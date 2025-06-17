
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ExternalLink, AlertTriangle } from 'lucide-react';
import type { RiskProfile } from '../pages/Index';

interface RecommendationsProps {
  riskProfile: RiskProfile;
  onRetakeQuiz: () => void;
  onBackToStart: () => void;
}

interface InstrumentData {
  description: string;
  minInvestment: string;
  riskLevel: string;
  shariahPrinciple: string;
  whyChoose: string;
  howToStart: string[];
  platforms: string[];
  shariahNote?: string;
}

const instruments: Record<string, InstrumentData> = {
  'Shariah Mutual Funds': {
    description: "Pooled funds managed according to Islamic law. Professional managers invest your money in halal companies.",
    minInvestment: "~IDR 100,000",
    riskLevel: "Low-Medium",
    shariahPrinciple: "No interest, ethical stocks only",
    whyChoose: "Perfect for starting small with professional management",
    howToStart: [
      "Choose a platform like Bibit, Bareksa, or your bank's app",
      "Register and complete your identity verification (KYC)",
      "Search for 'Reksa Dana Syariah' in the app",
      "Start investing from as little as IDR 100,000",
      "Monitor your investment growth through the app"
    ],
    platforms: ["Bibit", "Bareksa", "Mandiri Online"]
  },
  'Sukuk (Islamic Bonds)': {
    description: "Government or corporate bonds that pay returns without interest. Very safe and predictable.",
    minInvestment: "~IDR 1,000,000",
    riskLevel: "Low",
    shariahPrinciple: "Asset-backed financing, no riba (interest)",
    whyChoose: "Extremely safe with fixed returns, government-backed",
    howToStart: [
      "Wait for Sukuk offering period (usually announced by government)",
      "Register on a licensed platform like Mandiri Sekuritas or BRI",
      "Complete your identity verification",
      "Place your order and make payment during offering period",
      "Hold until maturity to receive your returns"
    ],
    platforms: ["Mandiri Sekuritas", "BRI Danareksa", "BNI Sekuritas"]
  },
  'Shariah Stocks': {
    description: "Buy shares in companies that have been screened to ensure they follow Islamic principles.",
    minInvestment: "Varies by broker",
    riskLevel: "Medium-High",
    shariahPrinciple: "No haram sectors (alcohol, gambling, conventional banking)",
    whyChoose: "Potential for high returns, ownership in real businesses",
    howToStart: [
      "Choose a Shariah-compliant broker or platform",
      "Register and complete identity verification",
      "Fund your trading account",
      "Look for stocks in the Jakarta Islamic Index (JII)",
      "Start buying halal stocks and monitor regularly"
    ],
    platforms: ["Ajaib Syariah", "Stockbit", "Mandiri Sekuritas"]
  },
  'Gold Savings': {
    description: "Buy gold in small amounts digitally. Gold is a traditional store of value in Islam.",
    minInvestment: "~IDR 10,000+",
    riskLevel: "Low-Medium",
    shariahPrinciple: "Tangible asset, historically valuable",
    whyChoose: "Great protection against inflation, easy to buy and sell",
    howToStart: [
      "Register with a gold savings platform like Pegadaian Digital or Tokopedia Emas",
      "Complete verification and fund your account",
      "Start buying gold from as little as IDR 10,000",
      "Watch your gold accumulate over time",
      "Sell anytime you need cash"
    ],
    platforms: ["Pegadaian Digital", "Tokopedia Emas", "Antam LM"]
  },
  'Property Crowdfunding': {
    description: "Invest in Shariah-compliant real estate projects together with other investors online.",
    minInvestment: "~IDR 1,000,000+",
    riskLevel: "Medium",
    shariahPrinciple: "Profit-sharing from real assets, no interest",
    whyChoose: "Diversification into real estate without huge capital",
    howToStart: [
      "Choose a halal property crowdfunding platform",
      "Register and complete your identity verification",
      "Review available property projects carefully",
      "Invest starting from IDR 1,000,000 in chosen projects",
      "Track your investment progress through the platform"
    ],
    platforms: ["Sharia-compliant platforms", "Some P2P lending platforms"]
  },
  'Bitcoin': {
    description: "Digital cryptocurrency traded on regulated exchanges in Indonesia. High risk, high potential reward.",
    minInvestment: "~IDR 10,000+",
    riskLevel: "High",
    shariahPrinciple: "Permitted by some scholars with conditions (no riba, no speculation/gambling)",
    whyChoose: "Potential for very high returns, easily accessible, but very risky",
    howToStart: [
      "Register on a regulated Indonesian exchange like Tokocrypto or Pintu",
      "Complete identity verification (KYC) process",
      "Deposit Indonesian Rupiah to your account",
      "Search for Bitcoin (BTC) and buy your desired amount",
      "Store securely in the exchange wallet or transfer to personal wallet"
    ],
    platforms: ["Tokocrypto", "Pintu", "Indodax"],
    shariahNote: "Some Islamic scholars permit Bitcoin with strict conditions (no riba, no gambling-like behavior). Always consult your own religious advisor if unsure. Only invest a small portion of your portfolio due to extreme volatility."
  }
};

const riskProfileMapping = {
  'Cautious Saver': ['Sukuk (Islamic Bonds)', 'Shariah Mutual Funds', 'Gold Savings'],
  'Balanced Grower': ['Shariah Mutual Funds', 'Property Crowdfunding', 'Gold Savings'],
  'Growth Seeker': ['Shariah Stocks', 'Property Crowdfunding', 'Shariah Mutual Funds', 'Bitcoin']
};

const Recommendations = ({ riskProfile, onRetakeQuiz, onBackToStart }: RecommendationsProps) => {
  const recommendations = riskProfileMapping[riskProfile];

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'Low':
        return 'bg-emerald-100 text-emerald-800';
      case 'Low-Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Medium':
        return 'bg-orange-100 text-orange-800';
      case 'Medium-High':
        return 'bg-red-100 text-red-800';
      case 'High':
        return 'bg-red-200 text-red-900';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Your Personalized Halal Investment Options
        </h1>
        <p className="text-xl text-gray-600 mb-2">
          Based on your <span className="font-semibold text-emerald-600">{riskProfile}</span> profile
        </p>
        <p className="text-gray-500">
          Here are the best Shariah-compliant investments for someone like you
        </p>
      </div>

      <div className="grid gap-8 mb-12">
        {recommendations.map((instrumentName) => {
          const instrument = instruments[instrumentName as keyof typeof instruments];
          const isHighRisk = instrument.riskLevel === 'High';
          
          return (
            <Card key={instrumentName} className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-2xl text-gray-800">{instrumentName}</CardTitle>
                  <Badge className={getRiskColor(instrument.riskLevel)}>
                    {instrument.riskLevel} Risk
                  </Badge>
                </div>
                <p className="text-gray-600 text-lg">{instrument.description}</p>
              </CardHeader>
              
              <CardContent>
                {isHighRisk && instrument.shariahNote && (
                  <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                    <div className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 mr-2 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-amber-800 mb-2">Shariah Note:</h4>
                        <p className="text-amber-700 text-sm">{instrument.shariahNote}</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Minimum Investment</h4>
                    <p className="text-gray-600">{instrument.minInvestment}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Shariah Principle</h4>
                    <p className="text-gray-600">{instrument.shariahPrinciple}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Why Choose This</h4>
                    <p className="text-gray-600">{instrument.whyChoose}</p>
                  </div>
                </div>

                <Accordion type="single" collapsible>
                  <AccordionItem value="how-to-start">
                    <AccordionTrigger className="text-lg font-semibold text-emerald-700">
                      How to Get Started (Step-by-Step)
                    </AccordionTrigger>
                    <AccordionContent>
                      <ol className="space-y-3">
                        {instrument.howToStart.map((step, index) => (
                          <li key={index} className="flex items-start">
                            <span className="bg-emerald-100 text-emerald-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">
                              {index + 1}
                            </span>
                            <span className="text-gray-700">{step}</span>
                          </li>
                        ))}
                      </ol>
                      
                      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                        <h5 className="font-semibold text-gray-800 mb-2">Popular Platforms:</h5>
                        <div className="flex flex-wrap gap-2">
                          {instrument.platforms.map((platform, index) => (
                            <Badge key={index} variant="secondary" className="text-sm">
                              {platform}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="text-center space-y-6">
        <div className="p-6 bg-emerald-50 rounded-lg border border-emerald-200">
          <h3 className="text-lg font-semibold text-emerald-800 mb-2">
            Ready to Start Your Halal Investment Journey?
          </h3>
          <p className="text-emerald-700 mb-4">
            Remember: Always start small, learn as you go, and never invest more than you can afford to lose.
            Consider consulting with a financial advisor who understands Islamic finance.
          </p>
        </div>

        <div className="flex justify-center space-x-4">
          <Button
            onClick={onRetakeQuiz}
            variant="outline"
            className="px-6 py-2"
          >
            Retake Quiz
          </Button>
          <Button
            onClick={onBackToStart}
            className="bg-emerald-600 hover:bg-emerald-700 px-6 py-2"
          >
            Start Over
          </Button>
        </div>

        <p className="text-gray-500 text-sm">
          This tool provides educational information only. Always do your own research and consult with qualified advisors.
        </p>
      </div>
    </div>
  );
};

export default Recommendations;
