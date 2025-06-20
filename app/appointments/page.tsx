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
import { Calendar, Clock, Video, Search, Filter, Plus, User, Stethoscope, MapPin } from 'lucide-react';
import PatientHeader from '@/components/dashboard/patient-header';
import DoctorHeader from '@/components/dashboard/doctor-header';
import HospitalHeader from '@/components/dashboard/hospital-header';

export default function AppointmentsPage() {
  const [user, setUser] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSpecialty, setFilterSpecialty] = useState('');
  const router = useRouter();

  const [appointments] = useState([
    {
      id: 1,
      doctor: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      date: '2025-01-15',
      time: '10:00 AM',
      status: 'upcoming',
      type: 'video',
      location: 'PS3WAD Medical Center',
      patient: 'John Doe'
    },
    {
      id: 2,
      doctor: 'Dr. Michael Chen',
      specialty: 'General Medicine',
      date: '2025-01-12',
      time: '2:30 PM',
      status: 'completed',
      type: 'video',
      location: 'PS3WAD Medical Center',
      patient: 'Jane Smith'
    },
    {
      id: 3,
      doctor: 'Dr. Emily Rodriguez',
      specialty: 'Pediatrics',
      date: '2025-01-18',
      time: '11:15 AM',
      status: 'upcoming',
      type: 'in-person',
      location: 'PS3WAD Medical Center',
      patient: 'Mike Wilson'
    }
  ]);

  const [availableDoctors] = useState([
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      rating: 4.9,
      experience: '15 years',
      nextAvailable: '2025-01-16 09:00 AM',
      image: '/doctors/sarah.jpg',
      location: 'PS3WAD Medical Center'
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialty: 'General Medicine',
      rating: 4.8,
      experience: '12 years',
      nextAvailable: '2025-01-15 02:00 PM',
      image: '/doctors/michael.jpg',
      location: 'PS3WAD Medical Center'
    },
    {
      id: 3,
      name: 'Dr. Emily Rodriguez',
      specialty: 'Pediatrics',
      rating: 4.9,
      experience: '10 years',
      nextAvailable: '2025-01-17 10:30 AM',
      image: '/doctors/emily.jpg',
      location: 'PS3WAD Medical Center'
    },
    {
      id: 4,
      name: 'Dr. David Kim',
      specialty: 'Dermatology',
      rating: 4.7,
      experience: '8 years',
      nextAvailable: '2025-01-16 03:00 PM',
      image: '/doctors/david.jpg',
      location: 'PS3WAD Medical Center'
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
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    return type === 'video' ? <Video className="h-4 w-4" /> : <MapPin className="h-4 w-4" />;
  };

  const filteredDoctors = availableDoctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = !filterSpecialty || doctor.specialty === filterSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  const renderHeader = () => {
    switch (user?.role) {
      case 'patient':
        return <PatientHeader user={user} />;
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
          <p className="text-white">Loading appointments...</p>
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
            {user.role === 'patient' ? 'My Appointments' : 'Appointment Management'}
          </h1>
          <p className="text-gray-600 text-lg">
            {user.role === 'patient' 
              ? 'Manage your healthcare appointments and book new consultations'
              : 'View and manage patient appointments'
            }
          </p>
        </div>

        <Tabs defaultValue="appointments" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-3 bg-white/80 backdrop-blur-sm rounded-2xl p-2">
            <TabsTrigger value="appointments" className="rounded-xl">My Appointments</TabsTrigger>
            {user.role === 'patient' && <TabsTrigger value="book" className="rounded-xl">Book Appointment</TabsTrigger>}
            <TabsTrigger value="history" className="rounded-xl">History</TabsTrigger>
          </TabsList>

          <TabsContent value="appointments" className="space-y-6">
            <div className="grid gap-6">
              {appointments.filter(apt => apt.status === 'upcoming').map((appointment) => (
                <Card key={appointment.id} className="medical-card overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl">
                          <Stethoscope className="h-6 w-6 text-white" />
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-xl font-bold text-gray-900">
                            {user.role === 'patient' ? appointment.doctor : `Patient: ${appointment.patient}`}
                          </h3>
                          <p className="text-gray-600 font-medium">{appointment.specialty}</p>
                          <div className="flex items-center gap-6 text-sm text-gray-500">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              <span>{appointment.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              <span>{appointment.time}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              {getTypeIcon(appointment.type)}
                              <span className="capitalize">{appointment.type}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-600">{appointment.location}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={getStatusColor(appointment.status)}>
                          {appointment.status}
                        </Badge>
                        {appointment.status === 'upcoming' && (
                          <div className="flex gap-2">
                            <Button variant="outline" className="rounded-xl">
                              Reschedule
                            </Button>
                            <Button className="medical-button">
                              {appointment.type === 'video' ? (
                                <>
                                  <Video className="h-4 w-4 mr-2" />
                                  Join Call
                                </>
                              ) : (
                                <>
                                  <MapPin className="h-4 w-4 mr-2" />
                                  Get Directions
                                </>
                              )}
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {user.role === 'patient' && (
            <TabsContent value="book" className="space-y-6">
              <Card className="medical-card">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">Book New Appointment</CardTitle>
                  <CardDescription>
                    Find and book appointments with our qualified healthcare professionals
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Search and Filter */}
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <Label htmlFor="search">Search Doctors</Label>
                      <div className="relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="search"
                          placeholder="Search by name or specialty..."
                          className="pl-10 rounded-xl"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="md:w-64">
                      <Label htmlFor="specialty">Filter by Specialty</Label>
                      <Select value={filterSpecialty} onValueChange={setFilterSpecialty}>
                        <SelectTrigger className="rounded-xl">
                          <SelectValue placeholder="All Specialties" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">All Specialties</SelectItem>
                          <SelectItem value="Cardiology">Cardiology</SelectItem>
                          <SelectItem value="General Medicine">General Medicine</SelectItem>
                          <SelectItem value="Pediatrics">Pediatrics</SelectItem>
                          <SelectItem value="Dermatology">Dermatology</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Doctors List */}
                  <div className="grid gap-6">
                    {filteredDoctors.map((doctor) => (
                      <Card key={doctor.id} className="border border-gray-200 hover:shadow-lg transition-all duration-300">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-4">
                              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
                                <User className="h-8 w-8 text-white" />
                              </div>
                              <div className="space-y-2">
                                <h3 className="text-xl font-bold text-gray-900">{doctor.name}</h3>
                                <p className="text-gray-600 font-medium">{doctor.specialty}</p>
                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                  <span>⭐ {doctor.rating}</span>
                                  <span>📅 {doctor.experience} experience</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <MapPin className="h-4 w-4 text-gray-400" />
                                  <span className="text-sm text-gray-600">{doctor.location}</span>
                                </div>
                                <div className="text-sm text-green-600 font-medium">
                                  Next available: {doctor.nextAvailable}
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" className="rounded-xl">
                                View Profile
                              </Button>
                              <Button className="medical-button">
                                <Plus className="h-4 w-4 mr-2" />
                                Book Appointment
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          <TabsContent value="history" className="space-y-6">
            <div className="grid gap-6">
              {appointments.filter(apt => apt.status === 'completed').map((appointment) => (
                <Card key={appointment.id} className="medical-card opacity-90">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="p-3 bg-gradient-to-r from-gray-400 to-gray-500 rounded-2xl">
                          <Stethoscope className="h-6 w-6 text-white" />
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-xl font-bold text-gray-900">
                            {user.role === 'patient' ? appointment.doctor : `Patient: ${appointment.patient}`}
                          </h3>
                          <p className="text-gray-600 font-medium">{appointment.specialty}</p>
                          <div className="flex items-center gap-6 text-sm text-gray-500">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              <span>{appointment.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              <span>{appointment.time}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={getStatusColor(appointment.status)}>
                          {appointment.status}
                        </Badge>
                        <Button variant="outline" className="rounded-xl">
                          View Notes
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}