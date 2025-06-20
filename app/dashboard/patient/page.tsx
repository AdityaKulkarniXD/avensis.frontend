"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar, 
  Heart, 
  Activity, 
  FileText, 
  Video, 
  Brain, 
  Clock,
  User,
  Shield,
  Stethoscope,
  Bell,
  Settings
} from 'lucide-react';
import PatientHeader from '@/components/dashboard/patient-header';
import VitalsChart from '@/components/charts/vitals-chart';
import AppointmentCard from '@/components/appointments/appointment-card';
import SymptomChecker from '@/components/ai/symptom-checker';

export default function PatientDashboard() {
  const [user, setUser] = useState<any>(null);
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      doctor: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      date: '2025-01-15',
      time: '10:00 AM',
      status: 'upcoming',
      type: 'video'
    },
    {
      id: 2,
      doctor: 'Dr. Michael Chen',
      specialty: 'General Medicine',
      date: '2025-01-12',
      time: '2:30 PM',
      status: 'completed',
      type: 'video'
    }
  ]);

  const [vitals, setVitals] = useState({
    heartRate: 72,
    bloodPressure: '120/80',
    temperature: 98.6,
    oxygenSaturation: 98,
    steps: 8542,
    sleep: 7.5
  });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PatientHeader user={user} />
      
      <div className="container mx-auto px-4 py-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user.name}!
          </h1>
          <p className="text-gray-600">
            Your health dashboard is ready. Track your vitals, manage appointments, and stay connected with your healthcare team.
          </p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="vitals">Vitals</TabsTrigger>
            <TabsTrigger value="records">Records</TabsTrigger>
            <TabsTrigger value="ai-assistant">AI Assistant</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="medical-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Next Appointment</CardTitle>
                  <Calendar className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Jan 15</div>
                  <p className="text-xs text-muted-foreground">Dr. Sarah Johnson</p>
                </CardContent>
              </Card>

              <Card className="medical-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Heart Rate</CardTitle>
                  <Heart className="h-4 w-4 text-red-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{vitals.heartRate}</div>
                  <p className="text-xs text-muted-foreground">bpm - Normal</p>
                </CardContent>
              </Card>

              <Card className="medical-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Steps Today</CardTitle>
                  <Activity className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{vitals.steps.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">Goal: 10,000</p>
                </CardContent>
              </Card>

              <Card className="medical-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Sleep</CardTitle>
                  <Clock className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{vitals.sleep}h</div>
                  <p className="text-xs text-muted-foreground">Last night</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Appointments & Vitals */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="medical-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    Upcoming Appointments
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {appointments.filter(apt => apt.status === 'upcoming').map((appointment) => (
                    <AppointmentCard key={appointment.id} appointment={appointment} />
                  ))}
                  <Button className="w-full" variant="outline">
                    View All Appointments
                  </Button>
                </CardContent>
              </Card>

              <Card className="medical-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-green-600" />
                    Today's Vitals
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="vitals-card">
                      <div className="text-sm text-gray-600">Heart Rate</div>
                      <div className="text-lg font-semibold">{vitals.heartRate} bpm</div>
                    </div>
                    <div className="vitals-card">
                      <div className="text-sm text-gray-600">Blood Pressure</div>
                      <div className="text-lg font-semibold">{vitals.bloodPressure}</div>
                    </div>
                    <div className="vitals-card">
                      <div className="text-sm text-gray-600">Temperature</div>
                      <div className="text-lg font-semibold">{vitals.temperature}°F</div>
                    </div>
                    <div className="vitals-card">
                      <div className="text-sm text-gray-600">O2 Saturation</div>
                      <div className="text-lg font-semibold">{vitals.oxygenSaturation}%</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="appointments" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">My Appointments</h2>
              <Button className="medical-button">
                <Calendar className="h-4 w-4 mr-2" />
                Book New Appointment
              </Button>
            </div>

            <div className="grid gap-4">
              {appointments.map((appointment) => (
                <Card key={appointment.id} className="medical-card">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="bg-blue-100 p-2 rounded-lg">
                          <Stethoscope className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{appointment.doctor}</h3>
                          <p className="text-gray-600">{appointment.specialty}</p>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                            <span>{appointment.date}</span>
                            <span>{appointment.time}</span>
                            <Badge variant={appointment.status === 'upcoming' ? 'default' : 'secondary'}>
                              {appointment.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {appointment.status === 'upcoming' && (
                          <>
                            <Button variant="outline" size="sm">
                              Reschedule
                            </Button>
                            <Button className="medical-button" size="sm">
                              <Video className="h-4 w-4 mr-2" />
                              Join Call
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="vitals" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Vital Signs & Wearable Data</h2>
              <Button variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Sync Devices
              </Button>
            </div>

            <VitalsChart />
          </TabsContent>

          <TabsContent value="records" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Digital Health Records</h2>
              <Button variant="outline">
                <FileText className="h-4 w-4 mr-2" />
                Request Records
              </Button>
            </div>

            <div className="grid gap-4">
              <Card className="medical-card">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Prescription - Lisinopril</CardTitle>
                    <CardDescription>Prescribed by Dr. Sarah Johnson</CardDescription>
                  </div>
                  <Badge>Active</Badge>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-gray-600">
                    <p>Dosage: 10mg daily</p>
                    <p>Date: January 10, 2025</p>
                    <p>Refills: 2 remaining</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="medical-card">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Lab Results - Complete Blood Count</CardTitle>
                    <CardDescription>Ordered by Dr. Michael Chen</CardDescription>
                  </div>
                  <Badge variant="secondary">View Report</Badge>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-gray-600">
                    <p>Date: January 8, 2025</p>
                    <p>Status: Results available</p>
                    <p>All values within normal range</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="ai-assistant" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">AI Health Assistant</h2>
                <p className="text-gray-600">Get personalized health insights and symptom assessment</p>
              </div>
              <div className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-blue-600" />
                <span className="text-sm text-blue-600 font-medium">Powered by AI</span>
              </div>
            </div>

            <SymptomChecker />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}