import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

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

export class CreateMessageDto {
  @ApiProperty({ description: 'Message content' })
  @IsString()
  @IsNotEmpty()
  content: string;
}
