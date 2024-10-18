import mongoose, { Document } from "mongoose";

export interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
}

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
    role: {
        type: String,
        enum: ["user", "healthcare_provider"],
        default: "user",
    }
},
{
    timestamps: true,
}
);

const User = mongoose.model("User", userSchema);

export default User;
