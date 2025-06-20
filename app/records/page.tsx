"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Download, Eye, Calendar, User, Pill, TestTube, Heart, Search, Filter, Upload } from 'lucide-react';
import PatientHeader from '@/components/dashboard/patient-header';

export default function RecordsPage() {
  const [user, setUser] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const [records] = useState([
    {
      id: 1,
      type: 'prescription',
      title: 'Lisinopril Prescription',
      doctor: 'Dr. Sarah Johnson',
      date: '2025-01-12',
      description: 'Blood pressure medication - 10mg daily',
      status: 'active',
      category: 'Medication',
      fileUrl: '/records/prescription-1.pdf'
    },
    {
      id: 2,
      type: 'lab_result',
      title: 'Complete Blood Count',
      doctor: 'Dr. Michael Chen',
      date: '2025-01-10',
      description: 'Routine blood work - All values within normal range',
      status: 'completed',
      category: 'Lab Results',
      fileUrl: '/records/lab-1.pdf'
    },
    {
      id: 3,
      type: 'imaging',
      title: 'Chest X-Ray',
      doctor: 'Dr. Emily Rodriguez',
      date: '2025-01-08',
      description: 'Routine chest imaging - No abnormalities detected',
      status: 'completed',
      category: 'Imaging',
      fileUrl: '/records/xray-1.pdf'
    },
    {
      id: 4,
      type: 'consultation',
      title: 'Cardiology Consultation',
      doctor: 'Dr. Sarah Johnson',
      date: '2025-01-05',
      description: 'Follow-up consultation for hypertension management',
      status: 'completed',
      category: 'Consultation Notes',
      fileUrl: '/records/consultation-1.pdf'
    },
    {
      id: 5,
      type: 'prescription',
      title: 'Metformin Prescription',
      doctor: 'Dr. Michael Chen',
      date: '2025-01-03',
      description: 'Diabetes medication - 500mg twice daily',
      status: 'active',
      category: 'Medication',
      fileUrl: '/records/prescription-2.pdf'
    },
    {
      id: 6,
      type: 'lab_result',
      title: 'HbA1c Test',
      doctor: 'Dr. Michael Chen',
      date: '2024-12-28',
      description: 'Diabetes monitoring - HbA1c: 6.8%',
      status: 'completed',
      category: 'Lab Results',
      fileUrl: '/records/lab-2.pdf'
    }
  ]);

  const [vitalsHistory] = useState([
    { date: '2025-01-12', heartRate: 72, bloodPressure: '120/80', weight: 65, temperature: 98.6 },
    { date: '2025-01-05', heartRate: 75, bloodPressure: '125/82', weight: 65.5, temperature: 98.4 },
    { date: '2024-12-28', heartRate: 78, bloodPressure: '128/85', weight: 66, temperature: 98.7 },
    { date: '2024-12-15', heartRate: 74, bloodPressure: '122/80', weight: 66.2, temperature: 98.5 }
  ]);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      router.push('/auth/login');
    }
  }, [router]);

  const getRecordIcon = (type: string) => {
    switch (type) {
      case 'prescription':
        return <Pill className="h-5 w-5 text-green-600" />;
      case 'lab_result':
        return <TestTube className="h-5 w-5 text-blue-600" />;
      case 'imaging':
        return <Eye className="h-5 w-5 text-purple-600" />;
      case 'consultation':
        return <User className="h-5 w-5 text-orange-600" />;
      default:
        return <FileText className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredRecords = records.filter(record =>
    record.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center medical-gradient">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white">Loading health records...</p>
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
            My Health Records
          </h1>
          <p className="text-gray-600 text-lg">
            Access and manage your complete digital health history
          </p>
        </div>

        <Tabs defaultValue="records" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 bg-white/80 backdrop-blur-sm rounded-2xl p-2">
            <TabsTrigger value="records" className="rounded-xl">Medical Records</TabsTrigger>
            <TabsTrigger value="prescriptions" className="rounded-xl">Prescriptions</TabsTrigger>
            <TabsTrigger value="vitals" className="rounded-xl">Vitals History</TabsTrigger>
            <TabsTrigger value="upload" className="rounded-xl">Upload Records</TabsTrigger>
          </TabsList>

          <TabsContent value="records" className="space-y-6">
            {/* Search */}
            <Card className="medical-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5 text-blue-600" />
                  Search Records
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by title, doctor, or category..."
                    className="pl-10 rounded-xl"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Records List */}
            <div className="grid gap-4">
              {filteredRecords.map((record) => (
                <Card key={record.id} className="medical-card">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl">
                          {getRecordIcon(record.type)}
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-xl font-bold text-gray-900">{record.title}</h3>
                          <p className="text-gray-600">{record.description}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              <span>{record.doctor}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              <span>{record.date}</span>
                            </div>
                            <Badge variant="outline">{record.category}</Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={getStatusColor(record.status)}>
                          {record.status}
                        </Badge>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="rounded-xl">
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button>
                          <Button variant="outline" size="sm" className="rounded-xl">
                            <Download className="h-3 w-3 mr-1" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="prescriptions" className="space-y-6">
            <div className="grid gap-4">
              {records.filter(record => record.type === 'prescription').map((prescription) => (
                <Card key={prescription.id} className="medical-card">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl">
                          <Pill className="h-6 w-6 text-green-600" />
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-xl font-bold text-gray-900">{prescription.title}</h3>
                          <p className="text-gray-600">{prescription.description}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              <span>Prescribed by {prescription.doctor}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              <span>{prescription.date}</span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Badge className="bg-green-100 text-green-800">Active</Badge>
                            <Badge variant="outline">2 refills remaining</Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="rounded-xl">
                          <Eye className="h-3 w-3 mr-1" />
                          View Details
                        </Button>
                        <Button className="medical-button" size="sm">
                          Request Refill
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="vitals" className="space-y-6">
            <Card className="medical-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  Vitals History
                </CardTitle>
                <CardDescription>
                  Track your vital signs over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {vitalsHistory.map((vital, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                      <div className="flex items-center gap-4">
                        <div className="text-sm font-semibold text-gray-900">{vital.date}</div>
                      </div>
                      <div className="grid grid-cols-4 gap-6 text-center">
                        <div>
                          <div className="text-sm text-gray-600">Heart Rate</div>
                          <div className="font-semibold">{vital.heartRate} bpm</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Blood Pressure</div>
                          <div className="font-semibold">{vital.bloodPressure}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Weight</div>
                          <div className="font-semibold">{vital.weight} kg</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Temperature</div>
                          <div className="font-semibold">{vital.temperature}°F</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="upload" className="space-y-6">
            <Card className="medical-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5 text-blue-600" />
                  Upload Medical Records
                </CardTitle>
                <CardDescription>
                  Upload and organize your medical documents
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload Medical Documents</h3>
                  <p className="text-gray-600 mb-4">
                    Drag and drop files here, or click to browse
                  </p>
                  <Button className="medical-button">
                    Choose Files
                  </Button>
                  <p className="text-xs text-gray-500 mt-2">
                    Supported formats: PDF, JPG, PNG (Max 10MB)
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="document-type">Document Type</Label>
                    <select className="w-full p-3 border border-gray-300 rounded-xl">
                      <option>Select document type</option>
                      <option>Lab Results</option>
                      <option>Prescription</option>
                      <option>Imaging Report</option>
                      <option>Consultation Notes</option>
                      <option>Insurance Document</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="document-date">Document Date</Label>
                    <Input type="date" className="rounded-xl" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="document-description">Description</Label>
                  <Input placeholder="Brief description of the document" className="rounded-xl" />
                </div>

                <Button className="w-full medical-button">
                  Upload Document
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}