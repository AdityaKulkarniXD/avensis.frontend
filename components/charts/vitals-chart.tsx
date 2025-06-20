"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Activity, Heart, Thermometer, Droplets } from 'lucide-react';

const heartRateData = [
  { time: '00:00', value: 65 },
  { time: '04:00', value: 58 },
  { time: '08:00', value: 72 },
  { time: '12:00', value: 85 },
  { time: '16:00', value: 78 },
  { time: '20:00', value: 70 },
  { time: '24:00', value: 68 },
];

const stepsData = [
  { day: 'Mon', steps: 8542 },
  { day: 'Tue', steps: 9123 },
  { day: 'Wed', steps: 7865 },
  { day: 'Thu', steps: 10234 },
  { day: 'Fri', steps: 9876 },
  { day: 'Sat', steps: 12045 },
  { day: 'Sun', steps: 8765 },
];

const sleepData = [
  { day: 'Mon', deep: 2.5, light: 4.2, rem: 1.8 },
  { day: 'Tue', deep: 2.8, light: 3.9, rem: 2.1 },
  { day: 'Wed', deep: 2.3, light: 4.5, rem: 1.7 },
  { day: 'Thu', deep: 3.1, light: 4.1, rem: 2.3 },
  { day: 'Fri', deep: 2.7, light: 3.8, rem: 1.9 },
  { day: 'Sat', deep: 3.2, light: 4.3, rem: 2.5 },
  { day: 'Sun', deep: 2.9, light: 4.0, rem: 2.1 },
];

export default function VitalsChart() {
  return (
    <div className="space-y-6">
      {/* Current Vitals Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="vitals-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Heart Rate</p>
              <p className="text-2xl font-bold">72 bpm</p>
              <p className="text-xs text-green-600">Normal</p>
            </div>
            <Heart className="h-8 w-8 text-red-500" />
          </div>
        </Card>

        <Card className="vitals-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Blood Pressure</p>
              <p className="text-2xl font-bold">120/80</p>
              <p className="text-xs text-green-600">Normal</p>
            </div>
            <Activity className="h-8 w-8 text-blue-500" />
          </div>
        </Card>

        <Card className="vitals-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Temperature</p>
              <p className="text-2xl font-bold">98.6°F</p>
              <p className="text-xs text-green-600">Normal</p>
            </div>
            <Thermometer className="h-8 w-8 text-orange-500" />
          </div>
        </Card>

        <Card className="vitals-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">O2 Saturation</p>
              <p className="text-2xl font-bold">98%</p>
              <p className="text-xs text-green-600">Normal</p>
            </div>
            <Droplets className="h-8 w-8 text-cyan-500" />
          </div>
        </Card>
      </div>

      {/* Detailed Charts */}
      <Tabs defaultValue="heart-rate" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="heart-rate">Heart Rate</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="sleep">Sleep</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="heart-rate" className="space-y-4">
          <Card className="medical-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-red-500" />
                Heart Rate - Today
              </CardTitle>
              <CardDescription>
                Real-time heart rate monitoring from your wearable device
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={heartRateData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis domain={['dataMin - 10', 'dataMax + 10']} />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#ef4444" 
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card className="medical-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-green-500" />
                Daily Steps - This Week
              </CardTitle>
              <CardDescription>
                Track your daily physical activity and movement patterns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stepsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="steps" fill="#10b981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sleep" className="space-y-4">
          <Card className="medical-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-purple-500" />
                Sleep Patterns - This Week
              </CardTitle>
              <CardDescription>
                Breakdown of your sleep stages and quality metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={sleepData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="deep" stackId="a" fill="#8b5cf6" />
                    <Bar dataKey="light" stackId="a" fill="#a78bfa" />
                    <Bar dataKey="rem" stackId="a" fill="#c4b5fd" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <div className="grid gap-4">
            <Card className="medical-card">
              <CardHeader>
                <CardTitle>Health Trends Summary</CardTitle>
                <CardDescription>
                  Key insights from your health data over the past 30 days
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800">Improving</h4>
                    <p className="text-sm text-green-700">Sleep quality up 15%</p>
                    <p className="text-sm text-green-700">Daily steps increased</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800">Stable</h4>
                    <p className="text-sm text-blue-700">Heart rate consistent</p>
                    <p className="text-sm text-blue-700">Blood pressure normal</p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-orange-800">Monitor</h4>
                    <p className="text-sm text-orange-700">Stress levels elevated</p>
                    <p className="text-sm text-orange-700">Consider relaxation</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}