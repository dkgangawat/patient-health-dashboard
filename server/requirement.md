### **Project: Patient Health Dashboard for Prior Authorization**

**Objective:**

Develop a full-stack application where healthcare providers can view and manage patient health data, focusing on prior authorization workflows (relevant to Basys AI's Co-Pilot product). This will involve creating a patient dashboard, integrating health data, and building APIs for submitting and managing prior authorization requests.

**Project Deadline:**

36 hours from the time email was sent

---

### **Project Requirements:**

### **Frontend (React):**

1. **Patient Dashboard:**
    - Display a list of patients with basic information (name, age, condition).
    - A detailed view of a selected patient with health records (past treatments, medication history, lab results).
    - UI must include a filter/search feature to easily navigate through patients and health records.
2. **Prior Authorization Form:**
    - Allow healthcare providers to submit a prior authorization request for a selected patient.
    - The form should include fields like treatment type, insurance plan, date of service, diagnosis code, etc.
    - Implement basic client-side validation.
3. **Responsive Design:**
    - The dashboard should be responsive and mobile-friendly.
    - Use a modern CSS framework like **Tailwind CSS** or **Bootstrap** for layout and styling.

### **Backend (Node.js, Express, MongoDB):**

1. **Patient Data API:**
    - Create a REST API to fetch a list of patients and their details from MongoDB.
    - API should allow the frontend to submit prior authorization requests, which will be stored in MongoDB.
2. **Authorization API:**
    - Build an endpoint to receive, store, and list prior authorization requests.
    - Each request should include details like patient ID, treatment, doctor’s notes, and status (pending/approved/denied).
3. **Database Structure:**
    - **Patients Collection:** Store patient data with fields like `name`, `age`, `medical history`, and `treatment plan`.
    - **Authorization Requests Collection:** Store authorization requests with patient ID, treatment details, request status, and timestamps.

### **Bonus Points:**

1. **Authentication (Optional):**
    - Implement basic authentication (e.g., JWT-based login system for healthcare providers).
2. **Performance Optimization:**
    - Optimize API calls and data fetching (e.g., pagination for the patient list).
3. **Documentation:**
    - Include clear documentation for setting up the project locally (installation steps, environment variable setup).
4. **Testing:**
    - Write unit tests for API routes and frontend components (using Jest/Mocha/Enzyme).

---

### **Deliverables:**

1. **Frontend**: React code for the patient dashboard and prior authorization form.
2. **Backend**: API code (Node.js, Express) for handling patient data and authorization requests, with MongoDB as the database.
3. **Documentation**: A README explaining how to run the app, along with API documentation.
4. **Video Demonstration**:
    - Include a short video (simple screen recording) showing the functionality of the project. No need to make it fancy, but ensure the video demonstrates the working features (e.g., navigating the patient dashboard, submitting a prior authorization request).
5. **Deployment (Bonus)**: Deploy the app on **Heroku/Vercel** or any cloud platform for live access.