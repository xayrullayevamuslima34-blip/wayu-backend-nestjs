import { Query } from '@nestjs/cqrs';
import { GetAllSocialLinksResponse } from './get-all-social-links.response';
import { GetAllSocialLlinksFilters } from './get-all-social-llinks.filters';

export class GetAllSocialLinksRequest extends Query<GetAllSocialLinksResponse[]>{
  constructor(public readonly filters: GetAllSocialLlinksFilters) {
    super();
  }
}