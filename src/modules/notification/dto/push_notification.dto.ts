import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IsLanguageRecord, SupportedLanguage } from './type';

export class PushNotificationDTO {
  @ApiProperty()
  @IsLanguageRecord('contents', {
    message: 'Invalid contents or unsupported language',
  })
  contents: Record<SupportedLanguage, string>;

  @ApiProperty()
  @IsLanguageRecord('headings', {
    message: 'Invalid headings or unsupported language',
  })
  headings: Record<SupportedLanguage, string>;

  @ApiProperty()
  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  segments?: string[];

  @ApiProperty()
  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  player_ids?: string[];

  @ApiProperty()
  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  one_signal_user_ids?: string[];
}
