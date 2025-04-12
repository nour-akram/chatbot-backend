import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, _id: true })
export class Message {
  @Prop({ required: true })
  senderId: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true, enum: ['user', 'assistant'] })
  senderType: 'user' | 'assistant';

  @Prop({ default: Date.now })
  createdAt: Date;
}

const MessageSchema = SchemaFactory.createForClass(Message);

@Schema({ timestamps: true })
export class Chat extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ type: [MessageSchema], default: [] })
  messages: Message[];

  @Prop({ required: true })
  title: string;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
