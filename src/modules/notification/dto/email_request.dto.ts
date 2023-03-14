import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
} from 'class-validator';

export class EmailRequestDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-z0-9\s\-\@]*$/gi, { message: 'Invalid email subject' })
  emailSubject: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-z0-9\s\-\@]*$/gi, { message: 'Invalid email content' })
  emailContent: string;

  @ApiProperty()
  @IsArray()
  @IsEmail({}, { each: true })
  @IsNotEmpty({ each: true })
  emails: string[];
}
