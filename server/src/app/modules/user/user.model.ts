import { Schema, model } from 'mongoose';
import { IUser, TUser } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const UserSchema = new Schema<TUser>({
    role: {
        type: String,
        required: true,
        enum: ['admin', 'user'],
        default: 'user',
    },
    name: { type: String, required: true, trip: true },
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true },
});

// Middleware: Mongoose pre-save hook
// This hook is used to hash the password before saving the user to the database
UserSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(
        this.password,
        Number(config.bcrypt_salt_rounds),
    );
    next();
});

// Middleware: Mongoose post-save hook
// This hook is used to remove the password from the response
UserSchema.post('save', function (doc, next) {
    doc.password = '';
    next();
});

// Static methods
// These methods are used to check if the user exists by email
UserSchema.statics.isUserExistsByEmail = async function (email: string) {
    return await UserModel.findOne({ email }).select('+password');
};

// Static methods
// These methods are used to check if the password is matched
UserSchema.statics.isPasswordMatched = async function (
    plainTextPassword,
    hashedPassword,
) {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
};

export const UserModel = model<TUser, IUser>('User', UserSchema);
