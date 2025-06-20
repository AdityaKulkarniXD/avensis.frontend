"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Filter, User, Calendar, FileText, Activity, Heart, Phone, Mail, MapPin, Clock } from 'lucide-react';
import DoctorHeader from '@/components/dashboard/doctor-header';
import HospitalHeader from '@/components/dashboard/hospital-header';

export default function PatientsPage() {
  const [user, setUser] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const router = useRouter();

  const [patients] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      age: 34,
      gender: 'Female',
      email: 'sarah.johnson@email.com',
      phone: '+1 (555) 123-4567',
      address: '123 Main St, New York, NY 10001',
      bloodType: 'A+',
      lastVisit: '2025-01-12',
      nextAppointment: '2025-01-20',
      status: 'active',
      conditions: ['Hypertension', 'Diabetes Type 2'],
      allergies: ['Penicillin'],
      medications: ['Metformin', 'Lisinopril'],
      vitals: {
        heartRate: 72,
        bloodPressure: '120/80',
        temperature: 98.6,
        weight: 65,
        height: 165
      },
      insurance: 'Blue Cross Blue Shield',
      emergencyContact: 'John Johnson - Husband - (555) 123-4568'
    },
    {
      id: 2,
      name: 'Michael Chen',
      age: 45,
      gender: 'Male',
      email: 'michael.chen@email.com',
      phone: '+1 (555) 234-5678',
      address: '456 Oak Ave, Los Angeles, CA 90210',
      bloodType: 'O-',
      lastVisit: '2025-01-10',
      nextAppointment: '2025-01-18',
      status: 'active',
      conditions: ['Asthma'],
      allergies: ['Shellfish', 'Pollen'],
      medications: ['Albuterol Inhaler'],
      vitals: {
        heartRate: 78,
        bloodPressure: '125/82',
        temperature: 98.4,
        weight: 80,
        height: 175
      },
      insurance: 'Aetna',
      emergencyContact: 'Lisa Chen - Wife - (555) 234-5679'
    },
    {
      id: 3,
      name: 'Emma Wilson',
      age: 28,
      gender: 'Female',
      email: 'emma.wilson@email.com',
      phone: '+1 (555) 345-6789',
      address: '789 Pine St, Chicago, IL 60601',
      bloodType: 'B+',
      lastVisit: '2025-01-08',
      nextAppointment: null,
      status: 'inactive',
      conditions: [],
      allergies: ['Latex'],
      medications: [],
      vitals: {
        heartRate: 68,
        bloodPressure: '118/75',
        temperature: 98.2,
        weight: 58,
        height: 160
      },
      insurance: 'United Healthcare',
      emergencyContact: 'David Wilson - Brother - (555) 345-6790'
    },
    {
      id: 4,
      name: 'James Brown',
      age: 52,
      gender: 'Male',
      email: 'james.brown@email.com',
      phone: '+1 (555) 456-7890',
      address: '321 Elm St, Houston, TX 77001',
      bloodType: 'AB+',
      lastVisit: '2025-01-15',
      nextAppointment: '2025-01-22',
      status: 'critical',
      conditions: ['Heart Disease', 'High Cholesterol'],
      allergies: ['Aspirin'],
      medications: ['Atorvastatin', 'Metoprolol'],
      vitals: {
        heartRate: 85,
        bloodPressure: '140/90',
        temperature: 99.1,
        weight: 90,
        height: 180
      },
      insurance: 'Medicare',
      emergencyContact: 'Mary Brown - Wife - (555) 456-7891'
    }
  ]);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      router.push('/auth/login');
    }
  }, [router]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'critical':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getVitalStatus = (vital: string, value: any) => {
    switch (vital) {
      case 'heartRate':
        if (value >= 60 && value <= 100) return 'normal';
        return value > 100 ? 'high' : 'low';
      case 'temperature':
        if (value >= 97.0 && value <= 99.0) return 'normal';
        return value > 99.0 ? 'high' : 'low';
      default:
        return 'normal';
    }
  };

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !filterStatus || patient.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const renderHeader = () => {
    switch (user?.role) {
      case 'doctor':
        return <DoctorHeader user={user} />;
      case 'hospital':
        return <HospitalHeader user={user} />;
      default:
        return null;
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center medical-gradient">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white">Loading patients...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {renderHeader()}
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-4">
            Patient Management
          </h1>
          <p className="text-gray-600 text-lg">
            Comprehensive patient records and health management system
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="medical-card mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5 text-blue-600" />
              Search & Filter Patients
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="search">Search Patients</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="search"
                    placeholder="Search by name or email..."
                    className="pl-10 rounded-xl"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="status">Filter by Status</Label>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="All Statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Statuses</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Patients List */}
        <div className="grid gap-6">
          {filteredPatients.map((patient) => (
            <Card key={patient.id} className="medical-card overflow-hidden">
              <CardContent className="p-0">
                <div className="flex flex-col lg:flex-row">
                  {/* Patient Info */}
                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-4">
                        <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl">
                          <User className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-1">{patient.name}</h3>
                          <p className="text-gray-600 mb-2">{patient.age} years old • {patient.gender}</p>
                          <Badge className={getStatusColor(patient.status)}>
                            {patient.status}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* Contact Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="h-4 w-4 text-gray-400" />
                          <span>{patient.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-4 w-4 text-gray-400" />
                          <span>{patient.phone}</span>
                        </div>
                        <div className="flex items-start gap-2 text-sm">
                          <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                          <span>{patient.address}</span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="text-sm">
                          <span className="text-gray-500">Blood Type: </span>
                          <span className="font-semibold">{patient.bloodType}</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-500">Insurance: </span>
                          <span>{patient.insurance}</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-500">Last Visit: </span>
                          <span>{patient.lastVisit}</span>
                        </div>
                      </div>
                    </div>

                    {/* Medical Info */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Conditions</h4>
                        <div className="space-y-1">
                          {patient.conditions.length > 0 ? (
                            patient.conditions.map((condition, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {condition}
                              </Badge>
                            ))
                          ) : (
                            <span className="text-gray-500 text-sm">None</span>
                          )}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Allergies</h4>
                        <div className="space-y-1">
                          {patient.allergies.length > 0 ? (
                            patient.allergies.map((allergy, index) => (
                              <Badge key={index} variant="outline" className="text-xs bg-red-50 text-red-700">
                                {allergy}
                              </Badge>
                            ))
                          ) : (
                            <span className="text-gray-500 text-sm">None</span>
                          )}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Medications</h4>
                        <div className="space-y-1">
                          {patient.medications.length > 0 ? (
                            patient.medications.map((medication, index) => (
                              <Badge key={index} variant="outline" className="text-xs bg-green-50 text-green-700">
                                {medication}
                              </Badge>
                            ))
                          ) : (
                            <span className="text-gray-500 text-sm">None</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Vitals & Actions */}
                  <div className="lg:w-80 bg-gradient-to-br from-blue-50 to-purple-50 p-6 border-l border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-4">Current Vitals</h4>
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      <div className="bg-white rounded-xl p-3 text-center">
                        <Heart className="h-4 w-4 text-red-500 mx-auto mb-1" />
                        <div className="text-sm font-semibold">{patient.vitals.heartRate}</div>
                        <div className="text-xs text-gray-500">bpm</div>
                      </div>
                      <div className="bg-white rounded-xl p-3 text-center">
                        <Activity className="h-4 w-4 text-blue-500 mx-auto mb-1" />
                        <div className="text-sm font-semibold">{patient.vitals.bloodPressure}</div>
                        <div className="text-xs text-gray-500">mmHg</div>
                      </div>
                      <div className="bg-white rounded-xl p-3 text-center">
                        <div className="text-sm font-semibold">{patient.vitals.temperature}°F</div>
                        <div className="text-xs text-gray-500">temp</div>
                      </div>
                      <div className="bg-white rounded-xl p-3 text-center">
                        <div className="text-sm font-semibold">{patient.vitals.weight}kg</div>
                        <div className="text-xs text-gray-500">weight</div>
                      </div>
                    </div>

                    {patient.nextAppointment && (
                      <div className="bg-white rounded-xl p-4 mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="h-4 w-4 text-blue-600" />
                          <span className="font-semibold text-sm">Next Appointment</span>
                        </div>
                        <div className="text-sm text-gray-600">{patient.nextAppointment}</div>
                      </div>
                    )}

                    <div className="space-y-3">
                      <Button className="w-full medical-button">
                        <FileText className="h-4 w-4 mr-2" />
                        View Full Record
                      </Button>
                      <Button variant="outline" className="w-full rounded-xl">
                        <Calendar className="h-4 w-4 mr-2" />
                        Schedule Appointment
                      </Button>
                      <Button variant="outline" className="w-full rounded-xl">
                        <Activity className="h-4 w-4 mr-2" />
                        View Vitals History
                      </Button>
                    </div>

                    <div className="mt-6 p-4 bg-white rounded-xl">
                      <div className="text-sm text-gray-600 mb-2">Emergency Contact</div>
                      <div className="text-xs text-gray-700">{patient.emergencyContact}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPatients.length === 0 && (
          <Card className="medical-card">
            <CardContent className="p-12 text-center">
              <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No patients found</h3>
              <p className="text-gray-600">Try adjusting your search criteria or filters</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}