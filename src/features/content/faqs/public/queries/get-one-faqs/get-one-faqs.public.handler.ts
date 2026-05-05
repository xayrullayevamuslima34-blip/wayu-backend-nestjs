import { Injectable, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { GetOneFaqsPublicRequest } from './get-one-faqs.public.request';
import { GetOneFaqsPublicResponse } from './get-one-faqs.public.response';
import { Faqs } from '../../../faqs.entity';

@Injectable()
@QueryHandler(GetOneFaqsPublicRequest)
export class GetOneFaqsPublicHandler implements IQueryHandler<GetOneFaqsPublicRequest> {
  async execute(query: GetOneFaqsPublicRequest): Promise<GetOneFaqsPublicResponse> {
    const faq = await Faqs.findOne({
      where: { id: query.id },
      relations: ['tags']
    });
    if (!faq) throw new NotFoundException('Faq not found');
    return plainToInstance(GetOneFaqsPublicResponse, faq, { excludeExtraneousValues: true });
  }
}