import { UserDocument } from '../models/userSchema';

declare global {
  namespace Express {
    interface Request {
      user?: UserDocument;
    }
  }
}