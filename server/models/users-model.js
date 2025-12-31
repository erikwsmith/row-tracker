import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        first_name: {
            type: String,
            required: true
        },
        last_name: {
            type: String,
            required: true
        },
        role: {
            type: String,
            required: true
        }
    },
    { timestamps: true }, { collection: 'users'}
);

const User = mongoose.model("User", userSchema);

export default User;