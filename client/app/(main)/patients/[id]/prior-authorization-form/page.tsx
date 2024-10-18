"use client"

import React from 'react';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import usePreAuthForm from '@/hooks/usePreAuthForm';

export default function PreAuthForm({ params }: { params: { id: string } }) {
  const { id } = params;
  const { formData, isLoading, error, handleChange, handleRadioChange, handleSubmit, isSubmitting, formErrors } = usePreAuthForm(id);

  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error) return <div>Error: {error.message}</div>;

  return (
    <div className="mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">PRE-AUTHORIZATION REQUEST FORM</h1>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="patientName">Name of the Patient</Label>
            <Input required id="patientName" placeholder="Enter patient name" value={formData.patientName} onChange={handleChange} />
            {formErrors.patientName && <p className="text-red-500 text-xs italic">{formErrors.patientName}</p>}
          </div>
          <div>
            <Label>Gender</Label>
            <RadioGroup id='gender' required value={formData.gender} className="flex space-x-4" onValueChange={(value)=>handleRadioChange('gender', value)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="male" id="male" />
                <Label htmlFor="male">Male</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="female" id="female" />
                <Label htmlFor="female">Female</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="other" id="other" />
                <Label htmlFor="other">Other</Label>
              </div>
            </RadioGroup>
            {formErrors.gender && <p className="text-red-500 text-xs italic">{formErrors.gender}</p>}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="age">Age</Label>
            <Input required id="age" min={0} type="number" placeholder="Years" value={formData.age} onChange={handleChange} />
            {formErrors.age && <p className="text-red-500 text-xs italic">{formErrors.age}</p>}
          </div>
          <div>
            <Label htmlFor="dob">Date of Birth</Label>
            <Input required id="dob" type="date" value={formData.dob} onChange={handleChange} />
            {formErrors.dob && <p className="text-red-500 text-xs italic">{formErrors.dob}</p>}
          </div>
          <div>
            <Label htmlFor="contactNo">Contact No.</Label>
            <Input required id="contactNo" type="tel" placeholder="Enter contact number" value={formData.contactNo} onChange={handleChange} />
            {formErrors.contactNo && <p className="text-red-500 text-xs italic">{formErrors.contactNo}</p>}
          </div>
        </div>

        <div>
          <Label htmlFor="currentAddress">Current Address</Label>
          <Textarea required id="currentAddress" placeholder="Enter current address" value={formData.currentAddress} onChange={handleChange} />
          {formErrors.currentAddress && <p className="text-red-500 text-xs italic">{formErrors.currentAddress}</p>}
        </div>

        <div>
          <Label htmlFor="occupation">Occupation</Label>
          <Input required id="occupation" placeholder="Enter occupation" value={formData.occupation} onChange={handleChange} />
          {formErrors.occupation && <p className="text-red-500 text-xs italic">{formErrors.occupation}</p>}
        </div>

        <div>
          <Label id='photoIdProofs'>Photo ID Proofs</Label>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {["Pan Card", "Passport", "Driving License", "Election Card", "Others"].map((item) => (
              <div key={item} className="flex items-center space-x-2">
                <Checkbox id={item.toLowerCase().replace(' ', '-')} value={item} onCheckedChange={(checked) => handleChange({ target: { id: 'photoIdProofs', type: 'checkbox', checked, value: item.toLowerCase().replace(' ', '-') } } as React.ChangeEvent<HTMLInputElement>)} />
                <Label htmlFor={item.toLowerCase().replace(' ', '-')}>{item}</Label>
              </div>
            ))}
          </div>
          {formErrors.photoIdProofs && <p className="text-red-500 text-xs italic">{formErrors.photoIdProofs}</p>}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">TO BE FILLED BY THE TREATING DOCTOR / HOSPITAL</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="doctorName">Name of the treating doctor</Label>
              <Input required id="doctorName" placeholder="Enter doctor's name" value={formData.doctorName} onChange={handleChange} />
              {formErrors.doctorName && <p className="text-red-500 text-xs italic">{formErrors.doctorName}</p>}
            </div>
            <div>
              <Label htmlFor="qualification">Qualification</Label>
              <Input required id="qualification" placeholder="Enter qualification" value={formData.qualification} onChange={handleChange} />
              {formErrors.qualification && <p className="text-red-500 text-xs italic">{formErrors.qualification}</p>}
            </div>
          </div>
        </div>

        <div>
          <Label htmlFor="diagnosis">Provisional diagnosis</Label>
          <Textarea required id="diagnosis" placeholder="Enter provisional diagnosis" value={formData.diagnosis} onChange={handleChange} />
          {formErrors.diagnosis && <p className="text-red-500 text-xs italic">{formErrors.diagnosis}</p>}
        </div>

        <div>
          <Label id='treatment'>Proposed line of treatment</Label>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {["Medical Management", "Surgical Management", "Intensive Care", "Investigation", "Non-allopathic treatment"].map((item) => (
              <div key={item} className="flex items-center space-x-2">
                <Checkbox id={item.toLowerCase().replace(' ', '-')} value={item} onCheckedChange={(checked) => handleChange({ target: { id: 'treatment', type: 'checkbox', checked, value: item.toLowerCase().replace(' ', '-') } } as React.ChangeEvent<HTMLInputElement>)} />
                <Label htmlFor={item.toLowerCase().replace(' ', '-')}>{item}</Label>
              </div>
            ))}
          </div>
          {formErrors.treatment && <p className="text-red-500 text-xs italic">{formErrors.treatment}</p>}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">DETAILS OF THE PATIENT ADMITTED</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="admissionDate">Date of Admission</Label>
              <Input required id="admissionDate" type="date" value={formData.admissionDate} onChange={handleChange} />
              {formErrors.admissionDate && <p className="text-red-500 text-xs italic">{formErrors.admissionDate}</p>}
            </div>
            <div>
              <Label htmlFor="admissionTime">Time</Label>
              <Input required id="admissionTime" type="time" value={formData.admissionTime} onChange={handleChange} />
              {formErrors.admissionTime && <p className="text-red-500 text-xs italic">{formErrors.admissionTime}</p>}
            </div>
          </div>
        </div>

        <div>
          <Label>Is this an emergency/a planned hospitalization event?</Label>
          <RadioGroup id='hospitalizationType' required defaultValue={formData.hospitalizationType} className="flex space-x-4" onValueChange={(value)=>handleRadioChange('hospitalizationType', value)}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="emergency" id="emergency" />
              <Label htmlFor="emergency">Emergency</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="planned" id="planned" />
              <Label htmlFor="planned">Planned</Label>
            </div>
          </RadioGroup>
          {formErrors.hospitalizationType && <p className="text-red-500 text-xs italic">{formErrors.hospitalizationType}</p>}
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="expectedStay">Expected no. of days stay in hospital</Label>
            <Input required id="expectedStay" min={0} type="number" placeholder="Days" value={formData.expectedStay} onChange={handleChange} />
            {formErrors.expectedStay && <p className="text-red-500 text-xs italic">{formErrors.expectedStay}</p>}
          </div>
          <div>
            <Label htmlFor="roomType">Room Type</Label>
            <Select onValueChange={(value) => handleChange({ target: { id: 'roomType', value } } as React.ChangeEvent<HTMLInputElement>)}>
              <SelectTrigger id="roomType">
                <SelectValue placeholder="Select room type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">General Ward</SelectItem>
                <SelectItem value="semi-private">Semi-Private</SelectItem>
                <SelectItem value="private">Private</SelectItem>
              </SelectContent>
            </Select>
            {formErrors.roomType && <p className="text-red-500 text-xs italic">{formErrors.roomType}</p>}
          </div>
          <div>
            <Label htmlFor="icuDays">Days in ICU</Label>
            <Input required id="icuDays" type="number" min={0} placeholder="Days" value={formData.icuDays} onChange={handleChange} />
            {formErrors.icuDays && <p className="text-red-500 text-xs italic">{formErrors.icuDays}</p>}
          </div>
        </div>
        <Button type="submit" className="w-full" disabled={isSubmitting}>Submit Pre-Authorization Request</Button>
      </form>
    </div>
  );
}