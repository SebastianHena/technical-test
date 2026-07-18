import {
  IsString,
  IsDate,
  IsNotEmpty,
  IsDefined,
  MaxLength,
} from 'class-validator';

import { Type } from 'class-transformer';

export class CreateRequestDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @MaxLength(255)
  title!: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  description!: string;

  @Type(() => Date)
  @IsDate()
  startDate!: Date;

  @Type(() => Date)
  @IsDate()
  endDate!: Date;
}
