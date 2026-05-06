// queries/get-all-admin/get-all-admin.handler.ts
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '@/core/enums/role.enum';
import { Auth } from '@/features/auth/auth.entity';
import {
  GetAllAdminRequest
} from '@/features/auth/super-admin/queries/get-all-super-admin/get-all-super.admin.request';
import {
  GetAllAdminResponse
} from '@/features/auth/super-admin/queries/get-all-super-admin/get-all-super.admin.response';

@QueryHandler(GetAllAdminRequest)
export class GetAllAdminHandler implements IQueryHandler<GetAllAdminRequest> {
  constructor(
    @InjectRepository(Auth)
    private repo: Repository<Auth>,
  ) {}

  async execute(query: GetAllAdminRequest): Promise<GetAllAdminResponse[]> {
    const take = query.filters.size ?? 10;
    const currentPage = query.filters.page ?? 1;
    const skip = (currentPage - 1) * take;

    // Faqat Admin rolidagilarni olish
    const admins = await this.repo.find({
      where: { role: Role.Admin },
      skip: skip,
      take: take,
      order: { id: 'ASC' },
    });

    // plainToInstance bilan response'ga o'tkazish
    return admins.map((admin) => {
      return plainToInstance(GetAllAdminResponse, admin, {
        excludeExtraneousValues: true
      });
    });
  }
}