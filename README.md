# Patient Health Dashboard

## Project Overview

This project is a full-stack application for healthcare providers to view and manage patient health data, focusing on prior authorization workflows. It includes a patient dashboard, health data integration, and APIs for submitting and managing prior authorization requests.

live demo [https://patient-health-dashboard-virid.vercel.app/](https://patient-health-dashboard-virid.vercel.app/)

## Demo

<video width="600" controls>
  <source src="demo.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>


## Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)
- MongoDB (v4 or later)

## Project Structure

The project consists of two main parts:
1. Client (React frontend using Next.js)
2. Server (Node.js backend using Express)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone 
```

### 2. Server Setup

1. Navigate to the server directory:
   ```
   cd server
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the server directory with the following content:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/basys_ai_db
   JWT_SECRET=your_jwt_secret_here
   ```

4. Start the server:
   ```
   npm run dev
   ```

5. Add dummy data
   ```bash
   npm run add-dummy-data
   ```


The server should now be running on `http://localhost:5000`.

### 3. Client Setup

1. Open a new terminal and navigate to the client directory:
   ```
   cd ../client
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env.local` file in the client directory with the following content:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:5000
   ```

4. Start the client:
   ```
   npm run dev
   ```

The client should now be running on `http://localhost:3000`.

## API Documentation

The server exposes the following main API endpoints:

1. Authentication:
   - POST `/api/auth/register`: Register a new user
   - POST `/api/auth/login`: Login user

2. Patients:
   - GET `/api/patients/get-patients`: Get paginated list of patients
   - GET `/api/patients/get-patient/:id`: Get a specific patient's details

3. Health Records:
   - GET `/api/health-records/:patientId`: Get health records for a patient

4. Prior Authorization:
   - POST `/api/prior-authorization-form/add-request`: Submit a new prior authorization request
   - GET `/api/prior-authorization-form/get-requests`: Get paginated list of prior authorization requests
   - GET `/api/prior-authorization-form/get-request/:id`: Get a specific prior authorization request


