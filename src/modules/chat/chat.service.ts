import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chat } from '../../intities/chat.schema';
// import {
//   CreateChatDto,
//   CreateMessageDto,
//   UpdateMessageDto,
// } from './dtos/chat.dto';

@Injectable()
export class ChatService {
  constructor(@InjectModel(Chat.name) private chatModel: Model<Chat>) {}

  async createChat(userId: string, title: string): Promise<Chat> {
    const newChat = new this.chatModel({ userId, messages: [], title });
    return newChat.save();
  }

  async getChatsByUserId(userId: string): Promise<Chat[]> {
    return this.chatModel.find({ userId });
  }

  async updateChatTitle(chatId: string, newTitle: string): Promise<Chat> {
    const chat = await this.chatModel.findById(chatId);
    if (!chat) throw new NotFoundException('Chat not found');

    chat.title = newTitle;
    return chat.save();
  }

  async deleteChat(chatId: string) {
    const chat = await this.chatModel.findById(chatId);
    if (!chat) throw new NotFoundException('Chat not found or not allowed');
    return chat.deleteOne();
  }

  async addMessage(
    chatId: string,
    content: string,
    senderType: 'user' | 'assistant',
  ) {
    const chat = await this.chatModel.findById(chatId);
    if (!chat) throw new NotFoundException('Chat not found');

    chat.messages.push({
      content,
      senderType,
      createdAt: new Date(),
    });

    return chat.save();
  }

  async getChatById(chatId: string, userId: string) {
    const chat = await this.chatModel.findOne({ _id: chatId, userId });
    if (!chat) throw new NotFoundException('Chat not found');
    return chat;
  }
}
