import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsObject,
  IsOptional,
  ValidateNested,
} from 'class-validator';

export class PushNotificationDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsObject()
  contents: Record<string, string>;

  @ApiProperty()
  @IsNotEmpty()
  @IsObject()
  headings: Record<string, string>;

  @ApiProperty()
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  segments?: string[];

  @ApiProperty()
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  player_ids?: string[];

  @ApiProperty()
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  one_signal_user_ids?: string[];
}
