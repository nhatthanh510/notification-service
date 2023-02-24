import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';

export class EmailRequestDTO {
  @ApiProperty()
  @IsNotEmpty()
  emailSubject: string;

  @ApiProperty()
  @IsNotEmpty()
  emailContent: string;

  @ApiProperty()
  @IsArray()
  @ValidateNested({ each: true })
  emails: string[];
}
