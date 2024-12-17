import { BookEntity } from 'src/modules/books/entity/books.entity';

import { Injectable } from '@nestjs/common';

@Injectable()
export class CartUtil {
  constructor() {}
  checkBookAmount = (book: BookEntity) => {
    if (book.cover.hardcover_amount > 0) {
      return true;
    } else {
      return false;
    }
  };
}
