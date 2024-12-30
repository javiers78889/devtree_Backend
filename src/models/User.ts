import mongoose, { Schema, Document } from "mongoose";

export interface TUser extends Document {
    handle: string
    name: string
    email: string
    password: string,
    description: string,
    image: string,
    links: string
}
const userSchema = new Schema({
    "handle": {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
    },
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

    },
    "description": {
        type: String,
        default: ''
    },
    "image": {
        type: String,
        default: ''
    },
    links:{
        type:String,
        default:[]
    }
})

export const User = mongoose.model<TUser>('User', userSchema)
