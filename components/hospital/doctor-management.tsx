import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Stethoscope, Users, Calendar, Star, MessageCircle, Settings } from 'lucide-react';

interface DoctorManagementProps {
  doctors: Array<{
    id: number;
    name: string;
    specialty: string;
    status: string;
    patients: number;
    appointments: number;
    rating: number;
  }>;
}

export default function DoctorManagement({ doctors }: DoctorManagementProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-100 text-green-800';
      case 'busy':
        return 'bg-orange-100 text-orange-800';
      case 'offline':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    return (
      <div className={`w-3 h-3 rounded-full ${
        status === 'online' ? 'bg-green-500' : 
        status === 'busy' ? 'bg-orange-500' : 'bg-gray-400'
      }`} />
    );
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="medical-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Doctors</p>
                <p className="text-2xl font-bold">25</p>
              </div>
              <Stethoscope className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="medical-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Currently Online</p>
                <p className="text-2xl font-bold">18</p>
              </div>
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="medical-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Rating</p>
                <p className="text-2xl font-bold">4.8</p>
              </div>
              <Star className="h-8 w-8 text-yellow-500 fill-current" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Doctors List */}
      <div className="grid gap-4">
        {doctors.map((doctor) => (
          <Card key={doctor.id} className="medical-card">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={`/avatars/doctor-${doctor.id}.jpg`} alt={doctor.name} />
                    <AvatarFallback className="bg-blue-100 text-blue-600">
                      {doctor.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <div>
                      <h3 className="font-semibold text-lg flex items-center gap-2">
                        {doctor.name}
                        {getStatusIcon(doctor.status)}
                      </h3>
                      <p className="text-gray-600">{doctor.specialty}</p>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        <span>{doctor.patients} patients</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{doctor.appointments} appointments today</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-current text-yellow-500" />
                        <span>{doctor.rating}</span>
                      </div>
                    </div>
                    <Badge className={getStatusColor(doctor.status)}>
                      {doctor.status}
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <MessageCircle className="h-3 w-3 mr-1" />
                    Message
                  </Button>
                  <Button variant="outline" size="sm">
                    <Calendar className="h-3 w-3 mr-1" />
                    Schedule
                  </Button>
                  <Button variant="outline" size="sm">
                    <Settings className="h-3 w-3 mr-1" />
                    Manage
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Doctor Section */}
      <Card className="medical-card border-dashed border-2 border-gray-300">
        <CardContent className="p-8 text-center">
          <Stethoscope className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Add New Doctor</h3>
          <p className="text-gray-600 mb-4">
            Expand your medical team by adding qualified healthcare professionals
          </p>
          <Button className="medical-button">
            Add Doctor
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}