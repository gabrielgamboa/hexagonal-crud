import { Book } from 'src/domain/book/book';
import { BookRepository } from 'src/domain/ports/book.repository';

export class FindAllBooksUseCase {
  constructor(private readonly repository: BookRepository) {}

  async findAll(): Promise<Book[]> {
    return this.repository.findAll();
  }
}
