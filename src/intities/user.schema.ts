import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ unique: true })
  username: string;

  @Prop({ unique: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
