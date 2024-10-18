
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const generateToken = (id:string) => {
    console.log(process.env.JWT_SECRET)
    //@ts-expect-error The error is expected because the process.env.JWT_SECRET may be undefined so make sure JWT_SECRET is defined in your .env file
    return jwt.sign({ _id:id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
    }

export default generateToken;
