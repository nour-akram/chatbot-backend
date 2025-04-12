import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  IsIn,
} from 'class-validator';

export class CreateChatDto {
  @ApiProperty({ description: 'Title of the chat' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  title: string;
}

export class UpdateChatDto {
  @ApiProperty({ description: 'New title for the chat' })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  title?: string;
}

export class AddMessageDto {
  @ApiProperty({ description: 'Message content' })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    description: 'Sender type (either user or assistant)',
    enum: ['user', 'assistant'],
  })
  @IsString()
  @IsIn(['user', 'assistant'])
  senderType: 'user' | 'assistant';
}
