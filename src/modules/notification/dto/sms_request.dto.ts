import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsObject, IsPhoneNumber } from 'class-validator';
import { IsLanguageRecord, SupportedLanguage } from './type';

export class SMSRequestDTO {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsObject()
  @IsLanguageRecord('contents', {
    message: 'Invalid contents or unsupported language',
  })
  contents: Record<SupportedLanguage, string>;

  @ApiProperty()
  @IsArray()
  @IsNotEmpty({ each: true })
  @IsPhoneNumber(undefined, { each: true })
  phone_numbers: string[];
}
