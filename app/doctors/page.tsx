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
import { Search, Filter, Star, MapPin, Clock, Video, Calendar, User, Stethoscope, Heart, Brain, Baby, Eye } from 'lucide-react';
import PatientHeader from '@/components/dashboard/patient-header';

export default function DoctorsPage() {
  const [user, setUser] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSpecialty, setFilterSpecialty] = useState('all');
  const [filterRating, setFilterRating] = useState('all');
  const router = useRouter();

  const [doctors] = useState([
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      rating: 4.9,
      reviews: 127,
      experience: '15 years',
      nextAvailable: '2025-01-16 09:00 AM',
      consultationFee: 150,
      languages: ['English', 'Spanish'],
      education: 'Harvard Medical School',
      location: 'PS3WAD Medical Center',
      about: 'Specialized in interventional cardiology with expertise in complex cardiac procedures.',
      achievements: ['Board Certified Cardiologist', 'Fellow of American College of Cardiology'],
      availability: 'Mon-Fri 9AM-5PM'
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialty: 'General Medicine',
      rating: 4.8,
      reviews: 203,
      experience: '12 years',
      nextAvailable: '2025-01-15 02:00 PM',
      consultationFee: 120,
      languages: ['English', 'Mandarin'],
      education: 'Johns Hopkins University',
      location: 'PS3WAD Medical Center',
      about: 'Comprehensive primary care with focus on preventive medicine and chronic disease management.',
      achievements: ['Board Certified Internal Medicine', 'Quality Care Award 2024'],
      availability: 'Mon-Sat 8AM-6PM'
    },
    {
      id: 3,
      name: 'Dr. Emily Rodriguez',
      specialty: 'Pediatrics',
      rating: 4.9,
      reviews: 156,
      experience: '10 years',
      nextAvailable: '2025-01-17 10:30 AM',
      consultationFee: 130,
      languages: ['English', 'Spanish', 'Portuguese'],
      education: 'Stanford University School of Medicine',
      location: 'PS3WAD Medical Center',
      about: 'Dedicated pediatrician specializing in child development and adolescent medicine.',
      achievements: ['Board Certified Pediatrician', 'Pediatric Excellence Award'],
      availability: 'Mon-Fri 8AM-4PM'
    },
    {
      id: 4,
      name: 'Dr. David Kim',
      specialty: 'Dermatology',
      rating: 4.7,
      reviews: 89,
      experience: '8 years',
      nextAvailable: '2025-01-16 03:00 PM',
      consultationFee: 180,
      languages: ['English', 'Korean'],
      education: 'UCLA School of Medicine',
      location: 'PS3WAD Medical Center',
      about: 'Expert in medical and cosmetic dermatology with advanced training in dermatopathology.',
      achievements: ['Board Certified Dermatologist', 'Dermatology Research Award'],
      availability: 'Tue-Sat 9AM-5PM'
    },
    {
      id: 5,
      name: 'Dr. Lisa Thompson',
      specialty: 'Neurology',
      rating: 4.8,
      reviews: 94,
      experience: '14 years',
      nextAvailable: '2025-01-18 11:00 AM',
      consultationFee: 200,
      languages: ['English', 'French'],
      education: 'Mayo Clinic School of Medicine',
      location: 'PS3WAD Medical Center',
      about: 'Neurologist specializing in movement disorders and neurodegenerative diseases.',
      achievements: ['Board Certified Neurologist', 'Neurology Excellence Award'],
      availability: 'Mon-Thu 9AM-4PM'
    },
    {
      id: 6,
      name: 'Dr. James Wilson',
      specialty: 'Ophthalmology',
      rating: 4.6,
      reviews: 112,
      experience: '11 years',
      nextAvailable: '2025-01-19 02:30 PM',
      consultationFee: 160,
      languages: ['English'],
      education: 'University of Pennsylvania',
      location: 'PS3WAD Medical Center',
      about: 'Comprehensive eye care specialist with expertise in cataract and retinal surgery.',
      achievements: ['Board Certified Ophthalmologist', 'Surgical Excellence Award'],
      availability: 'Mon-Fri 8AM-5PM'
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

  const getSpecialtyIcon = (specialty: string) => {
    switch (specialty) {
      case 'Cardiology':
        return <Heart className="h-6 w-6 text-red-500" />;
      case 'Neurology':
        return <Brain className="h-6 w-6 text-purple-500" />;
      case 'Pediatrics':
        return <Baby className="h-6 w-6 text-pink-500" />;
      case 'Ophthalmology':
        return <Eye className="h-6 w-6 text-blue-500" />;
      default:
        return <Stethoscope className="h-6 w-6 text-blue-500" />;
    }
  };

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = filterSpecialty === 'all' || doctor.specialty === filterSpecialty;
    const matchesRating = filterRating === 'all' || doctor.rating >= parseFloat(filterRating);
    return matchesSearch && matchesSpecialty && matchesRating;
  });

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center medical-gradient">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white">Loading doctors...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <PatientHeader user={user} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-4">
            Find Your Doctor
          </h1>
          <p className="text-gray-600 text-lg">
            Connect with qualified healthcare professionals for your medical needs
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="medical-card mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5 text-blue-600" />
              Search & Filter Doctors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
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
              <div>
                <Label htmlFor="specialty">Specialty</Label>
                <Select value={filterSpecialty} onValueChange={setFilterSpecialty}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="All Specialties" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Specialties</SelectItem>
                    <SelectItem value="Cardiology">Cardiology</SelectItem>
                    <SelectItem value="General Medicine">General Medicine</SelectItem>
                    <SelectItem value="Pediatrics">Pediatrics</SelectItem>
                    <SelectItem value="Dermatology">Dermatology</SelectItem>
                    <SelectItem value="Neurology">Neurology</SelectItem>
                    <SelectItem value="Ophthalmology">Ophthalmology</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="rating">Minimum Rating</Label>
                <Select value={filterRating} onValueChange={setFilterRating}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="Any Rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any Rating</SelectItem>
                    <SelectItem value="4.5">4.5+ Stars</SelectItem>
                    <SelectItem value="4.0">4.0+ Stars</SelectItem>
                    <SelectItem value="3.5">3.5+ Stars</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Doctors Grid */}
        <div className="grid gap-8">
          {filteredDoctors.map((doctor) => (
            <Card key={doctor.id} className="medical-card overflow-hidden">
              <CardContent className="p-0">
                <div className="flex flex-col lg:flex-row">
                  {/* Doctor Info */}
                  <div className="flex-1 p-6">
                    <div className="flex items-start space-x-4 mb-4">
                      <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl">
                        {getSpecialtyIcon(doctor.specialty)}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{doctor.name}</h3>
                        <p className="text-lg text-blue-600 font-semibold mb-2">{doctor.specialty}</p>
                        <div className="flex items-center gap-4 mb-3">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span className="font-semibold">{doctor.rating}</span>
                            <span className="text-gray-500">({doctor.reviews} reviews)</span>
                          </div>
                          <Badge variant="secondary">{doctor.experience} experience</Badge>
                        </div>
                        <p className="text-gray-600 mb-4">{doctor.about}</p>
                        
                        {/* Quick Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm">
                              <MapPin className="h-4 w-4 text-gray-400" />
                              <span>{doctor.location}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Clock className="h-4 w-4 text-gray-400" />
                              <span>{doctor.availability}</span>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="text-sm">
                              <span className="text-gray-500">Languages: </span>
                              <span>{doctor.languages.join(', ')}</span>
                            </div>
                            <div className="text-sm">
                              <span className="text-gray-500">Education: </span>
                              <span>{doctor.education}</span>
                            </div>
                          </div>
                        </div>

                        {/* Achievements */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {doctor.achievements.map((achievement, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {achievement}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Booking Section */}
                  <div className="lg:w-80 bg-gradient-to-br from-blue-50 to-purple-50 p-6 border-l border-gray-200">
                    <div className="text-center mb-6">
                      <div className="text-3xl font-bold text-gray-900 mb-1">
                        ${doctor.consultationFee}
                      </div>
                      <div className="text-gray-600">Consultation Fee</div>
                    </div>

                    <div className="space-y-4 mb-6">
                      <div className="bg-white rounded-xl p-4">
                        <div className="text-sm text-gray-600 mb-1">Next Available</div>
                        <div className="font-semibold text-green-600">{doctor.nextAvailable}</div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Button className="w-full medical-button">
                        <Calendar className="h-4 w-4 mr-2" />
                        Book Appointment
                      </Button>
                      <Button variant="outline" className="w-full rounded-xl">
                        <Video className="h-4 w-4 mr-2" />
                        Video Consultation
                      </Button>
                      <Button variant="outline" className="w-full rounded-xl">
                        <User className="h-4 w-4 mr-2" />
                        View Full Profile
                      </Button>
                    </div>

                    <div className="mt-6 p-4 bg-white rounded-xl">
                      <div className="text-sm text-gray-600 mb-2">Quick Stats</div>
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <div className="font-bold text-blue-600">{doctor.reviews}</div>
                          <div className="text-xs text-gray-500">Reviews</div>
                        </div>
                        <div>
                          <div className="font-bold text-green-600">98%</div>
                          <div className="text-xs text-gray-500">Satisfaction</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDoctors.length === 0 && (
          <Card className="medical-card">
            <CardContent className="p-12 text-center">
              <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No doctors found</h3>
              <p className="text-gray-600">Try adjusting your search criteria or filters</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}