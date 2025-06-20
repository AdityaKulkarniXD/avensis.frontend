"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Heart, Mail, Lock, UserCheck } from 'lucide-react';
import { toast } from 'sonner';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate login for demo
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store user info in localStorage for demo
      localStorage.setItem('user', JSON.stringify({
        email: formData.email,
        role: formData.role,
        name: formData.email.split('@')[0]
      }));

      toast.success('Login successful!');
      
      // Redirect based on role
      switch (formData.role) {
        case 'hospital':
          router.push('/dashboard/hospital');
          break;
        case 'doctor':
          router.push('/dashboard/doctor');
          break;
        case 'patient':
          router.push('/dashboard/patient');
          break;
        default:
          router.push('/dashboard');
      }
    } catch (error) {
      toast.error('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen medical-gradient flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 text-2xl font-bold text-blue-600 mb-4">
            <Heart className="h-8 w-8" />
            <span>PS3WAD</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-gray-600 mt-2">Sign in to your healthcare account</p>
        </div>

        <Card className="medical-card">
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              Enter your credentials to access your dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="role">Account Type</Label>
                <Select value={formData.role} onValueChange={(value) => setFormData({...formData, role: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hospital">Hospital</SelectItem>
                    <SelectItem value="doctor">Doctor</SelectItem>
                    <SelectItem value="patient">Patient</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="pl-10"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    className="pl-10"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    required
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full medical-button" 
                disabled={isLoading}
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link href="/auth/register" className="text-blue-600 hover:underline font-medium">
                  Sign up
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Demo Credentials */}
        <Card className="mt-4 bg-blue-50 border-blue-200">
          <CardContent className="pt-4">
            <h3 className="font-semibold text-blue-900 mb-2">Demo Credentials</h3>
            <div className="text-sm text-blue-800 space-y-1">
              <p><strong>Hospital:</strong> hospital@demo.com / password</p>
              <p><strong>Doctor:</strong> doctor@demo.com / password</p>
              <p><strong>Patient:</strong> patient@demo.com / password</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}