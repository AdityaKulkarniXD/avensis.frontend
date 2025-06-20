import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Video, FileText, User } from 'lucide-react';

interface AppointmentsListProps {
  appointments: Array<{
    id: number;
    patient: string;
    age: number;
    time: string;
    date: string;
    type: string;
    status: string;
    vitals: {
      heartRate: number;
      bloodPressure: string;
      temperature: number;
    };
  }>;
}

export default function AppointmentsList({ appointments }: AppointmentsListProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'in-progress':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusActions = (status: string, appointmentId: number) => {
    switch (status) {
      case 'upcoming':
        return (
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <FileText className="h-3 w-3 mr-1" />
              Prep
            </Button>
            <Button className="medical-button" size="sm">
              <Video className="h-3 w-3 mr-1" />
              Start
            </Button>
          </div>
        );
      case 'in-progress':
        return (
          <div className="flex gap-2">
            <Button className="bg-green-600 hover:bg-green-700 text-white" size="sm">
              <Video className="h-3 w-3 mr-1" />
              Join Call
            </Button>
          </div>
        );
      case 'completed':
        return (
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <FileText className="h-3 w-3 mr-1" />
              Notes
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-3">
      {appointments.map((appointment) => (
        <Card key={appointment.id} className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <span className="font-semibold">{appointment.patient}</span>
                  <span className="text-sm text-gray-500">({appointment.age}y)</span>
                </div>
                <p className="text-sm text-gray-600">{appointment.type}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{appointment.time}</span>
                  </div>
                  <Badge className={getStatusColor(appointment.status)}>
                    {appointment.status.replace('-', ' ')}
                  </Badge>
                </div>
                {/* Quick Vitals Preview */}
                <div className="flex gap-3 text-xs text-gray-600">
                  <span>HR: {appointment.vitals.heartRate}</span>
                  <span>BP: {appointment.vitals.bloodPressure}</span>
                  <span>Temp: {appointment.vitals.temperature}°F</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                {getStatusActions(appointment.status, appointment.id)}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}