import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class UserDto {
  @ApiProperty()
  @IsString()
  @MinLength(3, { message: 'Password must be at least 3 characters long' })
  username: string;

  @ApiProperty()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string;
}
