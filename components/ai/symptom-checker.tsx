"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Brain, AlertTriangle, CheckCircle, Clock, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

export default function SymptomChecker() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [formData, setFormData] = useState({
    symptoms: '',
    duration: '',
    severity: '',
    age: '',
    gender: ''
  });

  const handleAnalyze = async () => {
    if (!formData.symptoms.trim()) {
      toast.error('Please describe your symptoms');
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock AI response
    const mockResults = {
      urgencyScore: 7,
      urgencyLevel: 'Medium',
      possibleConditions: [
        { name: 'Upper Respiratory Infection', probability: 75 },
        { name: 'Allergic Rhinitis', probability: 45 },
        { name: 'Sinusitis', probability: 30 }
      ],
      recommendations: [
        'Consider scheduling an appointment with a general practitioner',
        'Monitor symptoms for the next 24-48 hours',
        'Stay hydrated and get adequate rest',
        'Consider over-the-counter symptom relief if appropriate'
      ],
      suggestedSpecialty: 'General Medicine',
      timeframe: 'Within 2-3 days'
    };

    setResults(mockResults);
    setIsAnalyzing(false);
    toast.success('Analysis complete');
  };

  const getUrgencyColor = (score: number) => {
    if (score >= 8) return 'text-red-600 bg-red-50';
    if (score >= 5) return 'text-orange-600 bg-orange-50';
    return 'text-green-600 bg-green-50';
  };

  const getUrgencyIcon = (level: string) => {
    switch (level) {
      case 'High':
        return <AlertTriangle className="h-5 w-5 text-red-600" />;
      case 'Medium':
        return <Clock className="h-5 w-5 text-orange-600" />;
      default:
        return <CheckCircle className="h-5 w-5 text-green-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="medical-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-blue-600" />
            AI Symptom Checker
          </CardTitle>
          <CardDescription>
            Describe your symptoms to get AI-powered health insights and recommendations.
            This is not a substitute for professional medical advice.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                placeholder="Enter your age"
                value={formData.age}
                onChange={(e) => setFormData({...formData, age: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="gender">Gender</Label>
              <Select value={formData.gender} onValueChange={(value) => setFormData({...formData, gender: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                  <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="symptoms">Describe Your Symptoms</Label>
            <Textarea
              id="symptoms"
              placeholder="Please describe your symptoms in detail (e.g., headache, fever, cough, duration, etc.)"
              className="min-h-[100px]"
              value={formData.symptoms}
              onChange={(e) => setFormData({...formData, symptoms: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="duration">Duration</Label>
              <Select value={formData.duration} onValueChange={(value) => setFormData({...formData, duration: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="How long have you had these symptoms?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="less-than-1-day">Less than 1 day</SelectItem>
                  <SelectItem value="1-3-days">1-3 days</SelectItem>
                  <SelectItem value="4-7-days">4-7 days</SelectItem>
                  <SelectItem value="1-2-weeks">1-2 weeks</SelectItem>
                  <SelectItem value="more-than-2-weeks">More than 2 weeks</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="severity">Severity</Label>
              <Select value={formData.severity} onValueChange={(value) => setFormData({...formData, severity: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Rate the severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mild">Mild</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="severe">Severe</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            onClick={handleAnalyze} 
            className="w-full medical-button" 
            disabled={isAnalyzing}
          >
            {isAnalyzing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Analyzing Symptoms...
              </>
            ) : (
              <>
                <Brain className="h-4 w-4 mr-2" />
                Analyze Symptoms
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Results */}
      {results && (
        <Card className="medical-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {getUrgencyIcon(results.urgencyLevel)}
              AI Analysis Results
            </CardTitle>
            <CardDescription>
              Based on the symptoms you've described, here's what our AI suggests:
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Urgency Score */}
            <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
              <div>
                <h3 className="font-semibold">Urgency Assessment</h3>
                <p className="text-sm text-gray-600">Recommended action timeframe: {results.timeframe}</p>
              </div>
              <div className={`px-3 py-1 rounded-full ${getUrgencyColor(results.urgencyScore)}`}>
                <span className="font-semibold">{results.urgencyLevel}</span>
                <span className="text-sm ml-1">({results.urgencyScore}/10)</span>
              </div>
            </div>

            {/* Possible Conditions */}
            <div>
              <h3 className="font-semibold mb-3">Possible Conditions</h3>
              <div className="space-y-2">
                {results.possibleConditions.map((condition: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <span className="font-medium">{condition.name}</span>
                    <div className="flex items-center gap-2">
                      <Progress value={condition.probability} className="w-20" />
                      <span className="text-sm text-gray-600">{condition.probability}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div>
              <h3 className="font-semibold mb-3">Recommendations</h3>
              <div className="space-y-2">
                {results.recommendations.map((recommendation: string, index: number) => (
                  <div key={index} className="flex items-start gap-2 p-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{recommendation}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t">
              <Button className="flex-1 medical-button">
                <ArrowRight className="h-4 w-4 mr-2" />
                Book Appointment with {results.suggestedSpecialty}
              </Button>
              <Button variant="outline" className="flex-1">
                Save Results to Health Records
              </Button>
            </div>

            {/* Disclaimer */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <p className="text-sm text-yellow-800">
                <strong>Disclaimer:</strong> This AI analysis is for informational purposes only and should not replace professional medical advice. 
                Always consult with a healthcare provider for proper diagnosis and treatment.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}