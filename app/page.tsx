"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Building, 
  Users, 
  Activity, 
  FileText, 
  UserPlus, 
  Calendar,
  Stethoscope,
  TrendingUp,
  AlertCircle,
  Clock
} from 'lucide-react';
import HospitalHeader from '@/components/dashboard/hospital-header';
import DoctorManagement from '@/components/hospital/doctor-management';
import PatientOverview from '@/components/hospital/patient-overview';

export default function HospitalDashboard() {
  const searchParams = useSearchParams();
  const [user, setUser] = useState<any>(null);
  const [hospitalStats] = useState({
    totalDoctors: 25,
    activeDoctors: 18,
    totalPatients: 1247,
    todayAppointments: 89,
    completedAppointments: 45,
    departments: 8,
    bedOccupancy: 78
  });

  const [doctors] = useState([
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      status: 'online',
      patients: 12,
      appointments: 8,
      rating: 4.9
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialty: 'General Medicine',
      status: 'busy',
      patients: 15,
      appointments: 6,
      rating: 4.8
    },
    {
      id: 3,
      name: 'Dr. Emily Rodriguez',
      specialty: 'Pediatrics',
      status: 'online',
      patients: 8,
      appointments: 5,
      rating: 4.9
    }
  ]);

  // Get the active tab from URL parameters
  const activeTab = searchParams.get('tab') || 'overview';

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
      <HospitalHeader user={user} />
      
      <div className="container mx-auto px-4 py-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome to {user.hospitalName || 'PS3WAD Medical Center'}
          </h1>
          <p className="text-gray-600">
            Hospital management dashboard. Monitor your healthcare facility's operations and staff.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="medical-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Doctors</CardTitle>
              <Stethoscope className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{hospitalStats.activeDoctors}</div>
              <p className="text-xs text-muted-foreground">
                of {hospitalStats.totalDoctors} total doctors
              </p>
            </CardContent>
          </Card>

          <Card className="medical-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
              <Users className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{hospitalStats.totalPatients.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +23 new this week
              </p>
            </CardContent>
          </Card>

          <Card className="medical-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
              <Calendar className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{hospitalStats.todayAppointments}</div>
              <p className="text-xs text-muted-foreground">
                {hospitalStats.completedAppointments} completed
              </p>
            </CardContent>
          </Card>

          <Card className="medical-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Bed Occupancy</CardTitle>
              <Activity className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{hospitalStats.bedOccupancy}%</div>
              <p className="text-xs text-muted-foreground">
                Within normal range
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="doctors">Doctors</TabsTrigger>
            <TabsTrigger value="patients">Patients</TabsTrigger>
            <TabsTrigger value="departments">Departments</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Department Overview */}
              <div className="lg:col-span-2">
                <Card className="medical-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building className="h-5 w-5 text-blue-600" />
                      Department Status
                    </CardTitle>
                    <CardDescription>
                      Real-time status of hospital departments
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { name: 'Emergency', status: 'active', doctors: 6, patients: 12 },
                        { name: 'Cardiology', status: 'active', doctors: 4, patients: 8 },
                        { name: 'Pediatrics', status: 'active', doctors: 3, patients: 5 },
                        { name: 'Surgery', status: 'busy', doctors: 5, patients: 15 },
                        { name: 'Radiology', status: 'active', doctors: 2, patients: 6 },
                        { name: 'Laboratory', status: 'active', doctors: 3, patients: 10 }
                      ].map((dept, index) => (
                        <div key={index} className="p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">{dept.name}</h4>
                            <Badge 
                              className={dept.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}
                            >
                              {dept.status}
                            </Badge>
                          </div>
                          <div className="text-sm text-gray-600">
                            <p>{dept.doctors} doctors, {dept.patients} patients</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <div>
                <Card className="medical-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                      Quick Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full medical-button">
                      <UserPlus className="h-4 w-4 mr-2" />
                      Add New Doctor
                    </Button>
                    <Button className="w-full" variant="outline">
                      <FileText className="h-4 w-4 mr-2" />
                      Generate Report
                    </Button>
                    <Button className="w-full" variant="outline">
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule Management
                    </Button>
                    <Button className="w-full" variant="outline">
                      <Building className="h-4 w-4 mr-2" />
                      Facility Management
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Alerts & Notifications */}
            <Card className="medical-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-orange-600" />
                  System Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                    <AlertCircle className="h-4 w-4 text-yellow-600" />
                    <div>
                      <p className="font-medium text-sm">High Patient Volume</p>
                      <p className="text-xs text-gray-600">Emergency department at 95% capacity</p>
                    </div>
                    <Button size="sm" variant="outline">View</Button>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <Clock className="h-4 w-4 text-blue-600" />
                    <div>
                      <p className="font-medium text-sm">Staff Schedule</p>
                      <p className="text-xs text-gray-600">3 doctors ending shifts in 2 hours</p>
                    </div>
                    <Button size="sm" variant="outline">Manage</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="doctors" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Doctor Management</h2>
              <Button className="medical-button">
                <UserPlus className="h-4 w-4 mr-2" />
                Add New Doctor
              </Button>
            </div>
            <DoctorManagement doctors={doctors} />
          </TabsContent>

          <TabsContent value="patients" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Patient Overview</h2>
              <Button variant="outline">
                <FileText className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
            <PatientOverview />
          </TabsContent>

          <TabsContent value="departments" className="space-y-6">
            <h2 className="text-2xl font-bold">Department Management</h2>
            
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="medical-card">
                <CardHeader>
                  <CardTitle>Department Performance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { dept: 'Emergency', efficiency: 92, patients: 45, avgTime: '15 min' },
                    { dept: 'Cardiology', efficiency: 88, patients: 28, avgTime: '25 min' },
                    { dept: 'Surgery', efficiency: 85, patients: 12, avgTime: '120 min' },
                    { dept: 'Pediatrics', efficiency: 94, patients: 18, avgTime: '20 min' }
                  ].map((dept, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium">{dept.dept}</h4>
                        <p className="text-sm text-gray-600">{dept.patients} patients today</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{dept.efficiency}%</p>
                        <p className="text-xs text-gray-600">{dept.avgTime} avg</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="medical-card">
                <CardHeader>
                  <CardTitle>Resource Allocation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>ICU Beds</span>
                        <span>18/20</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-red-600 h-2 rounded-full" style={{width: '90%'}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>General Beds</span>
                        <span>45/60</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-orange-600 h-2 rounded-full" style={{width: '75%'}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Operating Rooms</span>
                        <span>3/8</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{width: '37.5%'}}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-2xl font-bold">Hospital Analytics</h2>
            
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="medical-card">
                <CardHeader>
                  <CardTitle>Monthly Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">2,847</div>
                      <div className="text-sm text-gray-600">Total Patients</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">94%</div>
                      <div className="text-sm text-gray-600">Satisfaction Rate</div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">1,234</div>
                      <div className="text-sm text-gray-600">Consultations</div>
                    </div>
                    <div className="text-center p-3 bg-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">23 min</div>
                      <div className="text-sm text-gray-600">Avg Wait Time</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="medical-card">
                <CardHeader>
                  <CardTitle>Key Performance Indicators</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Patient Satisfaction</span>
                      <span className="font-semibold">94%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Doctor Utilization</span>
                      <span className="font-semibold">87%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Bed Occupancy Rate</span>
                      <span className="font-semibold">78%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Emergency Response Time</span>
                      <span className="font-semibold">12 min</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Readmission Rate</span>
                      <span className="font-semibold">8.2%</span>
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