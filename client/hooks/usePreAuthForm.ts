'use client'
import { useState, useEffect, ChangeEvent, FormEvent, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import axiosClient from '@/lib/axiosClient';

interface FormData {
  patientId: string;
  patientName: string;
  gender: string;
  age: number;
  dob: string;
  contactNo: string;
  currentAddress: string;
  occupation: string;
  photoIdProofs: string[];
  doctorName: string;
  qualification: string;
  diagnosis: string;
  treatment: string[];
  admissionDate: string;
  admissionTime: string;
  hospitalizationType: string;
  expectedStay: number;
  roomType: string;
  icuDays: number;
}

interface FormErrors {
  [key: string]: string;
}

const fetchPatient = async (id: string) => {
  try {
    const response = await axiosClient(`/api/patients/get-patient/${id}`);
    return response?.data?.patient;
  } catch (error) {
    console.error('Error fetching patient:', error);
    throw new Error('Error fetching patient');
  }
};

const usePreAuthForm = (id: string) => {
  const [formData, setFormData] = useState<FormData>({
    patientId: '',
    patientName: '',
    gender: 'male',
    age: 0,
    dob: '',
    contactNo: '',
    currentAddress: '',
    occupation: '',
    photoIdProofs: [],
    doctorName: '',
    qualification: '',
    diagnosis: '',
    treatment: [],
    admissionDate: '',
    admissionTime: '',
    hospitalizationType: 'emergency',
    expectedStay: 0,
    roomType: '',
    icuDays: 0,
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: userData, isLoading, error } = useQuery({
    queryKey: ['patient', id],
    queryFn: () => fetchPatient(id),
  });

  useEffect(() => {
    if (userData) {
      setFormData((prevData) => ({
        ...prevData,
        patientId: userData._id,
        patientName: userData.name,
        age: userData.age,
        contactNo: userData.contactNo,
        gender: userData.gender,
        currentAddress: userData.currentAddress,
        occupation: userData.occupation,
      }));
    }
  }, [userData]);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value, type } = e.target as HTMLInputElement;
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setFormData((prevData) => ({
        ...prevData,
        [id]: checked ? [...(prevData[id as keyof FormData] as string[]), value] : (prevData[id as keyof FormData] as string[]).filter((item: string) => item !== value),
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [id]: type === 'number' ? Number(value) : value }));
    }
    setFormErrors((prevErrors) => ({ ...prevErrors, [id]: '' })); // Clear error for the field
  }, []);

  const handleRadioChange = useCallback((id:string, value:string) => {
    setFormData((prevData) => ({ ...prevData, [id]: value }));
    setFormErrors((prevErrors) => ({ ...prevErrors, [id]: '' })); // Clear error for the field
  }, []);

  const handleSelectChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
    setFormErrors((prevErrors) => ({ ...prevErrors, [id]: '' })); // Clear error for the field
  }, []);

  const validateForm = () => {
    const errors: FormErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key as keyof FormData] || (Array.isArray(formData[key as keyof FormData]) && (formData[key as keyof FormData] as string[]).length === 0)) {
        errors[key] = 'This field is required';
      }
    });
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      setIsSubmitting(true);
      await axiosClient.post('/api/prior-authorization-form/add-request', formData);
      console.log('Form submitted successfully:', formData);
      alert('Form submitted successfully');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form');
    } finally {
      setIsSubmitting(false);
    }
  }, [formData]);

  return {
    formData,
    isLoading,
    error,
    handleChange,
    handleRadioChange,
    handleSubmit,
    handleSelectChange,
    isSubmitting,
    formErrors,
  };
};

export default usePreAuthForm;