import mongoose, { Schema } from 'mongoose';


const FormDataSchema: Schema = new Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true,
  },
  patientName: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  currentAddress: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  photoIdProofs: {
    type: [String],
    required: true,
  },
  doctorName: {
    type: String,
    required: true,
  },
  qualification: {
    type: String,
    required: true,
  },
  diagnosis: {
    type: String,
    required: true,
  },
  treatment: {
    type: [String],
    required: true,
  },
  admissionDate: {
    type: Date,
    required: true,
  },
  admissionTime: {
    type: String,
    required: true,
  },
  hospitalizationType: {
    type: String,
    required: true,
  },
  expectedStay: {
    type: Number,
    required: true,
  },
  roomType: {
    type: String,
    required: true,
  },
  icuDays: {
    type: Number,
    required: true,
  },
  status:{
    type: String,
    enum: ['Pending', 'Approved', 'Denied'],
    default: 'Pending',
  }
},{
    timestamps: true,
});

const PriorAuthorizationForm = mongoose.model('PriorAuthorizationForm', FormDataSchema);
export default PriorAuthorizationForm