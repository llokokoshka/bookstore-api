import { FindOptionsWhere, Repository } from 'typeorm';

import { BooksFilterDTO, SortOrder } from './lib/booksFolter.dto';

export class PageService {
  protected createOrderQuery(filter: BooksFilterDTO) {
    const order: any = {};

    if (filter.orderBy) {
      order[filter.orderBy] = filter.sortOrder;
      return order;
    }

    order.createdAt = SortOrder.DESC;
    return order;
  }

  protected paginate<T>(
    repository: Repository<T>,
    filter: BooksFilterDTO,
    where: FindOptionsWhere<T>,
  ) {
    return repository.findAndCount({
      order: this.createOrderQuery(filter),
      skip: (filter.page - 1) * (filter.pageSize + 1),
      take: filter.pageSize,
      where: where,
    });
  }
}
