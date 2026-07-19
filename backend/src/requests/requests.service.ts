import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request, RequestStatus } from './entities/request.entity';
import { CreateRequestDto } from './dto/create-request.dto';
import { REQUEST_STATUS_TRANSITIONS } from './request-status-transitions';

@Injectable()
export class RequestsService {
  constructor(
    @InjectRepository(Request)
    private readonly requestRepository: Repository<Request>,
  ) {}

  async create(createRequestDto: CreateRequestDto) {
    if (
      new Date(createRequestDto.endDate) < new Date(createRequestDto.startDate)
    ) {
      throw new BadRequestException(
        'End date cannot be earlier than start date.',
      );
    }

    const request = this.requestRepository.create(createRequestDto);

    return this.requestRepository.save(request);
  }

  async findAll() {
    return this.requestRepository.find();
  }

  async findOne(id: number) {
    return this.requestRepository.findOneBy({ id });
  }

  async updateStatus(id: number, status: RequestStatus) {
    const request = await this.requestRepository.findOneBy({ id });

    if (!request) {
      throw new NotFoundException(`Request with ID ${id} not found`);
    }

    if (request.status === status) {
      throw new BadRequestException(`Request is already in status ${status}`);
    }

    const allowedTransitions = REQUEST_STATUS_TRANSITIONS[request.status];

    if (!allowedTransitions.includes(status)) {
      throw new BadRequestException(
        `Cannot change status from ${request.status} to ${status}`,
      );
    }

    request.status = status;

    return await this.requestRepository.save(request);
  }

  async remove(id: number) {
    const request = await this.requestRepository.findOneBy({ id });

    if (!request) {
      throw new NotFoundException(`Request with ID ${id} not found`);
    }

    await this.requestRepository.remove(request);

    return {
      message: `Request with ID ${id} deleted successfully`,
    };
  }
}
