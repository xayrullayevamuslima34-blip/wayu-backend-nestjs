import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { ConfigService } from '@nestjs/config';
import { GetAllRepresentativesRequest } from './get-all-representatives.request';
import { GetAllRepresentativesResponse } from './get-all-representatives.response';
import { Representative } from '../../representatives.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@QueryHandler(GetAllRepresentativesRequest)
export class GetAllRepresentativesHandler implements IQueryHandler<GetAllRepresentativesRequest> {
  constructor(
    @InjectRepository(Representative)
    private repo: Repository<Representative>,
    private readonly config: ConfigService,
  ) {}

  async execute(query: GetAllRepresentativesRequest): Promise<GetAllRepresentativesResponse[]> {
    const take = query.filters.size ?? 10;
    const currentPage = query.filters.page ?? 1;
    const skip = (currentPage - 1) * take;

    const representatives = await this.repo.find({
      relations: ['branch'],
      skip: skip,
      take: take,
    });

    const baseUrl = this.config.get<string>('BASE_URL');

    return representatives.map((rep) => {
      const res = plainToInstance(GetAllRepresentativesResponse, rep, { excludeExtraneousValues: true });
      res.image = `${baseUrl}/${rep.image}`;
      res.resume = `${baseUrl}/${rep.resume}`;
      return res;
    });
  }
}