import { BookEntity } from 'src/books/entity/books.entity';

export function checkBookAmount(book: BookEntity) {
  if (book.cover.hardcover_amount > 0) {
    return true;
  } else {
    return false;
  }
}
