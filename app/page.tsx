import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Shield, Users, Video, Brain, Activity, Star, CheckCircle, ArrowRight, Zap, Globe, Lock } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-md border-b border-white/20 z-50 shadow-lg">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
              <Heart className="h-8 w-8 text-white" />
            </div>
            <span className="text-2xl font-bold hero-text">PS3WAD</span>
          </div>
          <div className="flex space-x-4">
            <Link href="/auth/login">
              <Button variant="outline" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 rounded-xl font-semibold">
                Login
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button className="medical-button">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-16 medical-gradient min-h-screen flex items-center">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-5xl mx-auto">
            <div className="floating-animation">
              <h1 className="text-6xl md:text-7xl font-bold text-white mb-8 leading-tight">
                The Future of
                <span className="block bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
                  Healthcare
                </span>
                is Here
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed max-w-3xl mx-auto">
              AI-powered telemedicine platform with real-time vitals monitoring, secure consultations, 
              and intelligent health insights for the modern healthcare ecosystem.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6 mb-16">
              <Link href="/auth/register">
                <Button size="lg" className="medical-button text-lg px-10 py-4 rounded-2xl">
                  <Zap className="mr-2 h-5 w-5" />
                  Start Free Trial
                </Button>
              </Link>
              <Link href="#features">
                <Button size="lg" variant="outline" className="text-lg px-10 py-4 rounded-2xl border-2 border-white text-white hover:bg-white hover:text-purple-600 bg-white/10 backdrop-blur-sm">
                  <ArrowRight className="mr-2 h-5 w-5" />
                  Explore Features
                </Button>
              </Link>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="glass-card p-6 text-center">
                <div className="text-3xl font-bold text-white mb-2">10K+</div>
                <div className="text-white/80">Active Patients</div>
              </div>
              <div className="glass-card p-6 text-center">
                <div className="text-3xl font-bold text-white mb-2">500+</div>
                <div className="text-white/80">Healthcare Providers</div>
              </div>
              <div className="glass-card p-6 text-center">
                <div className="text-3xl font-bold text-white mb-2">99.9%</div>
                <div className="text-white/80">Uptime Guarantee</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title mb-6">
              Revolutionary Healthcare Technology
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Experience the next generation of telemedicine with AI-powered diagnostics, 
              real-time monitoring, and seamless healthcare delivery.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="medical-card group">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl w-fit group-hover:scale-110 transition-transform duration-300">
                  <Brain className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold">AI-Powered Diagnostics</CardTitle>
                <CardDescription className="text-gray-600">
                  Advanced machine learning algorithms provide instant symptom analysis and treatment recommendations.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Symptom assessment</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Urgency scoring</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Specialist recommendations</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="medical-card group">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-4 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl w-fit group-hover:scale-110 transition-transform duration-300">
                  <Video className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold">Secure Video Consultations</CardTitle>
                <CardDescription className="text-gray-600">
                  HIPAA-compliant video calls with crystal-clear quality and end-to-end encryption.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />HD video quality</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Screen sharing</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Session recording</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="medical-card group">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl w-fit group-hover:scale-110 transition-transform duration-300">
                  <Activity className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold">Real-time Vitals</CardTitle>
                <CardDescription className="text-gray-600">
                  Seamless integration with wearable devices for continuous health monitoring.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Heart rate monitoring</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Blood pressure tracking</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Activity analysis</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="medical-card group">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-4 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl w-fit group-hover:scale-110 transition-transform duration-300">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold">Digital Health Records</CardTitle>
                <CardDescription className="text-gray-600">
                  Secure, encrypted patient records with blockchain-level security and instant access.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Encrypted storage</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Instant access</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />History tracking</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="medical-card group">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-4 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-2xl w-fit group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold">Multi-Role Platform</CardTitle>
                <CardDescription className="text-gray-600">
                  Tailored interfaces for hospitals, doctors, and patients with role-based permissions.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Hospital management</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Doctor workflows</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Patient portals</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="medical-card group">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl w-fit group-hover:scale-110 transition-transform duration-300">
                  <Globe className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold">Global Accessibility</CardTitle>
                <CardDescription className="text-gray-600">
                  24/7 healthcare access from anywhere in the world with multi-language support.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />24/7 availability</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Multi-language</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Global reach</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 medical-gradient-blue">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">
              Trusted by Healthcare Professionals
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              See what doctors and patients are saying about PS3WAD
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="glass-card p-8 text-white">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="mb-6 text-white/90">
                "PS3WAD has revolutionized how I practice medicine. The AI diagnostics are incredibly accurate."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <div className="font-semibold">Dr. Sarah Johnson</div>
                  <div className="text-white/70">Cardiologist</div>
                </div>
              </div>
            </Card>

            <Card className="glass-card p-8 text-white">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="mb-6 text-white/90">
                "The platform is intuitive and the video quality is exceptional. My patients love the convenience."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <div className="font-semibold">Dr. Michael Chen</div>
                  <div className="text-white/70">General Practitioner</div>
                </div>
              </div>
            </Card>

            <Card className="glass-card p-8 text-white">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="mb-6 text-white/90">
                "Finally, a telemedicine platform that actually works seamlessly. The wearable integration is perfect."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <div className="font-semibold">Emma Wilson</div>
                  <div className="text-white/70">Patient</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 medical-gradient">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-bold text-white mb-6">
              Ready to Transform Healthcare?
            </h2>
            <p className="text-xl text-white/90 mb-12 leading-relaxed">
              Join thousands of healthcare providers and patients who trust PS3WAD 
              for secure, intelligent, and accessible medical care.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link href="/auth/register">
                <Button size="lg" className="medical-button-secondary text-lg px-12 py-4 rounded-2xl">
                  <Heart className="mr-2 h-5 w-5" />
                  Start Your Journey
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="text-lg px-12 py-4 rounded-2xl border-2 border-white text-white hover:bg-white hover:text-purple-600 bg-white/10 backdrop-blur-sm">
                  <Lock className="mr-2 h-5 w-5" />
                  Enterprise Solutions
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold">PS3WAD</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                The future of healthcare is here. Secure, intelligent, and accessible medical care for everyone.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/features" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="/security" className="hover:text-white transition-colors">Security</Link></li>
                <li><Link href="/integrations" className="hover:text-white transition-colors">Integrations</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link href="/status" className="hover:text-white transition-colors">System Status</Link></li>
                <li><Link href="/api" className="hover:text-white transition-colors">API Docs</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">
              © 2025 PS3WAD. All rights reserved. HIPAA Compliant Healthcare Platform.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <span className="text-gray-400">🔒 SOC 2 Certified</span>
              <span className="text-gray-400">🏥 HIPAA Compliant</span>
              <span className="text-gray-400">🌍 ISO 27001</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}