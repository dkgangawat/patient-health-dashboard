import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log('Connected to Database');
    } catch (error) {
        console.error('Failed to connect to MongoDB', error);
    }
};

connectToDB();