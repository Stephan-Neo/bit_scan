import { Schema, model } from "mongoose";

export interface bitPrice extends Document {
    timestamp: Date,
    price: Number,
}

const priceSchema = new Schema({
    timestamp: {
        type: Date,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
});

export const Price = model<bitPrice>("Price", priceSchema);