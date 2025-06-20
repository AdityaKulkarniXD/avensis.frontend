"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Video, Calendar, Clock, User, Mic, MicOff, VideoOff, Phone, PhoneOff, Settings, MessageCircle, FileText, Share } from 'lucide-react';
import DoctorHeader from '@/components/dashboard/doctor-header';

export default function ConsultationsPage() {
  const [user, setUser] = useState<any>(null);
  const [isInCall, setIsInCall] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const router = useRouter();

  const [activeConsultations] = useState([
    {
      id: 1,
      patient: 'Sarah Johnson',
      age: 34,
      time: '10:00 AM',
      duration: '15 min',
      type: 'Follow-up',
      status: 'waiting',
      vitals: { heartRate: 72, bloodPressure: '120/80', temperature: 98.6 }
    },
    {
      id: 2,
      patient: 'Michael Chen',
      age: 45,
      time: '10:30 AM',
      duration: '30 min',
      type: 'Initial Consultation',
      status: 'in-progress',
      vitals: { heartRate: 85, bloodPressure: '135/85', temperature: 99.1 }
    }
  ]);

  const [upcomingConsultations] = useState([
    {
      id: 3,
      patient: 'Emma Wilson',
      age: 28,
      time: '11:00 AM',
      duration: '20 min',
      type: 'Check-up',
      status: 'scheduled'
    },
    {
      id: 4,
      patient: 'James Brown',
      age: 52,
      time: '11:30 AM',
      duration: '25 min',
      type: 'Consultation',
      status: 'scheduled'
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
      case 'waiting':
        return 'bg-yellow-100 text-yellow-800';
      case 'in-progress':
        return 'bg-green-100 text-green-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const startConsultation = (consultationId: number) => {
    setIsInCall(true);
  };

  const endConsultation = () => {
    setIsInCall(false);
    setIsMuted(false);
    setIsVideoOff(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center medical-gradient">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white">Loading consultations...</p>
        </div>
      </div>
    );
  }

  if (isInCall) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col">
        {/* Video Call Interface */}
        <div className="flex-1 relative">
          {/* Main Video */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
            <div className="text-center text-white">
              <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="h-16 w-16" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Michael Chen</h3>
              <p className="text-white/80">Connected • 05:23</p>
            </div>
          </div>

          {/* Doctor's Video (Picture-in-Picture) */}
          <div className="absolute top-4 right-4 w-48 h-36 bg-gray-800 rounded-xl overflow-hidden">
            <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <User className="h-6 w-6" />
                </div>
                <p className="text-sm">Dr. {user.name}</p>
              </div>
            </div>
          </div>

          {/* Patient Vitals Overlay */}
          <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded-xl p-4 text-white">
            <h4 className="font-semibold mb-2">Live Vitals</h4>
            <div className="space-y-1 text-sm">
              <div>HR: 85 bpm</div>
              <div>BP: 135/85</div>
              <div>Temp: 99.1°F</div>
            </div>
          </div>

          {/* Call Controls */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="flex items-center gap-4 bg-black/50 backdrop-blur-sm rounded-2xl p-4">
              <Button
                variant="ghost"
                size="lg"
                className={`rounded-full w-14 h-14 ${isMuted ? 'bg-red-500 hover:bg-red-600' : 'bg-white/20 hover:bg-white/30'} text-white`}
                onClick={() => setIsMuted(!isMuted)}
              >
                {isMuted ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
              </Button>
              
              <Button
                variant="ghost"
                size="lg"
                className={`rounded-full w-14 h-14 ${isVideoOff ? 'bg-red-500 hover:bg-red-600' : 'bg-white/20 hover:bg-white/30'} text-white`}
                onClick={() => setIsVideoOff(!isVideoOff)}
              >
                {isVideoOff ? <VideoOff className="h-6 w-6" /> : <Video className="h-6 w-6" />}
              </Button>

              <Button
                variant="ghost"
                size="lg"
                className="rounded-full w-14 h-14 bg-white/20 hover:bg-white/30 text-white"
              >
                <MessageCircle className="h-6 w-6" />
              </Button>

              <Button
                variant="ghost"
                size="lg"
                className="rounded-full w-14 h-14 bg-white/20 hover:bg-white/30 text-white"
              >
                <Share className="h-6 w-6" />
              </Button>

              <Button
                variant="ghost"
                size="lg"
                className="rounded-full w-14 h-14 bg-white/20 hover:bg-white/30 text-white"
              >
                <Settings className="h-6 w-6" />
              </Button>

              <Button
                variant="ghost"
                size="lg"
                className="rounded-full w-14 h-14 bg-red-500 hover:bg-red-600 text-white"
                onClick={endConsultation}
              >
                <PhoneOff className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Actions Bar */}
        <div className="bg-gray-800 p-4">
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                <FileText className="h-4 w-4 mr-2" />
                Patient Records
              </Button>
              <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                <User className="h-4 w-4 mr-2" />
                Prescription Pad
              </Button>
            </div>
            <div className="text-white text-sm">
              Consultation Time: 05:23
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <DoctorHeader user={user} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-4">
            Video Consultations
          </h1>
          <p className="text-gray-600 text-lg">
            Manage your virtual patient consultations and video calls
          </p>
        </div>

        <Tabs defaultValue="active" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 bg-white/80 backdrop-blur-sm rounded-2xl p-2">
            <TabsTrigger value="active" className="rounded-xl">Active Consultations</TabsTrigger>
            <TabsTrigger value="upcoming" className="rounded-xl">Upcoming</TabsTrigger>
            <TabsTrigger value="tools" className="rounded-xl">Consultation Tools</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-6">
            <div className="grid gap-6">
              {activeConsultations.map((consultation) => (
                <Card key={consultation.id} className="medical-card">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl">
                          <Video className="h-6 w-6 text-white" />
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-xl font-bold text-gray-900">{consultation.patient}</h3>
                          <p className="text-gray-600">{consultation.type} • Age: {consultation.age}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              <span>{consultation.time}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              <span>{consultation.duration}</span>
                            </div>
                          </div>
                          {consultation.vitals && (
                            <div className="flex gap-3 text-xs text-gray-600 bg-gray-50 rounded-lg p-2">
                              <span>HR: {consultation.vitals.heartRate}</span>
                              <span>BP: {consultation.vitals.bloodPressure}</span>
                              <span>Temp: {consultation.vitals.temperature}°F</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={getStatusColor(consultation.status)}>
                          {consultation.status.replace('-', ' ')}
                        </Badge>
                        {consultation.status === 'waiting' && (
                          <Button 
                            className="medical-button"
                            onClick={() => startConsultation(consultation.id)}
                          >
                            <Video className="h-4 w-4 mr-2" />
                            Start Call
                          </Button>
                        )}
                        {consultation.status === 'in-progress' && (
                          <Button 
                            className="medical-button-secondary"
                            onClick={() => startConsultation(consultation.id)}
                          >
                            <Video className="h-4 w-4 mr-2" />
                            Join Call
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="upcoming" className="space-y-6">
            <div className="grid gap-6">
              {upcomingConsultations.map((consultation) => (
                <Card key={consultation.id} className="medical-card">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl">
                          <Calendar className="h-6 w-6 text-white" />
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-xl font-bold text-gray-900">{consultation.patient}</h3>
                          <p className="text-gray-600">{consultation.type} • Age: {consultation.age}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              <span>{consultation.time}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              <span>{consultation.duration}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={getStatusColor(consultation.status)}>
                          {consultation.status}
                        </Badge>
                        <div className="flex gap-2">
                          <Button variant="outline" className="rounded-xl">
                            <FileText className="h-4 w-4 mr-2" />
                            Prep Notes
                          </Button>
                          <Button variant="outline" className="rounded-xl">
                            Reschedule
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tools" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="medical-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Video className="h-5 w-5 text-blue-600" />
                    Video Settings
                  </CardTitle>
                  <CardDescription>
                    Configure your video consultation preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full" variant="outline">
                    Test Camera & Microphone
                  </Button>
                  <Button className="w-full" variant="outline">
                    Audio Settings
                  </Button>
                  <Button className="w-full" variant="outline">
                    Video Quality Settings
                  </Button>
                </CardContent>
              </Card>

              <Card className="medical-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-green-600" />
                    Consultation Templates
                  </CardTitle>
                  <CardDescription>
                    Quick access to consultation templates
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full" variant="outline">
                    General Consultation
                  </Button>
                  <Button className="w-full" variant="outline">
                    Follow-up Template
                  </Button>
                  <Button className="w-full" variant="outline">
                    Prescription Template
                  </Button>
                </CardContent>
              </Card>

              <Card className="medical-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-purple-600" />
                    Patient Tools
                  </CardTitle>
                  <CardDescription>
                    Tools for patient interaction during calls
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full" variant="outline">
                    Screen Sharing
                  </Button>
                  <Button className="w-full" variant="outline">
                    Digital Whiteboard
                  </Button>
                  <Button className="w-full" variant="outline">
                    File Sharing
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Quick Start Consultation Room */}
            <Card className="medical-card">
              <CardHeader>
                <CardTitle className="text-center">Quick Start Consultation Room</CardTitle>
                <CardDescription className="text-center">
                  Start an instant consultation room for emergency or walk-in patients
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button className="medical-button text-lg px-8 py-3">
                  <Video className="h-5 w-5 mr-2" />
                  Start Instant Room
                </Button>
                <p className="text-sm text-gray-600 mt-4">
                  Share the room link with patients for immediate consultation
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}