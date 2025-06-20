"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar, 
  Users, 
  Activity, 
  FileText, 
  Video, 
  Clock,
  Stethoscope,
  Heart,
  Brain,
  AlertCircle
} from 'lucide-react';
import DoctorHeader from '@/components/dashboard/doctor-header';
import PatientVitalsPanel from '@/components/doctor/patient-vitals-panel';
import AppointmentsList from '@/components/doctor/appointments-list';

export default function DoctorDashboard() {
  const [user, setUser] = useState<any>(null);
  const [appointments] = useState([
    {
      id: 1,
      patient: 'Sarah Johnson',
      age: 34,
      time: '09:00 AM',
      date: '2025-01-15',
      type: 'Follow-up',
      status: 'upcoming',
      vitals: { heartRate: 72, bloodPressure: '120/80', temperature: 98.6 }
    },
    {
      id: 2,
      patient: 'Michael Chen',
      age: 45,
      time: '10:30 AM',
      date: '2025-01-15',
      type: 'Consultation',
      status: 'in-progress',
      vitals: { heartRate: 85, bloodPressure: '135/85', temperature: 99.1 }
    },
    {
      id: 3,
      patient: 'Emma Wilson',
      age: 28,
      time: '02:00 PM',
      date: '2025-01-15',
      type: 'Check-up',
      status: 'upcoming',
      vitals: { heartRate: 68, bloodPressure: '118/75', temperature: 98.4 }
    }
  ]);

  const [stats] = useState({
    todayAppointments: 8,
    totalPatients: 124,
    completedToday: 3,
    avgConsultationTime: 25
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
      <DoctorHeader user={user} />
      
      <div className="container mx-auto px-4 py-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Good morning, Dr. {user.name}!
          </h1>
          <p className="text-gray-600">
            You have {stats.todayAppointments} appointments scheduled for today. {stats.completedToday} completed.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="medical-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
              <Calendar className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.todayAppointments}</div>
              <p className="text-xs text-muted-foreground">
                +2 from yesterday
              </p>
            </CardContent>
          </Card>

          <Card className="medical-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
              <Users className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalPatients}</div>
              <p className="text-xs text-muted-foreground">
                +5 this week
              </p>
            </CardContent>
          </Card>

          <Card className="medical-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed Today</CardTitle>
              <Activity className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.completedToday}</div>
              <p className="text-xs text-muted-foreground">
                {stats.todayAppointments - stats.completedToday} remaining
              </p>
            </CardContent>
          </Card>

          <Card className="medical-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Consultation</CardTitle>
              <Clock className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.avgConsultationTime}m</div>
              <p className="text-xs text-muted-foreground">
                -3 min from last week
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="appointments" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="patients">Patients</TabsTrigger>
            <TabsTrigger value="consultations">Consultations</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="appointments" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Appointments List */}
              <div className="lg:col-span-2">
                <Card className="medical-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-blue-600" />
                      Today's Schedule
                    </CardTitle>
                    <CardDescription>
                      Manage your appointments and patient consultations
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <AppointmentsList appointments={appointments} />
                  </CardContent>
                </Card>
              </div>

              {/* Active Patient Panel */}
              <div>
                <Card className="medical-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="h-5 w-5 text-green-600" />
                      Active Patient
                    </CardTitle>
                    <CardDescription>
                      Real-time vitals and consultation tools
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <PatientVitalsPanel 
                      patient={appointments.find(apt => apt.status === 'in-progress')} 
                    />
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="patients" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Patient Records</h2>
              <Button className="medical-button">
                <Users className="h-4 w-4 mr-2" />
                View All Patients
              </Button>
            </div>

            <div className="grid gap-4">
              {appointments.map((appointment) => (
                <Card key={appointment.id} className="medical-card">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="bg-blue-100 p-2 rounded-lg">
                          <Users className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{appointment.patient}</h3>
                          <p className="text-gray-600">Age: {appointment.age}</p>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                            <span>Last visit: Jan 12, 2025</span>
                            <Badge variant="secondary">Regular Patient</Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4 mr-2" />
                          Records
                        </Button>
                        <Button className="medical-button" size="sm">
                          <Video className="h-4 w-4 mr-2" />
                          Consult
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="consultations" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Video Consultations</h2>
              <Button className="medical-button">
                <Video className="h-4 w-4 mr-2" />
                Start Consultation Room
              </Button>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="medical-card">
                <CardHeader>
                  <CardTitle>Consultation Tools</CardTitle>
                  <CardDescription>
                    Quick access to consultation features
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full" variant="outline">
                    <Brain className="h-4 w-4 mr-2" />
                    AI Diagnosis Assistant
                  </Button>
                  <Button className="w-full" variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    Prescription Templates
                  </Button>
                  <Button className="w-full" variant="outline">
                    <Heart className="h-4 w-4 mr-2" />
                    Vitals Monitoring
                  </Button>
                  <Button className="w-full" variant="outline">
                    <Stethoscope className="h-4 w-4 mr-2" />
                    Digital Stethoscope
                  </Button>
                </CardContent>
              </Card>

              <Card className="medical-card">
                <CardHeader>
                  <CardTitle>Recent Consultations</CardTitle>
                  <CardDescription>
                    Your latest patient interactions
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div>
                      <p className="font-medium">Sarah Johnson</p>
                      <p className="text-sm text-gray-600">Cardiology Follow-up</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Completed</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div>
                      <p className="font-medium">Michael Chen</p>
                      <p className="text-sm text-gray-600">General Consultation</p>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-2xl font-bold">Practice Analytics</h2>
            
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="medical-card">
                <CardHeader>
                  <CardTitle>This Week's Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Total Appointments</span>
                    <span className="font-semibold">32</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Completed Consultations</span>
                    <span className="font-semibold">28</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Average Rating</span>
                    <span className="font-semibold">4.8/5</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Patient Satisfaction</span>
                    <span className="font-semibold">96%</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="medical-card">
                <CardHeader>
                  <CardTitle>Alerts & Reminders</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    <div>
                      <p className="text-sm font-medium">High Priority</p>
                      <p className="text-xs text-gray-600">Patient follow-up required</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                    <Clock className="h-4 w-4 text-yellow-600" />
                    <div>
                      <p className="text-sm font-medium">Reminder</p>
                      <p className="text-xs text-gray-600">Medical license renewal due</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}