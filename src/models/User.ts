import mongoose, { Schema } from "mongoose";

type TUser = {
    name: string
    email: string
    password: string
}
const userSchema = new Schema({
    "name": {
        type: String,
        required: true,
        trim: true
    },
    "email": {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    "password": {
        type: String,
        required: true,
        trim: true,

    }

})

export const User = mongoose.model<TUser>('User', userSchema)
