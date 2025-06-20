import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, Activity, Clock, FileText, TrendingUp, AlertCircle } from 'lucide-react';

export default function PatientOverview() {
  const patientStats = [
    { label: 'Total Patients', value: '1,247', change: '+23 this week', icon: Users, color: 'text-blue-600' },
    { label: 'Active Cases', value: '89', change: '+5 today', icon: Activity, color: 'text-green-600' },
    { label: 'Avg Wait Time', value: '23 min', change: '-3 min from last week', icon: Clock, color: 'text-orange-600' },
    { label: 'Satisfaction Rate', value: '94%', change: '+2% this month', icon: TrendingUp, color: 'text-purple-600' }
  ];

  const recentPatients = [
    { id: 1, name: 'Sarah Johnson', age: 34, department: 'Cardiology', status: 'In Treatment', priority: 'high' },
    { id: 2, name: 'Michael Chen', age: 45, department: 'General Medicine', status: 'Waiting', priority: 'medium' },
    { id: 3, name: 'Emma Wilson', age: 28, department: 'Pediatrics', status: 'Discharged', priority: 'low' },
    { id: 4, name: 'James Brown', age: 52, department: 'Emergency', status: 'Critical', priority: 'high' },
    { id: 5, name: 'Lisa Davis', age: 31, department: 'Surgery', status: 'Pre-Op', priority: 'medium' }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-orange-100 text-orange-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Critical':
        return 'bg-red-100 text-red-800';
      case 'In Treatment':
        return 'bg-blue-100 text-blue-800';
      case 'Waiting':
        return 'bg-yellow-100 text-yellow-800';
      case 'Pre-Op':
        return 'bg-purple-100 text-purple-800';
      case 'Discharged':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Patient Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {patientStats.map((stat, index) => (
          <Card key={index} className="medical-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.change}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Patient Management */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Patients */}
        <div className="lg:col-span-2">
          <Card className="medical-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-600" />
                Recent Patients
              </CardTitle>
              <CardDescription>
                Latest patient admissions and status updates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentPatients.map((patient) => (
                  <div key={patient.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <Users className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">{patient.name}</h4>
                        <p className="text-sm text-gray-600">Age: {patient.age} • {patient.department}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getPriorityColor(patient.priority)}>
                        {patient.priority}
                      </Badge>
                      <Badge className={getStatusColor(patient.status)}>
                        {patient.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-4" variant="outline">
                View All Patients
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Patient Alerts */}
        <div>
          <Card className="medical-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-orange-600" />
                Patient Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-red-50 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <span className="font-medium text-sm">Critical Patient</span>
                </div>
                <p className="text-xs text-gray-600">James Brown - Emergency Dept.</p>
                <Button size="sm" className="mt-2 w-full bg-red-600 hover:bg-red-700">
                  View Details
                </Button>
              </div>

              <div className="p-3 bg-yellow-50 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="h-4 w-4 text-yellow-600" />
                  <span className="font-medium text-sm">Long Wait Time</span>
                </div>
                <p className="text-xs text-gray-600">5 patients waiting >30 min</p>
                <Button size="sm" variant="outline" className="mt-2 w-full">
                  Manage Queue
                </Button>
              </div>

              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <FileText className="h-4 w-4 text-blue-600" />
                  <span className="font-medium text-sm">Pending Reports</span>
                </div>
                <p className="text-xs text-gray-600">12 lab results awaiting review</p>
                <Button size="sm" variant="outline" className="mt-2 w-full">
                  Review Reports
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Department Patient Distribution */}
      <Card className="medical-card">
        <CardHeader>
          <CardTitle>Patient Distribution by Department</CardTitle>
          <CardDescription>
            Current patient load across hospital departments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { dept: 'Emergency', patients: 45, capacity: 50, color: 'bg-red-500' },
              { dept: 'General Medicine', patients: 32, capacity: 40, color: 'bg-blue-500' },
              { dept: 'Surgery', patients: 18, capacity: 25, color: 'bg-purple-500' },
              { dept: 'Pediatrics', patients: 22, capacity: 30, color: 'bg-green-500' },
              { dept: 'Cardiology', patients: 15, capacity: 20, color: 'bg-orange-500' },
              { dept: 'Orthopedics', patients: 12, capacity: 18, color: 'bg-cyan-500' },
              { dept: 'Neurology', patients: 8, capacity: 15, color: 'bg-pink-500' },
              { dept: 'ICU', patients: 18, capacity: 20, color: 'bg-red-600' }
            ].map((dept, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-sm mb-2">{dept.dept}</h4>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span>{dept.patients}/{dept.capacity}</span>
                  <span>{Math.round((dept.patients / dept.capacity) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`${dept.color} h-2 rounded-full`}
                    style={{width: `${(dept.patients / dept.capacity) * 100}%`}}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}