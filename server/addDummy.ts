import mongoose from 'mongoose';
import Patient from './models/patientSchema';
import HealthRecord from './models/healthRecordSchema';
import dotenv from 'dotenv';
import { faker } from '@faker-js/faker';

dotenv.config();

const addDummyData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);

    //delete all existing data
    // await Patient.deleteMany({});
    // await HealthRecord.deleteMany({});

    // Add 40 dummy patients
    const patients = Array.from({ length: 40 }, () => ({
      name: faker.person.fullName(),
      age: faker.number.int({ min: 18, max: 80 }),
      condition: faker.helpers.arrayElement(['Diabetes', 'Hypertension', 'Asthma', 'Arthritis', 'Depression', 'Anxiety', 'COPD', 'Heart Disease', 'Obesity', 'Chronic Pain']),
      contactNo: faker.phone.number(),
      gender: faker.helpers.arrayElement(['male', 'female', 'other']),
      currentAddress: faker.location.streetAddress(),
      occupation: faker.helpers.arrayElement(['Engineer', 'Doctor', 'Teacher', 'Artist', 'Lawyer', 'Nurse', 'Technician', 'Manager', 'Clerk', 'Salesperson']),
    }));

    const savedPatients = await Patient.insertMany(patients);

    // Add dummy health records for each patient
    const healthRecords = savedPatients.map(patient => ({
      patientId: patient._id,
      medicalHistory: {
        date: faker.date.past().toISOString().split('T')[0],
        diagnosis: patient.condition,
        treatment: faker.helpers.arrayElement(['Medication', 'Surgery', 'Therapy', 'Lifestyle changes', 'Diet modification']),
      },
      medications: {
        name: faker.science.chemicalElement().name,
        dosage: `${faker.number.int({ min: 50, max: 500 })}mg`,
        startDate: faker.date.past(),
        endDate: faker.date.future(),
      },
      labResults: {
        date: faker.date.recent().toISOString().split('T')[0],
        test: faker.helpers.arrayElement(['Blood Sugar', 'Blood Pressure', 'Cholesterol', 'Liver Function', 'Kidney Function', 'Thyroid Function']),
        result: faker.helpers.arrayElement(['Normal', 'Abnormal', 'High', 'Low', 'Inconclusive']),
      },
    }));

    await HealthRecord.insertMany(healthRecords);

    console.log('40 distinct dummy data entries added successfully');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error adding dummy data:', error);
    mongoose.connection.close();
  }
};

addDummyData();