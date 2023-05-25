import { Book } from 'src/domain/book/book';
import { BookRepository } from 'src/domain/ports/book.repository';

export class CreateBookUseCase {
  constructor(private readonly repository: BookRepository) {}

  async create(bookDTO: Book): Promise<Book> {
    return this.repository.save(bookDTO);
  }
}
