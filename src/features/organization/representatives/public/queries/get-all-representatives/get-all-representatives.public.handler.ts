import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { ConfigService } from '@nestjs/config';
import { GetAllRepresentativesPublicRequest } from './get-all-representatives.public.request';
import { GetAllRepresentativesPublicResponse } from './get-all-representatives.public.response';
import { Representative } from '../../../representatives.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@QueryHandler(GetAllRepresentativesPublicRequest)
export class GetAllRepresentativesPublicHandler implements IQueryHandler<GetAllRepresentativesPublicRequest> {
  constructor(
    @InjectRepository(Representative)
    private repo: Repository<Representative>,
    private readonly config: ConfigService,
  ) {}

  async execute(query: GetAllRepresentativesPublicRequest): Promise<GetAllRepresentativesPublicResponse[]> {
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
      const res = plainToInstance(GetAllRepresentativesPublicResponse, rep, { excludeExtraneousValues: true });
      res.image = `${baseUrl}/${rep.image}`;
      res.resume = `${baseUrl}/${rep.resume}`;
      return res;
    });
  }
}