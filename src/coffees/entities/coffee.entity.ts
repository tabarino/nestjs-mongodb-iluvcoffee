import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

// Mongo automatically makes all collections plural and lowercase, in this case (coffees)
@Schema()
export class Coffee extends Document {
    // Mongo automatically adds the id, so we need to remove id from here as best practice
    // id: number;
    
    @Prop()
    name: string;

    @Prop()
    brand: string;

    @Prop([String])
    flavours: string[];
}

export const CoffeeSchema = SchemaFactory.createForClass(Coffee);
