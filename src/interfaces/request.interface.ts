import { ObjectId } from "mongoose";

export interface IPayload {
    id: ObjectId
    name: string
    email: string
    restaurantName: string
    phoneNumber: string
    address: string
    openingHour: string
    closingHour: string
    minimumPrice: string
    website: string
    rating: number
    review: string
    active: boolean

}