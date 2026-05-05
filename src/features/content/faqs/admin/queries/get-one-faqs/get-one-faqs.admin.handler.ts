import { Injectable, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { GetOneFaqsAdminRequest } from './get-one-faqs.admin.request';
import { GetOneFaqsAdminResponse } from './get-one-faqs.admin.response';
import { Faqs } from '@/features/content/faqs/faqs.entity';

@Injectable()
@QueryHandler(GetOneFaqsAdminRequest)
export class GetOneFaqsAdminHandler implements IQueryHandler<GetOneFaqsAdminRequest> {
  async execute(query: GetOneFaqsAdminRequest): Promise<GetOneFaqsAdminResponse> {
    const faq = await Faqs.findOne({
      where: { id: query.id },
      relations: ['tags']
    });
    if (!faq) throw new NotFoundException('Faq not found');
    return plainToInstance(GetOneFaqsAdminResponse, faq, { excludeExtraneousValues: true });
  }
}