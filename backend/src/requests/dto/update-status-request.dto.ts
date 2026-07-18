//import { PartialType } from '@nestjs/mapped-types';
//import { CreateRequestDto } from './create-request.dto';
import { IsNotEmpty, IsEnum } from 'class-validator';
import { RequestStatus } from '../enum/request-status-enum';

export class UpdateStatusRequestDto {
  @IsNotEmpty()
  @IsEnum(RequestStatus)
  status!: RequestStatus;
}
