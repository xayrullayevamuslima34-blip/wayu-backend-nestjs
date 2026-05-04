import { Query } from '@nestjs/cqrs';
import { GetAllInstagramPostsResponse } from './get-all-instagram-posts.response';
import { GetAllInstagramPostsFilters } from './get-all-instagram-posts.filters';

export class GetAllInstagramPostsRequest extends Query<GetAllInstagramPostsResponse[]>{
  constructor(public readonly filters: GetAllInstagramPostsFilters) {
    super();
  }
}