import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';

@Schema()
export class Event extends mongoose.Document {
    @Prop()
    name: string;

    // @Prop({ index: true })
    @Prop()
    type: string;

    @Prop({ type: mongoose.SchemaTypes.Mixed })
    payload: Record<string, any>;
}

export const EventSchema = SchemaFactory.createForClass(Event);

// Create Index
// 1 => ASC / -1 => DESC
EventSchema.index({ name: 1, type: -1 });
