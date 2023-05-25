import { Injectable } from '@nestjs/common';
import { Book } from 'src/domain/book/book';
import { BookRepository } from 'src/domain/ports/book.repository';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthorEntity } from './entities/author.entity';
import { BookEntity } from './entities/book.entity';
import { Author } from 'src/domain/author/author';

@Injectable()
export class BookRepositoryTypeORM implements BookRepository {
  constructor(
    @InjectRepository(BookEntity)
    private readonly bookEntityRepository: Repository<BookEntity>,
  ) {}

  async save(book: Book): Promise<Book> {
    const bookEntity: BookEntity = this.mapToBookEntity(book);

    const bookSaved: BookEntity = await this.bookEntityRepository.save(
      bookEntity,
    );

    return this.mapTobook(bookSaved);
  }

  async findAll(): Promise<Book[]> {
    const bookEntityArray: BookEntity[] =
      await this.bookEntityRepository.find();

    const bookArray: Book[] = bookEntityArray.map((BookEntity) => {
      return this.mapTobook(BookEntity);
    });

    return bookArray;
  }

  private mapToBookEntity(book: Book): BookEntity {
    const bookEntity: BookEntity = new BookEntity();
    bookEntity.name = book.name;

    const authorEntity = new AuthorEntity();
    if (!!book.author.id) {
      authorEntity.id = Number(book.author.id);
    }
    authorEntity.name = book.author.name;

    bookEntity.author = authorEntity;

    return bookEntity;
  }

  private mapTobook(BookEntity: BookEntity): Book {
    const book: Book = new Book();

    book.name = BookEntity.name;

    const autor: Author = new Author();

    autor.name = BookEntity.author.name;

    book.author = autor;

    return book;
  }
}
