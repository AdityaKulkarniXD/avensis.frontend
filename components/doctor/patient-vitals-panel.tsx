import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Activity, Thermometer, Video, FileText } from 'lucide-react';

interface PatientVitalsPanelProps {
  patient?: {
    id: number;
    patient: string;
    age: number;
    vitals: {
      heartRate: number;
      bloodPressure: string;
      temperature: number;
    };
  };
}

export default function PatientVitalsPanel({ patient }: PatientVitalsPanelProps) {
  if (!patient) {
    return (
      <div className="text-center py-8">
        <Activity className="h-12 w-12 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500">No active patient consultation</p>
        <p className="text-sm text-gray-400">Start a consultation to view real-time vitals</p>
      </div>
    );
  }

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal':
        return 'text-green-600 bg-green-50';
      case 'high':
        return 'text-red-600 bg-red-50';
      case 'low':
        return 'text-blue-600 bg-blue-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-4">
      {/* Patient Info */}
      <div className="text-center pb-4 border-b">
        <h3 className="font-semibold text-lg">{patient.patient}</h3>
        <p className="text-sm text-gray-600">Age: {patient.age}</p>
        <Badge className="mt-2 bg-green-100 text-green-800">In Consultation</Badge>
      </div>

      {/* Real-time Vitals */}
      <div className="space-y-3">
        <h4 className="font-medium text-sm text-gray-700">Real-time Vitals</h4>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-red-500" />
              <span className="text-sm">Heart Rate</span>
            </div>
            <div className="text-right">
              <div className="font-semibold">{patient.vitals.heartRate} bpm</div>
              <Badge className={`text-xs ${getStatusColor(getVitalStatus('heartRate', patient.vitals.heartRate))}`}>
                {getVitalStatus('heartRate', patient.vitals.heartRate)}
              </Badge>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-blue-500" />
              <span className="text-sm">Blood Pressure</span>
            </div>
            <div className="text-right">
              <div className="font-semibold">{patient.vitals.bloodPressure}</div>
              <Badge className="text-xs text-green-600 bg-green-50">
                normal
              </Badge>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2">
              <Thermometer className="h-4 w-4 text-orange-500" />
              <span className="text-sm">Temperature</span>
            </div>
            <div className="text-right">
              <div className="font-semibold">{patient.vitals.temperature}°F</div>
              <Badge className={`text-xs ${getStatusColor(getVitalStatus('temperature', patient.vitals.temperature))}`}>
                {getVitalStatus('temperature', patient.vitals.temperature)}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-2 pt-4 border-t">
        <Button className="w-full medical-button" size="sm">
          <Video className="h-4 w-4 mr-2" />
          Join Video Call
        </Button>
        <Button className="w-full" variant="outline" size="sm">
          <FileText className="h-4 w-4 mr-2" />
          View Patient Records
        </Button>
        <Button className="w-full" variant="outline" size="sm">
          <Heart className="h-4 w-4 mr-2" />
          Prescribe Medication
        </Button>
      </div>

      {/* Wearable Status */}
      <div className="bg-blue-50 p-3 rounded-lg">
        <div className="flex items-center justify-between text-sm">
          <span className="text-blue-700">Wearable Connected</span>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse-medical"></div>
            <span className="text-blue-600">Live</span>
          </div>
        </div>
      </div>
    </div>
  );
}