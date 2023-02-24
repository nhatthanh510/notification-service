import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsObject, ValidateNested } from 'class-validator';

export class SMSRequestDTO {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsObject()
  contents: Record<string, string>;

  @ApiProperty()
  @IsArray()
  @ValidateNested({ each: true })
  phone_numbers: string[];
}
