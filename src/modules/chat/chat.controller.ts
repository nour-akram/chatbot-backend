import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  Get,
  Req,
  Patch,
  BadRequestException,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import {
  CreateChatDto,
  UpdateChatDto,
  CreateMessageDto,
} from './dtos/chat.dto';

@ApiTags('chats')
@Controller('chats')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @ApiBearerAuth()
  @Post()
  async createChat(
    @Req() req: { user: { sub: string } },
    @Body() createChatDto: CreateChatDto,
  ) {
    return this.chatService.createChat(req.user.sub, createChatDto.title);
  }

  @ApiBearerAuth()
  @Get()
  getUserChats(@Req() req: { user: { sub: string } }) {
    return this.chatService.getChatsByUserId(req.user.sub);
  }

  @ApiParam({ name: 'id', description: 'The ID of the chat to update' })
  @Patch(':id')
  async updateChatTitle(
    @Param('id') chatId: string,
    @Body() updateChatDto: UpdateChatDto,
  ) {
    if (!updateChatDto.title) {
      throw new BadRequestException('Title is required to update the chat.');
    }
    return this.chatService.updateChatTitle(chatId, updateChatDto.title);
  }

  @ApiParam({ name: 'chatId', description: 'The ID of the chat to delete' })
  @Delete(':chatId')
  deleteChat(@Param('chatId') chatId: string) {
    return this.chatService.deleteChat(chatId);
  }

  @ApiBearerAuth()
  @ApiParam({
    name: 'chatId',
    description: 'The ID of the chat to add message',
  })
  @Post(':chatId/messages')
  addMessage(
    @Param('chatId') chatId: string,
    @Req() req: { user: { sub: string } },
    @Body() createMessageDto: CreateMessageDto,
  ) {
    return this.chatService.addMessage(
      chatId,
      req.user.sub,
      createMessageDto.content,
    );
  }
}
