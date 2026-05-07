import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { Role } from '@/core/enums/role.enum';
import { Auth } from '@/features/auth/auth.entity';
import {
  GetOneAdminRequest
} from '@/features/auth/super-admin/queries/get-one-super-admin/get-one-super.public.request';
import {
  GetOneAdminResponse
} from '@/features/auth/super-admin/queries/get-one-super-admin/get-one-super.public.response';

@QueryHandler(GetOneAdminRequest)
export class GetOneAdminHandler implements IQueryHandler<GetOneAdminRequest> {
  constructor(
    @InjectRepository(Auth)
    private readonly repo: Repository<Auth>,
  ) {}

  async execute(query: GetOneAdminRequest): Promise<GetOneAdminResponse> {
    const { id } = query;

    const admin = await this.repo.findOneBy({ id });

    if (!admin) {
      throw new NotFoundException(`ID ${id} bo'lgan admin topilmadi`);
    }

    return plainToInstance(GetOneAdminResponse, admin, {
      excludeExtraneousValues: true
    });
  }
}