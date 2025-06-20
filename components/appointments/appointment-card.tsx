import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Video, User } from 'lucide-react';

interface AppointmentCardProps {
  appointment: {
    id: number;
    doctor: string;
    specialty: string;
    date: string;
    time: string;
    status: string;
    type: string;
  };
}

export default function AppointmentCard({ appointment }: AppointmentCardProps) {
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

  return (
    <Card className="border-l-4 border-l-blue-500">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-gray-500" />
              <span className="font-semibold">{appointment.doctor}</span>
            </div>
            <p className="text-sm text-gray-600">{appointment.specialty}</p>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>{appointment.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{appointment.time}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className={getStatusColor(appointment.status)}>
              {appointment.status}
            </Badge>
            {appointment.status === 'upcoming' && (
              <Button size="sm" className="medical-button">
                <Video className="h-3 w-3 mr-1" />
                Join
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}