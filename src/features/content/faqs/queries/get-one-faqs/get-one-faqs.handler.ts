import { Injectable, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { GetOneFaqsRequest } from './get-one-faqs.request';
import { GetOneFaqsResponse } from './get-one-faqs.response';
import { Faqs } from '../../faqs.entity';

@Injectable()
@QueryHandler(GetOneFaqsRequest)
export class GetOneFaqsHandler implements IQueryHandler<GetOneFaqsRequest> {
  async execute(query: GetOneFaqsRequest): Promise<GetOneFaqsResponse> {
    const faq = await Faqs.findOne({
      where: { id: query.id },
      relations: ['tags']
    });
    if (!faq) throw new NotFoundException('Faq not found');
    return plainToInstance(GetOneFaqsResponse, faq, { excludeExtraneousValues: true });
  }
}