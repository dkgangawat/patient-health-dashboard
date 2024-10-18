"use client"

import { useState } from 'react'
import { format } from 'date-fns'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Activity, Pill, FileText, File } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import axiosClient from '@/lib/axiosClient'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'


// Mock data for blood pressure chart
const bloodPressureData = [
  { date: '2023-01-01', systolic: 130, diastolic: 85 },
  { date: '2023-02-01', systolic: 128, diastolic: 83 },
  { date: '2023-03-01', systolic: 125, diastolic: 80 },
  { date: '2023-04-01', systolic: 122, diastolic: 78 },
  { date: '2023-05-01', systolic: 120, diastolic: 75 },
  { date: '2023-06-01', systolic: 130, diastolic: 85 },
]

const fetchHealthRecord = async (id: string) => {
    try {
        const {data} = await axiosClient.get(`/api/patients/get-health-record/${id}`)
        return data.healthRecord
    } catch (error) {
        console.error(error)
        throw new Error('Failed to fetch health record')
    }
}

export default function HealthDashboard({params}:{
    params: {
        id: string
    }
}) {
    const {data, error, isLoading} = useQuery({
        queryKey: ['healthRecord', params.id],
        queryFn: () => fetchHealthRecord(params.id)
    })
  const [activeTab, setActiveTab] = useState("overview")
    if (isLoading) return <div className="text-center py-4">Loading...</div>
    if (error instanceof Error) return <div className="text-center py-4 text-red-500">Error: {error.message}</div>

  const patient = data[0].patientId
  const latestRecord = data[0]

  return (
    <div className="container mx-auto p-4">
      <Card className="mb-6">
        <CardContent className="flex items-center space-x-4 pt-6">
          <Avatar className="h-20 w-20">
            <AvatarFallback>{patient.name.split(' ').map((n:any)=> n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">{patient.name}</h1>
            <p className="text-gray-500">Age: {patient.age}</p>
            <Badge variant="secondary">{patient.condition}</Badge>
          </div>
        </CardContent>
      </Card>
      <div className=' flex flex-row-reverse w-full'>
        <Link href={`/patients/${params.id}/prior-authorization-form`} className=" p-2 px-5 flex items-center bg-white rounded-md mt-auto space-x-2 hover:scale-95">
          <File size={24} />
          <span>Request Prior Authorization</span>
        </Link>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="history">Medical History</TabsTrigger>
          <TabsTrigger value="medications">Medications</TabsTrigger>
          <TabsTrigger value="lab-results">Lab Results</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Latest Diagnosis
                </CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{latestRecord.medicalHistory.diagnosis}</div>
                <p className="text-xs text-muted-foreground">
                  {format(new Date(latestRecord.medicalHistory.date), 'MMM d, yyyy')}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Current Medication
                </CardTitle>
                <Pill className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{latestRecord.medications.name}</div>
                <p className="text-xs text-muted-foreground">
                  {latestRecord.medications.dosage} daily
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Latest Lab Test
                </CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{latestRecord.labResults.test}</div>
                <p className="text-xs text-muted-foreground">
                  {format(new Date(latestRecord.labResults.date), 'MMM d, yyyy')}
                </p>
              </CardContent>
            </Card>
          </div>
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Blood Pressure Trend</CardTitle>
              <CardDescription>6-month history</CardDescription>
            </CardHeader>
            <CardContent className=' w-[80vw] overflow-x-scroll'>
              <ChartContainer
                config={{
                  systolic: {
                    label: "Systolic",
                    color: "hsl(var(--chart-1))",
                  },
                  diastolic: {
                    label: "Diastolic",
                    color: "hsl(var(--chart-2))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={bloodPressureData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tickFormatter={(date) => format(new Date(date), 'MMM')} />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="systolic" stroke="var(--color-systolic)" strokeWidth={2} />
                    <Line type="monotone" dataKey="diastolic" stroke="var(--color-diastolic)" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Medical History</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                {data.map((record:any) => (
                  <div key={record._id} className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                    <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {record.medicalHistory.diagnosis}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {record.medicalHistory.treatment}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {format(new Date(record.medicalHistory.date), 'MMMM d, yyyy')}
                      </p>
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="medications">
          <Card>
            <CardHeader>
              <CardTitle>Current Medications</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                {data.map((record:any) => (
                  <div key={record._id} className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                    <Pill className="h-4 w-4 text-sky-500" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {record.medications.name} - {record.medications.dosage}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Started: {format(new Date(record.medications.startDate), 'MMMM d, yyyy')}
                      </p>
                      {record.medications.endDate && (
                        <p className="text-xs text-muted-foreground">
                          Ended: {format(new Date(record.medications.endDate), 'MMMM d, yyyy')}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="lab-results">
          <Card>
            <CardHeader>
              <CardTitle>Lab Results</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                {data.map((record:any) => (
                  <div key={record._id} className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                    <FileText className="h-4 w-4 text-sky-500" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {record.labResults.test}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {record.labResults.result}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {format(new Date(record.labResults.date), 'MMMM d, yyyy')}
                      </p>
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}