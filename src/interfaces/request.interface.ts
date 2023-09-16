import { ObjectId } from "mongoose";

export interface IReq {
    id: ObjectId
    name: string
    email: string
    role: string
}