"use client"

import React from 'react';
import { Label } from "@/components/ui/label";
import { useQuery } from '@tanstack/react-query';
import axiosClient from '@/lib/axiosClient';

const fetchRequest = async (id: string) => {
  try {
    const response = await axiosClient(`/api/prior-authorization-form/get-request/${id}`);
    return response?.data?.request;
  } catch (error) {
    console.error('Error fetching patient:', error);
    throw new Error('Error fetching patient');
  }
};

export default function PreAuthFormReadOnly({ params }: { params: { id: string } }) {
  const { id } = params;
  const { data: formData, isLoading, error } = useQuery({
    queryKey: ['patient', id],
    queryFn: () => fetchRequest(id),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error) return <div>Error: {error.message}</div>;

  return (
    <div className="mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold  text-center">PRE-AUTHORIZATION REQUEST FORM (READ-ONLY)</h1>
      <h2 className="text-xl font-semibold mb-6 text-center">FormId: {formData._id}</h2>
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>Name of the Patient</Label>
            <div className="p-2 border rounded">{formData.patientName}</div>
          </div>
          <div>
            <Label>Gender</Label>
            <div className="p-2 border rounded">{formData.gender}</div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <Label>Age</Label>
            <div className="p-2 border rounded">{formData.age}</div>
          </div>
          <div>
            <Label>Date of Birth</Label>
            <div className="p-2 border rounded">{formData.dob}</div>
          </div>
          <div>
            <Label>Contact No.</Label>
            <div className="p-2 border rounded">{formData.contactNo}</div>
          </div>
        </div>

        <div>
          <Label>Current Address</Label>
          <div className="p-2 border rounded">{formData.currentAddress}</div>
        </div>

        <div>
          <Label>Occupation</Label>
          <div className="p-2 border rounded">{formData.occupation}</div>
        </div>

        <div>
          <Label>Photo ID Proofs</Label>
          <div className="p-2 border rounded">{formData.photoIdProofs.join(', ')}</div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">TO BE FILLED BY THE TREATING DOCTOR / HOSPITAL</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>Name of the treating doctor</Label>
              <div className="p-2 border rounded">{formData.doctorName}</div>
            </div>
            <div>
              <Label>Qualification</Label>
              <div className="p-2 border rounded">{formData.qualification}</div>
            </div>
          </div>
        </div>

        <div>
          <Label>Provisional diagnosis</Label>
          <div className="p-2 border rounded">{formData.diagnosis}</div>
        </div>

        <div>
          <Label>Proposed line of treatment</Label>
          <div className="p-2 border rounded">{formData.treatment.join(', ')}</div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">DETAILS OF THE PATIENT ADMITTED</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>Date of Admission</Label>
              <div className="p-2 border rounded">{formData.admissionDate}</div>
            </div>
            <div>
              <Label>Time</Label>
              <div className="p-2 border rounded">{formData.admissionTime}</div>
            </div>
          </div>
        </div>

        <div>
          <Label>Is this an emergency/a planned hospitalization event?</Label>
          <div className="p-2 border rounded">{formData.hospitalizationType}</div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <Label>Expected no. of days stay in hospital</Label>
            <div className="p-2 border rounded">{formData.expectedStay}</div>
          </div>
          <div>
            <Label>Room Type</Label>
            <div className="p-2 border rounded">{formData.roomType}</div>
          </div>
          <div>
            <Label>Days in ICU</Label>
            <div className="p-2 border rounded">{formData.icuDays}</div>
          </div>
        </div>
      </div>
    </div>
  );
}