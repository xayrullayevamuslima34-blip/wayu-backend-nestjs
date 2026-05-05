import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { ConfigService } from '@nestjs/config';
import { GetAllEventsAdminRequest } from './get-all-events.admin.request';
import { GetAllEventsAdminResponse } from './get-all-events.admin.response';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {Event} from '../../../events.entity';

@QueryHandler(GetAllEventsAdminRequest)
export class GetAllEventsAdminHandler implements IQueryHandler<GetAllEventsAdminRequest> {
  constructor(
    @InjectRepository(Event)
    private repo: Repository<Event>,
    private readonly config: ConfigService,
  ) {}

  async execute(query: GetAllEventsAdminRequest): Promise<GetAllEventsAdminResponse[]> {
    const take = query.filters.size ?? 10;
    const currentPage = query.filters.page ?? 1;
    const skip = (currentPage - 1) * take;

    const events = await this.repo.find({
      relations: ['category'],
      skip: skip,
      take: take,
    });

    const baseUrl = this.config.get<string>('BASE_URL');

    return events.map((event) => {
      const res = plainToInstance(GetAllEventsAdminResponse, event, { excludeExtraneousValues: true });
      res.image = `${baseUrl}/${event.image}`;
      return res;
    });
  }
}
